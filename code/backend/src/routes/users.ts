import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth, requireRole } from "../middleware/auth";
import { hashPassword } from "../utils/password";
import type { Prisma } from "../generated/prisma/client";

const router = Router();

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["ADMIN", "MANAGER", "TECHNICIAN"]),
  password: z.string().min(8).optional(),
});

router.use(requireAuth, requireRole(["ADMIN"]));

router.get("/", async (_req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  return res.json({ data: users });
});

router.post("/", async (req, res) => {
  const parsed = userSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { password, ...rest } = parsed.data;

  const data: Prisma.UserCreateInput = {
    name: rest.name,
    email: rest.email,
    role: rest.role,
    passwordHash: await hashPassword(password ?? "ChangeMe123!"),
  };

  const user = await prisma.user.create({ data });

  return res.status(201).json({ data: user });
});

router.patch("/:id", async (req, res) => {
  const parsed = userSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const data: Prisma.UserUpdateInput = {};
  if (parsed.data.name !== undefined) data.name = parsed.data.name;
  if (parsed.data.email !== undefined) data.email = parsed.data.email;
  if (parsed.data.role !== undefined) data.role = parsed.data.role;
  if (parsed.data.password !== undefined) {
    data.passwordHash = await hashPassword(parsed.data.password);
  }

  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data,
    });
    return res.json({ data: user });
  } catch {
    return res.status(404).json({ error: { message: "User not found" } });
  }
});

export default router;


