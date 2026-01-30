"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentsForAsset = getDocumentsForAsset;
exports.getDirectDocumentsForAsset = getDirectDocumentsForAsset;
exports.getAssetsForDocument = getAssetsForDocument;
exports.linkDocumentToAssets = linkDocumentToAssets;
exports.unlinkDocumentFromAssets = unlinkDocumentFromAssets;
exports.unlinkDocumentFromAllAssets = unlinkDocumentFromAllAssets;
exports.setDocumentFactoryWide = setDocumentFactoryWide;
exports.getFactoryWideDocuments = getFactoryWideDocuments;
exports.searchDocuments = searchDocuments;
exports.getDocumentStatsForAsset = getDocumentStatsForAsset;
exports.createDocumentWithAssets = createDocumentWithAssets;
exports.updateDocumentAssets = updateDocumentAssets;
const prisma_1 = require("../lib/prisma");
const client_1 = require("../generated/prisma/client");
const assetService_1 = require("./assetService");
/**
 * Get all documents for an asset, including:
 * 1. Documents directly assigned to this asset
 * 2. Documents inherited from ancestors (documents assigned to parent, grandparent, etc.)
 * 3. Factory-wide documents
 *
 * Documents with appliesToChildren=true are inherited by all descendants.
 */
async function getDocumentsForAsset(assetId, options = {}) {
    const result = [];
    const seenDocumentIds = new Set();
    // 1. Get documents directly assigned to this asset
    const directDocuments = await prisma_1.prisma.documentAsset.findMany({
        where: { assetId },
        include: {
            document: true,
            asset: true,
        },
    });
    for (const da of directDocuments) {
        if (matchesFilters(da.document, options)) {
            seenDocumentIds.add(da.document.id);
            result.push({
                document: da.document,
                source: 'direct',
                sourceAsset: da.asset,
            });
        }
    }
    // 2. Get documents inherited from ancestors
    const ancestors = await (0, assetService_1.getAncestors)(assetId);
    for (const ancestor of ancestors) {
        const ancestorDocuments = await prisma_1.prisma.documentAsset.findMany({
            where: { assetId: ancestor.id },
            include: {
                document: true,
                asset: true,
            },
        });
        for (const da of ancestorDocuments) {
            // Skip if we already have this document (direct takes precedence)
            if (seenDocumentIds.has(da.document.id))
                continue;
            // Only inherit documents that explicitly opt in
            if (!da.document.appliesToChildren)
                continue;
            if (matchesFilters(da.document, options)) {
                seenDocumentIds.add(da.document.id);
                result.push({
                    document: da.document,
                    source: 'inherited',
                    sourceAsset: da.asset,
                });
            }
        }
    }
    // 3. Get factory-wide documents
    const factoryWideDocuments = await prisma_1.prisma.document.findMany({
        where: { isFactoryWide: true },
    });
    for (const doc of factoryWideDocuments) {
        // Skip if we already have this document
        if (seenDocumentIds.has(doc.id))
            continue;
        if (matchesFilters(doc, options)) {
            seenDocumentIds.add(doc.id);
            result.push({
                document: doc,
                source: 'factory-wide',
            });
        }
    }
    return result;
}
/**
 * Get only directly assigned documents for an asset (no inheritance)
 */
async function getDirectDocumentsForAsset(assetId, options = {}) {
    const documentAssets = await prisma_1.prisma.documentAsset.findMany({
        where: { assetId },
        include: { document: true },
    });
    return documentAssets
        .map((da) => da.document)
        .filter((doc) => matchesFilters(doc, options));
}
/**
 * Get all assets a document is assigned to
 */
async function getAssetsForDocument(documentId) {
    const documentAssets = await prisma_1.prisma.documentAsset.findMany({
        where: { documentId },
        include: { asset: true },
    });
    return documentAssets.map((da) => da.asset);
}
/**
 * Link a document to multiple assets
 */
async function linkDocumentToAssets(documentId, assetIds, options = {}) {
    const results = [];
    for (const assetId of assetIds) {
        // Check if link already exists
        const existing = await prisma_1.prisma.documentAsset.findUnique({
            where: {
                documentId_assetId: { documentId, assetId },
            },
        });
        if (existing) {
            // Update isPrimary if needed
            if (options.isPrimary !== undefined && existing.isPrimary !== options.isPrimary) {
                const updated = await prisma_1.prisma.documentAsset.update({
                    where: { id: existing.id },
                    data: { isPrimary: options.isPrimary },
                });
                results.push(updated);
            }
            else {
                results.push(existing);
            }
        }
        else {
            // Create new link
            const created = await prisma_1.prisma.documentAsset.create({
                data: {
                    documentId,
                    assetId,
                    isPrimary: options.isPrimary || false,
                },
            });
            results.push(created);
        }
    }
    return results;
}
/**
 * Unlink a document from specific assets
 */
