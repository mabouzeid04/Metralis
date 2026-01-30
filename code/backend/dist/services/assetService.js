"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAncestors = getAncestors;
exports.getDescendants = getDescendants;
exports.getChildren = getChildren;
exports.buildPathString = buildPathString;
exports.buildPathStringTranslations = buildPathStringTranslations;
exports.getTranslatedName = getTranslatedName;
exports.getTranslatedPathString = getTranslatedPathString;
exports.createAsset = createAsset;
exports.updateAsset = updateAsset;
exports.deleteAsset = deleteAsset;
exports.moveAsset = moveAsset;
exports.getAssetTree = getAssetTree;
exports.getRootAssets = getRootAssets;
exports.searchAssets = searchAssets;
exports.getBilingualContext = getBilingualContext;
const prisma_1 = require("../lib/prisma");
const client_1 = require("../generated/prisma/client");
/**
 * Get all ancestors of an asset (from immediate parent to root)
 */
async function getAncestors(assetId) {
    const ancestors = [];
    // First, get the starting asset to find its parent
    const startingAsset = await prisma_1.prisma.asset.findUnique({
        where: { id: assetId },
    });
    if (!startingAsset || !startingAsset.parentId) {
        return ancestors; // No ancestors if no parent
    }
    let currentId = startingAsset.parentId;
    while (currentId) {
        const currentAsset = await prisma_1.prisma.asset.findUnique({
            where: { id: currentId },
        });
        if (!currentAsset)
            break;
        ancestors.push(currentAsset);
        currentId = currentAsset.parentId;
    }
    return ancestors.reverse(); // Return from root to immediate parent
}
/**
 * Get all descendants of an asset (recursive children)
 */
