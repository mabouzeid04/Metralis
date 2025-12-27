import type { InsightCategory, InsightPriority } from "../generated/prisma/client";
import { type SystemSnapshot } from "./ai/prompt";
/**
 * Collects a system snapshot of the last 48 hours of plant activity
 */
export declare const collectSystemSnapshot: () => Promise<SystemSnapshot>;
/**
 * Generates system insights by analyzing plant activity and saving to database
 */
export declare const generateSystemInsights: () => Promise<number>;
/**
 * Get analytics stats for the admin dashboard
 */
export declare const getAnalyticsStats: () => Promise<{
    totalAiQueries: number;
    avgDiagnosisTimeHours: number | null;
    avgRepairTimeDays: number | null;
    kbCoveragePercent: number;
    totalMachines: number;
    machinesWithDocs: number;
    machinesWithoutDocs: {
        name: string;
        id: string;
    }[];
}>;
/**
 * Get list of system insights
 */
export declare const listInsights: (options?: {
    status?: "NEW" | "REVIEWED" | "ACTIONED" | "DISMISSED";
    limit?: number;
}) => Promise<{
    id: string;
    status: import("../generated/prisma/enums").InsightStatus;
    metadata: import("@prisma/client/runtime/library").JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    category: InsightCategory;
    title: string;
    priority: InsightPriority;
    content: string;
}[]>;
/**
 * Update insight status
 */
export declare const updateInsightStatus: (id: string, status: "NEW" | "REVIEWED" | "ACTIONED" | "DISMISSED") => Promise<{
    id: string;
    status: import("../generated/prisma/enums").InsightStatus;
    metadata: import("@prisma/client/runtime/library").JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    category: InsightCategory;
    title: string;
    priority: InsightPriority;
    content: string;
}>;
//# sourceMappingURL=insightService.d.ts.map