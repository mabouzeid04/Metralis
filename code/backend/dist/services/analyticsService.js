"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalyticsSummary = getAnalyticsSummary;
exports.getByStatus = getByStatus;
exports.getByType = getByType;
exports.getByDiscipline = getByDiscipline;
exports.getByAsset = getByAsset;
exports.getTrend = getTrend;
exports.getExportData = getExportData;
exports.generateCSV = generateCSV;
const prisma_1 = require("../lib/prisma");
const assetService_1 = require("./assetService");
// ── Helpers ────────────────────────────────────────────────────────────────
async function getDescendantIds(assetId) {
    const descendants = await (0, assetService_1.getDescendants)(assetId);
    return descendants.map(d => d.id);
}
async function resolveAssetIds(assetId, includeChildren = true) {
    if (!assetId)
        return undefined;
    const ids = [assetId];
    if (includeChildren) {
        const childIds = await getDescendantIds(assetId);
        ids.push(...childIds);
    }
    return ids;
}
function buildWhereClause(filter, assetIds) {
    return {
        reportedAt: {
            gte: new Date(filter.from),
            lte: new Date(filter.to),
        },
        ...(assetIds && { assetId: { in: assetIds } }),
        ...(filter.maintenanceType && { maintenanceType: filter.maintenanceType }),
    };
}
function calcPercentChange(current, previous) {
    if (previous === 0)
        return current > 0 ? 100 : null;
    return Math.round(((current - previous) / previous) * 100);
}
function getPreviousPeriodDates(from, to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const durationMs = toDate.getTime() - fromDate.getTime();
    const prevTo = new Date(fromDate.getTime() - 1); // 1ms before current period
    const prevFrom = new Date(prevTo.getTime() - durationMs);
    return { prevFrom, prevTo };
}
// ── Service Functions ──────────────────────────────────────────────────────
async function getAnalyticsSummary(filter) {
    const assetIds = await resolveAssetIds(filter.assetId, filter.includeChildren ?? true);
    const where = buildWhereClause(filter, assetIds);
    // Current period counts
    const [total, open, closed] = await Promise.all([
        prisma_1.prisma.workOrder.count({ where }),
        prisma_1.prisma.workOrder.count({ where: { ...where, status: { not: 'CLOSED' } } }),
        prisma_1.prisma.workOrder.count({ where: { ...where, status: 'CLOSED' } }),
    ]);
    // Aggregations on closed work orders
    const aggResult = await prisma_1.prisma.workOrder.aggregate({
        where: { ...where, status: 'CLOSED' },
        _avg: { maintenanceDurationMin: true },
        _sum: { downtimeDurationMin: true },
    });
    // Total downtime across all WOs (not just closed)
    const downtimeAgg = await prisma_1.prisma.workOrder.aggregate({
        where,
        _sum: { downtimeDurationMin: true },
    });
    // MTBF: only corrective WOs
    const correctiveCount = await prisma_1.prisma.workOrder.count({
        where: { ...where, maintenanceType: 'corrective' },
    });
    const periodHours = (new Date(filter.to).getTime() - new Date(filter.from).getTime()) / (1000 * 60 * 60);
    const downtimeHours = (downtimeAgg._sum.downtimeDurationMin || 0) / 60;
    const operatingHours = periodHours - downtimeHours;
    const mtbfHours = correctiveCount > 0 ? Math.round((operatingHours / correctiveCount) * 10) / 10 : null;
    // Previous period for comparison
    const { prevFrom, prevTo } = getPreviousPeriodDates(filter.from, filter.to);
    const prevWhere = {
        reportedAt: { gte: prevFrom, lte: prevTo },
        ...(assetIds && { assetId: { in: assetIds } }),
        ...(filter.maintenanceType && { maintenanceType: filter.maintenanceType }),
    };
    const [prevTotal, prevAgg, prevDowntimeAgg] = await Promise.all([
        prisma_1.prisma.workOrder.count({ where: prevWhere }),
        prisma_1.prisma.workOrder.aggregate({
            where: { ...prevWhere, status: 'CLOSED' },
            _avg: { maintenanceDurationMin: true },
        }),
        prisma_1.prisma.workOrder.aggregate({
            where: prevWhere,
            _sum: { downtimeDurationMin: true },
        }),
    ]);
    const totalDowntimeMinutes = downtimeAgg._sum.downtimeDurationMin || 0;
    const prevTotalDowntime = prevDowntimeAgg._sum.downtimeDurationMin || 0;
    return {
        totalWorkOrders: total,
        openWorkOrders: open,
        closedWorkOrders: closed,
        avgMttrMinutes: aggResult._avg.maintenanceDurationMin
            ? Math.round(aggResult._avg.maintenanceDurationMin * 10) / 10
            : null,
        totalDowntimeMinutes,
        mtbfHours,
        firstTimeFixRate: null, // No reopen tracking in schema
        previousPeriod: {
            totalWorkOrders: prevTotal,
            avgMttrMinutes: prevAgg._avg.maintenanceDurationMin
                ? Math.round(prevAgg._avg.maintenanceDurationMin * 10) / 10
                : null,
            totalDowntimeMinutes: prevTotalDowntime,
            totalWorkOrdersChange: calcPercentChange(total, prevTotal),
            avgMttrChange: aggResult._avg.maintenanceDurationMin != null && prevAgg._avg.maintenanceDurationMin != null
                ? calcPercentChange(aggResult._avg.maintenanceDurationMin, prevAgg._avg.maintenanceDurationMin)
                : null,
            totalDowntimeChange: calcPercentChange(totalDowntimeMinutes, prevTotalDowntime),
        },
    };
}
async function getByStatus(filter) {
    const assetIds = await resolveAssetIds(filter.assetId, filter.includeChildren ?? true);
    const where = buildWhereClause(filter, assetIds);
    const groups = await prisma_1.prisma.workOrder.groupBy({
        by: ['status'],
        where,
        _count: { _all: true },
    });
    const total = groups.reduce((sum, g) => sum + g._count._all, 0);
    return groups.map(g => ({
        label: g.status,
        count: g._count._all,
        percentage: total > 0 ? Math.round((g._count._all / total) * 1000) / 10 : 0,
    }));
}
async function getByType(filter) {
    const assetIds = await resolveAssetIds(filter.assetId, filter.includeChildren ?? true);
    const where = buildWhereClause(filter, assetIds);
    const groups = await prisma_1.prisma.workOrder.groupBy({
        by: ['maintenanceType'],
        where: { ...where, maintenanceType: { not: null } },
        _count: { _all: true },
    });
    const total = groups.reduce((sum, g) => sum + g._count._all, 0);
    return groups.map(g => ({
        label: g.maintenanceType || 'unknown',
        count: g._count._all,
        percentage: total > 0 ? Math.round((g._count._all / total) * 1000) / 10 : 0,
    }));
}
async function getByDiscipline(filter) {
    const assetIds = await resolveAssetIds(filter.assetId, filter.includeChildren ?? true);
    // Build raw SQL for unnesting the disciplines array
    const conditions = [
        `"reportedAt" >= '${new Date(filter.from).toISOString()}'`,
        `"reportedAt" <= '${new Date(filter.to).toISOString()}'`,
    ];
    if (assetIds) {
        const idList = assetIds.map(id => `'${id}'`).join(',');
        conditions.push(`"assetId" IN (${idList})`);
    }
    if (filter.maintenanceType) {
        conditions.push(`"maintenanceType" = '${filter.maintenanceType}'`);
    }
    const whereClause = conditions.join(' AND ');
    const result = await prisma_1.prisma.$queryRawUnsafe(`SELECT unnest("maintenanceDisciplines") as discipline, COUNT(*) as count
     FROM "WorkOrder"
     WHERE ${whereClause}
     GROUP BY discipline
     ORDER BY count DESC`);
    return result.map(r => ({
        discipline: r.discipline,
        count: Number(r.count),
    }));
}
async function getByAsset(filter) {
    const assetIds = await resolveAssetIds(filter.assetId, filter.includeChildren ?? true);
    const where = buildWhereClause(filter, assetIds);
    const limit = filter.limit || 10;
    // Get all work orders with assets in the period
    const workOrders = await prisma_1.prisma.workOrder.findMany({
        where: { ...where, assetId: { not: null } },
        select: {
            assetId: true,
            maintenanceDurationMin: true,
            downtimeDurationMin: true,
            asset: {
                select: {
                    id: true,
                    name: true,
                    nameTranslations: true,
                    pathString: true,
                },
            },
        },
    });
    // Aggregate by asset
    const assetMap = new Map();
    for (const wo of workOrders) {
        if (!wo.assetId || !wo.asset)
            continue;
        const existing = assetMap.get(wo.assetId);
        const nameTranslations = wo.asset.nameTranslations;
        if (existing) {
            existing.workOrderCount++;
            existing.totalDowntimeMinutes += wo.downtimeDurationMin || 0;
            if (wo.maintenanceDurationMin != null) {
                existing.mttrValues.push(wo.maintenanceDurationMin);
            }
        }
        else {
            assetMap.set(wo.assetId, {
                assetId: wo.assetId,
                assetNameEn: wo.asset.name,
                assetNameAr: nameTranslations?.['ar'] || null,
                assetPath: wo.asset.pathString,
                workOrderCount: 1,
                totalDowntimeMinutes: wo.downtimeDurationMin || 0,
                mttrValues: wo.maintenanceDurationMin != null ? [wo.maintenanceDurationMin] : [],
            });
        }
    }
    // Convert and sort
    const results = Array.from(assetMap.values()).map(a => ({
        assetId: a.assetId,
        assetNameEn: a.assetNameEn,
        assetNameAr: a.assetNameAr,
        assetPath: a.assetPath,
        workOrderCount: a.workOrderCount,
        totalDowntimeMinutes: a.totalDowntimeMinutes,
        avgMttrMinutes: a.mttrValues.length > 0
            ? Math.round((a.mttrValues.reduce((s, v) => s + v, 0) / a.mttrValues.length) * 10) / 10
            : null,
    }));
    const orderBy = filter.orderBy || 'count';
    results.sort((a, b) => {
        if (orderBy === 'count')
            return b.workOrderCount - a.workOrderCount;
        if (orderBy === 'downtime')
            return b.totalDowntimeMinutes - a.totalDowntimeMinutes;
        return (b.avgMttrMinutes || 0) - (a.avgMttrMinutes || 0);
    });
    return results.slice(0, limit);
}
async function getTrend(filter) {
    const assetIds = await resolveAssetIds(filter.assetId, filter.includeChildren ?? true);
    const conditions = [];
    const params = [];
    let paramIdx = 1;
    const dateField = filter.metric === 'mttr' ? '"completedAt"' : '"reportedAt"';
    conditions.push(`${dateField} >= $${paramIdx++}`);
    params.push(new Date(filter.from));
    conditions.push(`${dateField} <= $${paramIdx++}`);
    params.push(new Date(filter.to));
    if (assetIds) {
        conditions.push(`"assetId" = ANY($${paramIdx++})`);
        params.push(assetIds);
    }
    if (filter.maintenanceType) {
        conditions.push(`"maintenanceType" = $${paramIdx++}`);
        params.push(filter.maintenanceType);
    }
    if (filter.metric === 'mttr') {
        conditions.push(`status = 'CLOSED'`);
    }
    const whereClause = conditions.join(' AND ');
    const truncExpr = `DATE_TRUNC('${filter.granularity}', ${dateField})`;
    let valueExpr;
    switch (filter.metric) {
        case 'count':
            valueExpr = 'COUNT(*)';
            break;
        case 'mttr':
            valueExpr = 'COALESCE(AVG("maintenanceDurationMin"), 0)';
            break;
        case 'downtime':
            valueExpr = 'COALESCE(SUM("downtimeDurationMin"), 0)';
            break;
    }
    const sql = `
    SELECT ${truncExpr} as date, ${valueExpr} as value
    FROM "WorkOrder"
    WHERE ${whereClause}
    GROUP BY ${truncExpr}
    ORDER BY date
  `;
    const result = await prisma_1.prisma.$queryRawUnsafe(sql, ...params);
    return result.map(r => ({
        date: r.date.toISOString().split('T')[0],
        value: Math.round(Number(r.value) * 10) / 10,
    }));
}
async function getExportData(filter) {
    const assetIds = await resolveAssetIds(filter.assetId, filter.includeChildren ?? true);
    const where = buildWhereClause(filter, assetIds);
    return prisma_1.prisma.workOrder.findMany({
        where,
        include: {
            asset: {
                select: {
                    name: true,
                    nameTranslations: true,
                    pathString: true,
                    pathStringTranslations: true,
                },
            },
            performer: { select: { name: true } },
        },
        orderBy: { reportedAt: 'desc' },
    });
}
function generateCSV(workOrders) {
    const headers = [
        'Work Order ID',
        'Report Date',
        'Asset Name (EN)',
        'Asset Name (AR)',
        'Asset Path',
        'Title',
        'Status',
        'Priority',
        'Maintenance Type',
        'Disciplines',
        'Equipment Stop Time',
        'Repair Start Time',
        'Maintenance End Time',
        'Maintenance Duration (min)',
        'Downtime (min)',
        'Performer',
    ];
    const rows = workOrders.map(wo => {
        const nameTranslations = wo.asset?.nameTranslations;
        return [
            wo.publicId,
            wo.reportedAt.toISOString(),
            wo.asset?.name || '',
            nameTranslations?.['ar'] || '',
            wo.asset?.pathString || '',
            wo.title,
            wo.status,
            wo.priority,
            wo.maintenanceType || '',
            (wo.maintenanceDisciplines || []).join('; '),
            wo.equipmentStopTime?.toISOString() || '',
            wo.repairStartTime?.toISOString() || '',
            wo.maintenanceEndTime?.toISOString() || '',
            wo.maintenanceDurationMin?.toString() || '',
            wo.downtimeDurationMin?.toString() || '',
            wo.performer?.name || '',
        ].map(val => `"${String(val).replace(/"/g, '""')}"`);
    });
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
//# sourceMappingURL=analyticsService.js.map