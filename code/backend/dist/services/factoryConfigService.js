"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFactoryConfig = getFactoryConfig;
exports.getOrCreateFactoryConfig = getOrCreateFactoryConfig;
exports.createFactoryConfig = createFactoryConfig;
exports.updateFactoryConfig = updateFactoryConfig;
exports.getHierarchyLevelByDepth = getHierarchyLevelByDepth;
exports.getHierarchyLevelByKey = getHierarchyLevelByKey;
exports.getTranslatedLevelName = getTranslatedLevelName;
exports.getStatusReasons = getStatusReasons;
exports.getTranslatedStatusReason = getTranslatedStatusReason;
exports.getTranslatedDiscipline = getTranslatedDiscipline;
exports.getTranslatedMaintenanceType = getTranslatedMaintenanceType;
exports.isLanguageSupported = isLanguageSupported;
exports.getSupportedLanguages = getSupportedLanguages;
const prisma_1 = require("../lib/prisma");
/**
 * Get the factory configuration (assumes single config per deployment)
 */
async function getFactoryConfig() {
    const config = await prisma_1.prisma.factoryConfig.findFirst();
    return config;
}
/**
 * Get or create factory configuration with defaults
 */
async function getOrCreateFactoryConfig() {
    const existing = await getFactoryConfig();
    if (existing) {
        return existing;
    }
    // Create with defaults
    return createFactoryConfig({
        primaryLanguage: 'en',
        supportedLanguages: ['en'],
        hierarchyLevels: [
            { depth: 0, key: 'machine', name: 'Machine' },
            { depth: 1, key: 'group', name: 'Group' },
            { depth: 2, key: 'component', name: 'Component' },
        ],
        defaultMaxDepth: 3,
        statusReasonOptions: {
            RUNNING: [
                { id: 'operational', name: 'Operational' },
                { id: 'standby', name: 'Standby' },
            ],
            DOWN: [
                { id: 'breakdown', name: 'Breakdown' },
                { id: 'maintenance', name: 'Scheduled Maintenance' },
                { id: 'waiting_parts', name: 'Waiting for Parts' },
            ],
        },
        maintenanceDisciplines: [
            { id: 'electrical', name: 'Electrical' },
            { id: 'mechanical', name: 'Mechanical' },
            { id: 'plumbing', name: 'Plumbing' },
            { id: 'refrigeration', name: 'Refrigeration' },
        ],
        maintenanceTypes: [
            { id: 'corrective', name: 'Corrective' },
            { id: 'preventive', name: 'Preventive' },
            { id: 'inspection', name: 'Inspection' },
        ],
    });
}
/**
 * Create factory configuration
 */
async function createFactoryConfig(input) {
    const config = await prisma_1.prisma.factoryConfig.create({
        data: {
            primaryLanguage: input.primaryLanguage || 'en',
            supportedLanguages: input.supportedLanguages || ['en'],
            hierarchyLevels: JSON.parse(JSON.stringify(input.hierarchyLevels || [])),
            defaultMaxDepth: input.defaultMaxDepth || 3,
            statusReasonOptions: JSON.parse(JSON.stringify(input.statusReasonOptions || { RUNNING: [], DOWN: [] })),
            maintenanceDisciplines: JSON.parse(JSON.stringify(input.maintenanceDisciplines || [])),
            maintenanceTypes: JSON.parse(JSON.stringify(input.maintenanceTypes || [])),
        },
    });
    return config;
}
/**
 * Update factory configuration
 */
async function updateFactoryConfig(configId, input) {
    const data = {};
    if (input.primaryLanguage !== undefined) {
        data.primaryLanguage = input.primaryLanguage;
    }
    if (input.supportedLanguages !== undefined) {
        data.supportedLanguages = input.supportedLanguages;
    }
    if (input.hierarchyLevels !== undefined) {
        data.hierarchyLevels = JSON.parse(JSON.stringify(input.hierarchyLevels));
    }
    if (input.defaultMaxDepth !== undefined) {
        data.defaultMaxDepth = input.defaultMaxDepth;
    }
    if (input.statusReasonOptions !== undefined) {
        data.statusReasonOptions = JSON.parse(JSON.stringify(input.statusReasonOptions));
    }
    if (input.maintenanceDisciplines !== undefined) {
        data.maintenanceDisciplines = JSON.parse(JSON.stringify(input.maintenanceDisciplines));
    }
    if (input.maintenanceTypes !== undefined) {
        data.maintenanceTypes = JSON.parse(JSON.stringify(input.maintenanceTypes));
    }
    const config = await prisma_1.prisma.factoryConfig.update({
        where: { id: configId },
        data,
    });
    return config;
}
/**
 * Get hierarchy level by depth
 */
function getHierarchyLevelByDepth(config, depth) {
    return config.hierarchyLevels.find((level) => level.depth === depth);
}
/**
 * Get hierarchy level by key
 */
function getHierarchyLevelByKey(config, key) {
    return config.hierarchyLevels.find((level) => level.key === key);
}
/**
 * Get translated hierarchy level name
 */
function getTranslatedLevelName(level, language, primaryLanguage) {
    if (language === primaryLanguage) {
        return level.name;
    }
    return level.translations?.[language] || level.name;
}
/**
 * Get status reasons for a given status
 */
function getStatusReasons(config, status) {
    return config.statusReasonOptions[status] || [];
}
/**
 * Get translated status reason name
 */
function getTranslatedStatusReason(reason, language, primaryLanguage) {
    if (language === primaryLanguage) {
        return reason.name;
    }
    return reason.translations?.[language] || reason.name;
}
/**
 * Get translated maintenance discipline name
 */
function getTranslatedDiscipline(discipline, language, primaryLanguage) {
    if (language === primaryLanguage) {
        return discipline.name;
    }
    return discipline.translations?.[language] || discipline.name;
}
/**
 * Get translated maintenance type name
 */
function getTranslatedMaintenanceType(type, language, primaryLanguage) {
    if (language === primaryLanguage) {
        return type.name;
    }
    return type.translations?.[language] || type.name;
}
/**
 * Check if a language is supported
 */
function isLanguageSupported(config, language) {
    return config.supportedLanguages.includes(language);
}
/**
 * Get all supported languages
 */
function getSupportedLanguages(config) {
    return config.supportedLanguages;
}
//# sourceMappingURL=factoryConfigService.js.map