import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { requireAuth, requireRole } from '../middleware/auth';
import {
  createAsset,
  updateAsset,
  deleteAsset,
  getAssetTree,
  getChildren,
  getAncestors,
  getDescendants,
  moveAsset,
  searchAssets,
} from '../services/assetService';
import { getOrCreateFactoryConfig } from '../services/factoryConfigService';
import type { Prisma } from '../generated/prisma/client';

const router = Router();

// Validation schemas
const createAssetSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  nameTranslations: z.record(z.string(), z.string()).optional(),
  code: z.string().optional(),
  levelType: z.string().min(1, 'Level type is required'),
  parentId: z.string().uuid().optional(),
  status: z.enum(['RUNNING', 'DOWN']).optional(),
  statusReason: z.string().optional(),
  criticality: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  attributes: z.record(z.string(), z.unknown()).optional(),
  commissionedAt: z.string().datetime().optional(),
});

const updateAssetSchema = z.object({
  name: z.string().min(1).optional(),
  nameTranslations: z.record(z.string(), z.string()).optional(),
  code: z.string().nullable().optional(),
  status: z.enum(['RUNNING', 'DOWN']).optional(),
  statusReason: z.string().nullable().optional(),
  criticality: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  attributes: z.record(z.string(), z.unknown()).nullable().optional(),
  commissionedAt: z.string().datetime().nullable().optional(),
});

router.use(requireAuth);

/**
 * GET /assets
 * List all root assets (machines) or filter by query
 */
router.get('/', async (req, res) => {
  try {
    const { search, parentId, levelType, status } = req.query;

    // If search query provided, use search function
    if (search && typeof search === 'string') {
      const options: { parentId?: string; levelType?: string; limit?: number } = {
        limit: 50,
      };
      if (parentId && typeof parentId === 'string') {
        options.parentId = parentId;
      }
      if (levelType && typeof levelType === 'string') {
        options.levelType = levelType;
      }
      const assets = await searchAssets(search, options);
      return res.json({ data: assets });
    }

    // Build filter
    const where: Prisma.AssetWhereInput = {};

    if (parentId === 'null' || parentId === '') {
      // Explicitly requesting root assets
      where.parentId = null;
    } else if (parentId && typeof parentId === 'string') {
      where.parentId = parentId;
    } else if (!parentId) {
      // Default: return root assets only
      where.parentId = null;
    }

    if (levelType && typeof levelType === 'string') {
      where.levelType = levelType;
    }

    if (status && typeof status === 'string') {
      where.status = status as 'RUNNING' | 'DOWN';
    }

    const assets = await prisma.asset.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        children: {
          select: { id: true },
        },
      },
    });

    // Add hasChildren flag
    const assetsWithMeta = assets.map((asset) => ({
      ...asset,
      hasChildren: asset.children.length > 0,
      children: undefined, // Remove children array from response
    }));

    return res.json({ data: assetsWithMeta });
  } catch (error) {
    console.error('Error fetching assets:', error);
    return res.status(500).json({ error: { message: 'Failed to fetch assets' } });
  }
});

/**
 * GET /assets/:id
 * Get a single asset by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: { message: 'Asset ID is required' } });
    }

    const asset = await prisma.asset.findUnique({
      where: { id },
      include: {
        parent: {
          select: { id: true, name: true, pathString: true },
        },
        children: {
          orderBy: { name: 'asc' },
          select: {
            id: true,
            name: true,
            nameTranslations: true,
            code: true,
            levelType: true,
            status: true,
            statusReason: true,
          },
        },
        documents: {
          include: {
            document: {
              select: {
                id: true,
                title: true,
                type: true,
                mimeType: true,
              },
            },
          },
        },
      },
    });

    if (!asset) {
      return res.status(404).json({ error: { message: 'Asset not found' } });
    }

    return res.json({ data: asset });
  } catch (error) {
    console.error('Error fetching asset:', error);
    return res.status(500).json({ error: { message: 'Failed to fetch asset' } });
  }
});

/**
 * GET /assets/:id/tree
 * Get full asset tree starting from this asset
 */
