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
//# sourceMappingURL=vectorStore.d.ts.map