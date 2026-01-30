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
    // Asset/Machine reference
    assetId: zod_1.z.string().uuid().optional(),
    machineId: zod_1.z.string().uuid().optional(),
    // Basic info
    title: zod_1.z.string().min(1),
    descriptionRaw: zod_1.z.string().min(1),
    priority: zod_1.z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
    // Legacy type enum (kept for backward compatibility)
    type: zod_1.z.enum(["CORRECTIVE", "PREVENTIVE", "INSPECTION"]).optional(),
    // Config-driven classification (Spec 2)
    maintenanceType: zod_1.z.string().optional().nullable(),
    maintenanceDisciplines: zod_1.z.array(zod_1.z.string()).optional(),
    // Timestamps
    equipmentStopTime: zod_1.z.coerce.date().optional().nullable(),
    faultReportTime: zod_1.z.coerce.date().optional().nullable(),
    repairStartTime: zod_1.z.coerce.date().optional().nullable(),
    maintenanceStartTime: zod_1.z.coerce.date().optional().nullable(),
    maintenanceEndTime: zod_1.z.coerce.date().optional().nullable(),
    // Diagnostic fields
    symptoms: zod_1.z.array(zod_1.z.string()).optional(),
    suspectedCause: zod_1.z.string().optional().nullable(),
    rootCause: zod_1.z.string().optional().nullable(),
    failureMode: zod_1.z.string().optional().nullable(),
    // Work description (Spec 2)
    maintenanceDescription: zod_1.z.string().optional().nullable(),
    correctiveAction: zod_1.z.string().optional().nullable(),
    notesAndRecommendations: zod_1.z.string().optional().nullable(),
    // Equipment status after repair
    equipmentStatusAfter: zod_1.z.string().optional().nullable(),
    // Role-based assignments (Spec 2)
    areaLeaderId: zod_1.z.string().uuid().optional().nullable(),
    maintenanceSupervisorId: zod_1.z.string().uuid().optional().nullable(),
    performerId: zod_1.z.string().uuid().optional().nullable(),
    machineReceiverId: zod_1.z.string().uuid().optional().nullable(),
    responsibleEngineerId: zod_1.z.string().uuid().optional().nullable(),
    maintenanceEngineerId: zod_1.z.string().uuid().optional().nullable(),
    maintenanceManagerId: zod_1.z.string().uuid().optional().nullable(),
    // Legacy assignment
    assignedToId: zod_1.z.string().uuid().optional().nullable(),
});
const workOrderListQuerySchema = zod_1.z.object({
    // Existing filters
    status: zod_1.z.enum(["OPEN", "IN_PROGRESS", "WAITING", "CLOSED"]).optional(),
    priority: zod_1.z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
    type: zod_1.z.enum(["CORRECTIVE", "PREVENTIVE", "INSPECTION"]).optional(),
    machineId: zod_1.z.string().uuid().optional(),
    assignedToId: zod_1.z.string().uuid().optional(),
    q: zod_1.z.string().trim().optional(),
    // New filters (Spec 2)
    assetId: zod_1.z.string().uuid().optional(),
    maintenanceType: zod_1.z.string().optional(),
    maintenanceDiscipline: zod_1.z.string().optional(),
    performerId: zod_1.z.string().uuid().optional(),
    // Date filters
    reportedFrom: zod_1.z.coerce.date().optional(),
    reportedTo: zod_1.z.coerce.date().optional(),
    startedFrom: zod_1.z.coerce.date().optional(),
    startedTo: zod_1.z.coerce.date().optional(),
    completedFrom: zod_1.z.coerce.date().optional(),
    completedTo: zod_1.z.coerce.date().optional(),
    // Pagination
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
    const { status: statusFilter, priority: priorityFilter, type: typeFilter, machineId: machineIdFilter, assignedToId, q, 
    // New filters (Spec 2)
    assetId: assetIdFilter, maintenanceType: maintenanceTypeFilter, maintenanceDiscipline: maintenanceDisciplineFilter, performerId: performerIdFilter, 
    // Date filters
    reportedFrom, reportedTo, startedFrom, startedTo, completedFrom, completedTo, take: takeParam, skip: skipParam, } = parsed.data;
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
    // New filters (Spec 2)
    if (assetIdFilter) {
        where.assetId = assetIdFilter;
    }
    if (maintenanceTypeFilter) {
        where.maintenanceType = maintenanceTypeFilter;
    }
    if (maintenanceDisciplineFilter) {
        where.maintenanceDisciplines = { has: maintenanceDisciplineFilter };
    }
    if (performerIdFilter) {
        where.performerId = performerIdFilter;
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
            asset: { select: { id: true, name: true, pathString: true } },
            assignedTo: { select: { id: true, name: true } },
            performer: { select: { id: true, name: true } },
        },
    });
    const total = await prisma_1.prisma.workOrder.count({ where });
    return res.json({ data: workOrders, meta: { total, take, skip } });
});
// User select for role relations
const userSelect = { id: true, name: true, email: true };
router.get("/:id", async (req, res) => {
    const workOrder = await prisma_1.prisma.workOrder.findUnique({
        where: { id: req.params.id },
        include: {
            machine: true,
            asset: { select: { id: true, name: true, pathString: true, code: true, levelType: true } },
            reportedBy: { select: userSelect },
            assignedTo: { select: userSelect },
            // Role-based relations (Spec 2)
            areaLeader: { select: userSelect },
            maintenanceSupervisor: { select: userSelect },
            performer: { select: userSelect },
            machineReceiver: { select: userSelect },
            responsibleEngineer: { select: userSelect },
            maintenanceEngineer: { select: userSelect },
            maintenanceManager: { select: userSelect },
            // Repair actions
            repairActions: {
                orderBy: { createdAt: "desc" },
                include: {
                    performedBy: { select: userSelect },
                    attachments: {
                        orderBy: { createdAt: "desc" },
                        include: {
                            uploadedBy: { select: { id: true, name: true } },
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
                    uploadedBy: { select: { id: true, name: true } },
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
        // Basic info
        title: parsed.data.title,
        descriptionRaw: parsed.data.descriptionRaw,
        type: parsed.data.type ?? "CORRECTIVE",
        priority: parsed.data.priority ?? "MEDIUM",
        symptoms: parsed.data.symptoms ?? [],
        // Config-driven classification (Spec 2)
        maintenanceType: parsed.data.maintenanceType ?? null,
        maintenanceDisciplines: parsed.data.maintenanceDisciplines ?? [],
        // Timestamps - auto-set faultReportTime on create
        faultReportTime: parsed.data.faultReportTime ?? new Date(),
        equipmentStopTime: parsed.data.equipmentStopTime ?? null,
        repairStartTime: parsed.data.repairStartTime ?? null,
        maintenanceStartTime: parsed.data.maintenanceStartTime ?? null,
        maintenanceEndTime: parsed.data.maintenanceEndTime ?? null,
        // Diagnostic fields
        suspectedCause: parsed.data.suspectedCause ?? null,
        rootCause: parsed.data.rootCause ?? null,
        failureMode: parsed.data.failureMode ?? null,
        // Work description (Spec 2)
        maintenanceDescription: parsed.data.maintenanceDescription ?? null,
        correctiveAction: parsed.data.correctiveAction ?? null,
        notesAndRecommendations: parsed.data.notesAndRecommendations ?? null,
        // Equipment status after
        equipmentStatusAfter: parsed.data.equipmentStatusAfter ?? null,
        // Reporter
        reportedBy: { connect: { id: req.user.id } },
    };
    // Connect machine if provided (backward compatibility)
    if (parsed.data.machineId) {
        data.machine = { connect: { id: parsed.data.machineId } };
    }
    // Connect asset if provided
    if (parsed.data.assetId) {
        data.asset = { connect: { id: parsed.data.assetId } };
    }
    // Handle assignment if provided
    if (parsed.data.assignedToId) {
        data.assignedTo = { connect: { id: parsed.data.assignedToId } };
    }
    // Handle role-based assignments (Spec 2)
    if (parsed.data.areaLeaderId) {
        data.areaLeader = { connect: { id: parsed.data.areaLeaderId } };
    }
    if (parsed.data.maintenanceSupervisorId) {
        data.maintenanceSupervisor = { connect: { id: parsed.data.maintenanceSupervisorId } };
    }
    if (parsed.data.performerId) {
        data.performer = { connect: { id: parsed.data.performerId } };
    }
    if (parsed.data.machineReceiverId) {
        data.machineReceiver = { connect: { id: parsed.data.machineReceiverId } };
    }
    if (parsed.data.responsibleEngineerId) {
        data.responsibleEngineer = { connect: { id: parsed.data.responsibleEngineerId } };
    }
    if (parsed.data.maintenanceEngineerId) {
        data.maintenanceEngineer = { connect: { id: parsed.data.maintenanceEngineerId } };
    }
    if (parsed.data.maintenanceManagerId) {
        data.maintenanceManager = { connect: { id: parsed.data.maintenanceManagerId } };
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
    // Basic info
    if (parsed.data.title !== undefined)
        data.title = parsed.data.title;
    if (parsed.data.descriptionRaw !== undefined)
        data.descriptionRaw = parsed.data.descriptionRaw;
    if (parsed.data.type !== undefined)
        data.type = parsed.data.type;
    if (parsed.data.priority !== undefined)
        data.priority = parsed.data.priority;
    if (parsed.data.symptoms !== undefined)
        data.symptoms = parsed.data.symptoms;
    // Machine/Asset references
    if (parsed.data.machineId !== undefined) {
        data.machine = parsed.data.machineId ? { connect: { id: parsed.data.machineId } } : { disconnect: true };
    }
    if (parsed.data.assetId !== undefined) {
        data.asset = parsed.data.assetId ? { connect: { id: parsed.data.assetId } } : { disconnect: true };
    }
    // Config-driven classification (Spec 2)
    if (parsed.data.maintenanceType !== undefined)
        data.maintenanceType = parsed.data.maintenanceType;
    if (parsed.data.maintenanceDisciplines !== undefined)
        data.maintenanceDisciplines = parsed.data.maintenanceDisciplines;
    // Timestamps
    if (parsed.data.equipmentStopTime !== undefined)
        data.equipmentStopTime = parsed.data.equipmentStopTime;
    if (parsed.data.faultReportTime !== undefined)
        data.faultReportTime = parsed.data.faultReportTime;
    if (parsed.data.repairStartTime !== undefined)
        data.repairStartTime = parsed.data.repairStartTime;
    if (parsed.data.maintenanceStartTime !== undefined)
        data.maintenanceStartTime = parsed.data.maintenanceStartTime;
    if (parsed.data.maintenanceEndTime !== undefined)
        data.maintenanceEndTime = parsed.data.maintenanceEndTime;
    // Diagnostic fields
    if (parsed.data.suspectedCause !== undefined)
        data.suspectedCause = parsed.data.suspectedCause;
    if (parsed.data.rootCause !== undefined)
        data.rootCause = parsed.data.rootCause;
    if (parsed.data.failureMode !== undefined)
        data.failureMode = parsed.data.failureMode;
    // Work description (Spec 2)
    if (parsed.data.maintenanceDescription !== undefined)
        data.maintenanceDescription = parsed.data.maintenanceDescription;
    if (parsed.data.correctiveAction !== undefined)
        data.correctiveAction = parsed.data.correctiveAction;
    if (parsed.data.notesAndRecommendations !== undefined)
        data.notesAndRecommendations = parsed.data.notesAndRecommendations;
    // Equipment status after
    if (parsed.data.equipmentStatusAfter !== undefined)
        data.equipmentStatusAfter = parsed.data.equipmentStatusAfter;
    // Role-based assignments (Spec 2) - handle connect/disconnect
    if (parsed.data.areaLeaderId !== undefined) {
        data.areaLeader = parsed.data.areaLeaderId ? { connect: { id: parsed.data.areaLeaderId } } : { disconnect: true };
    }
    if (parsed.data.maintenanceSupervisorId !== undefined) {
        data.maintenanceSupervisor = parsed.data.maintenanceSupervisorId ? { connect: { id: parsed.data.maintenanceSupervisorId } } : { disconnect: true };
    }
    if (parsed.data.performerId !== undefined) {
        data.performer = parsed.data.performerId ? { connect: { id: parsed.data.performerId } } : { disconnect: true };
    }
    if (parsed.data.machineReceiverId !== undefined) {
        data.machineReceiver = parsed.data.machineReceiverId ? { connect: { id: parsed.data.machineReceiverId } } : { disconnect: true };
    }
    if (parsed.data.responsibleEngineerId !== undefined) {
        data.responsibleEngineer = parsed.data.responsibleEngineerId ? { connect: { id: parsed.data.responsibleEngineerId } } : { disconnect: true };
    }
    if (parsed.data.maintenanceEngineerId !== undefined) {
        data.maintenanceEngineer = parsed.data.maintenanceEngineerId ? { connect: { id: parsed.data.maintenanceEngineerId } } : { disconnect: true };
    }
    if (parsed.data.maintenanceManagerId !== undefined) {
        data.maintenanceManager = parsed.data.maintenanceManagerId ? { connect: { id: parsed.data.maintenanceManagerId } } : { disconnect: true };
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
    // Get current work order to check current status and timestamps
    const currentWorkOrder = await prisma_1.prisma.workOrder.findUnique({
        where: { id: req.params.id },
        select: {
            status: true,
            startedAt: true,
            completedAt: true,
            repairStartTime: true,
            maintenanceStartTime: true,
            maintenanceEndTime: true,
            equipmentStopTime: true,
        },
    });
    if (!currentWorkOrder) {
        return res.status(404).json({ error: { message: "Work order not found" } });
    }
    const newStatus = parsed.data.status;
    const now = new Date();
    const updateData = { status: newStatus };
    // Set startedAt when moving to IN_PROGRESS (if not already set)
    if (newStatus === "IN_PROGRESS" && !currentWorkOrder.startedAt) {
        updateData.startedAt = now;
    }
    // Auto-capture repairStartTime when moving to IN_PROGRESS (Spec 2)
    if (newStatus === "IN_PROGRESS" && !currentWorkOrder.repairStartTime) {
        updateData.repairStartTime = now;
    }
    // Set completedAt and calculate durations when moving to CLOSED
    if (newStatus === "CLOSED") {
        updateData.completedAt = now;
        // Auto-capture maintenanceEndTime if not already set (Spec 2)
        const maintenanceEndTime = currentWorkOrder.maintenanceEndTime ?? now;
        if (!currentWorkOrder.maintenanceEndTime) {
            updateData.maintenanceEndTime = now;
        }
        // Calculate maintenance duration (minutes) - Spec 2
        if (currentWorkOrder.maintenanceStartTime) {
            const durationMs = maintenanceEndTime.getTime() - currentWorkOrder.maintenanceStartTime.getTime();
            updateData.maintenanceDurationMin = Math.round(durationMs / 60000);
        }
        // Calculate downtime duration (minutes) - Spec 2
        if (currentWorkOrder.equipmentStopTime) {
            const downtimeMs = maintenanceEndTime.getTime() - currentWorkOrder.equipmentStopTime.getTime();
            updateData.downtimeDurationMin = Math.round(downtimeMs / 60000);
        }
    }
    else if (currentWorkOrder.status === "CLOSED") {
        // Clear completedAt and durations if moving away from CLOSED
        updateData.completedAt = null;
        updateData.maintenanceDurationMin = null;
        updateData.downtimeDurationMin = null;
    }
    const workOrder = await prisma_1.prisma.workOrder.update({
        where: { id: req.params.id },
        data: updateData,
        include: {
            machine: true,
            asset: { select: { id: true, name: true, pathString: true } },
            reportedBy: { select: userSelect },
            assignedTo: { select: userSelect },
            performer: { select: userSelect },
            repairActions: {
                include: { performedBy: { select: userSelect } },
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
            // Machine is now optional
            ...(workOrder.machineId ? { machine: { connect: { id: workOrder.machineId } } } : {}),
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
router.delete("/:id", async (req, res) => {
    const workOrderId = req.params.id;
    const workOrder = await prisma_1.prisma.workOrder.findUnique({
        where: { id: workOrderId },
        select: { id: true },
    });
    if (!workOrder) {
        return res.status(404).json({ error: { message: "Work order not found" } });
    }
    await prisma_1.prisma.workOrder.delete({
        where: { id: workOrderId },
    });
    return res.status(200).json({ message: "Work order deleted successfully" });
});
exports.default = router;
//# sourceMappingURL=workOrders.js.map