router.get('/:id/tree', async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: { message: 'Asset ID is required' } });
    }
    const tree = await getAssetTree(id);
    return res.json({ data: tree });
  } catch (error) {
    console.error('Error fetching asset tree:', error);
    return res.status(500).json({ error: { message: 'Failed to fetch asset tree' } });
  }
});

/**
 * GET /assets/:id/children
 * Get direct children of an asset
 */
router.get('/:id/children', async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: { message: 'Asset ID is required' } });
    }
    const children = await getChildren(id);
    return res.json({ data: children });
  } catch (error) {
    console.error('Error fetching asset children:', error);
    return res.status(500).json({ error: { message: 'Failed to fetch children' } });
  }
});

/**
 * GET /assets/:id/ancestors
 * Get all ancestors of an asset (from root to parent)
 */
router.get('/:id/ancestors', async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: { message: 'Asset ID is required' } });
    }
    const ancestors = await getAncestors(id);
    return res.json({ data: ancestors });
  } catch (error) {
    console.error('Error fetching asset ancestors:', error);
    return res.status(500).json({ error: { message: 'Failed to fetch ancestors' } });
  }
});

/**
 * GET /assets/:id/descendants
 * Get all descendants of an asset (children, grandchildren, etc.)
 */
router.get('/:id/descendants', async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: { message: 'Asset ID is required' } });
    }
    const asset = await prisma.asset.findUnique({ where: { id } });
    if (!asset) {
      return res.status(404).json({ error: { message: 'Asset not found' } });
    }
    const descendants = await getDescendants(id);
    return res.json({ data: descendants });
  } catch (error) {
    console.error('Error fetching asset descendants:', error);
    return res.status(500).json({ error: { message: 'Failed to fetch descendants' } });
  }
});

/**
 * PATCH /assets/:id/move
 * Move an asset to a new parent (or to root if newParentId is null)
 */
router.patch('/:id/move', requireRole(['ADMIN']), async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: { message: 'Asset ID is required' } });
    }

    const moveSchema = z.object({
      newParentId: z.string().uuid().nullable(),
    });

    const parsed = moveSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const config = await getOrCreateFactoryConfig();

    const asset = await moveAsset(
      id,
      parsed.data.newParentId,
      config.supportedLanguages,
      config.primaryLanguage
    );

    return res.json({ data: asset });
  } catch (error) {
    console.error('Error moving asset:', error);
    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: { message: error.message } });
      }
      if (error.message.includes('Cannot move')) {
        return res.status(400).json({ error: { message: error.message } });
      }
    }
    return res.status(500).json({ error: { message: 'Failed to move asset' } });
  }
});

/**
 * POST /assets
 * Create a new asset
 */
router.post('/', requireRole(['ADMIN']), async (req, res) => {
  try {
    const parsed = createAssetSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const config = await getOrCreateFactoryConfig();

    const asset = await createAsset(
      {
        name: parsed.data.name,
        nameTranslations: parsed.data.nameTranslations as Record<string, string> | undefined,
        code: parsed.data.code,
        levelType: parsed.data.levelType,
        parentId: parsed.data.parentId,
        status: parsed.data.status,
        statusReason: parsed.data.statusReason,
        criticality: parsed.data.criticality,
        attributes: parsed.data.attributes as Record<string, unknown> | undefined,
        commissionedAt: parsed.data.commissionedAt
          ? new Date(parsed.data.commissionedAt)
          : undefined,
      },
      config.supportedLanguages,
      config.primaryLanguage
    );

    return res.status(201).json({ data: asset });
  } catch (error) {
    console.error('Error creating asset:', error);
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return res.status(400).json({
        error: { message: 'An asset with this name already exists under the same parent' },
      });
    }
    return res.status(500).json({ error: { message: 'Failed to create asset' } });
  }
});

/**
 * PUT /assets/:id
 * Update an existing asset
 */
