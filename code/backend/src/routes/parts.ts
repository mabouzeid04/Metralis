import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";
import type { Prisma } from "../generated/prisma/client";

const router = Router();

const partSchema = z.object({
  name: z.string().min(1),
  category: z.string().optional(),
  partNumber: z.string().optional(),
  manufacturer: z.string().optional(),
  cost: z.number().optional(),
  description: z.string().optional(),
  stockQty: z.number().int().optional(),
  minStock: z.number().int().optional(),
  location: z.string().optional(),
});

router.use(requireAuth);

router.get("/", async (_req, res) => {
  const parts = await prisma.part.findMany({
    orderBy: { name: "asc" },
  });
  return res.json({ data: parts });
});

router.get("/:id", async (req, res) => {
  const part = await prisma.part.findUnique({
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

  const data: Prisma.PartCreateInput = {
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

  const part = await prisma.part.create({ data });

  return res.status(201).json({ data: part });
});

router.patch("/:id", async (req, res) => {
  const parsed = partSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const data: Prisma.PartUpdateInput = {};
  if (parsed.data.name !== undefined) data.name = parsed.data.name;
  if (parsed.data.category !== undefined) data.category = parsed.data.category;
  if (parsed.data.partNumber !== undefined) data.partNumber = parsed.data.partNumber;
  if (parsed.data.manufacturer !== undefined) data.manufacturer = parsed.data.manufacturer;
  if (parsed.data.cost !== undefined) data.cost = parsed.data.cost;
  if (parsed.data.description !== undefined) data.description = parsed.data.description;
  if (parsed.data.stockQty !== undefined) data.stockQty = parsed.data.stockQty;
  if (parsed.data.minStock !== undefined) data.minStock = parsed.data.minStock;
  if (parsed.data.location !== undefined) data.location = parsed.data.location;

  try {
    const part = await prisma.part.update({
      where: { id: req.params.id },
      data,
    });
    return res.json({ data: part });
  } catch {
    return res.status(404).json({ error: { message: "Part not found" } });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await prisma.part.delete({
      where: { id: req.params.id },
    });
    return res.status(204).send();
  } catch {
    return res.status(404).json({ error: { message: "Part not found" } });
  }
});

export default router;


