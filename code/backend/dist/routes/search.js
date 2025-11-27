"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.requireAuth);
router.get("/", async (req, res) => {
    const q = String(req.query.q || "").trim();
    if (!q) {
        return res.json({ data: { machines: [], workOrders: [], parts: [] } });
    }
    const [machines, workOrders, parts] = await Promise.all([
        prisma_1.prisma.machine.findMany({
            where: {
                OR: [{ name: { contains: q } }, { code: { contains: q } }],
            },
        }),
        prisma_1.prisma.workOrder.findMany({
            where: {
                OR: [{ title: { contains: q } }, { descriptionRaw: { contains: q } }],
            },
            include: { machine: true },
        }),
        prisma_1.prisma.part.findMany({
            where: {
                OR: [{ name: { contains: q } }, { partNumber: { contains: q } }],
            },
        }),
    ]);
    return res.json({
        data: {
            machines,
            workOrders,
            parts,
        },
    });
});
exports.default = router;
//# sourceMappingURL=search.js.map