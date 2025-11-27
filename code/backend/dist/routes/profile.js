"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const password_1 = require("../utils/password");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_1.requireAuth);
const profileUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    email: zod_1.z.string().email().optional(),
});
const passwordChangeSchema = zod_1.z.object({
    currentPassword: zod_1.z.string().min(1),
    newPassword: zod_1.z.string().min(8),
});
const preferencesSchema = zod_1.z.object({
    language: zod_1.z.enum(["en", "ar"]).optional(),
});
// PATCH /api/v1/users/me - Update current user profile
router.patch("/me", async (req, res) => {
    const parsed = profileUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }
    const { name, email } = parsed.data;
    const userId = req.user.id;
    // Check if email is being updated and if it's already taken
    if (email) {
        const existing = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (existing && existing.id !== userId) {
            return res.status(409).json({
                error: { message: "Email already exists" },
            });
        }
    }
    const updateData = {};
    if (name !== undefined)
        updateData.name = name;
    if (email !== undefined)
        updateData.email = email;
    try {
        const user = await prisma_1.prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
        return res.json({ data: user });
    }
    catch {
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
    const userId = req.user.id;
    try {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
            select: { passwordHash: true },
        });
        if (!user) {
            return res.status(404).json({ error: { message: "User not found" } });
        }
        // Verify current password
        const isValid = await (0, password_1.comparePassword)(currentPassword, user.passwordHash);
        if (!isValid) {
            return res.status(401).json({
                error: { message: "Current password is incorrect" },
            });
        }
        // Hash and update new password
        const newPasswordHash = await (0, password_1.hashPassword)(newPassword);
        await prisma_1.prisma.user.update({
            where: { id: userId },
            data: { passwordHash: newPasswordHash },
        });
        return res.json({ data: { message: "Password updated successfully" } });
    }
    catch {
        return res.status(500).json({ error: { message: "Failed to update password" } });
    }
});
// GET /api/v1/users/me/preferences - Get user preferences
router.get("/me/preferences", async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
            select: { preferences: true },
        });
        if (!user) {
            return res.status(404).json({ error: { message: "User not found" } });
        }
        return res.json({
            data: user.preferences || {},
        });
    }
    catch {
        return res.status(500).json({ error: { message: "Failed to get preferences" } });
    }
});
// PATCH /api/v1/users/me/preferences - Update user preferences
router.patch("/me/preferences", async (req, res) => {
    const parsed = preferencesSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }
    const userId = req.user.id;
    try {
        // Get current preferences
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
            select: { preferences: true },
        });
        if (!user) {
            return res.status(404).json({ error: { message: "User not found" } });
        }
        // Merge with existing preferences
        const currentPreferences = user.preferences || {};
        const updatedPreferences = {
            ...currentPreferences,
            ...parsed.data,
        };
        // Update preferences
        await prisma_1.prisma.user.update({
            where: { id: userId },
            data: { preferences: updatedPreferences },
        });
        return res.json({ data: updatedPreferences });
    }
    catch {
        return res.status(500).json({ error: { message: "Failed to update preferences" } });
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map