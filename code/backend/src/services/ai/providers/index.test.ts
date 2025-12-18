import { describe, expect, it, vi } from "vitest";

const geminiFactory = vi.fn().mockImplementation(() => ({
  generate: vi.fn(async () => ({ text: "gemini-text" })),
}));

const openaiFactory = vi.fn().mockImplementation(() => ({
  generate: vi.fn(async () => ({ text: "openai-text" })),
}));

vi.doMock("./googleGemini", () => ({
  GoogleGeminiProvider: vi.fn().mockImplementation(() => geminiFactory()),
}));

vi.doMock("./openai", () => ({
  OpenAIProvider: vi.fn().mockImplementation(() => openaiFactory()),
}));

describe("getLLMProvider", () => {
  it("returns cached provider instances and supports aliases", async () => {
    vi.resetModules();
    const { getLLMProvider } = await import("./index");

    const first = getLLMProvider("gemini");
    const second = getLLMProvider("google-gemini");

    expect(first).toBe(second);
    expect(geminiFactory).toHaveBeenCalledTimes(1);
  });

  it("throws for unsupported providers", async () => {
    vi.resetModules();
    const { getLLMProvider } = await import("./index");
    expect(() => getLLMProvider("unknown")).toThrow("Unsupported AI provider");
  });
});
