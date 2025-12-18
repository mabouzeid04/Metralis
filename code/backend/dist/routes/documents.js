"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const auth_1 = require("../middleware/auth");
const storage_1 = require("../services/storage");
const prisma_1 = require("../lib/prisma");
const documentIngestion_1 = require("../services/documentIngestion");
const router = (0, express_1.Router)();
const documentSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    type: zod_1.z.enum(["MANUAL", "SOP", "TROUBLESHOOTING", "OTHER"]).optional(),
    machineId: zod_1.z.string().uuid().optional(),
    machineType: zod_1.z.string().optional(),
    language: zod_1.z.string().optional(),
    version: zod_1.z.string().optional(),
});
router.use(auth_1.requireAuth);
router.get("/", async (_req, res) => {
    const documents = await prisma_1.prisma.document.findMany({
        where: {
            workOrderId: null,
            repairActionId: null,
        },
        orderBy: { createdAt: "desc" },
        include: { machine: true, uploadedBy: true },
    });
    return res.json({ data: documents });
});
router.get("/:id", async (req, res) => {
    const doc = await prisma_1.prisma.document.findUnique({
        where: { id: req.params.id },
        include: { machine: true, uploadedBy: true },
    });
    if (!doc) {
        return res.status(404).json({ error: { message: "Document not found" } });
    }
    return res.json({ data: doc });
});
router.get("/:id/file", async (req, res) => {
    const doc = await prisma_1.prisma.document.findUnique({ where: { id: req.params.id } });
    if (!doc) {
        return res.status(404).json({ error: { message: "Document not found" } });
    }
    try {
        await (0, storage_1.streamDocumentFromS3)(doc.filePath, res);
    }
    catch {
        return res.status(404).json({ error: { message: "File missing" } });
    }
});
router.post("/", storage_1.upload.single("file"), async (req, res) => {
    const parsed = documentSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }
    if (!req.file) {
        return res.status(400).json({ error: { message: "File is required" } });
    }
    const key = await (0, storage_1.saveDocumentToS3)(req.file);
    const doc = await prisma_1.prisma.document.create({
        data: {
            title: parsed.data.title,
            type: parsed.data.type ?? "MANUAL",
            machineId: parsed.data.machineId ?? null,
            machineType: parsed.data.machineType ?? null,
            language: parsed.data.language ?? "en",
            version: parsed.data.version ?? null,
            filePath: key,
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
            uploadedById: req.user.id,
        },
    });
    void (0, documentIngestion_1.ingestDocument)(doc.id).catch((error) => {
        console.error("Document ingestion failed", { documentId: doc.id, error });
    });
    return res.status(201).json({ data: doc });
});
exports.default = router;
//# sourceMappingURL=documents.js.map