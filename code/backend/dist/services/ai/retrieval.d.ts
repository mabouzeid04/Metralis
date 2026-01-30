import type { RetrievedChunk } from "./types";
type RetrieveParams = {
    question: string;
    machineId?: string | null | undefined;
    machineType?: string | null | undefined;
    assetId?: string | null | undefined;
    language?: string | null | undefined;
    limit?: number;
};
export declare const retrieveContext: ({ question, machineId, machineType, assetId, language, limit, }: RetrieveParams) => Promise<RetrievedChunk[]>;
export {};
//# sourceMappingURL=retrieval.d.ts.map