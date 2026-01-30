import { prisma } from '../lib/prisma';
import { Prisma } from '../generated/prisma/client';
import type { Asset } from '../generated/prisma/client';

/**
 * Asset Service
 * Handles hierarchical asset operations including path computation,
 * ancestor/descendant queries, and translation utilities.
 */

// Type for creating a new asset
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

// Type for updating an asset
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
export async function getAncestors(assetId: string): Promise<Asset[]> {
  const ancestors: Asset[] = [];

  // First, get the starting asset to find its parent
  const startingAsset = await prisma.asset.findUnique({
    where: { id: assetId },
  });

  if (!startingAsset || !startingAsset.parentId) {
    return ancestors; // No ancestors if no parent
  }

  let currentId: string | null = startingAsset.parentId;

  while (currentId) {
    const currentAsset: Asset | null = await prisma.asset.findUnique({
      where: { id: currentId },
    });

    if (!currentAsset) break;

    ancestors.push(currentAsset);
    currentId = currentAsset.parentId;
  }

  return ancestors.reverse(); // Return from root to immediate parent
}

/**
 * Get all descendants of an asset (recursive children)
 */
export async function getDescendants(assetId: string): Promise<Asset[]> {
  const descendants: Asset[] = [];

  async function fetchChildren(parentId: string): Promise<void> {
    const children = await prisma.asset.findMany({
      where: { parentId },
      orderBy: { name: 'asc' },
    });

    for (const child of children) {
      descendants.push(child);
      await fetchChildren(child.id);
    }
  }

  await fetchChildren(assetId);
  return descendants;
}

/**
 * Get direct children of an asset
 */
export async function getChildren(assetId: string): Promise<Asset[]> {
  return prisma.asset.findMany({
    where: { parentId: assetId },
    orderBy: { name: 'asc' },
  });
}

/**
 * Build the path string for an asset based on its ancestors
 */
export function buildPathString(
  name: string,
  ancestors: Asset[],
  separator = ' / '
): string {
  const ancestorNames = ancestors.map((a) => a.name);
  return [...ancestorNames, name].join(separator);
}

/**
 * Build translated path strings for all supported languages
 */
export function buildPathStringTranslations(
  name: string,
  nameTranslations: Record<string, string> | null,
  ancestors: Asset[],
  supportedLanguages: string[],
  primaryLanguage: string,
  separator = ' / '
): Record<string, string> {
  const translations: Record<string, string> = {};

  for (const lang of supportedLanguages) {
    if (lang === primaryLanguage) continue; // Primary language uses pathString

    const ancestorNames = ancestors.map((a) => {
      const trans = a.nameTranslations as Record<string, string> | null;
      return trans?.[lang] || a.name;
    });

    const currentName = nameTranslations?.[lang] || name;
    translations[lang] = [...ancestorNames, currentName].join(separator);
  }

  return translations;
}

/**
 * Get the translated name for an asset in a specific language
 */
export function getTranslatedName(
  asset: Asset,
  language: string,
  primaryLanguage: string
): string {
  if (language === primaryLanguage) {
    return asset.name;
  }
  const translations = asset.nameTranslations as Record<string, string> | null;
  return translations?.[language] || asset.name;
}

/**
 * Get the translated path string for an asset in a specific language
 */
export function getTranslatedPathString(
  asset: Asset,
  language: string,
  primaryLanguage: string
): string {
  if (language === primaryLanguage) {
    return asset.pathString;
  }
  const translations = asset.pathStringTranslations as Record<string, string> | null;
  return translations?.[language] || asset.pathString;
}

/**
 * Create a new asset with computed path strings
 */
