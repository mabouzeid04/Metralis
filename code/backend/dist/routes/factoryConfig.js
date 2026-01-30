"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const auth_1 = require("../middleware/auth");
const factoryConfigService_1 = require("../services/factoryConfigService");
const router = (0, express_1.Router)();
// Validation schemas
const hierarchyLevelSchema = zod_1.z.object({
    depth: zod_1.z.number().int().min(0),
    key: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    translations: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).optional(),
});
const statusReasonSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    translations: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).optional(),
});
const maintenanceDisciplineSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    translations: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).optional(),
});
const maintenanceTypeSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    translations: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).optional(),
});
const updateConfigSchema = zod_1.z.object({
    primaryLanguage: zod_1.z.string().min(2).max(5).optional(),
    supportedLanguages: zod_1.z.array(zod_1.z.string().min(2).max(5)).optional(),
    hierarchyLevels: zod_1.z.array(hierarchyLevelSchema).optional(),
    defaultMaxDepth: zod_1.z.number().int().min(1).max(10).optional(),
    statusReasonOptions: zod_1.z
        .object({
        RUNNING: zod_1.z.array(statusReasonSchema),
        DOWN: zod_1.z.array(statusReasonSchema),
    })
        .optional(),
    maintenanceDisciplines: zod_1.z.array(maintenanceDisciplineSchema).optional(),
    maintenanceTypes: zod_1.z.array(maintenanceTypeSchema).optional(),
});
router.use(auth_1.requireAuth);
/**
 * GET /factory-config
 * Get the factory configuration (creates default if not exists)
 */
router.get('/', async (req, res) => {
    try {
        const config = await (0, factoryConfigService_1.getOrCreateFactoryConfig)();
        return res.json({ data: config });
    }
    catch (error) {
        console.error('Error fetching factory config:', error);
        return res.status(500).json({ error: { message: 'Failed to fetch factory config' } });
    }
});
/**
 * PUT /factory-config
 * Update the factory configuration (admin only)
 */
router.put('/', (0, auth_1.requireRole)(['ADMIN']), async (req, res) => {
    try {
        const parsed = updateConfigSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.flatten() });
        }
        // Get existing config to get its ID
        const existing = await (0, factoryConfigService_1.getOrCreateFactoryConfig)();
        const updateInput = {};
        if (parsed.data.primaryLanguage !== undefined) {
            updateInput.primaryLanguage = parsed.data.primaryLanguage;
        }
        if (parsed.data.supportedLanguages !== undefined) {
            updateInput.supportedLanguages = parsed.data.supportedLanguages;
        }
        if (parsed.data.hierarchyLevels !== undefined) {
            updateInput.hierarchyLevels = parsed.data.hierarchyLevels;
        }
        if (parsed.data.defaultMaxDepth !== undefined) {
            updateInput.defaultMaxDepth = parsed.data.defaultMaxDepth;
        }
        if (parsed.data.statusReasonOptions !== undefined) {
            updateInput.statusReasonOptions = parsed.data.statusReasonOptions;
        }
        if (parsed.data.maintenanceDisciplines !== undefined) {
            updateInput.maintenanceDisciplines = parsed.data.maintenanceDisciplines;
        }
        if (parsed.data.maintenanceTypes !== undefined) {
            updateInput.maintenanceTypes = parsed.data.maintenanceTypes;
        }
        const config = await (0, factoryConfigService_1.updateFactoryConfig)(existing.id, updateInput);
        return res.json({ data: config });
    }
    catch (error) {
        console.error('Error updating factory config:', error);
        return res.status(500).json({ error: { message: 'Failed to update factory config' } });
    }
});
/**
 * GET /factory-config/hierarchy-levels
 * Get just the hierarchy level definitions
 */
router.get('/hierarchy-levels', async (req, res) => {
    try {
        const config = await (0, factoryConfigService_1.getOrCreateFactoryConfig)();
        return res.json({ data: config.hierarchyLevels });
    }
    catch (error) {
        console.error('Error fetching hierarchy levels:', error);
        return res.status(500).json({ error: { message: 'Failed to fetch hierarchy levels' } });
    }
});
/**
 * GET /factory-config/status-reasons
 * Get status reason options grouped by status
 */
router.get('/status-reasons', async (req, res) => {
    try {
        const config = await (0, factoryConfigService_1.getOrCreateFactoryConfig)();
        return res.json({ data: config.statusReasonOptions });
    }
    catch (error) {
        console.error('Error fetching status reasons:', error);
        return res.status(500).json({ error: { message: 'Failed to fetch status reasons' } });
    }
});
/**
 * GET /factory-config/maintenance-disciplines
 * Get maintenance discipline options
 */
router.get('/maintenance-disciplines', async (req, res) => {
    try {
        const config = await (0, factoryConfigService_1.getOrCreateFactoryConfig)();
        return res.json({ data: config.maintenanceDisciplines });
    }
    catch (error) {
        console.error('Error fetching maintenance disciplines:', error);
        return res.status(500).json({ error: { message: 'Failed to fetch maintenance disciplines' } });
    }
});
/**
 * GET /factory-config/maintenance-types
 * Get maintenance type options
 */
router.get('/maintenance-types', async (req, res) => {
    try {
        const config = await (0, factoryConfigService_1.getOrCreateFactoryConfig)();
        return res.json({ data: config.maintenanceTypes });
    }
    catch (error) {
        console.error('Error fetching maintenance types:', error);
        return res.status(500).json({ error: { message: 'Failed to fetch maintenance types' } });
    }
});
/**
 * GET /factory-config/languages
 * Get supported languages
 */
router.get('/languages', async (req, res) => {
    try {
        const config = await (0, factoryConfigService_1.getOrCreateFactoryConfig)();
        return res.json({
            data: {
                primaryLanguage: config.primaryLanguage,
                supportedLanguages: config.supportedLanguages,
            },
        });
    }
    catch (error) {
        console.error('Error fetching languages:', error);
        return res.status(500).json({ error: { message: 'Failed to fetch languages' } });
    }
});
exports.default = router;
//# sourceMappingURL=factoryConfig.js.map