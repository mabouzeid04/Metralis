export type ChunkerOptions = {
    chunkSize?: number;
    chunkOverlap?: number;
};
export declare const chunkText: (input: string, options?: ChunkerOptions) => string[];
export declare const countApproxTokens: (text: string) => number;
//# sourceMappingURL=textChunker.d.ts.map