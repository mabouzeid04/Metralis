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
    role: zod_1.z.enum(["ADMIN", "MANAGER", "TECHNICIAN"]),
    password: zod_1.z.string().min(8).optional(),
});
// Public endpoint for all authenticated users - get user list for assignment dropdowns
router.get("/list", auth_1.requireAuth, async (_req, res) => {
    const users = await prisma_1.prisma.user.findMany({
        where: { active: true },
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
    const data = {
        name: rest.name,
        email: rest.email,
        role: rest.role,
        passwordHash: await (0, password_1.hashPassword)(password ?? "ChangeMe123!"),
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
exports.default = router;
//# sourceMappingURL=users.js.map