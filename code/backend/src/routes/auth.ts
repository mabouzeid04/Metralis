import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { hashPassword, comparePassword } from "../utils/password";
import { signToken } from "../utils/jwt";
import { requireAuth } from "../middleware/auth";

const router = Router();

const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

router.post("/signup", async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: { message: "Email already exists" } });
  }

  const passwordHash = await hashPassword(password);
  const userCount = await prisma.user.count();

  const assignedRole = userCount === 0 ? "ADMIN" : "TECHNICIAN";
  const assignedStatus = assignedRole === "ADMIN" ? "APPROVED" : "PENDING";

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: assignedRole,
      status: assignedStatus,
      approvedAt: assignedStatus === "APPROVED" ? new Date() : null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      approvedAt: true,
    },
  });

  const token =
    user.status === "APPROVED"
      ? signToken({
          sub: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          status: user.status,
        })
      : null;

  return res.status(201).json({
    data: {
      token,
      user,
      message:
        user.status === "APPROVED"
          ? null
          : "Your account is awaiting admin approval. You'll receive access once approved.",
    },
  });
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: { message: "Invalid credentials" } });
  }

  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: { message: "Invalid credentials" } });
  }

  if (user.status !== "APPROVED") {
    const message =
      user.status === "PENDING"
        ? "Your account is awaiting admin approval."
        : "Your account has been rejected. Please contact an administrator.";
    return res.status(403).json({
      error: {
        message,
        status: user.status,
      },
    });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  const token = signToken({
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    status: user.status,
  });

  return res.json({
    data: {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    },
  });
});

router.post("/logout", (_req, res) => {
  return res.json({ data: { message: "Logged out" } });
});

router.get("/me", requireAuth, async (req, res) => {
  const me = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      role: true,
      preferences: true,
    },
  });

  return res.json({ data: me });
});

export default router;


