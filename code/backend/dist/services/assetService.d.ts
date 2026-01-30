import type { Asset } from '../generated/prisma/client';
/**
 * Asset Service
 * Handles hierarchical asset operations including path computation,
 * ancestor/descendant queries, and translation utilities.
 */
export interface CreateAssetInput {
    name: string;
    nameTranslations?: Record<string, string> | undefined;
    code?: string | undefined;
    levelType: string;
    parentId?: string | undefined;
    status?: 'RUNNING' | 'DOWN' | undefined;
    statusReason?: string | undefined;
    criticality?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | undefined;
    attributes?: Record<string, unknown> | undefined;
    commissionedAt?: Date | undefined;
}
export interface UpdateAssetInput {
    name?: string | undefined;
    nameTranslations?: Record<string, string> | undefined;
    code?: string | undefined;
    status?: 'RUNNING' | 'DOWN' | undefined;
    statusReason?: string | undefined;
    criticality?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | undefined;
    attributes?: Record<string, unknown> | undefined;
    commissionedAt?: Date | undefined;
}
/**
 * Get all ancestors of an asset (from immediate parent to root)
 */
export declare function getAncestors(assetId: string): Promise<Asset[]>;
/**
 * Get all descendants of an asset (recursive children)
 */
export declare function getDescendants(assetId: string): Promise<Asset[]>;
/**
 * Get direct children of an asset
 */
export declare function getChildren(assetId: string): Promise<Asset[]>;
/**
 * Build the path string for an asset based on its ancestors
 */
export declare function buildPathString(name: string, ancestors: Asset[], separator?: string): string;
/**
 * Build translated path strings for all supported languages
 */
export declare function buildPathStringTranslations(name: string, nameTranslations: Record<string, string> | null, ancestors: Asset[], supportedLanguages: string[], primaryLanguage: string, separator?: string): Record<string, string>;
/**
 * Get the translated name for an asset in a specific language
 */
export declare function getTranslatedName(asset: Asset, language: string, primaryLanguage: string): string;
/**
 * Get the translated path string for an asset in a specific language
 */
export declare function getTranslatedPathString(asset: Asset, language: string, primaryLanguage: string): string;
/**
 * Create a new asset with computed path strings
 */
export declare function createAsset(input: CreateAssetInput, supportedLanguages?: string[], primaryLanguage?: string): Promise<Asset>;
/**
 * Update an asset and propagate path string changes to descendants if name changed
 */
export declare function updateAsset(assetId: string, input: UpdateAssetInput, supportedLanguages?: string[], primaryLanguage?: string): Promise<Asset>;
/**
 * Delete an asset (will cascade to children due to onDelete: Cascade)
 */
export declare function deleteAsset(assetId: string): Promise<void>;
/**
 * Move an asset to a new parent (or to root if newParentId is null).
 * Validates no circular reference, updates depth, pathString for asset + descendants.
 */
export declare function moveAsset(assetId: string, newParentId: string | null, supportedLanguages?: string[], primaryLanguage?: string): Promise<Asset>;
/**
 * Get asset tree for a root asset (machine)
 * Returns the asset with all nested children
 */
export declare function getAssetTree(rootAssetId: string): Promise<Asset & {
    children: Asset[];
}>;
/**
 * Get all root assets (machines - depth 0)
 */
export declare function getRootAssets(): Promise<Asset[]>;
/**
 * Search assets by name (supports partial matching and translations)
 */
export declare function searchAssets(query: string, options?: {
    parentId?: string;
    levelType?: string;
    limit?: number;
}): Promise<Asset[]>;
/**
 * Get bilingual context for AI prompts
 * Returns asset path in both primary and secondary languages
 */
export declare function getBilingualContext(asset: Asset, primaryLanguage: string, secondaryLanguage: string): {
    primary: string;
    secondary: string | null;
};
//# sourceMappingURL=assetService.d.ts.map