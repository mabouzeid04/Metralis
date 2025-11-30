import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";
import { hashPassword, comparePassword } from "../utils/password";

const router = Router();

// All routes require authentication
router.use(requireAuth);

const phoneRegex = /^\+?[0-9\s\-()]+$/;

const phoneNumberSchema = z
  .string()
  .trim()
  .min(7, { message: "Phone number must be at least 7 characters" })
  .max(20, { message: "Phone number must be 20 characters or less" })
  .refine((value) => phoneRegex.test(value), {
    message: "Phone number can only include numbers, spaces, +, -, and parentheses",
  });

const profileUpdateSchema = z
  .object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    phoneNumber: z
      .preprocess((val) => {
        if (typeof val !== "string") return val;
        const trimmed = val.trim();
        return trimmed === "" ? null : trimmed;
      }, phoneNumberSchema.nullable())
      .optional(),
    assignmentWhatsappOptIn: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.assignmentWhatsappOptIn && !data.phoneNumber) {
        return false;
      }
      return true;
    },
    {
      message: "Add your phone number to enable WhatsApp alerts",
      path: ["assignmentWhatsappOptIn"],
    },
  );

const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

const preferencesSchema = z.object({
  language: z.enum(["en", "ar"]).optional(),
});

// PATCH /api/v1/users/me - Update current user profile
router.patch("/me", async (req, res) => {
  const parsed = profileUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { name, email, phoneNumber, assignmentWhatsappOptIn } = parsed.data;
  const userId = req.user!.id;

  // Check if email is being updated and if it's already taken
  if (email) {
    const existing = await prisma.user.findUnique({
      where: { email },
    });
    if (existing && existing.id !== userId) {
      return res.status(409).json({
        error: { message: "Email already exists" },
      });
    }
  }

  const updateData: {
    name?: string;
    email?: string;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
  } = {};
  if (name !== undefined) updateData.name = name;
  if (email !== undefined) updateData.email = email;
  if ("phoneNumber" in parsed.data) {
    updateData.phoneNumber = phoneNumber ?? null;
  }
  if (assignmentWhatsappOptIn !== undefined) {
    updateData.assignmentWhatsappOptIn = assignmentWhatsappOptIn;
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phoneNumber: true,
        assignmentWhatsappOptIn: true,
      },
    });

    return res.json({ data: user });
  } catch {
    return res.status(404).json({ error: { message: "User not found" } });
  }
});

// PATCH /api/v1/users/me/password - Change password
router.patch("/me/password", async (req, res) => {
  const parsed = passwordChangeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { currentPassword, newPassword } = parsed.data;
  const userId = req.user!.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { passwordHash: true },
    });

    if (!user) {
      return res.status(404).json({ error: { message: "User not found" } });
    }

    // Verify current password
    const isValid = await comparePassword(currentPassword, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({
        error: { message: "Current password is incorrect" },
      });
    }

    // Hash and update new password
    const newPasswordHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newPasswordHash },
    });

    return res.json({ data: { message: "Password updated successfully" } });
  } catch {
    return res.status(500).json({ error: { message: "Failed to update password" } });
  }
});

// GET /api/v1/users/me/preferences - Get user preferences
router.get("/me/preferences", async (req, res) => {
  const userId = req.user!.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { preferences: true },
    });

    if (!user) {
      return res.status(404).json({ error: { message: "User not found" } });
    }

    return res.json({
      data: user.preferences || {},
    });
  } catch {
    return res.status(500).json({ error: { message: "Failed to get preferences" } });
  }
});

// PATCH /api/v1/users/me/preferences - Update user preferences
router.patch("/me/preferences", async (req, res) => {
  const parsed = preferencesSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const userId = req.user!.id;

  try {
    // Get current preferences
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { preferences: true },
    });

    if (!user) {
      return res.status(404).json({ error: { message: "User not found" } });
    }

    // Merge with existing preferences
    const currentPreferences = (user.preferences as Record<string, unknown>) || {};
    const updatedPreferences = {
      ...currentPreferences,
      ...parsed.data,
    };

    // Update preferences
    await prisma.user.update({
      where: { id: userId },
      data: { preferences: updatedPreferences },
    });

    return res.json({ data: updatedPreferences });
  } catch {
    return res.status(500).json({ error: { message: "Failed to update preferences" } });
  }
});

export default router;

