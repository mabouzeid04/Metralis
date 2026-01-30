"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const assetService_1 = require("../services/assetService");
const factoryConfigService_1 = require("../services/factoryConfigService");
const router = (0, express_1.Router)();
// Validation schemas
const createAssetSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    nameTranslations: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).optional(),
    code: zod_1.z.string().optional(),
    levelType: zod_1.z.string().min(1, 'Level type is required'),
    parentId: zod_1.z.string().uuid().optional(),
    status: zod_1.z.enum(['RUNNING', 'DOWN']).optional(),
    statusReason: zod_1.z.string().optional(),
    criticality: zod_1.z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
    attributes: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    commissionedAt: zod_1.z.string().datetime().optional(),
});
const updateAssetSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    nameTranslations: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).optional(),
    code: zod_1.z.string().nullable().optional(),
    status: zod_1.z.enum(['RUNNING', 'DOWN']).optional(),
    statusReason: zod_1.z.string().nullable().optional(),
    criticality: zod_1.z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
    attributes: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).nullable().optional(),
    commissionedAt: zod_1.z.string().datetime().nullable().optional(),
});
router.use(auth_1.requireAuth);
/**
 * GET /assets
 * List all root assets (machines) or filter by query
 */
router.get('/', async (req, res) => {
    try {
        const { search, parentId, levelType, status } = req.query;
        // If search query provided, use search function
        if (search && typeof search === 'string') {
            const options = {
                limit: 50,
            };
            if (parentId && typeof parentId === 'string') {
                options.parentId = parentId;
            }
            if (levelType && typeof levelType === 'string') {
                options.levelType = levelType;
            }
            const assets = await (0, assetService_1.searchAssets)(search, options);
            return res.json({ data: assets });
        }
        // Build filter
        const where = {};
        if (parentId === 'null' || parentId === '') {
            // Explicitly requesting root assets
            where.parentId = null;
        }
        else if (parentId && typeof parentId === 'string') {
            where.parentId = parentId;
        }
        else if (!parentId) {
            // Default: return root assets only
            where.parentId = null;
        }
        if (levelType && typeof levelType === 'string') {
            where.levelType = levelType;
        }
        if (status && typeof status === 'string') {
            where.status = status;
        }
        const assets = await prisma_1.prisma.asset.findMany({
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
    }
    catch (error) {
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
        const asset = await prisma_1.prisma.asset.findUnique({
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
    }
    catch (error) {
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
        const tree = await (0, assetService_1.getAssetTree)(id);
        return res.json({ data: tree });
    }
    catch (error) {
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
        const children = await (0, assetService_1.getChildren)(id);
        return res.json({ data: children });
    }
    catch (error) {
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
        const ancestors = await (0, assetService_1.getAncestors)(id);
        return res.json({ data: ancestors });
    }
    catch (error) {
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
        const asset = await prisma_1.prisma.asset.findUnique({ where: { id } });
        if (!asset) {
            return res.status(404).json({ error: { message: 'Asset not found' } });
        }
        const descendants = await (0, assetService_1.getDescendants)(id);
        return res.json({ data: descendants });
    }
    catch (error) {
        console.error('Error fetching asset descendants:', error);
        return res.status(500).json({ error: { message: 'Failed to fetch descendants' } });
    }
});
/**
 * PATCH /assets/:id/move
 * Move an asset to a new parent (or to root if newParentId is null)
 */
router.patch('/:id/move', (0, auth_1.requireRole)(['ADMIN']), async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: { message: 'Asset ID is required' } });
        }
        const moveSchema = zod_1.z.object({
            newParentId: zod_1.z.string().uuid().nullable(),
        });
        const parsed = moveSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.flatten() });
        }
        const config = await (0, factoryConfigService_1.getOrCreateFactoryConfig)();
        const asset = await (0, assetService_1.moveAsset)(id, parsed.data.newParentId, config.supportedLanguages, config.primaryLanguage);
        return res.json({ data: asset });
    }
    catch (error) {
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
router.post('/', (0, auth_1.requireRole)(['ADMIN']), async (req, res) => {
    try {
        const parsed = createAssetSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.flatten() });
        }
        const config = await (0, factoryConfigService_1.getOrCreateFactoryConfig)();
        const asset = await (0, assetService_1.createAsset)({
            name: parsed.data.name,
            nameTranslations: parsed.data.nameTranslations,
            code: parsed.data.code,
            levelType: parsed.data.levelType,
            parentId: parsed.data.parentId,
            status: parsed.data.status,
            statusReason: parsed.data.statusReason,
            criticality: parsed.data.criticality,
            attributes: parsed.data.attributes,
            commissionedAt: parsed.data.commissionedAt
                ? new Date(parsed.data.commissionedAt)
                : undefined,
        }, config.supportedLanguages, config.primaryLanguage);
        return res.status(201).json({ data: asset });
    }
    catch (error) {
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
router.put('/:id', (0, auth_1.requireRole)(['ADMIN']), async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: { message: 'Asset ID is required' } });
        }
        const parsed = updateAssetSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.flatten() });
        }
        const config = await (0, factoryConfigService_1.getOrCreateFactoryConfig)();
        const asset = await (0, assetService_1.updateAsset)(id, {
            name: parsed.data.name,
            nameTranslations: parsed.data.nameTranslations,
            code: parsed.data.code ?? undefined,
            status: parsed.data.status,
            statusReason: parsed.data.statusReason ?? undefined,
            criticality: parsed.data.criticality,
            attributes: parsed.data.attributes,
            commissionedAt: parsed.data.commissionedAt
                ? new Date(parsed.data.commissionedAt)
                : undefined,
        }, config.supportedLanguages, config.primaryLanguage);
        return res.json({ data: asset });
    }
    catch (error) {
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
router.delete('/:id', (0, auth_1.requireRole)(['ADMIN']), async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: { message: 'Asset ID is required' } });
        }
        // Check if asset exists
        const existing = await prisma_1.prisma.asset.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ error: { message: 'Asset not found' } });
        }
        // Check for linked work orders on this asset
        const workOrderCount = await prisma_1.prisma.workOrder.count({
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
        const descendants = await (0, assetService_1.getDescendants)(id);
        const descendantIds = descendants.map((d) => d.id);
        if (descendantIds.length > 0) {
            const descendantWOCount = await prisma_1.prisma.workOrder.count({
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
        await (0, assetService_1.deleteAsset)(id);
        return res.json({ data: { success: true } });
    }
    catch (error) {
        console.error('Error deleting asset:', error);
        return res.status(500).json({ error: { message: 'Failed to delete asset' } });
    }
});
/**
 * POST /assets/:id/documents
 * Link a document to an asset
 */
router.post('/:id/documents', (0, auth_1.requireRole)(['ADMIN']), async (req, res) => {
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
        const asset = await prisma_1.prisma.asset.findUnique({ where: { id } });
        if (!asset) {
            return res.status(404).json({ error: { message: 'Asset not found' } });
        }
        // Check if document exists
        const document = await prisma_1.prisma.document.findUnique({ where: { id: documentId } });
        if (!document) {
            return res.status(404).json({ error: { message: 'Document not found' } });
        }
        // Create or update the link
        const link = await prisma_1.prisma.documentAsset.upsert({
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
    }
    catch (error) {
        console.error('Error linking document to asset:', error);
        return res.status(500).json({ error: { message: 'Failed to link document' } });
    }
});
/**
 * DELETE /assets/:id/documents/:documentId
 * Unlink a document from an asset
 */
router.delete('/:id/documents/:documentId', (0, auth_1.requireRole)(['ADMIN']), async (req, res) => {
    try {
        const id = req.params.id;
        const documentId = req.params.documentId;
        if (!id || !documentId) {
            return res.status(400).json({ error: { message: 'Asset ID and Document ID are required' } });
        }
        await prisma_1.prisma.documentAsset.delete({
            where: {
                documentId_assetId: { documentId, assetId: id },
            },
        });
        return res.json({ data: { success: true } });
    }
    catch (error) {
        console.error('Error unlinking document from asset:', error);
        return res.status(500).json({ error: { message: 'Failed to unlink document' } });
    }
});
exports.default = router;
//# sourceMappingURL=assets.js.map