export async function createAsset(
  input: CreateAssetInput,
  supportedLanguages: string[] = ['en'],
  primaryLanguage = 'en'
): Promise<Asset> {
  let depth = 0;
  let ancestors: Asset[] = [];

  if (input.parentId) {
    ancestors = await getAncestors(input.parentId);
    const parent = await prisma.asset.findUnique({
      where: { id: input.parentId },
    });
    if (parent) {
      ancestors.push(parent);
      depth = parent.depth + 1;
    }
  }

  const pathString = buildPathString(input.name, ancestors);
  const pathStringTranslations = buildPathStringTranslations(
    input.name,
    input.nameTranslations || null,
    ancestors,
    supportedLanguages,
    primaryLanguage
  );

  return prisma.asset.create({
    data: {
      name: input.name,
      nameTranslations: input.nameTranslations
        ? (input.nameTranslations as Prisma.InputJsonValue)
        : Prisma.JsonNull,
      code: input.code || null,
      levelType: input.levelType,
      depth,
      pathString,
      pathStringTranslations:
        Object.keys(pathStringTranslations).length > 0
          ? (pathStringTranslations as Prisma.InputJsonValue)
          : Prisma.JsonNull,
      status: input.status || null,
      statusReason: input.statusReason || null,
      criticality: input.criticality || null,
      attributes: input.attributes
        ? (input.attributes as Prisma.InputJsonValue)
        : Prisma.JsonNull,
      commissionedAt: input.commissionedAt || null,
      ...(input.parentId ? { parent: { connect: { id: input.parentId } } } : {}),
    },
  });
}

/**
 * Update an asset and propagate path string changes to descendants if name changed
 */
export async function updateAsset(
  assetId: string,
  input: UpdateAssetInput,
  supportedLanguages: string[] = ['en'],
  primaryLanguage = 'en'
): Promise<Asset> {
  const existing = await prisma.asset.findUnique({
    where: { id: assetId },
  });

  if (!existing) {
    throw new Error(`Asset not found: ${assetId}`);
  }

  const nameChanged =
    input.name !== undefined && input.name !== existing.name;
  const translationsChanged =
    input.nameTranslations !== undefined &&
    JSON.stringify(input.nameTranslations) !==
      JSON.stringify(existing.nameTranslations);

  // Build update data object, only including defined fields
  const updateData: Record<string, unknown> = {};
  if (input.name !== undefined) updateData.name = input.name;
  if (input.nameTranslations !== undefined) {
    updateData.nameTranslations = input.nameTranslations || Prisma.JsonNull;
  }
  if (input.code !== undefined) updateData.code = input.code;
  if (input.status !== undefined) updateData.status = input.status;
  if (input.statusReason !== undefined) updateData.statusReason = input.statusReason;
  if (input.criticality !== undefined) updateData.criticality = input.criticality;
  if (input.attributes !== undefined) {
    updateData.attributes = input.attributes || Prisma.JsonNull;
  }
  if (input.commissionedAt !== undefined) updateData.commissionedAt = input.commissionedAt;

  // Update the asset
  const updated = await prisma.asset.update({
    where: { id: assetId },
    data: updateData as Prisma.AssetUpdateInput,
  });

  // If name changed, update path strings for this asset and all descendants
  if (nameChanged || translationsChanged) {
    await updatePathStrings(assetId, supportedLanguages, primaryLanguage);
  }

  return updated;
}

/**
 * Update path strings for an asset and all its descendants
 */
async function updatePathStrings(
  assetId: string,
  supportedLanguages: string[],
  primaryLanguage: string
): Promise<void> {
  const asset = await prisma.asset.findUnique({
    where: { id: assetId },
  });

  if (!asset) return;

  const ancestors = await getAncestors(assetId);
  const pathString = buildPathString(asset.name, ancestors);
  const nameTranslations = asset.nameTranslations as Record<string, string> | null;
  const pathStringTranslations = buildPathStringTranslations(
    asset.name,
    nameTranslations,
    ancestors,
    supportedLanguages,
    primaryLanguage
  );

  await prisma.asset.update({
    where: { id: assetId },
    data: {
      pathString,
      pathStringTranslations:
        Object.keys(pathStringTranslations).length > 0
          ? (pathStringTranslations as Prisma.InputJsonValue)
          : Prisma.JsonNull,
    },
  });

  // Update all descendants
  const descendants = await getDescendants(assetId);
  for (const descendant of descendants) {
    const descAncestors = await getAncestors(descendant.id);
    const descNameTranslations = descendant.nameTranslations as Record<string, string> | null;
    const descPathString = buildPathString(descendant.name, descAncestors);
    const descPathTranslations = buildPathStringTranslations(
      descendant.name,
      descNameTranslations,
      descAncestors,
      supportedLanguages,
      primaryLanguage
    );

    await prisma.asset.update({
      where: { id: descendant.id },
      data: {
        pathString: descPathString,
        pathStringTranslations:
          Object.keys(descPathTranslations).length > 0
            ? (descPathTranslations as Prisma.InputJsonValue)
            : Prisma.JsonNull,
      },
    });
  }
}

