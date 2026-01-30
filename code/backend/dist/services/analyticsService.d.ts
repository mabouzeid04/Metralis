export interface AnalyticsFilter {
    from: string;
    to: string;
    assetId?: string | undefined;
    includeChildren?: boolean | undefined;
    maintenanceType?: string | undefined;
}
export interface AnalyticsSummary {
    totalWorkOrders: number;
    openWorkOrders: number;
    closedWorkOrders: number;
    avgMttrMinutes: number | null;
    totalDowntimeMinutes: number;
    mtbfHours: number | null;
    firstTimeFixRate: number | null;
    previousPeriod: {
        totalWorkOrders: number;
        avgMttrMinutes: number | null;
        totalDowntimeMinutes: number;
        totalWorkOrdersChange: number | null;
        avgMttrChange: number | null;
        totalDowntimeChange: number | null;
    };
}
export interface BreakdownItem {
    label: string;
    count: number;
    percentage: number;
}
export interface AssetBreakdown {
    assetId: string;
    assetNameEn: string;
    assetNameAr: string | null;
    assetPath: string;
    workOrderCount: number;
    totalDowntimeMinutes: number;
    avgMttrMinutes: number | null;
}
export interface TrendPoint {
    date: string;
    value: number;
}
export declare function getAnalyticsSummary(filter: AnalyticsFilter): Promise<AnalyticsSummary>;
export declare function getByStatus(filter: AnalyticsFilter): Promise<BreakdownItem[]>;
export declare function getByType(filter: AnalyticsFilter): Promise<BreakdownItem[]>;
export declare function getByDiscipline(filter: AnalyticsFilter): Promise<Array<{
    discipline: string;
    count: number;
}>>;
export declare function getByAsset(filter: AnalyticsFilter & {
    limit?: number | undefined;
    orderBy?: 'count' | 'downtime' | 'mttr' | undefined;
}): Promise<AssetBreakdown[]>;
export declare function getTrend(filter: AnalyticsFilter & {
    metric: 'count' | 'mttr' | 'downtime';
    granularity: 'day' | 'week' | 'month';
}): Promise<TrendPoint[]>;
export declare function getExportData(filter: AnalyticsFilter): Promise<({
    asset: {
        name: string;
        nameTranslations: import("@prisma/client/runtime/library").JsonValue;
        pathString: string;
        pathStringTranslations: import("@prisma/client/runtime/library").JsonValue;
    } | null;
    performer: {
        name: string;
    } | null;
} & {
    type: import("../generated/prisma/enums").WorkOrderType;
    id: string;
    status: import("../generated/prisma/enums").WorkOrderStatus;
    metadata: import("@prisma/client/runtime/library").JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    reportedAt: Date;
    publicId: string;
    machineId: string | null;
    assetId: string | null;
    title: string;
    descriptionRaw: string;
    priority: import("../generated/prisma/enums").WorkOrderPriority;
    reportedById: string;
    assignedToId: string | null;
    startedAt: Date | null;
    completedAt: Date | null;
    symptoms: import("@prisma/client/runtime/library").JsonValue | null;
    suspectedCause: string | null;
    rootCause: string | null;
    failureMode: string | null;
    environmentContext: import("@prisma/client/runtime/library").JsonValue | null;
    maintenanceType: string | null;
    maintenanceDisciplines: string[];
    equipmentStopTime: Date | null;
    faultReportTime: Date | null;
    repairStartTime: Date | null;
    maintenanceStartTime: Date | null;
    maintenanceEndTime: Date | null;
    maintenanceDescription: string | null;
    correctiveAction: string | null;
    notesAndRecommendations: string | null;
    equipmentStatusAfter: string | null;
    maintenanceDurationMin: number | null;
    downtimeDurationMin: number | null;
    areaLeaderId: string | null;
    maintenanceSupervisorId: string | null;
    performerId: string | null;
    machineReceiverId: string | null;
    responsibleEngineerId: string | null;
    maintenanceEngineerId: string | null;
    maintenanceManagerId: string | null;
})[]>;
export declare function generateCSV(workOrders: Awaited<ReturnType<typeof getExportData>>): string;
//# sourceMappingURL=analyticsService.d.ts.map