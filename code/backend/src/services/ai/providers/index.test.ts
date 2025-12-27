import { describe, expect, it, vi } from "vitest";

const geminiFactory = vi.fn().mockImplementation(() => ({
  generate: vi.fn(async () => ({ text: "gemini-text" })),
}));

const openaiFactory = vi.fn().mockImplementation(() => ({
  generate: vi.fn(async () => ({ text: "openai-text" })),
}));

const grokFactory = vi.fn().mockImplementation(() => ({
  generate: vi.fn(async () => ({ text: "grok-text" })),
}));

vi.doMock("./googleGemini", () => ({
  GoogleGeminiProvider: vi.fn().mockImplementation(() => geminiFactory()),
}));

vi.doMock("./openai", () => ({
  OpenAIProvider: vi.fn().mockImplementation(() => openaiFactory()),
}));

vi.doMock("./grok", () => ({
  GrokProvider: vi.fn().mockImplementation(() => grokFactory()),
}));

describe("getLLMProvider", () => {
  it("returns cached provider instances and supports aliases", async () => {
    vi.resetModules();
    const { getLLMProvider } = await import("./index");

    const gemini1 = getLLMProvider("gemini");
    const gemini2 = getLLMProvider("google-gemini");
    const grok1 = getLLMProvider("grok");
    const grok2 = getLLMProvider("grok-4-latest");

    expect(gemini1).toBe(gemini2);
    expect(grok1).toBe(grok2);
    expect(geminiFactory).toHaveBeenCalledTimes(1);
    expect(grokFactory).toHaveBeenCalledTimes(1);
  });

  it("throws for unsupported providers", async () => {
    vi.resetModules();
    const { getLLMProvider } = await import("./index");
    expect(() => getLLMProvider("unknown")).toThrow("Unsupported AI provider");
  });

  describe("feature-specific providers", () => {
    it("getChatLLMProvider returns the configured chat provider", async () => {
      vi.resetModules();
      const { getChatLLMProvider } = await import("./index");
      const provider = getChatLLMProvider();
      expect(geminiFactory).toHaveBeenCalledTimes(1); // Uses gemini as default
      expect(typeof provider.generate).toBe("function");
    });

    it("getInsightsLLMProvider returns the configured insights provider", async () => {
      vi.resetModules();
      const { getInsightsLLMProvider } = await import("./index");
      const provider = getInsightsLLMProvider();
      expect(geminiFactory).toHaveBeenCalledTimes(1); // Uses gemini as default
      expect(typeof provider.generate).toBe("function");
    });
  });
});
