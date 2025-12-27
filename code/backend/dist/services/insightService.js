"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInsightStatus = exports.listInsights = exports.getAnalyticsStats = exports.generateSystemInsights = exports.collectSystemSnapshot = void 0;
const prisma_1 = require("../lib/prisma");
const prompt_1 = require("./ai/prompt");
const provider_1 = require("./ai/provider");
const extractJsonBlock = (text) => {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) {
        return null;
    }
    return text.slice(start, end + 1);
};
const parseInsightsResponse = (rawText) => {
    const payload = extractJsonBlock(rawText.trim());
    if (!payload) {
        console.error("Failed to extract JSON from LLM response");
        return [];
    }
    try {
        const parsed = JSON.parse(payload);
        return parsed.insights ?? [];
    }
    catch (error) {
        console.error("Failed to parse insights JSON:", error);
        return [];
    }
};
/**
 * Collects a system snapshot of the last 48 hours of plant activity
 */
const collectSystemSnapshot = async () => {
    const now = new Date();
    const hours48Ago = new Date(now.getTime() - 48 * 60 * 60 * 1000);
    const hours24Ago = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    // Get recent work orders with machine info
    const recentWorkOrders = await prisma_1.prisma.workOrder.findMany({
        where: {
            reportedAt: { gte: hours48Ago },
        },
        orderBy: { reportedAt: "desc" },
        take: 50,
        include: {
            machine: { select: { id: true, name: true } },
        },
    });
    // Get negative AI feedback count
    const negativeFeedbackCount = await prisma_1.prisma.chatMessageFeedback.count({
        where: {
            value: "NOT_HELPFUL",
            createdAt: { gte: hours24Ago },
        },
    });
    // Get machines without any documents
    const machinesWithoutDocs = await prisma_1.prisma.machine.findMany({
        where: {
            documents: { none: {} },
        },
        select: { id: true, name: true },
    });
    // Get parts below minimum stock
    const lowStockParts = await prisma_1.prisma.part.findMany({
        where: {
            AND: [
                { minStock: { not: null } },
                { stockQty: { not: null } },
            ],
        },
        select: { id: true, name: true, stockQty: true, minStock: true },
    });
    // Filter to only those actually below min stock
    const actuallyLowStock = lowStockParts.filter((p) => p.stockQty !== null && p.minStock !== null && p.stockQty < p.minStock);
    // Find recurring failure modes
    const failureModeGroups = await prisma_1.prisma.workOrder.groupBy({
        by: ["machineId", "failureMode"],
        where: {
            reportedAt: { gte: hours48Ago },
            failureMode: { not: null },
        },
        _count: { id: true },
        having: {
            id: { _count: { gte: 2 } },
        },
    });
    // Get machine names for recurring failures
    const machineIds = [...new Set(failureModeGroups.map((g) => g.machineId))];
    const machines = await prisma_1.prisma.machine.findMany({
        where: { id: { in: machineIds } },
        select: { id: true, name: true },
    });
    const machineNameMap = new Map(machines.map((m) => [m.id, m.name]));
    const recurringFailures = failureModeGroups.map((g) => ({
        machineName: machineNameMap.get(g.machineId) ?? "Unknown Machine",
        failureMode: g.failureMode ?? "Unknown",
        count: g._count.id,
    }));
    const days7Ago = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    // Count total AI queries (chat messages from users) in the last 7 days
    const totalAiQueries = await prisma_1.prisma.chatMessage.count({
        where: {
            role: "USER",
            createdAt: { gte: days7Ago },
        },
    });
    // Calculate MTTD (time from report to when a diagnosis/root cause is added)
    // For now, we approximate this as time from reportedAt to when rootCause or suspectedCause is set
    const diagnosedWorkOrders = await prisma_1.prisma.workOrder.findMany({
        where: {
            reportedAt: { gte: hours48Ago },
            OR: [
                { rootCause: { not: null } },
                { suspectedCause: { not: null } },
            ],
        },
        select: { reportedAt: true, updatedAt: true },
    });
    let avgDiagnosisTimeHours = null;
    if (diagnosedWorkOrders.length > 0) {
        const totalHours = diagnosedWorkOrders.reduce((sum, wo) => {
            const diffMs = wo.updatedAt.getTime() - wo.reportedAt.getTime();
            return sum + diffMs / (1000 * 60 * 60);
        }, 0);
        avgDiagnosisTimeHours = totalHours / diagnosedWorkOrders.length;
    }
    // Calculate MTTR (time from diagnosis to completion)
    const closedWorkOrders = await prisma_1.prisma.workOrder.findMany({
        where: {
            status: "CLOSED",
            completedAt: { gte: hours48Ago },
        },
        select: { reportedAt: true, completedAt: true },
    });
    let avgRepairTimeDays = null;
    if (closedWorkOrders.length > 0) {
        const totalDays = closedWorkOrders.reduce((sum, wo) => {
            if (!wo.completedAt)
                return sum;
            const diffMs = wo.completedAt.getTime() - wo.reportedAt.getTime();
            return sum + diffMs / (1000 * 60 * 60 * 24);
        }, 0);
        avgRepairTimeDays = totalDays / closedWorkOrders.length;
    }
    return {
        recentWorkOrders: recentWorkOrders.map((wo) => ({
            id: wo.id,
            title: wo.title,
            machineId: wo.machineId,
            machineName: wo.machine.name,
            type: wo.type,
            status: wo.status,
            rootCause: wo.rootCause,
            failureMode: wo.failureMode,
            reportedAt: wo.reportedAt,
            completedAt: wo.completedAt,
        })),
        negativeFeedbackCount,
        machinesWithoutDocs,
        lowStockParts: actuallyLowStock.map((p) => ({
            id: p.id,
            name: p.name,
            stockQty: p.stockQty ?? 0,
            minStock: p.minStock ?? 0,
        })),
        recurringFailures,
        totalAiQueries,
        avgDiagnosisTimeHours,
        avgRepairTimeDays,
    };
};
exports.collectSystemSnapshot = collectSystemSnapshot;
/**
 * Generates system insights by analyzing plant activity and saving to database
 */
