import { beforeEach, describe, expect, it, vi } from "vitest";

const queryMock = vi.hoisted(() => vi.fn());

vi.mock("../lib/pg", () => ({
  pgPool: { query: queryMock },
}));

import { replaceDocumentChunks, searchSimilarChunks } from "./vectorStore";

beforeEach(() => {
  queryMock.mockReset();
});

describe("replaceDocumentChunks", () => {
  it("deletes existing chunks and inserts new ones", async () => {
    queryMock.mockResolvedValueOnce({}); // delete
    queryMock.mockResolvedValueOnce({});

    await replaceDocumentChunks("doc-1", [
      {
        documentId: "doc-1",
        chunkIndex: 0,
        content: "Hello world",
        tokens: 3,
        embedding: [0.1, 0.2],
        metadata: { documentTitle: "Doc 1" },
      },
    ]);

    expect(queryMock).toHaveBeenCalledTimes(2);
    expect(queryMock).toHaveBeenNthCalledWith(1, 'DELETE FROM "DocumentChunk" WHERE "documentId" = $1', ["doc-1"]);
    const insertCall = queryMock.mock.calls[1]!;
    expect(insertCall[0]).toContain('INSERT INTO "DocumentChunk"');
    expect(insertCall[1]).toEqual([
      "doc-1",
      0,
      "Hello world",
      3,
      "[0.1,0.2]",
      JSON.stringify({ documentTitle: "Doc 1" }),
    ]);
  });

  it("only deletes when no chunks are provided", async () => {
    queryMock.mockResolvedValueOnce({});

    await replaceDocumentChunks("doc-1", []);

    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(queryMock).toHaveBeenCalledWith('DELETE FROM "DocumentChunk" WHERE "documentId" = $1', ["doc-1"]);
  });
});

describe("searchSimilarChunks", () => {
  it("returns empty array when embedding is empty", async () => {
    const result = await searchSimilarChunks([], 5);
    expect(result).toEqual([]);
    expect(queryMock).not.toHaveBeenCalled();
  });

  it("queries with filters and caps limit", async () => {
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

    const result = await searchSimilarChunks([0.3, 0.4], 100, { language: "en" });

    expect(queryMock).toHaveBeenCalledTimes(1);
    const call = queryMock.mock.calls[0]!;
    const [sql, params] = call;
    expect(sql).toContain("LIMIT 50");
    expect(sql).toContain(`metadata\"->>'language' = $2`);
    expect(params).toEqual(["[0.3,0.4]", "en"]);
    expect(result[0]!.id).toBe("chunk-1");
  });
});
