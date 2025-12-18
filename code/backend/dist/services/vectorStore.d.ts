export type DocumentChunkRecord = {
    documentId: string;
    chunkIndex: number;
    content: string;
    tokens: number;
    embedding: number[];
    metadata?: Record<string, unknown>;
};
export declare const replaceDocumentChunks: (documentId: string, chunks: DocumentChunkRecord[]) => Promise<void>;
export type SimilarChunkFilter = {
    documentId?: string | undefined;
    machineId?: string | undefined;
    machineType?: string | undefined;
    language?: string | undefined;
};
export declare const searchSimilarChunks: (embedding: number[], limit: number, filter?: SimilarChunkFilter) => Promise<{
    id: string;
    documentId: string;
    chunkIndex: number;
    content: string;
    metadata: Record<string, unknown> | null;
    similarity: number;
}[]>;
export type IncidentChunkRecord = {
    workOrderId: string;
    chunkIndex: number;
    content: string;
    tokens: number;
    embedding: number[];
    machineId?: string | null;
    machineType?: string | null;
    language?: string | null;
    metadata?: Record<string, unknown>;
};
export type SimilarIncidentFilter = {
    workOrderId?: string | undefined;
    machineId?: string | undefined;
    machineType?: string | undefined;
    language?: string | undefined;
};
export declare const replaceIncidentChunks: (workOrderId: string, chunks: IncidentChunkRecord[]) => Promise<void>;
export declare const searchSimilarIncidents: (embedding: number[], limit: number, filter?: SimilarIncidentFilter) => Promise<{
    id: string;
    workOrderId: string;
    chunkIndex: number;
    content: string;
    metadata: Record<string, unknown> | null;
    machineId: string | null;
    machineType: string | null;
    language: string | null;
    similarity: number;
}[]>;
//# sourceMappingURL=vectorStore.d.ts.map