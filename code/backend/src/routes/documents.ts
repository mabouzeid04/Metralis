import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth";
import { upload, saveDocumentToS3, streamDocumentFromS3 } from "../services/storage";
import { prisma } from "../lib/prisma";
import { ingestDocument } from "../services/documentIngestion";
import {
  getDocumentsForAsset,
  getDirectDocumentsForAsset,
  getAssetsForDocument,
  linkDocumentToAssets,
  unlinkDocumentFromAssets,
  setDocumentFactoryWide,
  getFactoryWideDocuments,
  searchDocuments,
  getDocumentStatsForAsset,
  updateDocumentAssets,
} from "../services/documentService";

const router = Router();

const documentSchema = z.object({
  title: z.string().min(1),
  type: z.enum(["MANUAL", "SOP", "TROUBLESHOOTING", "OTHER"]).optional(),
  machineId: z.string().uuid().optional(),
  machineType: z.string().optional(),
  language: z.string().optional(),
  version: z.string().optional(),
  description: z.string().optional(),
  // New fields for hierarchical asset support
  isFactoryWide: z.boolean().optional(),
  appliesToChildren: z.boolean().optional(),
  assetIds: z.array(z.string().uuid()).optional(),
});

router.use(requireAuth);

// Get all standalone documents (not attached to work orders or repair actions)
router.get("/", async (req, res) => {
  const { type, language, factoryWide } = req.query;

  const where: Record<string, unknown> = {
    workOrderId: null,
    repairActionId: null,
  };

  if (type) {
    where.type = type;
  }

  if (language) {
    where.language = language;
  }

  if (factoryWide === "true") {
    where.isFactoryWide = true;
  }

  const documents = await prisma.document.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      machine: true,
      uploadedBy: true,
      assets: {
        include: { asset: true },
      },
    },
  });
  return res.json({ data: documents });
});

// Search documents
router.get("/search", async (req, res) => {
  const { q, assetId, type, language, includeInherited } = req.query;

  if (!q || typeof q !== "string") {
    return res.status(400).json({ error: { message: "Query parameter 'q' is required" } });
  }

  const documents = await searchDocuments(q, {
    assetId: assetId as string | undefined,
    type: type as string | undefined,
    language: language as string | undefined,
    includeInherited: includeInherited === "true",
  });

  return res.json({ data: documents });
});

// Get factory-wide documents
router.get("/factory-wide", async (req, res) => {
  const { type, language } = req.query;

  const documents = await getFactoryWideDocuments({
    type: type as string | undefined,
    language: language as string | undefined,
  });

  return res.json({ data: documents });
});

// Get documents for a specific asset (with inheritance)
router.get("/by-asset/:assetId", async (req, res) => {
  const { assetId } = req.params;
  const { type, language, includeSource } = req.query;

  const documents = await getDocumentsForAsset(assetId, {
    type: type as string | undefined,
    language: language as string | undefined,
    includeSource: includeSource === "true",
  });

  return res.json({ data: documents });
});

// Get only directly assigned documents for an asset (no inheritance)
router.get("/by-asset/:assetId/direct", async (req, res) => {
  const { assetId } = req.params;
  const { type, language } = req.query;

  const documents = await getDirectDocumentsForAsset(assetId, {
    type: type as string | undefined,
    language: language as string | undefined,
  });

  return res.json({ data: documents });
});

// Get document statistics for an asset
router.get("/by-asset/:assetId/stats", async (req, res) => {
  const { assetId } = req.params;
  const stats = await getDocumentStatsForAsset(assetId);
  return res.json({ data: stats });
});

router.get("/:id", async (req, res) => {
  const doc = await prisma.document.findUnique({
    where: { id: req.params.id },
    include: {
      machine: true,
      uploadedBy: true,
      assets: {
        include: { asset: true },
      },
    },
  });

  if (!doc) {
    return res.status(404).json({ error: { message: "Document not found" } });
  }

  return res.json({ data: doc });
});