const generateSystemInsights = async () => {
    console.log("[InsightEngine] Starting insight generation...");
    const snapshot = await (0, exports.collectSystemSnapshot)();
    console.log("[InsightEngine] Collected snapshot:", {
        workOrders: snapshot.recentWorkOrders.length,
        machinesWithoutDocs: snapshot.machinesWithoutDocs.length,
        lowStockParts: snapshot.lowStockParts.length,
        recurringFailures: snapshot.recurringFailures.length,
    });
    const prompt = (0, prompt_1.buildSystemAnalysisPrompt)(snapshot);
    const response = await (0, provider_1.generateInsightsLLMResponse)({
        history: [],
        prompt,
        temperature: 0.3, // Lower temperature for more consistent structured output
        maxTokens: 2000,
    });
    const insights = parseInsightsResponse(response.text);
    console.log(`[InsightEngine] Generated ${insights.length} insights`);
    if (insights.length === 0) {
        console.log("[InsightEngine] No insights generated");
        return 0;
    }
    // Save insights to database
    const created = await prisma_1.prisma.systemInsight.createMany({
        data: insights.map((insight) => ({
            title: insight.title,
            content: insight.content,
            category: insight.category,
            priority: insight.priority,
            status: "NEW",
            ...(insight.metadata && { metadata: insight.metadata }),
        })),
    });
    console.log(`[InsightEngine] Saved ${created.count} insights to database`);
    return created.count;
};
exports.generateSystemInsights = generateSystemInsights;
/**
 * Get analytics stats for the admin dashboard
 */
const getAnalyticsStats = async () => {
    const now = new Date();
    const hours24Ago = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const hours48Ago = new Date(now.getTime() - 48 * 60 * 60 * 1000);
    const days7Ago = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    // Total AI queries in last 7 days
    const totalAiQueries = await prisma_1.prisma.chatMessage.count({
        where: {
            role: "USER",
            createdAt: { gte: days7Ago },
        },
    });
    // MTTD calculation
    const diagnosedWorkOrders = await prisma_1.prisma.workOrder.findMany({
        where: {
            reportedAt: { gte: hours48Ago },
            OR: [
                { rootCause: { not: null } },
                { suspectedCause: { not: null } },
            ],
        },
        select: { reportedAt: true, updatedAt: true },
    });
    let avgDiagnosisTimeHours = null;
    if (diagnosedWorkOrders.length > 0) {
        const totalHours = diagnosedWorkOrders.reduce((sum, wo) => {
            const diffMs = wo.updatedAt.getTime() - wo.reportedAt.getTime();
            return sum + diffMs / (1000 * 60 * 60);
        }, 0);
        avgDiagnosisTimeHours = totalHours / diagnosedWorkOrders.length;
    }
    // MTTR calculation
    const closedWorkOrders = await prisma_1.prisma.workOrder.findMany({
        where: {
            status: "CLOSED",
            completedAt: { gte: hours48Ago },
        },
        select: { reportedAt: true, completedAt: true },
    });
    let avgRepairTimeDays = null;
    if (closedWorkOrders.length > 0) {
        const totalDays = closedWorkOrders.reduce((sum, wo) => {
            if (!wo.completedAt)
                return sum;
            const diffMs = wo.completedAt.getTime() - wo.reportedAt.getTime();
            return sum + diffMs / (1000 * 60 * 60 * 24);
        }, 0);
        avgRepairTimeDays = totalDays / closedWorkOrders.length;
    }
    // Knowledge base coverage
    const totalMachines = await prisma_1.prisma.machine.count();
    const machinesWithDocs = await prisma_1.prisma.machine.count({
        where: { documents: { some: {} } },
    });
    const kbCoveragePercent = totalMachines > 0 ? (machinesWithDocs / totalMachines) * 100 : 0;
    // Machines without docs
    const machinesWithoutDocs = await prisma_1.prisma.machine.findMany({
        where: { documents: { none: {} } },
        select: { id: true, name: true },
        take: 5,
    });
    return {
        totalAiQueries,
        avgDiagnosisTimeHours,
        avgRepairTimeDays,
        kbCoveragePercent,
        totalMachines,
        machinesWithDocs,
        machinesWithoutDocs,
    };
};
exports.getAnalyticsStats = getAnalyticsStats;
/**
 * Get list of system insights
 */
const listInsights = async (options) => {
    const whereClause = options?.status ? { status: options.status } : {};
    return prisma_1.prisma.systemInsight.findMany({
        where: whereClause,
        orderBy: [{ priority: "asc" }, { createdAt: "desc" }], // HIGH first, then by date
        take: options?.limit ?? 20,
    });
};
exports.listInsights = listInsights;
/**
 * Update insight status
 */
const updateInsightStatus = async (id, status) => {
    return prisma_1.prisma.systemInsight.update({
        where: { id },
        data: { status },
    });
};
exports.updateInsightStatus = updateInsightStatus;
//# sourceMappingURL=insightService.js.map