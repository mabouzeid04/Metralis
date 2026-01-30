"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const partSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    category: zod_1.z.string().optional(),
    partNumber: zod_1.z.string().optional(),
    manufacturer: zod_1.z.string().optional(),
    cost: zod_1.z.number().optional(),
    description: zod_1.z.string().optional(),
    stockQty: zod_1.z.number().int().optional(),
    minStock: zod_1.z.number().int().optional(),
    location: zod_1.z.string().optional(),
});
router.use(auth_1.requireAuth);
router.get("/", async (_req, res) => {
    const parts = await prisma_1.prisma.part.findMany({
        orderBy: { name: "asc" },
    });
    return res.json({ data: parts });
});
router.get("/:id", async (req, res) => {
    const part = await prisma_1.prisma.part.findUnique({
        where: { id: req.params.id },
        include: {
            workOrders: {
                include: { workOrder: true },
            },
        },
    });
    if (!part) {
        return res.status(404).json({ error: { message: "Part not found" } });
    }
    return res.json({ data: part });
});
router.post("/", async (req, res) => {
    const parsed = partSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }
    const data = {
        name: parsed.data.name,
        category: parsed.data.category ?? null,
        partNumber: parsed.data.partNumber ?? null,
        manufacturer: parsed.data.manufacturer ?? null,
        cost: parsed.data.cost ?? null,
        description: parsed.data.description ?? null,
        stockQty: parsed.data.stockQty ?? 0,
        minStock: parsed.data.minStock ?? 0,
        location: parsed.data.location ?? null,
    };
    const part = await prisma_1.prisma.part.create({ data });
    return res.status(201).json({ data: part });
});
router.patch("/:id", async (req, res) => {
    const parsed = partSchema.partial().safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }
    const data = {};
    if (parsed.data.name !== undefined)
        data.name = parsed.data.name;
    if (parsed.data.category !== undefined)
        data.category = parsed.data.category;
    if (parsed.data.partNumber !== undefined)
        data.partNumber = parsed.data.partNumber;
    if (parsed.data.manufacturer !== undefined)
        data.manufacturer = parsed.data.manufacturer;
    if (parsed.data.cost !== undefined)
        data.cost = parsed.data.cost;
    if (parsed.data.description !== undefined)
        data.description = parsed.data.description;
    if (parsed.data.stockQty !== undefined)
        data.stockQty = parsed.data.stockQty;
    if (parsed.data.minStock !== undefined)
        data.minStock = parsed.data.minStock;
    if (parsed.data.location !== undefined)
        data.location = parsed.data.location;
    try {
        const part = await prisma_1.prisma.part.update({
            where: { id: req.params.id },
            data,
        });
        return res.json({ data: part });
    }
    catch {
        return res.status(404).json({ error: { message: "Part not found" } });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        await prisma_1.prisma.part.delete({
            where: { id: req.params.id },
        });
        return res.status(204).send();
    }
    catch {
        return res.status(404).json({ error: { message: "Part not found" } });
    }
});
exports.default = router;
//# sourceMappingURL=parts.js.map