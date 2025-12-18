"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const crypto_1 = __importDefault(require("crypto"));
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const client_1 = require("../generated/prisma/client");
const storage_1 = require("../services/storage");
const whatsapp_1 = require("../services/notifications/whatsapp");
const incidentIngestion_1 = require("../services/incidentIngestion");
const router = (0, express_1.Router)();
const workOrderSchema = zod_1.z.object({
    machineId: zod_1.z.string(),
    title: zod_1.z.string().min(1),
    descriptionRaw: zod_1.z.string().min(1),
    type: zod_1.z.enum(["CORRECTIVE", "PREVENTIVE", "INSPECTION"]).optional(),
    priority: zod_1.z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
    symptoms: zod_1.z.array(zod_1.z.string()).optional(),
    assignedToId: zod_1.z.string().uuid().nullable().optional(),
});
const workOrderListQuerySchema = zod_1.z.object({
    status: zod_1.z.enum(["OPEN", "IN_PROGRESS", "WAITING", "CLOSED"]).optional(),
    priority: zod_1.z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
    type: zod_1.z.enum(["CORRECTIVE", "PREVENTIVE", "INSPECTION"]).optional(),
    machineId: zod_1.z.string().uuid().optional(),
    assignedToId: zod_1.z.string().uuid().optional(),
    q: zod_1.z.string().trim().optional(),
    reportedFrom: zod_1.z.coerce.date().optional(),
    reportedTo: zod_1.z.coerce.date().optional(),
    startedFrom: zod_1.z.coerce.date().optional(),
    startedTo: zod_1.z.coerce.date().optional(),
    completedFrom: zod_1.z.coerce.date().optional(),
    completedTo: zod_1.z.coerce.date().optional(),
    take: zod_1.z.coerce.number().int().positive().max(200).optional(),
    skip: zod_1.z.coerce.number().int().min(0).optional(),
});
router.use(auth_1.requireAuth);
const generateWorkOrderPublicId = () => crypto_1.default.randomBytes(4).toString("hex").toUpperCase();
const createWorkOrderWithShortId = async (data) => {
    let attempts = 0;
    while (attempts < 5) {
        const publicId = generateWorkOrderPublicId();
        try {
            return await prisma_1.prisma.workOrder.create({
                data: { ...data, publicId },
                include: {
                    machine: true,
                    reportedBy: true,
                    assignedTo: true,
                },
            });
        }
        catch (err) {
            const isUniqueViolation = err instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                err.code === "P2002" &&
                Array.isArray(err.meta?.target) &&
                (err.meta?.target).includes("publicId");
            if (!isUniqueViolation) {
                throw err;
            }
            attempts += 1;
        }
    }
    throw new Error("Failed to generate unique work order id after multiple attempts");
};
const notifyAssigneeOfWhatsapp = async (workOrder) => {
    if (!workOrder.assignedTo?.assignmentWhatsappOptIn)
        return;
    if (!workOrder.assignedTo.phoneNumber)
        return;
    const result = await (0, whatsapp_1.sendWorkOrderAssignmentWhatsapp)({
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
    const where = {};
    const parsed = workOrderListQuerySchema.safeParse(req.query);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }
    const { status: statusFilter, priority: priorityFilter, type: typeFilter, machineId: machineIdFilter, assignedToId, q, reportedFrom, reportedTo, startedFrom, startedTo, completedFrom, completedTo, take: takeParam, skip: skipParam, } = parsed.data;
    if (statusFilter) {
        where.status = statusFilter;
    }
    if (priorityFilter) {
        where.priority = priorityFilter;
    }
    if (typeFilter) {
        where.type = typeFilter;
    }
    if (machineIdFilter) {
        where.machineId = { equals: machineIdFilter };
    }
    if (assignedToId) {
        where.assignedToId = assignedToId;
    }
    if (q) {
        const term = q.trim();
        if (term) {
            // Note: descriptionRaw removed from search for performance
            // Use title and publicId for quick list searches
            where.OR = [
                { title: { contains: term, mode: "insensitive" } },
                { publicId: { contains: term, mode: "insensitive" } },
            ];
        }
    }
    if (reportedFrom || reportedTo) {
        where.reportedAt = {
            ...(reportedFrom ? { gte: reportedFrom } : {}),
            ...(reportedTo ? { lte: reportedTo } : {}),
        };
    }
    if (startedFrom || startedTo) {
        where.startedAt = {
            ...(startedFrom ? { gte: startedFrom } : {}),
            ...(startedTo ? { lte: startedTo } : {}),
        };
    }
    if (completedFrom || completedTo) {
        where.completedAt = {
            ...(completedFrom ? { gte: completedFrom } : {}),
            ...(completedTo ? { lte: completedTo } : {}),
        };
    }
    const take = takeParam ?? 50;
    const skip = skipParam ?? 0;
    const workOrders = await prisma_1.prisma.workOrder.findMany({
        where,
        orderBy: { reportedAt: "desc" },
        take,
        skip,
        include: {
            machine: { select: { id: true, name: true } },
            assignedTo: { select: { id: true, name: true } },
        },
    });
    const total = await prisma_1.prisma.workOrder.count({ where });
    return res.json({ data: workOrders, meta: { total, take, skip } });
});
router.get("/:id", async (req, res) => {
    const workOrder = await prisma_1.prisma.workOrder.findUnique({
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
    const data = {
        title: parsed.data.title,
        descriptionRaw: parsed.data.descriptionRaw,
        type: parsed.data.type ?? "CORRECTIVE",
        priority: parsed.data.priority ?? "MEDIUM",
        symptoms: parsed.data.symptoms ?? [],
        machine: { connect: { id: parsed.data.machineId } },
        reportedBy: { connect: { id: req.user.id } },
    };
    // Handle assignment if provided
    if (parsed.data.assignedToId !== undefined && parsed.data.assignedToId !== null) {
        data.assignedTo = { connect: { id: parsed.data.assignedToId } };
    }
    const workOrder = await createWorkOrderWithShortId(data);
    if (workOrder.assignedTo) {
        void notifyAssigneeOfWhatsapp(workOrder);
    }
    void (0, incidentIngestion_1.upsertIncidentChunksForWorkOrder)(workOrder.id).catch((error) => {
        console.error("Failed to ingest incident embeddings for new work order", { workOrderId: workOrder.id, error });
    });
    return res.status(201).json({ data: workOrder });
});
router.patch("/:id", async (req, res) => {
    const parsed = workOrderSchema.partial().safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }
    const data = {};
    if (parsed.data.machineId !== undefined) {
        data.machine = { connect: { id: parsed.data.machineId } };
    }
    if (parsed.data.title !== undefined)
        data.title = parsed.data.title;
    if (parsed.data.descriptionRaw !== undefined)
        data.descriptionRaw = parsed.data.descriptionRaw;
    if (parsed.data.type !== undefined)
        data.type = parsed.data.type;
    if (parsed.data.priority !== undefined)
        data.priority = parsed.data.priority;
    if (parsed.data.symptoms !== undefined) {
        data.symptoms = parsed.data.symptoms;
    }
    try {
        const workOrder = await prisma_1.prisma.workOrder.update({
            where: { id: req.params.id },
            data,
        });
        void (0, incidentIngestion_1.upsertIncidentChunksForWorkOrder)(workOrder.id).catch((error) => {
            console.error("Failed to ingest incident embeddings after work order update", { workOrderId: workOrder.id, error });
        });
        return res.json({ data: workOrder });
    }
    catch {
        return res.status(404).json({ error: { message: "Work order not found" } });
    }
});
router.patch("/:id/status", async (req, res) => {
    const statusSchema = zod_1.z.object({
        status: zod_1.z.enum(["OPEN", "IN_PROGRESS", "WAITING", "CLOSED"]),
    });
    const parsed = statusSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }
    // Get current work order to check current status
    const currentWorkOrder = await prisma_1.prisma.workOrder.findUnique({
        where: { id: req.params.id },
        select: { status: true, startedAt: true, completedAt: true },
    });
    if (!currentWorkOrder) {
        return res.status(404).json({ error: { message: "Work order not found" } });
    }
    const newStatus = parsed.data.status;
    const updateData = { status: newStatus };
    // Set startedAt when moving to IN_PROGRESS (if not already set)
    if (newStatus === "IN_PROGRESS" && !currentWorkOrder.startedAt) {
        updateData.startedAt = new Date();
    }
    // Set completedAt when moving to CLOSED
    if (newStatus === "CLOSED") {
        updateData.completedAt = new Date();
    }
    else if (currentWorkOrder.status === "CLOSED") {
        // Clear completedAt if moving away from CLOSED
        updateData.completedAt = null;
    }
    const workOrder = await prisma_1.prisma.workOrder.update({
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
    const assignSchema = zod_1.z.object({
        assignedToId: zod_1.z.string().uuid().nullable(),
    });
    const parsed = assignSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }
    const current = await prisma_1.prisma.workOrder.findUnique({
        where: { id: req.params.id },
        select: { assignedToId: true },
    });
    if (!current) {
        return res.status(404).json({ error: { message: "Work order not found" } });
    }
    const data = {};
    if (parsed.data.assignedToId) {
        data.assignedTo = { connect: { id: parsed.data.assignedToId } };
    }
    else {
        data.assignedTo = { disconnect: true };
    }
    const isNewAssignment = parsed.data.assignedToId !== null &&
        parsed.data.assignedToId !== undefined &&
        parsed.data.assignedToId !== current.assignedToId;
    const workOrder = await prisma_1.prisma.workOrder.update({
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
    const repairSchema = zod_1.z.object({
        actions: zod_1.z.string().min(1),
        partsUsed: zod_1.z.array(zod_1.z.object({ partId: zod_1.z.string().uuid(), quantity: zod_1.z.number().min(1) })).optional(),
        adjustments: zod_1.z.string().optional(),
        verification: zod_1.z.string().optional(),
        success: zod_1.z.boolean(),
        failureNote: zod_1.z.string().optional(),
        rootCause: zod_1.z.string().max(500).optional(),
    });
    const parsed = repairSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }
    const repair = await prisma_1.prisma.repairAction.create({
        data: {
            workOrder: { connect: { id: req.params.id } },
            performedBy: { connect: { id: req.user.id } },
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
        await Promise.all(parsed.data.partsUsed.map((p) => prisma_1.prisma.workOrderPart.upsert({
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
        })));
    }
    void (0, incidentIngestion_1.upsertIncidentChunksForWorkOrder)(req.params.id).catch((error) => {
        console.error("Failed to ingest incident embeddings after repair creation", { workOrderId: req.params.id, error });
    });
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
};
router.post("/:id/attachments", storage_1.upload.single("file"), async (req, res) => {
    const workOrderId = req.params.id;
    if (!workOrderId) {
        return res.status(400).json({ error: { message: "Work order id is required" } });
    }
    if (!req.file) {
        return res.status(400).json({ error: { message: "File is required" } });
    }
    const workOrder = await prisma_1.prisma.workOrder.findUnique({
        where: { id: workOrderId },
        select: { id: true, machineId: true },
    });
    if (!workOrder) {
        return res.status(404).json({ error: { message: "Work order not found" } });
    }
    const key = await (0, storage_1.saveDocumentToS3)(req.file);
    const now = new Date();
    const document = await prisma_1.prisma.document.create({
        data: {
            title: req.body?.title?.trim() || req.file.originalname,
            type: client_1.DocumentType.OTHER,
            filePath: key,
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
            language: "en",
            uploadedBy: { connect: { id: req.user.id } },
            workOrder: { connect: { id: workOrderId } },
            machine: { connect: { id: workOrder.machineId } },
            ingestionStatus: client_1.DocumentIngestionStatus.COMPLETE,
            ingestedAt: now,
            metadata: {
                source: "WORK_ORDER_ATTACHMENT",
            },
        },
        select: attachmentSelect,
    });
    return res.status(201).json({ data: document });
});
router.post("/:id/repair/:repairId/attachments", storage_1.upload.single("file"), async (req, res) => {
    const { id: workOrderId, repairId } = req.params;
    if (!workOrderId || !repairId) {
        return res.status(400).json({ error: { message: "Work order id and repair id are required" } });
    }
    if (!req.file) {
        return res.status(400).json({ error: { message: "File is required" } });
    }
    const repairAction = await prisma_1.prisma.repairAction.findFirst({
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
    const key = await (0, storage_1.saveDocumentToS3)(req.file);
    const now = new Date();
    const document = await prisma_1.prisma.document.create({
        data: {
            title: req.body?.title?.trim() || req.file.originalname,
            type: client_1.DocumentType.OTHER,
            filePath: key,
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
            language: "en",
            uploadedBy: { connect: { id: req.user.id } },
            workOrder: { connect: { id: workOrderId } },
            repairAction: { connect: { id: repairId } },
            ...(repairAction.workOrder?.machineId
                ? { machine: { connect: { id: repairAction.workOrder.machineId } } }
                : {}),
            ingestionStatus: client_1.DocumentIngestionStatus.COMPLETE,
            ingestedAt: now,
            metadata: {
                source: "REPAIR_ATTACHMENT",
            },
        },
        select: attachmentSelect,
    });
    return res.status(201).json({ data: document });
});
exports.default = router;
//# sourceMappingURL=workOrders.js.map