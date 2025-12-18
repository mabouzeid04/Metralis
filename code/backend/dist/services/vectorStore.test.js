"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const queryMock = vitest_1.vi.hoisted(() => vitest_1.vi.fn());
vitest_1.vi.mock("../lib/pg", () => ({
    pgPool: { query: queryMock },
}));
const vectorStore_1 = require("./vectorStore");
(0, vitest_1.beforeEach)(() => {
    queryMock.mockReset();
});
(0, vitest_1.describe)("replaceDocumentChunks", () => {
    (0, vitest_1.it)("deletes existing chunks and inserts new ones", async () => {
        queryMock.mockResolvedValueOnce({}); // delete
        queryMock.mockResolvedValueOnce({});
        await (0, vectorStore_1.replaceDocumentChunks)("doc-1", [
            {
                documentId: "doc-1",
                chunkIndex: 0,
                content: "Hello world",
                tokens: 3,
                embedding: [0.1, 0.2],
                metadata: { documentTitle: "Doc 1" },
            },
        ]);
        (0, vitest_1.expect)(queryMock).toHaveBeenCalledTimes(2);
        (0, vitest_1.expect)(queryMock).toHaveBeenNthCalledWith(1, 'DELETE FROM "DocumentChunk" WHERE "documentId" = $1', ["doc-1"]);
        const insertCall = queryMock.mock.calls[1];
        (0, vitest_1.expect)(insertCall[0]).toContain('INSERT INTO "DocumentChunk"');
        (0, vitest_1.expect)(insertCall[1]).toEqual([
            "doc-1",
            0,
            "Hello world",
            3,
            "[0.1,0.2]",
            JSON.stringify({ documentTitle: "Doc 1" }),
        ]);
    });
    (0, vitest_1.it)("only deletes when no chunks are provided", async () => {
        queryMock.mockResolvedValueOnce({});
        await (0, vectorStore_1.replaceDocumentChunks)("doc-1", []);
        (0, vitest_1.expect)(queryMock).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(queryMock).toHaveBeenCalledWith('DELETE FROM "DocumentChunk" WHERE "documentId" = $1', ["doc-1"]);
    });
});
(0, vitest_1.describe)("searchSimilarChunks", () => {
    (0, vitest_1.it)("returns empty array when embedding is empty", async () => {
        const result = await (0, vectorStore_1.searchSimilarChunks)([], 5);
        (0, vitest_1.expect)(result).toEqual([]);
        (0, vitest_1.expect)(queryMock).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)("queries with filters and caps limit", async () => {
        queryMock.mockResolvedValueOnce({
            rows: [
                {
                    id: "chunk-1",
                    documentId: "doc-1",
                    chunkIndex: 0,
                    content: "content",
                    metadata: { language: "en" },
                    similarity: 0.9,
                },
            ],
        });
        const result = await (0, vectorStore_1.searchSimilarChunks)([0.3, 0.4], 100, { language: "en" });
        (0, vitest_1.expect)(queryMock).toHaveBeenCalledTimes(1);
        const [sql, params] = queryMock.mock.calls[0];
        (0, vitest_1.expect)(sql).toContain("LIMIT 50");
        (0, vitest_1.expect)(sql).toContain(`metadata\"->>'language' = $2`);
        (0, vitest_1.expect)(params).toEqual(["[0.3,0.4]", "en"]);
        (0, vitest_1.expect)(result[0].id).toBe("chunk-1");
    });
});
//# sourceMappingURL=vectorStore.test.js.map