router.put('/:id', requireRole(['ADMIN']), async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: { message: 'Asset ID is required' } });
    }

    const parsed = updateAssetSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const config = await getOrCreateFactoryConfig();

    const asset = await updateAsset(
      id,
      {
        name: parsed.data.name,
        nameTranslations: parsed.data.nameTranslations as Record<string, string> | undefined,
        code: parsed.data.code ?? undefined,
        status: parsed.data.status,
        statusReason: parsed.data.statusReason ?? undefined,
        criticality: parsed.data.criticality,
        attributes: parsed.data.attributes as Record<string, unknown> | undefined,
        commissionedAt: parsed.data.commissionedAt
          ? new Date(parsed.data.commissionedAt)
          : undefined,
      },
      config.supportedLanguages,
      config.primaryLanguage
    );

    return res.json({ data: asset });
  } catch (error) {
    console.error('Error updating asset:', error);
    if (error instanceof Error && error.message.includes('not found')) {
      return res.status(404).json({ error: { message: 'Asset not found' } });
    }
    return res.status(500).json({ error: { message: 'Failed to update asset' } });
  }
});

/**
 * DELETE /assets/:id
 * Delete an asset (cascades to children)
 */
router.delete('/:id', requireRole(['ADMIN']), async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: { message: 'Asset ID is required' } });
    }

    // Check if asset exists
    const existing = await prisma.asset.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: { message: 'Asset not found' } });
    }

    // Check for linked work orders on this asset
    const workOrderCount = await prisma.workOrder.count({
      where: { assetId: id },
    });
    if (workOrderCount > 0) {
      return res.status(409).json({
        error: {
          message: `Cannot delete asset: ${workOrderCount} work order(s) are linked. Reassign them first.`,
        },
      });
    }

    // Check for work orders linked to any descendant
    const descendants = await getDescendants(id);
    const descendantIds = descendants.map((d) => d.id);
    if (descendantIds.length > 0) {
      const descendantWOCount = await prisma.workOrder.count({
        where: { assetId: { in: descendantIds } },
      });
      if (descendantWOCount > 0) {
        return res.status(409).json({
          error: {
            message: `Cannot delete asset: ${descendantWOCount} work order(s) are linked to descendant assets. Reassign them first.`,
          },
        });
      }
    }

    await deleteAsset(id);
    return res.json({ data: { success: true } });
  } catch (error) {
    console.error('Error deleting asset:', error);
    return res.status(500).json({ error: { message: 'Failed to delete asset' } });
  }
});

/**
 * POST /assets/:id/documents
 * Link a document to an asset
 */
router.post('/:id/documents', requireRole(['ADMIN']), async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: { message: 'Asset ID is required' } });
    }

    const { documentId, isPrimary } = req.body;

    if (!documentId || typeof documentId !== 'string') {
      return res.status(400).json({ error: { message: 'documentId is required' } });
    }

    // Check if asset exists
    const asset = await prisma.asset.findUnique({ where: { id } });
    if (!asset) {
      return res.status(404).json({ error: { message: 'Asset not found' } });
    }

    // Check if document exists
    const document = await prisma.document.findUnique({ where: { id: documentId } });
    if (!document) {
      return res.status(404).json({ error: { message: 'Document not found' } });
    }

    // Create or update the link
    const link = await prisma.documentAsset.upsert({
      where: {
        documentId_assetId: { documentId, assetId: id },
      },
      update: {
        isPrimary: isPrimary ?? false,
      },
      create: {
        documentId,
        assetId: id,
        isPrimary: isPrimary ?? false,
      },
    });

    return res.status(201).json({ data: link });
  } catch (error) {
    console.error('Error linking document to asset:', error);
    return res.status(500).json({ error: { message: 'Failed to link document' } });
  }
});

/**
 * DELETE /assets/:id/documents/:documentId
 * Unlink a document from an asset
 */
router.delete('/:id/documents/:documentId', requireRole(['ADMIN']), async (req, res) => {
  try {
    const id = req.params.id;
    const documentId = req.params.documentId;

    if (!id || !documentId) {
      return res.status(400).json({ error: { message: 'Asset ID and Document ID are required' } });
    }

    await prisma.documentAsset.delete({
      where: {
        documentId_assetId: { documentId, assetId: id },
      },
    });

    return res.json({ data: { success: true } });
  } catch (error) {
    console.error('Error unlinking document from asset:', error);
    return res.status(500).json({ error: { message: 'Failed to unlink document' } });
  }
});

export default router;