async function unlinkDocumentFromAssets(documentId, assetIds) {
    const result = await prisma_1.prisma.documentAsset.deleteMany({
        where: {
            documentId,
            assetId: { in: assetIds },
        },
    });
    return result.count;
}
/**
 * Unlink a document from all assets
 */
async function unlinkDocumentFromAllAssets(documentId) {
    const result = await prisma_1.prisma.documentAsset.deleteMany({
        where: { documentId },
    });
    return result.count;
}
/**
 * Set a document as factory-wide (applies to all assets)
 */
async function setDocumentFactoryWide(documentId, isFactoryWide) {
    return prisma_1.prisma.document.update({
        where: { id: documentId },
        data: { isFactoryWide },
    });
}
/**
 * Get all factory-wide documents
 */
async function getFactoryWideDocuments(options = {}) {
    const where = { isFactoryWide: true };
    if (options.type) {
        where.type = options.type;
    }
    if (options.language) {
        where.language = options.language;
    }
    return prisma_1.prisma.document.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    });
}
/**
 * Search documents by title with optional asset filtering
 */
async function searchDocuments(query, options = {}) {
    // If searching within an asset context with inheritance
    if (options.assetId && options.includeInherited) {
        const inherited = await getDocumentsForAsset(options.assetId, {
            type: options.type,
            language: options.language,
        });
        // Filter by query
        const filtered = inherited.filter((item) => item.document.title.toLowerCase().includes(query.toLowerCase()));
        return filtered.slice(0, options.limit || 50).map((item) => item.document);
    }
    // Direct database search
    const where = {
        title: { contains: query, mode: 'insensitive' },
    };
    if (options.type) {
        where.type = options.type;
    }
    if (options.language) {
        where.language = options.language;
    }
    // If filtering by specific asset (no inheritance)
    if (options.assetId && !options.includeInherited) {
        where.assets = {
            some: { assetId: options.assetId },
        };
    }
    return prisma_1.prisma.document.findMany({
        where,
        take: options.limit || 50,
        orderBy: { createdAt: 'desc' },
    });
}
/**
 * Get document statistics for an asset (including inherited)
 */
async function getDocumentStatsForAsset(assetId) {
    const documents = await getDocumentsForAsset(assetId);
    const stats = {
        total: documents.length,
        direct: 0,
        inherited: 0,
        factoryWide: 0,
        byType: {},
    };
    for (const item of documents) {
        // Count by source
        if (item.source === 'direct')
            stats.direct++;
        else if (item.source === 'inherited')
            stats.inherited++;
        else if (item.source === 'factory-wide')
            stats.factoryWide++;
        // Count by type
        const type = item.document.type;
        stats.byType[type] = (stats.byType[type] || 0) + 1;
    }
    return stats;
}
/**
 * Helper: Check if a document matches the given filters
 */
function matchesFilters(document, filters) {
    if (filters.type && document.type !== filters.type) {
        return false;
    }
    if (filters.language && document.language !== filters.language) {
        return false;
    }
    return true;
}
/**
 * Create a document with asset assignments
 */
async function createDocumentWithAssets(data) {
    const document = await prisma_1.prisma.document.create({
        data: {
            title: data.title,
            type: data.type,
            filePath: data.filePath,
            fileSize: data.fileSize || null,
            mimeType: data.mimeType || null,
            language: data.language || 'en',
            version: data.version || null,
            metadata: data.metadata ? data.metadata : client_1.Prisma.JsonNull,
            uploadedById: data.uploadedById,
            isFactoryWide: data.isFactoryWide || false,
            appliesToChildren: data.appliesToChildren || false,
        },
    });
    // Link to assets if provided
    if (data.assetIds && data.assetIds.length > 0) {
        await linkDocumentToAssets(document.id, data.assetIds);
    }
    // Fetch the complete document with assets
    const result = await prisma_1.prisma.document.findUnique({
        where: { id: document.id },
        include: {
            assets: {
                include: { asset: true },
            },
        },
    });
    return result;
}
/**
 * Update document asset assignments (replace all)
 */
async function updateDocumentAssets(documentId, assetIds) {
    // Remove all existing links
    await prisma_1.prisma.documentAsset.deleteMany({
        where: { documentId },
    });
    // Create new links
    if (assetIds.length > 0) {
        await prisma_1.prisma.documentAsset.createMany({
            data: assetIds.map((assetId) => ({
                documentId,
                assetId,
                isPrimary: false,
            })),
        });
    }
    // Fetch and return updated document
    const result = await prisma_1.prisma.document.findUnique({
        where: { id: documentId },
        include: {
            assets: {
                include: { asset: true },
            },
        },
    });
    return result;
}
//# sourceMappingURL=documentService.js.map