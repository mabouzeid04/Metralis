import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth, requireRole } from "../middleware/auth";
import { hashPassword } from "../utils/password";
import type { Prisma, UserStatus } from "../generated/prisma/client";

const router = Router();

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["ADMIN", "TECHNICIAN"]),
  password: z.string().min(8).optional(),
});

const rejectionSchema = z.object({
  reason: z.string().max(500).optional(),
});

// Public endpoint for all authenticated users - get user list for assignment dropdowns
router.get("/list", requireAuth, async (_req, res) => {
  const users = await prisma.user.findMany({
    where: { active: true, status: "APPROVED" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
    orderBy: { name: "asc" },
  });
  return res.json({ data: users });
});

router.use(requireAuth, requireRole(["ADMIN"]));

router.get("/", async (_req, res) => {
  const users = await prisma.user.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      approvedAt: true,
      approvedBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      rejectedAt: true,
      rejectionReason: true,
    },
  });
  return res.json({ data: users });
});

router.get("/pending", async (_req, res) => {
  const users = await prisma.user.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      role: true,
      status: true,
    },
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
    status: "APPROVED",
    passwordHash: await hashPassword(password ?? "ChangeMe123!"),
    approvedAt: new Date(),
    approvedBy: {
      connect: { id: req.user!.id },
    },
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

const transitionStatus = async (
  userId: string,
  status: UserStatus,
  adminId: string,
  rejectionReason?: string,
) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      status,
      approvedById: status === "APPROVED" ? adminId : null,
      approvedAt: status === "APPROVED" ? new Date() : null,
      rejectedAt: status === "REJECTED" ? new Date() : null,
      rejectionReason: status === "REJECTED" ? rejectionReason ?? null : null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      approvedAt: true,
      approvedById: true,
      rejectedAt: true,
      rejectionReason: true,
    },
  });
};

router.patch("/:id/approve", async (req, res) => {
  try {
    const user = await transitionStatus(req.params.id, "APPROVED", req.user!.id);
    return res.json({ data: user });
  } catch {
    return res.status(404).json({ error: { message: "User not found" } });
  }
});

router.patch("/:id/reject", async (req, res) => {
  const parsed = rejectionSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  try {
    const user = await transitionStatus(
      req.params.id,
      "REJECTED",
      req.user!.id,
      parsed.data.reason,
    );
    return res.json({ data: user });
  } catch {
    return res.status(404).json({ error: { message: "User not found" } });
  }
});

router.delete("/:id", async (req, res) => {
  if (req.user!.id === req.params.id) {
    return res.status(400).json({ error: { message: "You cannot delete your own account" } });
  }

  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        active: false,
        status: "REJECTED",
        rejectedAt: new Date(),
        rejectionReason: "Deleted by admin",
      },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        active: true,
      },
    });

    return res.json({ data: user });
  } catch {
    return res.status(404).json({ error: { message: "User not found" } });
  }
});

export default router;


