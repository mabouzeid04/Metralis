"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const insightService_1 = require("../services/insightService");
const analyticsService_1 = require("../services/analyticsService");
const zod_1 = require("zod");
const XLSX = __importStar(require("xlsx"));
const router = (0, express_1.Router)();
// All analytics routes require auth and admin role
router.use(auth_1.requireAuth);
router.use(auth_1.requireAdmin);
/**
 * GET /api/analytics/stats
 * Returns aggregate metrics for the admin dashboard
 */
router.get("/stats", async (_req, res) => {
    try {
        const stats = await (0, insightService_1.getAnalyticsStats)();
        return res.json({ data: stats });
    }
    catch (error) {
        console.error("Error fetching analytics stats:", error);
        return res.status(500).json({ error: "Failed to fetch analytics stats" });
    }
});
/**
 * GET /api/analytics/insights
 * Returns list of system insights
 */
router.get("/insights", async (req, res) => {
    try {
        const status = req.query.status;
        const validStatuses = ["NEW", "REVIEWED", "ACTIONED", "DISMISSED"];
        const insights = await (0, insightService_1.listInsights)(status && validStatuses.includes(status)
            ? { status: status, limit: 50 }
            : { limit: 50 });
        return res.json({ data: insights });
    }
    catch (error) {
        console.error("Error fetching insights:", error);
        return res.status(500).json({ error: "Failed to fetch insights" });
    }
});
/**
 * PATCH /api/analytics/insights/:id
 * Update insight status
 */
const updateStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(["NEW", "REVIEWED", "ACTIONED", "DISMISSED"]),
});
router.patch("/insights/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const parsed = updateStatusSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid status value" });
        }
        const insight = await (0, insightService_1.updateInsightStatus)(id, parsed.data.status);
        return res.json({ data: insight });
    }
    catch (error) {
        console.error("Error updating insight:", error);
        return res.status(500).json({ error: "Failed to update insight" });
    }
});
/**
 * POST /api/analytics/insights/generate
 * Manually trigger insight generation (for testing/on-demand)
 */
router.post("/insights/generate", async (_req, res) => {
    try {
        const count = await (0, insightService_1.generateSystemInsights)();
        return res.json({
            data: { generated: count },
            message: `Generated ${count} new insights`,
        });
    }
    catch (error) {
        console.error("Error generating insights:", error);
        return res.status(500).json({ error: "Failed to generate insights" });
    }
});
// ── Maintenance Analytics Endpoints (Spec 5) ───────────────────────────────
const dateFilterSchema = zod_1.z.object({
    from: zod_1.z.string(),
    to: zod_1.z.string(),
    assetId: zod_1.z.string().optional(),
    includeChildren: zod_1.z.string().optional(),
    maintenanceType: zod_1.z.string().optional(),
});
/**
 * GET /api/analytics/summary
 * KPI summary with period comparison
 */
router.get("/summary", async (req, res) => {
    try {
        const parsed = dateFilterSchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid query parameters", details: parsed.error.flatten() });
        }
        const { from, to, assetId, includeChildren, maintenanceType } = parsed.data;
        const summary = await (0, analyticsService_1.getAnalyticsSummary)({
            from,
            to,
            assetId,
            includeChildren: includeChildren !== "false",
            maintenanceType,
        });
        return res.json({ data: summary });
    }
    catch (error) {
        console.error("Error fetching analytics summary:", error);
        return res.status(500).json({ error: "Failed to fetch analytics summary" });
    }
});
/**
 * GET /api/analytics/by-status
 * Breakdown by work order status
 */
router.get("/by-status", async (req, res) => {
    try {
        const parsed = dateFilterSchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid query parameters" });
        }
        const { from, to, assetId, includeChildren, maintenanceType } = parsed.data;
        const data = await (0, analyticsService_1.getByStatus)({
            from,
            to,
            assetId,
            includeChildren: includeChildren !== "false",
            maintenanceType,
        });
        return res.json({ data });
    }
    catch (error) {
        console.error("Error fetching by-status:", error);
        return res.status(500).json({ error: "Failed to fetch status breakdown" });
    }
});
/**
 * GET /api/analytics/by-type
 * Breakdown by maintenance type
 */
router.get("/by-type", async (req, res) => {
    try {
        const parsed = dateFilterSchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid query parameters" });
        }
        const { from, to, assetId, includeChildren, maintenanceType } = parsed.data;
        const data = await (0, analyticsService_1.getByType)({
            from,
            to,
            assetId,
            includeChildren: includeChildren !== "false",
            maintenanceType,
        });
        return res.json({ data });
    }
    catch (error) {
        console.error("Error fetching by-type:", error);
        return res.status(500).json({ error: "Failed to fetch type breakdown" });
    }
});
/**
 * GET /api/analytics/by-discipline
 * Breakdown by maintenance discipline
 */
