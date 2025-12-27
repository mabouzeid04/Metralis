"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const insightService_1 = require("../services/insightService");
const zod_1 = require("zod");
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
exports.default = router;
//# sourceMappingURL=analytics.js.map