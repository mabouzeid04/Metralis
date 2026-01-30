"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const machineSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    code: zod_1.z.string().nullable().optional(),
    category: zod_1.z.string().nullable().optional(),
    line: zod_1.z.string().nullable().optional(),
    area: zod_1.z.string().nullable().optional(),
    manufacturer: zod_1.z.string().nullable().optional(),
    model: zod_1.z.string().nullable().optional(),
    serialNumber: zod_1.z.string().nullable().optional(),
    commissionedAt: zod_1.z.union([zod_1.z.string().datetime(), zod_1.z.null()]).optional().transform((val) => val === null ? undefined : val),
    status: zod_1.z.enum(["RUNNING", "DOWN", "MAINTENANCE", "RETIRED"]).optional(),
    criticality: zod_1.z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
});
router.use(auth_1.requireAuth);
router.get("/", async (req, res) => {
    const { status } = req.query;
    const where = {};
    if (status && typeof status === 'string') {
        where.status = status;
    }
    const machines = await prisma_1.prisma.machine.findMany({
        where,
        orderBy: { name: "asc" },
    });
    return res.json({ data: machines });
});
router.get("/:id", async (req, res) => {
    const machineId = req.params.id;
    if (!machineId) {
        return res.status(400).json({ error: { message: "Machine id is required" } });
    }
    const machine = await prisma_1.prisma.machine.findUnique({
        where: { id: machineId },
        include: {
            workOrders: {
                orderBy: { reportedAt: "desc" },
                take: 20,
                include: {
                    repairActions: {
                        orderBy: { createdAt: "desc" },
                        select: {
                            id: true,
                            actions: true,
                            success: true,
                            createdAt: true,
                        },
                    },
                },
            },
            documents: true,
        },
    });
    if (!machine) {
        return res.status(404).json({ error: { message: "Machine not found" } });
    }
    return res.json({ data: machine });
});
router.post("/", (0, auth_1.requireRole)(["ADMIN"]), async (req, res) => {
    const parsed = machineSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }
    const data = {
        name: parsed.data.name,
        code: parsed.data.code ?? null,
        category: parsed.data.category ?? null,
        line: parsed.data.line ?? null,
        area: parsed.data.area ?? null,
        manufacturer: parsed.data.manufacturer ?? null,
        model: parsed.data.model ?? null,
        serialNumber: parsed.data.serialNumber ?? null,
        commissionedAt: parsed.data.commissionedAt
            ? new Date(parsed.data.commissionedAt)
            : null,
        status: parsed.data.status ?? "RUNNING",
        criticality: parsed.data.criticality ?? "MEDIUM",
    };
    const machine = await prisma_1.prisma.machine.create({ data });
    return res.status(201).json({ data: machine });
});
router.patch("/:id", (0, auth_1.requireRole)(["ADMIN"]), async (req, res) => {
    const machineId = req.params.id;
    if (!machineId) {
        return res.status(400).json({ error: { message: "Machine id is required" } });
    }
    const parsed = machineSchema.partial().safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }
    const data = {};
    if (parsed.data.name !== undefined)
        data.name = parsed.data.name;
    if (parsed.data.code !== undefined)
        data.code = parsed.data.code;
    if (parsed.data.category !== undefined)
        data.category = parsed.data.category;
    if (parsed.data.line !== undefined)
        data.line = parsed.data.line;
    if (parsed.data.area !== undefined)
        data.area = parsed.data.area;
    if (parsed.data.manufacturer !== undefined)
        data.manufacturer = parsed.data.manufacturer;
    if (parsed.data.model !== undefined)
        data.model = parsed.data.model;
    if (parsed.data.serialNumber !== undefined)
        data.serialNumber = parsed.data.serialNumber;
    if (parsed.data.commissionedAt !== undefined) {
        data.commissionedAt = parsed.data.commissionedAt
            ? new Date(parsed.data.commissionedAt)
            : null;
    }
    if (parsed.data.status !== undefined)
        data.status = parsed.data.status;
    if (parsed.data.criticality !== undefined)
        data.criticality = parsed.data.criticality;
    try {
        const machine = await prisma_1.prisma.machine.update({
            where: { id: machineId },
            data,
        });
        return res.json({ data: machine });
    }
    catch {
        return res.status(404).json({ error: { message: "Machine not found" } });
    }
});
router.get("/:id/history", async (req, res) => {
    const machineId = req.params.id;
    if (!machineId) {
        return res.status(400).json({ error: { message: "Machine id is required" } });
    }
    const history = await prisma_1.prisma.workOrder.findMany({
        where: { machineId },
        orderBy: { reportedAt: "desc" },
        include: {
            repairActions: true,
        },
    });
    return res.json({ data: history });
});
router.delete("/:id", (0, auth_1.requireRole)(["ADMIN"]), async (req, res) => {
    const machineId = req.params.id;
    if (!machineId) {
        return res.status(400).json({ error: { message: "Machine id is required" } });
    }
    try {
        await prisma_1.prisma.machine.delete({
            where: { id: machineId },
        });
        return res.status(204).send();
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to delete machine";
        return res.status(400).json({ error: { message } });
    }
});
exports.default = router;
//# sourceMappingURL=machines.js.map