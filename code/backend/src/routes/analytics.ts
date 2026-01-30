import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth";
import {
    getAnalyticsStats,
    listInsights,
    updateInsightStatus,
    generateSystemInsights,
} from "../services/insightService";
import {
    getAnalyticsSummary,
    getByStatus,
    getByType,
    getByDiscipline,
    getByAsset,
    getTrend,
    getExportData,
    generateCSV,
} from "../services/analyticsService";
import { z } from "zod";
import * as XLSX from "xlsx";

const router = Router();

// All analytics routes require auth and admin role
router.use(requireAuth);
router.use(requireAdmin);

/**
 * GET /api/analytics/stats
 * Returns aggregate metrics for the admin dashboard
 */
router.get("/stats", async (_req, res) => {
    try {
        const stats = await getAnalyticsStats();
        return res.json({ data: stats });
    } catch (error) {
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
        const status = req.query.status as string | undefined;
        const validStatuses = ["NEW", "REVIEWED", "ACTIONED", "DISMISSED"];

        const insights = await listInsights(
            status && validStatuses.includes(status)
                ? { status: status as "NEW" | "REVIEWED" | "ACTIONED" | "DISMISSED", limit: 50 }
                : { limit: 50 }
        );

        return res.json({ data: insights });
    } catch (error) {
        console.error("Error fetching insights:", error);
        return res.status(500).json({ error: "Failed to fetch insights" });
    }
});

/**
 * PATCH /api/analytics/insights/:id
 * Update insight status
 */
const updateStatusSchema = z.object({
    status: z.enum(["NEW", "REVIEWED", "ACTIONED", "DISMISSED"]),
});

router.patch("/insights/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const parsed = updateStatusSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        const insight = await updateInsightStatus(id, parsed.data.status);
        return res.json({ data: insight });
    } catch (error) {
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
        const count = await generateSystemInsights();
        return res.json({
            data: { generated: count },
            message: `Generated ${count} new insights`,
        });
    } catch (error) {
        console.error("Error generating insights:", error);
        return res.status(500).json({ error: "Failed to generate insights" });
    }
});

// ── Maintenance Analytics Endpoints (Spec 5) ───────────────────────────────

const dateFilterSchema = z.object({
    from: z.string(),
    to: z.string(),
    assetId: z.string().optional(),
    includeChildren: z.string().optional(),
    maintenanceType: z.string().optional(),
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
        const summary = await getAnalyticsSummary({
            from,
            to,
            assetId,
            includeChildren: includeChildren !== "false",
            maintenanceType,
        });
        return res.json({ data: summary });
    } catch (error) {
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
        const data = await getByStatus({
            from,
            to,
            assetId,
            includeChildren: includeChildren !== "false",
            maintenanceType,
        });
        return res.json({ data });
    } catch (error) {
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
        const data = await getByType({
            from,
            to,
            assetId,
            includeChildren: includeChildren !== "false",
            maintenanceType,
        });
        return res.json({ data });
    } catch (error) {
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
        const data = await getByDiscipline({
            from,
            to,
            assetId,
            includeChildren: includeChildren !== "false",
            maintenanceType,
        });
        return res.json({ data });
    } catch (error) {
        console.error("Error fetching by-discipline:", error);
        return res.status(500).json({ error: "Failed to fetch discipline breakdown" });
    }
});

/**
 * GET /api/analytics/by-asset
 * Top assets by work order count, downtime, or MTTR
 */
const byAssetSchema = dateFilterSchema.extend({
    limit: z.string().optional(),
    orderBy: z.enum(["count", "downtime", "mttr"]).optional(),
});

router.get("/by-asset", async (req, res) => {
    try {
        const parsed = byAssetSchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid query parameters" });
        }
        const { from, to, assetId, includeChildren, maintenanceType, limit, orderBy } = parsed.data;
        const data = await getByAsset({
            from,
            to,
            assetId,
            includeChildren: includeChildren !== "false",
            maintenanceType,
            limit: limit ? parseInt(limit, 10) : 10,
            orderBy,
        });
        return res.json({ data });
    } catch (error) {
        console.error("Error fetching by-asset:", error);
        return res.status(500).json({ error: "Failed to fetch asset breakdown" });
    }
});

/**
 * GET /api/analytics/trend
 * Time-series data for charts
 */
const trendSchema = dateFilterSchema.extend({
    metric: z.enum(["count", "mttr", "downtime"]),
    granularity: z.enum(["day", "week", "month"]),
});

router.get("/trend", async (req, res) => {
    try {
        const parsed = trendSchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid query parameters", details: parsed.error.flatten() });
        }
        const { from, to, assetId, includeChildren, maintenanceType, metric, granularity } = parsed.data;
        const data = await getTrend({
            from,
            to,
            assetId,
            includeChildren: includeChildren !== "false",
            maintenanceType,
            metric,
            granularity,
        });
        return res.json({ data });
    } catch (error) {
        console.error("Error fetching trend:", error);
        return res.status(500).json({ error: "Failed to fetch trend data" });
    }
});

/**
 * GET /api/analytics/export
 * Export work orders as CSV or Excel
 */
const exportSchema = dateFilterSchema.extend({
    format: z.enum(["csv", "xlsx"]),
});

router.get("/export", async (req, res) => {
    try {
        const parsed = exportSchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid query parameters" });
        }
        const { from, to, assetId, includeChildren, maintenanceType, format } = parsed.data;
        const workOrders = await getExportData({
            from,
            to,
            assetId,
            includeChildren: includeChildren !== "false",
            maintenanceType,
        });

        const filename = `work-orders-${from}-${to}`;

        if (format === "csv") {
            const csv = generateCSV(workOrders);
            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", `attachment; filename=${filename}.csv`);
            return res.send(csv);
        }

        // Excel (xlsx)
        const nameTransGetter = (wo: typeof workOrders[number]) => {
            const t = wo.asset?.nameTranslations as Record<string, string> | null;
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
    } catch (error) {
        console.error("Error exporting analytics:", error);
        return res.status(500).json({ error: "Failed to export data" });
    }
});

export default router;
