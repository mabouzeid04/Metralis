import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth";
import { upload, saveDocumentToS3, streamDocumentFromS3 } from "../services/storage";
import { prisma } from "../lib/prisma";
import { ingestDocument } from "../services/documentIngestion";

const router = Router();

const documentSchema = z.object({
  title: z.string().min(1),
  type: z.enum(["MANUAL", "SOP", "TROUBLESHOOTING", "OTHER"]).optional(),
  machineId: z.string().uuid().optional(),
  machineType: z.string().optional(),
  language: z.string().optional(),
  version: z.string().optional(),
});

router.use(requireAuth);

router.get("/", async (_req, res) => {
  const documents = await prisma.document.findMany({
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
  const doc = await prisma.document.findUnique({
    where: { id: req.params.id },
    include: { machine: true, uploadedBy: true },
  });

  if (!doc) {
    return res.status(404).json({ error: { message: "Document not found" } });
  }

  return res.json({ data: doc });
});

router.get("/:id/file", async (req, res) => {
  const doc = await prisma.document.findUnique({ where: { id: req.params.id } });

  if (!doc) {
    return res.status(404).json({ error: { message: "Document not found" } });
  }

  try {
    await streamDocumentFromS3(doc.filePath, res);
  } catch {
    return res.status(404).json({ error: { message: "File missing" } });
  }
});

router.post("/", upload.single("file"), async (req, res) => {
  const parsed = documentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  if (!req.file) {
    return res.status(400).json({ error: { message: "File is required" } });
  }

  const key = await saveDocumentToS3(req.file);

  const doc = await prisma.document.create({
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
      uploadedById: req.user!.id,
    },
  });

  void ingestDocument(doc.id).catch((error) => {
    console.error("Document ingestion failed", { documentId: doc.id, error });
  });

  return res.status(201).json({ data: doc });
});

export default router;