async function getDescendants(assetId) {
    const descendants = [];
    async function fetchChildren(parentId) {
        const children = await prisma_1.prisma.asset.findMany({
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
async function getChildren(assetId) {
    return prisma_1.prisma.asset.findMany({
        where: { parentId: assetId },
        orderBy: { name: 'asc' },
    });
}
/**
 * Build the path string for an asset based on its ancestors
 */
function buildPathString(name, ancestors, separator = ' / ') {
    const ancestorNames = ancestors.map((a) => a.name);
    return [...ancestorNames, name].join(separator);
}
/**
 * Build translated path strings for all supported languages
 */
function buildPathStringTranslations(name, nameTranslations, ancestors, supportedLanguages, primaryLanguage, separator = ' / ') {
    const translations = {};
    for (const lang of supportedLanguages) {
        if (lang === primaryLanguage)
            continue; // Primary language uses pathString
        const ancestorNames = ancestors.map((a) => {
            const trans = a.nameTranslations;
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
function getTranslatedName(asset, language, primaryLanguage) {
    if (language === primaryLanguage) {
        return asset.name;
    }
    const translations = asset.nameTranslations;
    return translations?.[language] || asset.name;
}
/**
 * Get the translated path string for an asset in a specific language
 */
function getTranslatedPathString(asset, language, primaryLanguage) {
    if (language === primaryLanguage) {
        return asset.pathString;
    }
    const translations = asset.pathStringTranslations;
    return translations?.[language] || asset.pathString;
}
/**
 * Create a new asset with computed path strings
 */
async function createAsset(input, supportedLanguages = ['en'], primaryLanguage = 'en') {
    let depth = 0;
    let ancestors = [];
    if (input.parentId) {
        ancestors = await getAncestors(input.parentId);
        const parent = await prisma_1.prisma.asset.findUnique({
            where: { id: input.parentId },
        });
        if (parent) {
            ancestors.push(parent);
            depth = parent.depth + 1;
        }
    }
    const pathString = buildPathString(input.name, ancestors);
    const pathStringTranslations = buildPathStringTranslations(input.name, input.nameTranslations || null, ancestors, supportedLanguages, primaryLanguage);
    return prisma_1.prisma.asset.create({
        data: {
            name: input.name,
            nameTranslations: input.nameTranslations
                ? input.nameTranslations
                : client_1.Prisma.JsonNull,
            code: input.code || null,
            levelType: input.levelType,
            depth,
            pathString,
            pathStringTranslations: Object.keys(pathStringTranslations).length > 0
                ? pathStringTranslations
                : client_1.Prisma.JsonNull,
            status: input.status || null,
            statusReason: input.statusReason || null,
            criticality: input.criticality || null,
            attributes: input.attributes
                ? input.attributes
                : client_1.Prisma.JsonNull,
            commissionedAt: input.commissionedAt || null,
            ...(input.parentId ? { parent: { connect: { id: input.parentId } } } : {}),
        },
    });
}
/**
 * Update an asset and propagate path string changes to descendants if name changed
 */
async function updateAsset(assetId, input, supportedLanguages = ['en'], primaryLanguage = 'en') {
    const existing = await prisma_1.prisma.asset.findUnique({
        where: { id: assetId },
    });
    if (!existing) {
        throw new Error(`Asset not found: ${assetId}`);
    }
    const nameChanged = input.name !== undefined && input.name !== existing.name;
    const translationsChanged = input.nameTranslations !== undefined &&
        JSON.stringify(input.nameTranslations) !==
            JSON.stringify(existing.nameTranslations);
    // Build update data object, only including defined fields
    const updateData = {};
    if (input.name !== undefined)
        updateData.name = input.name;
    if (input.nameTranslations !== undefined) {
        updateData.nameTranslations = input.nameTranslations || client_1.Prisma.JsonNull;
    }
    if (input.code !== undefined)
        updateData.code = input.code;
    if (input.status !== undefined)
        updateData.status = input.status;
    if (input.statusReason !== undefined)
        updateData.statusReason = input.statusReason;
    if (input.criticality !== undefined)
        updateData.criticality = input.criticality;
    if (input.attributes !== undefined) {
        updateData.attributes = input.attributes || client_1.Prisma.JsonNull;
    }
    if (input.commissionedAt !== undefined)
        updateData.commissionedAt = input.commissionedAt;
    // Update the asset
    const updated = await prisma_1.prisma.asset.update({
        where: { id: assetId },
        data: updateData,
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
async function updatePathStrings(assetId, supportedLanguages, primaryLanguage) {
    const asset = await prisma_1.prisma.asset.findUnique({
        where: { id: assetId },
    });
    if (!asset)
        return;
    const ancestors = await getAncestors(assetId);
    const pathString = buildPathString(asset.name, ancestors);
    const nameTranslations = asset.nameTranslations;
    const pathStringTranslations = buildPathStringTranslations(asset.name, nameTranslations, ancestors, supportedLanguages, primaryLanguage);
    await prisma_1.prisma.asset.update({
        where: { id: assetId },
        data: {
            pathString,
            pathStringTranslations: Object.keys(pathStringTranslations).length > 0
                ? pathStringTranslations
                : client_1.Prisma.JsonNull,
        },
    });
    // Update all descendants
    const descendants = await getDescendants(assetId);
    for (const descendant of descendants) {
        const descAncestors = await getAncestors(descendant.id);
        const descNameTranslations = descendant.nameTranslations;
        const descPathString = buildPathString(descendant.name, descAncestors);
        const descPathTranslations = buildPathStringTranslations(descendant.name, descNameTranslations, descAncestors, supportedLanguages, primaryLanguage);
        await prisma_1.prisma.asset.update({
            where: { id: descendant.id },
            data: {
                pathString: descPathString,
                pathStringTranslations: Object.keys(descPathTranslations).length > 0
                    ? descPathTranslations
                    : client_1.Prisma.JsonNull,
            },
        });
    }
}
/**
 * Delete an asset (will cascade to children due to onDelete: Cascade)
 */
async function deleteAsset(assetId) {
    await prisma_1.prisma.asset.delete({
        where: { id: assetId },
    });
}
/**
 * Move an asset to a new parent (or to root if newParentId is null).
 * Validates no circular reference, updates depth, pathString for asset + descendants.
 */
async function moveAsset(assetId, newParentId, supportedLanguages = ['en'], primaryLanguage = 'en') {
    const asset = await prisma_1.prisma.asset.findUnique({ where: { id: assetId } });
    if (!asset)
        throw new Error(`Asset not found: ${assetId}`);
    // Prevent no-op moves
    if (asset.parentId === newParentId) {
        return asset;
    }
    let newDepth = 0;
    if (newParentId) {
        const newParent = await prisma_1.prisma.asset.findUnique({ where: { id: newParentId } });
        if (!newParent)
            throw new Error(`New parent not found: ${newParentId}`);
        // Check for circular reference: newParent must not be a descendant of asset
        const descendants = await getDescendants(assetId);
        const descendantIds = new Set(descendants.map((d) => d.id));
        if (descendantIds.has(newParentId)) {
            throw new Error('Cannot move asset under its own descendant');
        }
        newDepth = newParent.depth + 1;
    }
    // Update the asset's parentId and depth
    const updated = await prisma_1.prisma.asset.update({
        where: { id: assetId },
        data: {
            parentId: newParentId,
            depth: newDepth,
        },
    });
    // Update depth for all descendants
    const descendants = await getDescendants(assetId);
    for (const desc of descendants) {
        const descParent = await prisma_1.prisma.asset.findUnique({
            where: { id: desc.parentId },
            select: { depth: true },
        });
        if (descParent) {
            await prisma_1.prisma.asset.update({
                where: { id: desc.id },
                data: { depth: descParent.depth + 1 },
            });
        }
    }
    // Recompute path strings for moved asset + all descendants
    await updatePathStrings(assetId, supportedLanguages, primaryLanguage);
    // Re-fetch to return updated data
    return prisma_1.prisma.asset.findUnique({ where: { id: assetId } });
}
/**
 * Get asset tree for a root asset (machine)
 * Returns the asset with all nested children
 */
async function getAssetTree(rootAssetId) {
    const root = await prisma_1.prisma.asset.findUnique({
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
    return root;
}
/**
 * Get all root assets (machines - depth 0)
 */
async function getRootAssets() {
    return prisma_1.prisma.asset.findMany({
        where: { depth: 0 },
        orderBy: { name: 'asc' },
    });
}
/**
 * Search assets by name (supports partial matching and translations)
 */
async function searchAssets(query, options = {}) {
    const where = {
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
    return prisma_1.prisma.asset.findMany({
        where,
        take: options.limit || 50,
        orderBy: { name: 'asc' },
    });
}
/**
 * Get bilingual context for AI prompts
 * Returns asset path in both primary and secondary languages
 */
function getBilingualContext(asset, primaryLanguage, secondaryLanguage) {
    const primary = asset.pathString;
    const translations = asset.pathStringTranslations;
    const secondary = primaryLanguage !== secondaryLanguage
        ? translations?.[secondaryLanguage] || null
        : null;
    return { primary, secondary };
}
//# sourceMappingURL=assetService.js.map