import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth, requireRole } from "../middleware/auth";
import type { Prisma } from "../generated/prisma/client";

const router = Router();

const machineSchema = z.object({
  name: z.string().min(1),
  code: z.string().optional(),
  category: z.string().optional(),
  line: z.string().optional(),
  area: z.string().optional(),
  manufacturer: z.string().optional(),
  model: z.string().optional(),
  serialNumber: z.string().optional(),
  commissionedAt: z.string().datetime().optional(),
  status: z.enum(["RUNNING", "DOWN", "MAINTENANCE", "RETIRED"]).optional(),
  criticality: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
});

router.use(requireAuth);

router.get("/", async (_req, res) => {
  const machines = await prisma.machine.findMany({
    orderBy: { name: "asc" },
  });
  return res.json({ data: machines });
});

router.get("/:id", async (req, res) => {
  const machineId = req.params.id;
  if (!machineId) {
    return res.status(400).json({ error: { message: "Machine id is required" } });
  }

  const machine = await prisma.machine.findUnique({
    where: { id: machineId },
    include: {
      workOrders: {
        orderBy: { reportedAt: "desc" },
        take: 20,
      },
      documents: true,
    },
  });

  if (!machine) {
    return res.status(404).json({ error: { message: "Machine not found" } });
  }

  return res.json({ data: machine });
});

router.post("/", requireRole(["ADMIN"]), async (req, res) => {
  const parsed = machineSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const data: Prisma.MachineCreateInput = {
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

  const machine = await prisma.machine.create({ data });

  return res.status(201).json({ data: machine });
});

router.patch("/:id", requireRole(["ADMIN"]), async (req, res) => {
  const machineId = req.params.id;
  if (!machineId) {
    return res.status(400).json({ error: { message: "Machine id is required" } });
  }

  const parsed = machineSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const data: Prisma.MachineUpdateInput = {};

  if (parsed.data.name !== undefined) data.name = parsed.data.name;
  if (parsed.data.code !== undefined) data.code = parsed.data.code;
  if (parsed.data.category !== undefined) data.category = parsed.data.category;
  if (parsed.data.line !== undefined) data.line = parsed.data.line;
  if (parsed.data.area !== undefined) data.area = parsed.data.area;
  if (parsed.data.manufacturer !== undefined) data.manufacturer = parsed.data.manufacturer;
  if (parsed.data.model !== undefined) data.model = parsed.data.model;
  if (parsed.data.serialNumber !== undefined) data.serialNumber = parsed.data.serialNumber;
  if (parsed.data.commissionedAt !== undefined) {
    data.commissionedAt = parsed.data.commissionedAt
      ? new Date(parsed.data.commissionedAt)
      : null;
  }
  if (parsed.data.status !== undefined) data.status = parsed.data.status;
  if (parsed.data.criticality !== undefined) data.criticality = parsed.data.criticality;

  try {
    const machine = await prisma.machine.update({
      where: { id: machineId },
      data,
    });
    return res.json({ data: machine });
  } catch {
    return res.status(404).json({ error: { message: "Machine not found" } });
  }
});

router.get("/:id/history", async (req, res) => {
  const machineId = req.params.id;
  if (!machineId) {
    return res.status(400).json({ error: { message: "Machine id is required" } });
  }

  const history = await prisma.workOrder.findMany({
    where: { machineId },
    orderBy: { reportedAt: "desc" },
    include: {
      repairActions: true,
    },
  });

  return res.json({ data: history });
});

router.delete("/:id", requireRole(["ADMIN"]), async (req, res) => {
  const machineId = req.params.id;
  if (!machineId) {
    return res.status(400).json({ error: { message: "Machine id is required" } });
  }

  try {
    await prisma.machine.delete({
      where: { id: machineId },
    });
    return res.status(204).send();
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unable to delete machine";
    return res.status(400).json({ error: { message } });
  }
});

export default router;


