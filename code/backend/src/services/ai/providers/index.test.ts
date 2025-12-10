import { describe, expect, it, vi } from "vitest";

const geminiFactory = vi.fn(() => ({
  generate: vi.fn(async () => ({ text: "gemini-text" })),
}));

const openaiFactory = vi.fn(() => ({
  generate: vi.fn(async () => ({ text: "openai-text" })),
}));

vi.doMock("./googleGemini", () => ({
  GoogleGeminiProvider: geminiFactory,
}));

vi.doMock("./openai", () => ({
  OpenAIProvider: openaiFactory,
}));

describe("getLLMProvider", () => {
  it("returns cached provider instances and supports aliases", async () => {
    await vi.isolateModulesAsync(async () => {
      const { getLLMProvider } = await import("./index");

      const first = getLLMProvider("gemini");
      const second = getLLMProvider("google-gemini");

      expect(first).toBe(second);
      expect(geminiFactory).toHaveBeenCalledTimes(1);
    });
  });

  it("throws for unsupported providers", async () => {
    await vi.isolateModulesAsync(async () => {
      const { getLLMProvider } = await import("./index");
      expect(() => getLLMProvider("unknown")).toThrow("Unsupported AI provider");
    });
  });
});
