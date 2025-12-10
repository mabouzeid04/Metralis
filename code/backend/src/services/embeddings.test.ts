import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

describe("embedTexts", () => {
  it("returns empty array when no inputs are provided", async () => {
    const { embedTexts } = await import("./embeddings");
    await expect(embedTexts([])).resolves.toEqual([]);
  });

  it("throws when provider returns missing embeddings", async () => {
    vi.doMock("openai", () => ({
      default: class OpenAI {
        embeddings = {
          create: vi.fn(async () => ({
            data: [{ embedding: null }],
          })),
        };
      },
    }));

    await vi.isolateModulesAsync(async () => {
      const { embedTexts } = await import("./embeddings");
      await expect(embedTexts(["Hello"])).rejects.toThrow("Embedding provider returned empty vector");
    });
  });
});
