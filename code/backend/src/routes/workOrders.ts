import { Router } from "express";
import { z } from "zod";
import crypto from "crypto";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";
import { Prisma, DocumentIngestionStatus, DocumentType, type WorkOrderPriority, type WorkOrderStatus, type WorkOrderType } from "../generated/prisma/client";
import { upload, saveDocumentToS3 } from "../services/storage";
import { sendWorkOrderAssignmentWhatsapp } from "../services/notifications/whatsapp";

const router = Router();

const workOrderSchema = z.object({
  machineId: z.string(),
  title: z.string().min(1),
  descriptionRaw: z.string().min(1),
  type: z.enum(["CORRECTIVE", "PREVENTIVE", "INSPECTION"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  symptoms: z.array(z.string()).optional(),
  assignedToId: z.string().uuid().nullable().optional(),
});

router.use(requireAuth);

const generateWorkOrderPublicId = () => crypto.randomBytes(4).toString("hex").toUpperCase();

const createWorkOrderWithShortId = async (data: Prisma.WorkOrderCreateInput) => {
  let attempts = 0;

  while (attempts < 5) {
    const publicId = generateWorkOrderPublicId();

    try {
      return await prisma.workOrder.create({
        data: { ...data, publicId },
        include: {
          machine: true,
          reportedBy: true,
          assignedTo: true,
        },
      });
    } catch (err: unknown) {
      const isUniqueViolation =
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002" &&
        Array.isArray((err.meta as { target?: unknown } | undefined)?.target) &&
        ((err.meta as { target?: unknown } | undefined)?.target as string[]).includes("publicId");

      if (!isUniqueViolation) {
        throw err;
      }

      attempts += 1;
    }
  }

  throw new Error("Failed to generate unique work order id after multiple attempts");
};

const notifyAssigneeOfWhatsapp = async (workOrder: {
  publicId: string;
  title: string;
  priority: WorkOrderPriority;
  machine: { name: string | null } | null;
  assignedTo?: { phoneNumber: string | null; assignmentWhatsappOptIn: boolean } | null;
}) => {
  if (!workOrder.assignedTo?.assignmentWhatsappOptIn) return;
  if (!workOrder.assignedTo.phoneNumber) return;

  const result = await sendWorkOrderAssignmentWhatsapp({
    to: workOrder.assignedTo.phoneNumber,
    workOrder: {
      publicId: workOrder.publicId,
      title: workOrder.title,
      machineName: workOrder.machine?.name ?? null,
      priority: workOrder.priority,
    },
  });

  if (result.status === "failed") {
    console.warn("[whatsapp] failed to send work order assignment", {
      reason: result.reason,
      details: result.details,
    });
  }
};

router.get("/", async (req, res) => {
  const { status, priority, machineId } = req.query;

  const where: Prisma.WorkOrderWhereInput = {};
  if (status) {
    where.status = String(status).toUpperCase() as WorkOrderStatus;
  }
  if (priority) {
    where.priority = String(priority).toUpperCase() as WorkOrderPriority;
  }
  if (machineId) {
    where.machineId = { equals: String(machineId) };
  }

  const workOrders = await prisma.workOrder.findMany({
    where,
    orderBy: { reportedAt: "desc" },
    include: {
      machine: true,
      assignedTo: true,
      repairActions: true,
      parts: {
        include: { part: true },
      },
    },
  });

  return res.json({ data: workOrders });
});

router.get("/:id", async (req, res) => {
  const workOrder = await prisma.workOrder.findUnique({
    where: { id: req.params.id },
    include: {
      machine: true,
      reportedBy: true,
      assignedTo: true,
      repairActions: {
        orderBy: { createdAt: "desc" },
        include: {
          performedBy: true,
          attachments: {
            orderBy: { createdAt: "desc" },
            include: {
              uploadedBy: {
                select: { id: true, name: true },
              },
            },
          },
        },
      },
      parts: {
        include: { part: true },
      },
      attachments: {
        orderBy: { createdAt: "desc" },
        include: {
          uploadedBy: {
            select: { id: true, name: true },
          },
        },
      },
    },
  });

  if (!workOrder) {
    return res.status(404).json({ error: { message: "Work order not found" } });
  }

  return res.json({ data: workOrder });
});

router.post("/", async (req, res) => {
  const parsed = workOrderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const data: Prisma.WorkOrderCreateInput = {
    title: parsed.data.title,
    descriptionRaw: parsed.data.descriptionRaw,
    type: parsed.data.type ?? "CORRECTIVE",
    priority: parsed.data.priority ?? "MEDIUM",
    symptoms: parsed.data.symptoms ?? [],
    machine: { connect: { id: parsed.data.machineId } },
    reportedBy: { connect: { id: req.user!.id } },
  };

  // Handle assignment if provided
  if (parsed.data.assignedToId !== undefined && parsed.data.assignedToId !== null) {
    data.assignedTo = { connect: { id: parsed.data.assignedToId } };
  }

  const workOrder = await createWorkOrderWithShortId(data);

  if (workOrder.assignedTo) {
    void notifyAssigneeOfWhatsapp(workOrder);
  }

  return res.status(201).json({ data: workOrder });
});

router.patch("/:id", async (req, res) => {
  const parsed = workOrderSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const data: Prisma.WorkOrderUpdateInput = {};
  if (parsed.data.machineId !== undefined) {
    data.machine = { connect: { id: parsed.data.machineId } };
  }
  if (parsed.data.title !== undefined) data.title = parsed.data.title;
  if (parsed.data.descriptionRaw !== undefined) data.descriptionRaw = parsed.data.descriptionRaw;
  if (parsed.data.type !== undefined) data.type = parsed.data.type;
  if (parsed.data.priority !== undefined) data.priority = parsed.data.priority;
  if (parsed.data.symptoms !== undefined) {
    data.symptoms = parsed.data.symptoms;
  }

  try {
    const workOrder = await prisma.workOrder.update({
      where: { id: req.params.id },
      data,
    });
    return res.json({ data: workOrder });
  } catch {
    return res.status(404).json({ error: { message: "Work order not found" } });
  }
});

router.patch("/:id/status", async (req, res) => {
  const statusSchema = z.object({
    status: z.enum(["OPEN", "IN_PROGRESS", "WAITING", "CLOSED"]),
  });

  const parsed = statusSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  // Get current work order to check current status
  const currentWorkOrder = await prisma.workOrder.findUnique({
    where: { id: req.params.id },
    select: { status: true, startedAt: true, completedAt: true },
  });

  if (!currentWorkOrder) {
    return res.status(404).json({ error: { message: "Work order not found" } });
  }

  const newStatus = parsed.data.status;
  const updateData: Prisma.WorkOrderUpdateInput = { status: newStatus };

  // Set startedAt when moving to IN_PROGRESS (if not already set)
  if (newStatus === "IN_PROGRESS" && !currentWorkOrder.startedAt) {
    updateData.startedAt = new Date();
  }

  // Set completedAt when moving to CLOSED
  if (newStatus === "CLOSED") {
    updateData.completedAt = new Date();
  } else if (currentWorkOrder.status === "CLOSED") {
    // Clear completedAt if moving away from CLOSED
    updateData.completedAt = null;
  }

  const workOrder = await prisma.workOrder.update({
    where: { id: req.params.id },
    data: updateData,
    include: {
      machine: true,
      reportedBy: true,
      assignedTo: true,
      repairActions: {
        include: { performedBy: true },
      },
      parts: {
        include: { part: true },
      },
    },
  });

  return res.json({ data: workOrder });
});

router.patch("/:id/assign", async (req, res) => {
  const assignSchema = z.object({
    assignedToId: z.string().uuid().nullable(),
  });
  const parsed = assignSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const current = await prisma.workOrder.findUnique({
    where: { id: req.params.id },
    select: { assignedToId: true },
  });

  if (!current) {
    return res.status(404).json({ error: { message: "Work order not found" } });
  }

  const data: Prisma.WorkOrderUpdateInput = {};
  if (parsed.data.assignedToId) {
    data.assignedTo = { connect: { id: parsed.data.assignedToId } };
  } else {
    data.assignedTo = { disconnect: true };
  }

  const isNewAssignment =
    parsed.data.assignedToId !== null &&
    parsed.data.assignedToId !== undefined &&
    parsed.data.assignedToId !== current.assignedToId;

  const workOrder = await prisma.workOrder.update({
    where: { id: req.params.id },
    data,
    include: {
      machine: { select: { name: true } },
      assignedTo: { select: { phoneNumber: true, assignmentWhatsappOptIn: true } },
    },
  });

  if (isNewAssignment && workOrder.assignedTo) {
    void notifyAssigneeOfWhatsapp(workOrder);
  }

  return res.json({ data: workOrder });
});

router.post("/:id/repair", async (req, res) => {
  const repairSchema = z.object({
    actions: z.string().min(1),
    partsUsed: z.array(z.object({ partId: z.string().uuid(), quantity: z.number().min(1) })).optional(),
    adjustments: z.string().optional(),
    verification: z.string().optional(),
    success: z.boolean(),
    failureNote: z.string().optional(),
    rootCause: z.string().max(500).optional(),
  });

  const parsed = repairSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const repair = await prisma.repairAction.create({
    data: {
      workOrder: { connect: { id: req.params.id } },
      performedBy: { connect: { id: req.user!.id } },
      actions: parsed.data.actions,
      success: parsed.data.success,
      partsUsed: parsed.data.partsUsed ?? [],
      adjustments: parsed.data.adjustments ?? null,
      verification: parsed.data.verification ?? null,
      failureNote: parsed.data.failureNote ?? null,
      rootCause: parsed.data.rootCause ?? null,
    },
  });

  if (parsed.data.partsUsed?.length) {
    await Promise.all(
      parsed.data.partsUsed.map((p) =>
        prisma.workOrderPart.upsert({
          where: {
            workOrderId_partId: {
              workOrderId: req.params.id,
              partId: p.partId,
            },
          },
          update: { quantity: { increment: p.quantity } },
          create: {
            workOrderId: req.params.id,
            partId: p.partId,
            quantity: p.quantity,
          },
        }),
      ),
    );
  }

  return res.status(201).json({ data: repair });
});

const attachmentSelect = {
  id: true,
  title: true,
  mimeType: true,
  fileSize: true,
  createdAt: true,
  uploadedBy: {
    select: {
      id: true,
      name: true,
    },
  },
} as const;

router.post("/:id/attachments", upload.single("file"), async (req, res) => {
  const workOrderId = req.params.id;

  if (!workOrderId) {
    return res.status(400).json({ error: { message: "Work order id is required" } });
  }

  if (!req.file) {
    return res.status(400).json({ error: { message: "File is required" } });
  }

  const workOrder = await prisma.workOrder.findUnique({
    where: { id: workOrderId },
    select: { id: true, machineId: true },
  });

  if (!workOrder) {
    return res.status(404).json({ error: { message: "Work order not found" } });
  }

  const key = await saveDocumentToS3(req.file);
  const now = new Date();

  const document = await prisma.document.create({
    data: {
      title: (req.body?.title as string)?.trim() || req.file.originalname,
      type: DocumentType.OTHER,
      filePath: key,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      language: "en",
      uploadedBy: { connect: { id: req.user!.id } },
      workOrder: { connect: { id: workOrderId } },
      machine: { connect: { id: workOrder.machineId } },
      ingestionStatus: DocumentIngestionStatus.COMPLETE,
      ingestedAt: now,
      metadata: {
        source: "WORK_ORDER_ATTACHMENT",
      },
    },
    select: attachmentSelect,
  });

  return res.status(201).json({ data: document });
});

router.post("/:id/repair/:repairId/attachments", upload.single("file"), async (req, res) => {
  const { id: workOrderId, repairId } = req.params;

  if (!workOrderId || !repairId) {
    return res.status(400).json({ error: { message: "Work order id and repair id are required" } });
  }

  if (!req.file) {
    return res.status(400).json({ error: { message: "File is required" } });
  }

  const repairAction = await prisma.repairAction.findFirst({
    where: { id: repairId, workOrderId },
    select: {
      id: true,
      workOrder: {
        select: { machineId: true },
      },
    },
  });

  if (!repairAction) {
    return res.status(404).json({ error: { message: "Repair action not found" } });
  }

  const key = await saveDocumentToS3(req.file);
  const now = new Date();

  const document = await prisma.document.create({
    data: {
      title: (req.body?.title as string)?.trim() || req.file.originalname,
      type: DocumentType.OTHER,
      filePath: key,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      language: "en",
      uploadedBy: { connect: { id: req.user!.id } },
      workOrder: { connect: { id: workOrderId } },
      repairAction: { connect: { id: repairId } },
      ...(repairAction.workOrder?.machineId
        ? { machine: { connect: { id: repairAction.workOrder.machineId } } }
        : {}),
      ingestionStatus: DocumentIngestionStatus.COMPLETE,
      ingestedAt: now,
      metadata: {
        source: "REPAIR_ATTACHMENT",
      },
    },
    select: attachmentSelect,
  });

  return res.status(201).json({ data: document });
});

export default router;