/**
 * Delete an asset (will cascade to children due to onDelete: Cascade)
 */
export async function deleteAsset(assetId: string): Promise<void> {
  await prisma.asset.delete({
    where: { id: assetId },
  });
}

/**
 * Move an asset to a new parent (or to root if newParentId is null).
 * Validates no circular reference, updates depth, pathString for asset + descendants.
 */
export async function moveAsset(
  assetId: string,
  newParentId: string | null,
  supportedLanguages: string[] = ['en'],
  primaryLanguage = 'en'
): Promise<Asset> {
  const asset = await prisma.asset.findUnique({ where: { id: assetId } });
  if (!asset) throw new Error(`Asset not found: ${assetId}`);

  // Prevent no-op moves
  if (asset.parentId === newParentId) {
    return asset;
  }

  let newDepth = 0;

  if (newParentId) {
    const newParent = await prisma.asset.findUnique({ where: { id: newParentId } });
    if (!newParent) throw new Error(`New parent not found: ${newParentId}`);

    // Check for circular reference: newParent must not be a descendant of asset
    const descendants = await getDescendants(assetId);
    const descendantIds = new Set(descendants.map((d) => d.id));
    if (descendantIds.has(newParentId)) {
      throw new Error('Cannot move asset under its own descendant');
    }

    newDepth = newParent.depth + 1;
  }

  // Update the asset's parentId and depth
  const updated = await prisma.asset.update({
    where: { id: assetId },
    data: {
      parentId: newParentId,
      depth: newDepth,
    },
  });

  // Update depth for all descendants
  const descendants = await getDescendants(assetId);
  for (const desc of descendants) {
    const descParent = await prisma.asset.findUnique({
      where: { id: desc.parentId! },
      select: { depth: true },
    });
    if (descParent) {
      await prisma.asset.update({
        where: { id: desc.id },
        data: { depth: descParent.depth + 1 },
      });
    }
  }

  // Recompute path strings for moved asset + all descendants
  await updatePathStrings(assetId, supportedLanguages, primaryLanguage);

  // Re-fetch to return updated data
  return prisma.asset.findUnique({ where: { id: assetId } }) as Promise<Asset>;
}

/**
 * Get asset tree for a root asset (machine)
 * Returns the asset with all nested children
 */
export async function getAssetTree(
  rootAssetId: string
): Promise<Asset & { children: Asset[] }> {
  const root = await prisma.asset.findUnique({
    where: { id: rootAssetId },
    include: {
      children: {
        include: {
          children: {
            include: {
              children: true, // 3 levels deep
            },
          },
        },
      },
    },
  });

  if (!root) {
    throw new Error(`Asset not found: ${rootAssetId}`);
  }

  return root as Asset & { children: Asset[] };
}

/**
 * Get all root assets (machines - depth 0)
 */
export async function getRootAssets(): Promise<Asset[]> {
  return prisma.asset.findMany({
    where: { depth: 0 },
    orderBy: { name: 'asc' },
  });
}

/**
 * Search assets by name (supports partial matching and translations)
 */
export async function searchAssets(
  query: string,
  options: {
    parentId?: string;
    levelType?: string;
    limit?: number;
  } = {}
): Promise<Asset[]> {
  const where: Prisma.AssetWhereInput = {
    OR: [
      { name: { contains: query, mode: 'insensitive' } },
      { code: { contains: query, mode: 'insensitive' } },
      { pathString: { contains: query, mode: 'insensitive' } },
    ],
  };

  if (options.parentId) {
    where.parentId = options.parentId;
  }

  if (options.levelType) {
    where.levelType = options.levelType;
  }

  return prisma.asset.findMany({
    where,
    take: options.limit || 50,
    orderBy: { name: 'asc' },
  });
}

/**
 * Get bilingual context for AI prompts
 * Returns asset path in both primary and secondary languages
 */
export function getBilingualContext(
  asset: Asset,
  primaryLanguage: string,
  secondaryLanguage: string
): { primary: string; secondary: string | null } {
  const primary = asset.pathString;
  const translations = asset.pathStringTranslations as Record<string, string> | null;
  const secondary =
    primaryLanguage !== secondaryLanguage
      ? translations?.[secondaryLanguage] || null
      : null;

  return { primary, secondary };
}
