"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const retrieval_1 = require("./retrieval");
const embeddings_1 = require("../embeddings");
const vectorStore_1 = require("../vectorStore");
vitest_1.vi.mock("../embeddings", () => ({
    embedTexts: vitest_1.vi.fn(),
}));
vitest_1.vi.mock("../vectorStore", () => ({
    searchSimilarChunks: vitest_1.vi.fn(),
}));
(0, vitest_1.describe)("retrieveContext", () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.resetAllMocks();
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)("returns empty list when embeddings are unavailable", async () => {
        vitest_1.vi.mocked(embeddings_1.embedTexts).mockResolvedValue([undefined]);
        const result = await (0, retrieval_1.retrieveContext)({ question: "Test?", limit: 3 });
        (0, vitest_1.expect)(result).toEqual([]);
        (0, vitest_1.expect)(vectorStore_1.searchSimilarChunks).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)("returns mapped chunks with metadata", async () => {
        vitest_1.vi.mocked(embeddings_1.embedTexts).mockResolvedValue([[0.1, 0.2]]);
        vitest_1.vi.mocked(vectorStore_1.searchSimilarChunks).mockResolvedValue([
            {
                id: "chunk-1",
                documentId: "doc-1",
                chunkIndex: 0,
                content: "Sample content",
                metadata: { documentTitle: "Manual A" },
                similarity: 0.88,
            },
        ]);
        const result = await (0, retrieval_1.retrieveContext)({ question: "Test?", limit: 3 });
        (0, vitest_1.expect)(result).toHaveLength(1);
        (0, vitest_1.expect)(result[0]).toMatchObject({
            id: "chunk-1",
            documentId: "doc-1",
            content: "Sample content",
            metadata: { documentTitle: "Manual A" },
            similarity: 0.88,
        });
    });
});
//# sourceMappingURL=retrieval.test.js.map