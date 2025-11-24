import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.use(requireAuth);

router.get("/stats", async (_req, res) => {
  const [openWorkOrders, machinesDown, completedToday] = await Promise.all([
    prisma.workOrder.count({ where: { status: "OPEN" } }),
    prisma.machine.count({ where: { status: "DOWN" } }),
    prisma.workOrder.count({
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
  const machines = await prisma.machine.findMany({
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

export default router;


