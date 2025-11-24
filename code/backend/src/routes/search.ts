import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
  const q = String(req.query.q || "").trim();

  if (!q) {
    return res.json({ data: { machines: [], workOrders: [], parts: [] } });
  }

  const [machines, workOrders, parts] = await Promise.all([
    prisma.machine.findMany({
      where: {
        OR: [{ name: { contains: q } }, { code: { contains: q } }],
      },
    }),
    prisma.workOrder.findMany({
      where: {
        OR: [{ title: { contains: q } }, { descriptionRaw: { contains: q } }],
      },
      include: { machine: true },
    }),
    prisma.part.findMany({
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

export default router;


