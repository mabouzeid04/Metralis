"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const password_1 = require("../utils/password");
const router = (0, express_1.Router)();
const userSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    role: zod_1.z.enum(["ADMIN", "TECHNICIAN"]),
    password: zod_1.z.string().min(8).optional(),
});
const rejectionSchema = zod_1.z.object({
    reason: zod_1.z.string().max(500).optional(),
});
// Public endpoint for all authenticated users - get user list for assignment dropdowns
router.get("/list", auth_1.requireAuth, async (_req, res) => {
    const users = await prisma_1.prisma.user.findMany({
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
router.use(auth_1.requireAuth, (0, auth_1.requireRole)(["ADMIN"]));
router.get("/", async (_req, res) => {
    const users = await prisma_1.prisma.user.findMany({
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
    const users = await prisma_1.prisma.user.findMany({
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
    const data = {
        name: rest.name,
        email: rest.email,
        role: rest.role,
        status: "APPROVED",
        passwordHash: await (0, password_1.hashPassword)(password ?? "ChangeMe123!"),
        approvedAt: new Date(),
        approvedBy: {
            connect: { id: req.user.id },
        },
    };
    const user = await prisma_1.prisma.user.create({ data });
    return res.status(201).json({ data: user });
});
router.patch("/:id", async (req, res) => {
    const parsed = userSchema.partial().safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }
    const data = {};
    if (parsed.data.name !== undefined)
        data.name = parsed.data.name;
    if (parsed.data.email !== undefined)
        data.email = parsed.data.email;
    if (parsed.data.role !== undefined)
        data.role = parsed.data.role;
    if (parsed.data.password !== undefined) {
        data.passwordHash = await (0, password_1.hashPassword)(parsed.data.password);
    }
    try {
        const user = await prisma_1.prisma.user.update({
            where: { id: req.params.id },
            data,
        });
        return res.json({ data: user });
    }
    catch {
        return res.status(404).json({ error: { message: "User not found" } });
    }
});
const transitionStatus = async (userId, status, adminId, rejectionReason) => {
    return prisma_1.prisma.user.update({
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
        const user = await transitionStatus(req.params.id, "APPROVED", req.user.id);
        return res.json({ data: user });
    }
    catch {
        return res.status(404).json({ error: { message: "User not found" } });
    }
});
router.patch("/:id/reject", async (req, res) => {
    const parsed = rejectionSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }
    try {
        const user = await transitionStatus(req.params.id, "REJECTED", req.user.id, parsed.data.reason);
        return res.json({ data: user });
    }
    catch {
        return res.status(404).json({ error: { message: "User not found" } });
    }
});
router.delete("/:id", async (req, res) => {
    if (req.user.id === req.params.id) {
        return res.status(400).json({ error: { message: "You cannot delete your own account" } });
    }
    try {
        const user = await prisma_1.prisma.user.update({
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
    }
    catch {
        return res.status(404).json({ error: { message: "User not found" } });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map