router.get("/by-discipline", async (req, res) => {
    try {
        const parsed = dateFilterSchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid query parameters" });
        }
        const { from, to, assetId, includeChildren, maintenanceType } = parsed.data;
        const data = await (0, analyticsService_1.getByDiscipline)({
            from,
            to,
            assetId,
            includeChildren: includeChildren !== "false",
            maintenanceType,
        });
        return res.json({ data });
    }
    catch (error) {
        console.error("Error fetching by-discipline:", error);
        return res.status(500).json({ error: "Failed to fetch discipline breakdown" });
    }
});
/**
 * GET /api/analytics/by-asset
 * Top assets by work order count, downtime, or MTTR
 */
const byAssetSchema = dateFilterSchema.extend({
    limit: zod_1.z.string().optional(),
    orderBy: zod_1.z.enum(["count", "downtime", "mttr"]).optional(),
});
router.get("/by-asset", async (req, res) => {
    try {
        const parsed = byAssetSchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid query parameters" });
        }
        const { from, to, assetId, includeChildren, maintenanceType, limit, orderBy } = parsed.data;
        const data = await (0, analyticsService_1.getByAsset)({
            from,
            to,
            assetId,
            includeChildren: includeChildren !== "false",
            maintenanceType,
            limit: limit ? parseInt(limit, 10) : 10,
            orderBy,
        });
        return res.json({ data });
    }
    catch (error) {
        console.error("Error fetching by-asset:", error);
        return res.status(500).json({ error: "Failed to fetch asset breakdown" });
    }
});
/**
 * GET /api/analytics/trend
 * Time-series data for charts
 */
const trendSchema = dateFilterSchema.extend({
    metric: zod_1.z.enum(["count", "mttr", "downtime"]),
    granularity: zod_1.z.enum(["day", "week", "month"]),
});
router.get("/trend", async (req, res) => {
    try {
        const parsed = trendSchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid query parameters", details: parsed.error.flatten() });
        }
        const { from, to, assetId, includeChildren, maintenanceType, metric, granularity } = parsed.data;
        const data = await (0, analyticsService_1.getTrend)({
            from,
            to,
            assetId,
            includeChildren: includeChildren !== "false",
            maintenanceType,
            metric,
            granularity,
        });
        return res.json({ data });
    }
    catch (error) {
        console.error("Error fetching trend:", error);
        return res.status(500).json({ error: "Failed to fetch trend data" });
    }
});
/**
 * GET /api/analytics/export
 * Export work orders as CSV or Excel
 */
const exportSchema = dateFilterSchema.extend({
    format: zod_1.z.enum(["csv", "xlsx"]),
});
router.get("/export", async (req, res) => {
    try {
        const parsed = exportSchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid query parameters" });
        }
        const { from, to, assetId, includeChildren, maintenanceType, format } = parsed.data;
        const workOrders = await (0, analyticsService_1.getExportData)({
            from,
            to,
            assetId,
            includeChildren: includeChildren !== "false",
            maintenanceType,
        });
        const filename = `work-orders-${from}-${to}`;
        if (format === "csv") {
            const csv = (0, analyticsService_1.generateCSV)(workOrders);
            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", `attachment; filename=${filename}.csv`);
            return res.send(csv);
        }
        // Excel (xlsx)
        const nameTransGetter = (wo) => {
            const t = wo.asset?.nameTranslations;
            return t?.['ar'] || '';
        };
        const data = workOrders.map(wo => ({
            'Work Order ID': wo.publicId,
            'Report Date': wo.reportedAt.toISOString(),
            'Asset Name (EN)': wo.asset?.name || '',
            'Asset Name (AR)': nameTransGetter(wo),
            'Asset Path': wo.asset?.pathString || '',
            'Title': wo.title,
            'Status': wo.status,
            'Priority': wo.priority,
            'Maintenance Type': wo.maintenanceType || '',
            'Disciplines': (wo.maintenanceDisciplines || []).join('; '),
            'Equipment Stop Time': wo.equipmentStopTime?.toISOString() || '',
            'Repair Start Time': wo.repairStartTime?.toISOString() || '',
            'Maintenance End Time': wo.maintenanceEndTime?.toISOString() || '',
            'Maintenance Duration (min)': wo.maintenanceDurationMin ?? '',
            'Downtime (min)': wo.downtimeDurationMin ?? '',
            'Performer': wo.performer?.name || '',
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Work Orders');
        const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; filename=${filename}.xlsx`);
        return res.send(buffer);
    }
    catch (error) {
        console.error("Error exporting analytics:", error);
        return res.status(500).json({ error: "Failed to export data" });
    }
});
exports.default = router;
//# sourceMappingURL=analytics.js.map