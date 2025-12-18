"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const signupSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
router.post("/signup", async (req, res) => {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }
    const { name, email, password } = parsed.data;
    const existing = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (existing) {
        return res.status(409).json({ error: { message: "Email already exists" } });
    }
    const passwordHash = await (0, password_1.hashPassword)(password);
    const userCount = await prisma_1.prisma.user.count();
    const assignedRole = userCount === 0 ? "ADMIN" : "TECHNICIAN";
    const assignedStatus = assignedRole === "ADMIN" ? "APPROVED" : "PENDING";
    const user = await prisma_1.prisma.user.create({
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
            phoneNumber: true,
            assignmentWhatsappOptIn: true,
        },
    });
    const token = user.status === "APPROVED"
        ? (0, jwt_1.signToken)({
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
            message: user.status === "APPROVED"
                ? null
                : "Your account is awaiting admin approval. You'll receive access once approved.",
        },
    });
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1),
});
router.post("/login", async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }
    const { email, password } = parsed.data;
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(401).json({ error: { message: "Invalid credentials" } });
    }
    if (!user.active) {
        return res.status(403).json({
            error: {
                message: "Your account has been deactivated. Please contact an administrator.",
            },
        });
    }
    const valid = await (0, password_1.comparePassword)(password, user.passwordHash);
    if (!valid) {
        return res.status(401).json({ error: { message: "Invalid credentials" } });
    }
    if (user.status !== "APPROVED") {
        const message = user.status === "PENDING"
            ? "Your account is awaiting admin approval."
            : "Your account has been rejected. Please contact an administrator.";
        return res.status(403).json({
            error: {
                message,
                status: user.status,
            },
        });
    }
    await prisma_1.prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
    });
    const token = (0, jwt_1.signToken)({
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
                phoneNumber: user.phoneNumber,
                assignmentWhatsappOptIn: user.assignmentWhatsappOptIn,
            },
        },
    });
});
router.post("/logout", (_req, res) => {
    return res.json({ data: { message: "Logged out" } });
});
router.get("/me", auth_1.requireAuth, async (req, res) => {
    const me = await prisma_1.prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
            id: true,
            name: true,
            email: true,
            status: true,
            role: true,
            preferences: true,
            phoneNumber: true,
            assignmentWhatsappOptIn: true,
        },
    });
    return res.json({ data: me });
});
exports.default = router;
//# sourceMappingURL=auth.js.map