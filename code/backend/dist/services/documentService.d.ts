import type { Document, Asset, DocumentAsset } from '../generated/prisma/client';
/**
 * Document Service
 * Handles document operations including inheritance from ancestors.
 * Documents automatically apply to all descendants of assigned assets.
 */
export interface DocumentWithAssets extends Document {
    assets: (DocumentAsset & {
        asset: Asset;
    })[];
}
export interface InheritedDocument {
    document: Document;
    source: 'direct' | 'inherited' | 'factory-wide';
    sourceAsset?: Asset;
}
/**
 * Get all documents for an asset, including:
 * 1. Documents directly assigned to this asset
 * 2. Documents inherited from ancestors (documents assigned to parent, grandparent, etc.)
 * 3. Factory-wide documents
 *
 * Documents with appliesToChildren=true are inherited by all descendants.
 */
export declare function getDocumentsForAsset(assetId: string, options?: {
    type?: string | undefined;
    language?: string | undefined;
    includeSource?: boolean | undefined;
}): Promise<InheritedDocument[]>;
/**
 * Get only directly assigned documents for an asset (no inheritance)
 */
export declare function getDirectDocumentsForAsset(assetId: string, options?: {
    type?: string | undefined;
    language?: string | undefined;
}): Promise<Document[]>;
/**
 * Get all assets a document is assigned to
 */
export declare function getAssetsForDocument(documentId: string): Promise<Asset[]>;
/**
 * Link a document to multiple assets
 */
export declare function linkDocumentToAssets(documentId: string, assetIds: string[], options?: {
    isPrimary?: boolean | undefined;
}): Promise<DocumentAsset[]>;
/**
 * Unlink a document from specific assets
 */
export declare function unlinkDocumentFromAssets(documentId: string, assetIds: string[]): Promise<number>;
/**
 * Unlink a document from all assets
 */
export declare function unlinkDocumentFromAllAssets(documentId: string): Promise<number>;
/**
 * Set a document as factory-wide (applies to all assets)
 */
export declare function setDocumentFactoryWide(documentId: string, isFactoryWide: boolean): Promise<Document>;
/**
 * Get all factory-wide documents
 */
export declare function getFactoryWideDocuments(options?: {
    type?: string | undefined;
    language?: string | undefined;
}): Promise<Document[]>;
/**
 * Search documents by title with optional asset filtering
 */
export declare function searchDocuments(query: string, options?: {
    assetId?: string | undefined;
    type?: string | undefined;
    language?: string | undefined;
    includeInherited?: boolean | undefined;
    limit?: number | undefined;
}): Promise<Document[]>;
/**
 * Get document statistics for an asset (including inherited)
 */
export declare function getDocumentStatsForAsset(assetId: string): Promise<{
    total: number;
    direct: number;
    inherited: number;
    factoryWide: number;
    byType: Record<string, number>;
}>;
/**
 * Create a document with asset assignments
 */
export declare function createDocumentWithAssets(data: {
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
}): Promise<DocumentWithAssets>;
/**
 * Update document asset assignments (replace all)
 */
export declare function updateDocumentAssets(documentId: string, assetIds: string[]): Promise<DocumentWithAssets>;
//# sourceMappingURL=documentService.d.ts.map