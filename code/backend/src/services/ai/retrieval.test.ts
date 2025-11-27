import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { retrieveContext } from "./retrieval";
import { embedTexts } from "../embeddings";
import { searchSimilarChunks } from "../vectorStore";

vi.mock("../embeddings", () => ({
  embedTexts: vi.fn(),
}));

vi.mock("../vectorStore", () => ({
  searchSimilarChunks: vi.fn(),
}));

describe("retrieveContext", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns empty list when embeddings are unavailable", async () => {
    vi.mocked(embedTexts).mockResolvedValue([undefined as unknown as number[]]);

    const result = await retrieveContext({ question: "Test?", limit: 3 });

    expect(result).toEqual([]);
    expect(searchSimilarChunks).not.toHaveBeenCalled();
  });

  it("returns mapped chunks with metadata", async () => {
    vi.mocked(embedTexts).mockResolvedValue([[0.1, 0.2]]);
    vi.mocked(searchSimilarChunks).mockResolvedValue([
      {
        id: "chunk-1",
        documentId: "doc-1",
        chunkIndex: 0,
        content: "Sample content",
        metadata: { documentTitle: "Manual A" },
        similarity: 0.88,
      },
    ]);

    const result = await retrieveContext({ question: "Test?", limit: 3 });

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: "chunk-1",
      documentId: "doc-1",
      content: "Sample content",
      metadata: { documentTitle: "Manual A" },
      similarity: 0.88,
    });
  });
});