// Get assets linked to a document
router.get("/:id/assets", async (req, res) => {
  const doc = await prisma.document.findUnique({
    where: { id: req.params.id },
  });

  if (!doc) {
    return res.status(404).json({ error: { message: "Document not found" } });
  }

  const assets = await getAssetsForDocument(req.params.id);
  return res.json({ data: assets });
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
  // Parse assetIds from form data (can be JSON string or array)
  let assetIds: string[] = [];
  if (req.body.assetIds) {
    try {
      assetIds = typeof req.body.assetIds === "string"
        ? JSON.parse(req.body.assetIds)
        : req.body.assetIds;
    } catch {
      // If not valid JSON, treat as single ID or comma-separated
      assetIds = Array.isArray(req.body.assetIds)
        ? req.body.assetIds
        : req.body.assetIds.split(",").map((id: string) => id.trim()).filter(Boolean);
    }
  }

  // Parse boolean flags from form data
  const isFactoryWide = req.body.isFactoryWide === "true" || req.body.isFactoryWide === true;
  const appliesToChildren = req.body.appliesToChildren === "true" || req.body.appliesToChildren === true;

  const parsed = documentSchema.safeParse({
    ...req.body,
    assetIds,
    isFactoryWide,
    appliesToChildren,
  });

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
      description: parsed.data.description ?? null,
      filePath: key,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      uploadedById: req.user!.id,
      isFactoryWide: parsed.data.isFactoryWide ?? false,
      appliesToChildren: parsed.data.appliesToChildren ?? false,
    },
  });

  // Link to assets if provided
  if (assetIds.length > 0) {
    await linkDocumentToAssets(doc.id, assetIds);
  }

  void ingestDocument(doc.id).catch((error) => {
    console.error("Document ingestion failed", { documentId: doc.id, error });
  });

  // Fetch complete document with assets
  const result = await prisma.document.findUnique({
    where: { id: doc.id },
    include: {
      machine: true,
      uploadedBy: true,
      assets: {
        include: { asset: true },
      },
    },
  });

  return res.status(201).json({ data: result });
});

// Update document properties
router.patch("/:id", async (req, res) => {
  const updateSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    language: z.string().optional(),
    type: z.enum(["MANUAL", "SOP", "TROUBLESHOOTING", "OTHER"]).optional(),
    isFactoryWide: z.boolean().optional(),
    appliesToChildren: z.boolean().optional(),
  });

  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const doc = await prisma.document.findUnique({
    where: { id: req.params.id },
  });

  if (!doc) {
    return res.status(404).json({ error: { message: "Document not found" } });
  }

  // Strip undefined values so Prisma's exactOptionalPropertyTypes is satisfied
  const data: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(parsed.data)) {
    if (value !== undefined) {
      data[key] = value;
    }
  }

  const updated = await prisma.document.update({
    where: { id: req.params.id },
    data,
    include: {
      machine: true,
      uploadedBy: true,
      assets: {
        include: { asset: true },
      },
    },
  });

  return res.json({ data: updated });
});

// Delete document
router.delete("/:id", async (req, res) => {
  const doc = await prisma.document.findUnique({
    where: { id: req.params.id },
  });

  if (!doc) {
    return res.status(404).json({ error: { message: "Document not found" } });
  }

  // Cascade deletes DocumentAsset and DocumentChunk via Prisma relations
  await prisma.document.delete({
    where: { id: req.params.id },
  });

  return res.json({ data: { deleted: true } });
});

// Update document asset assignments
router.put("/:id/assets", async (req, res) => {
  const { assetIds } = req.body;

  if (!Array.isArray(assetIds)) {
    return res.status(400).json({ error: { message: "assetIds must be an array" } });
  }

  const doc = await prisma.document.findUnique({
    where: { id: req.params.id },
  });

  if (!doc) {
    return res.status(404).json({ error: { message: "Document not found" } });
  }

  const result = await updateDocumentAssets(req.params.id, assetIds);
  return res.json({ data: result });
});

// Link document to specific assets (additive)
router.post("/:id/assets", async (req, res) => {
  const { assetIds, isPrimary } = req.body;

  if (!Array.isArray(assetIds) || assetIds.length === 0) {
    return res.status(400).json({ error: { message: "assetIds must be a non-empty array" } });
  }

  const doc = await prisma.document.findUnique({
    where: { id: req.params.id },
  });

  if (!doc) {
    return res.status(404).json({ error: { message: "Document not found" } });
  }

  const links = await linkDocumentToAssets(req.params.id, assetIds, { isPrimary });
  return res.json({ data: links });
});

// Unlink document from specific assets
router.delete("/:id/assets", async (req, res) => {
  const { assetIds } = req.body;

  if (!Array.isArray(assetIds) || assetIds.length === 0) {
    return res.status(400).json({ error: { message: "assetIds must be a non-empty array" } });
  }

  const doc = await prisma.document.findUnique({
    where: { id: req.params.id },
  });

  if (!doc) {
    return res.status(404).json({ error: { message: "Document not found" } });
  }

  const count = await unlinkDocumentFromAssets(req.params.id, assetIds);
  return res.json({ data: { unlinked: count } });
});

// Set document as factory-wide
router.patch("/:id/factory-wide", async (req, res) => {
  const { isFactoryWide } = req.body;

  if (typeof isFactoryWide !== "boolean") {
    return res.status(400).json({ error: { message: "isFactoryWide must be a boolean" } });
  }

  const doc = await prisma.document.findUnique({
    where: { id: req.params.id },
  });

  if (!doc) {
    return res.status(404).json({ error: { message: "Document not found" } });
  }

  const result = await setDocumentFactoryWide(req.params.id, isFactoryWide);
  return res.json({ data: result });
});

export default router;


