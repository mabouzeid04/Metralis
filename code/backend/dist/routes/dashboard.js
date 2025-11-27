"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.requireAuth);
router.get("/stats", async (_req, res) => {
    const [openWorkOrders, machinesDown, completedToday] = await Promise.all([
        prisma_1.prisma.workOrder.count({ where: { status: "OPEN" } }),
        prisma_1.prisma.machine.count({ where: { status: "DOWN" } }),
        prisma_1.prisma.workOrder.count({
            where: {
                status: "CLOSED",
                completedAt: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)),
                },
            },
        }),
    ]);
    return res.json({
        data: {
            openWorkOrders,
            machinesDown,
            completedToday,
        },
    });
});
router.get("/top-machines", async (_req, res) => {
    const machines = await prisma_1.prisma.machine.findMany({
        take: 5,
        orderBy: {
            workOrders: {
                _count: "desc",
            },
        },
        include: {
            _count: {
                select: { workOrders: true },
            },
        },
    });
    return res.json({ data: machines });
});
exports.default = router;
//# sourceMappingURL=dashboard.js.map