import { describe, expect, it, vi } from "vitest";

const generateMock = vi.fn(async (params: { prompt: string }) => ({ text: `${params.prompt}-response` }));

vi.mock("./providers", () => ({
  getLLMProvider: vi.fn(() => ({
    generate: generateMock,
  })),
}));

import { generateLLMResponse } from "./provider";

describe("generateLLMResponse", () => {
  it("delegates to the configured provider", async () => {
    const result = await generateLLMResponse({ prompt: "hello", history: [], temperature: 0.2, maxTokens: 64 });
    expect(result.text).toBe("hello-response");
    expect(generateMock).toHaveBeenCalled();
  });
});
