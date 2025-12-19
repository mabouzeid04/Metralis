import type { RetrievedChunk } from "./types";
type BuildPromptParams = {
    question: string;
    machine?: {
        id: string;
        name: string;
        model?: string | null;
        manufacturer?: string | null;
        line?: string | null;
    } | null;
    retrievedChunks: RetrievedChunk[];
    maintenanceHistory: Array<{
        id: string;
        title: string;
        descriptionRaw: string;
        status: string;
        type: string;
        reportedAt: Date;
        completedAt: Date | null;
    }>;
};
export declare const buildPrompt: ({ question, machine, retrievedChunks, maintenanceHistory }: BuildPromptParams) => string;
export type SystemSnapshot = {
    recentWorkOrders: Array<{
        id: string;
        title: string;
        machineId: string;
        machineName: string;
        type: string;
        status: string;
        rootCause?: string | null;
        failureMode?: string | null;
        reportedAt: Date;
        completedAt?: Date | null;
    }>;
    negativeFeedbackCount: number;
    machinesWithoutDocs: Array<{
        id: string;
        name: string;
    }>;
    lowStockParts: Array<{
        id: string;
        name: string;
        stockQty: number;
        minStock: number;
    }>;
    recurringFailures: Array<{
        machineName: string;
        failureMode: string;
        count: number;
    }>;
    totalAiQueries: number;
    avgDiagnosisTimeHours: number | null;
    avgRepairTimeDays: number | null;
};
export declare const buildSystemAnalysisPrompt: (snapshot: SystemSnapshot) => string;
export {};
//# sourceMappingURL=prompt.d.ts.map