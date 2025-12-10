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
export {};
//# sourceMappingURL=prompt.d.ts.map