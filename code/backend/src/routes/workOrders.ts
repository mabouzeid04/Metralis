import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";
import type { Prisma, WorkOrderPriority, WorkOrderStatus, WorkOrderType } from "../generated/prisma/client";

const router = Router();

const workOrderSchema = z.object({
  machineId: z.string().uuid(),
  title: z.string().min(1),
  descriptionRaw: z.string().min(1),
  type: z.enum(["CORRECTIVE", "PREVENTIVE", "INSPECTION"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  symptoms: z.array(z.string()).optional(),
  assignedToId: z.string().uuid().nullable().optional(),
});

router.use(requireAuth);

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
        include: { performedBy: true },
      },
      parts: {
        include: { part: true },
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

  const workOrder = await prisma.workOrder.create({
    data,
    include: {
      machine: true,
      reportedBy: true,
      assignedTo: true,
    },
  });

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

  const data: Prisma.WorkOrderUpdateInput = {};
  if (parsed.data.assignedToId) {
    data.assignedTo = { connect: { id: parsed.data.assignedToId } };
  } else {
    data.assignedTo = { disconnect: true };
  }

  const workOrder = await prisma.workOrder.update({
    where: { id: req.params.id },
    data,
  });

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

export default router;


