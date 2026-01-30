import { prisma } from '../lib/prisma';
import type { Document, Asset, DocumentAsset } from '../generated/prisma/client';
import { Prisma } from '../generated/prisma/client';
import { getAncestors } from './assetService';

/**
 * Document Service
 * Handles document operations including inheritance from ancestors.
 * Documents automatically apply to all descendants of assigned assets.
 */

// Document with its asset assignments
export interface DocumentWithAssets extends Document {
  assets: (DocumentAsset & { asset: Asset })[];
}

// Document with inheritance source info
export interface InheritedDocument {
  document: Document;
  source: 'direct' | 'inherited' | 'factory-wide';
  sourceAsset?: Asset; // The asset this document was assigned to (for inherited docs)
}

/**
 * Get all documents for an asset, including:
 * 1. Documents directly assigned to this asset
 * 2. Documents inherited from ancestors (documents assigned to parent, grandparent, etc.)
 * 3. Factory-wide documents
 *
 * Documents with appliesToChildren=true are inherited by all descendants.
 */
export async function getDocumentsForAsset(
  assetId: string,
  options: {
    type?: string | undefined;
    language?: string | undefined;
    includeSource?: boolean | undefined;
  } = {}
): Promise<InheritedDocument[]> {
  const result: InheritedDocument[] = [];
  const seenDocumentIds = new Set<string>();

  // 1. Get documents directly assigned to this asset
  const directDocuments = await prisma.documentAsset.findMany({
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
  const ancestors = await getAncestors(assetId);

  for (const ancestor of ancestors) {
    const ancestorDocuments = await prisma.documentAsset.findMany({
      where: { assetId: ancestor.id },
      include: {
        document: true,
        asset: true,
      },
    });

    for (const da of ancestorDocuments) {
      // Skip if we already have this document (direct takes precedence)
      if (seenDocumentIds.has(da.document.id)) continue;
      // Only inherit documents that explicitly opt in
      if (!da.document.appliesToChildren) continue;

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
  const factoryWideDocuments = await prisma.document.findMany({
    where: { isFactoryWide: true },
  });

  for (const doc of factoryWideDocuments) {
    // Skip if we already have this document
    if (seenDocumentIds.has(doc.id)) continue;

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
export async function getDirectDocumentsForAsset(
  assetId: string,
  options: {
    type?: string | undefined;
    language?: string | undefined;
  } = {}
): Promise<Document[]> {
  const documentAssets = await prisma.documentAsset.findMany({
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
export async function getAssetsForDocument(documentId: string): Promise<Asset[]> {
  const documentAssets = await prisma.documentAsset.findMany({
    where: { documentId },
    include: { asset: true },
  });

  return documentAssets.map((da) => da.asset);
}

/**
 * Link a document to multiple assets
 */
export async function linkDocumentToAssets(
  documentId: string,
  assetIds: string[],
  options: { isPrimary?: boolean | undefined } = {}
): Promise<DocumentAsset[]> {
  const results: DocumentAsset[] = [];

  for (const assetId of assetIds) {
    // Check if link already exists
    const existing = await prisma.documentAsset.findUnique({
      where: {
        documentId_assetId: { documentId, assetId },
      },
    });

    if (existing) {
      // Update isPrimary if needed
      if (options.isPrimary !== undefined && existing.isPrimary !== options.isPrimary) {
        const updated = await prisma.documentAsset.update({
          where: { id: existing.id },
          data: { isPrimary: options.isPrimary },
        });
        results.push(updated);
      } else {
        results.push(existing);
      }
    } else {
      // Create new link
      const created = await prisma.documentAsset.create({
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
export async function unlinkDocumentFromAssets(
  documentId: string,
  assetIds: string[]
): Promise<number> {
  const result = await prisma.documentAsset.deleteMany({
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
export async function unlinkDocumentFromAllAssets(documentId: string): Promise<number> {
  const result = await prisma.documentAsset.deleteMany({
    where: { documentId },
  });

  return result.count;
}

/**
 * Set a document as factory-wide (applies to all assets)
 */
export async function setDocumentFactoryWide(
  documentId: string,
  isFactoryWide: boolean
): Promise<Document> {
  return prisma.document.update({
    where: { id: documentId },
    data: { isFactoryWide },
  });
}

/**
 * Get all factory-wide documents
 */
export async function getFactoryWideDocuments(
  options: {
    type?: string | undefined;
    language?: string | undefined;
  } = {}
): Promise<Document[]> {
  const where: Record<string, unknown> = { isFactoryWide: true };

  if (options.type) {
    where.type = options.type;
  }

  if (options.language) {
    where.language = options.language;
  }

  return prisma.document.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Search documents by title with optional asset filtering
 */
export async function searchDocuments(
  query: string,
  options: {
    assetId?: string | undefined;
    type?: string | undefined;
    language?: string | undefined;
    includeInherited?: boolean | undefined;
    limit?: number | undefined;
  } = {}
): Promise<Document[]> {
  // If searching within an asset context with inheritance
  if (options.assetId && options.includeInherited) {
    const inherited = await getDocumentsForAsset(options.assetId, {
      type: options.type,
      language: options.language,
    });

    // Filter by query
    const filtered = inherited.filter((item) =>
      item.document.title.toLowerCase().includes(query.toLowerCase())
    );

    return filtered.slice(0, options.limit || 50).map((item) => item.document);
  }

  // Direct database search
  const where: Record<string, unknown> = {
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

  return prisma.document.findMany({
    where,
    take: options.limit || 50,
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Get document statistics for an asset (including inherited)
 */
export async function getDocumentStatsForAsset(assetId: string): Promise<{
  total: number;
  direct: number;
  inherited: number;
  factoryWide: number;
  byType: Record<string, number>;
}> {
  const documents = await getDocumentsForAsset(assetId);

  const stats = {
    total: documents.length,
    direct: 0,
    inherited: 0,
    factoryWide: 0,
    byType: {} as Record<string, number>,
  };

  for (const item of documents) {
    // Count by source
    if (item.source === 'direct') stats.direct++;
    else if (item.source === 'inherited') stats.inherited++;
    else if (item.source === 'factory-wide') stats.factoryWide++;

    // Count by type
    const type = item.document.type;
    stats.byType[type] = (stats.byType[type] || 0) + 1;
  }

  return stats;
}

/**
 * Helper: Check if a document matches the given filters
 */
function matchesFilters(
  document: Document,
  filters: {
    type?: string | undefined;
    language?: string | undefined;
  }
): boolean {
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
export async function createDocumentWithAssets(
  data: {
    title: string;
    type: 'MANUAL' | 'SOP' | 'TROUBLESHOOTING' | 'OTHER';
    filePath: string;
    fileSize?: number | undefined;
    mimeType?: string | undefined;
    language?: string | undefined;
    version?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    uploadedById: string;
    isFactoryWide?: boolean | undefined;
    appliesToChildren?: boolean | undefined;
    assetIds?: string[] | undefined;
  }
): Promise<DocumentWithAssets> {
  const document = await prisma.document.create({
    data: {
      title: data.title,
      type: data.type,
      filePath: data.filePath,
      fileSize: data.fileSize || null,
      mimeType: data.mimeType || null,
      language: data.language || 'en',
      version: data.version || null,
      metadata: data.metadata ? (data.metadata as Prisma.InputJsonValue) : Prisma.JsonNull,
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
  const result = await prisma.document.findUnique({
    where: { id: document.id },
    include: {
      assets: {
        include: { asset: true },
      },
    },
  });

  return result as DocumentWithAssets;
}

/**
 * Update document asset assignments (replace all)
 */
export async function updateDocumentAssets(
  documentId: string,
  assetIds: string[]
): Promise<DocumentWithAssets> {
  // Remove all existing links
  await prisma.documentAsset.deleteMany({
    where: { documentId },
  });

  // Create new links
  if (assetIds.length > 0) {
    await prisma.documentAsset.createMany({
      data: assetIds.map((assetId) => ({
        documentId,
        assetId,
        isPrimary: false,
      })),
    });
  }

  // Fetch and return updated document
  const result = await prisma.document.findUnique({
    where: { id: documentId },
    include: {
      assets: {
        include: { asset: true },
      },
    },
  });

  return result as DocumentWithAssets;
}
