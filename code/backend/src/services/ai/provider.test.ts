import { describe, expect, it, vi } from "vitest";

const generateMock = vi.fn(async (params: { prompt: string }) => ({ text: `${params.prompt}-response` }));

vi.mock("./providers", () => ({
  getLLMProvider: vi.fn(() => ({
    generate: generateMock,
  })),
  getChatLLMProvider: vi.fn(() => ({
    generate: generateMock,
  })),
  getInsightsLLMProvider: vi.fn(() => ({
    generate: generateMock,
  })),
}));

import { generateLLMResponse, generateChatLLMResponse, generateInsightsLLMResponse } from "./provider";

describe("generateLLMResponse", () => {
  it("delegates to the configured provider", async () => {
    const result = await generateLLMResponse({ prompt: "hello", history: [], temperature: 0.2, maxTokens: 64 });
    expect(result.text).toBe("hello-response");
    expect(generateMock).toHaveBeenCalled();
  });
});

describe("generateChatLLMResponse", () => {
  it("delegates to the chat-specific provider", async () => {
    const result = await generateChatLLMResponse({ prompt: "chat message", history: [], temperature: 0.3, maxTokens: 128 });
    expect(result.text).toBe("chat message-response");
    expect(generateMock).toHaveBeenCalled();
  });
});

describe("generateInsightsLLMResponse", () => {
  it("delegates to the insights-specific provider", async () => {
    const result = await generateInsightsLLMResponse({ prompt: "analyze data", history: [], temperature: 0.1, maxTokens: 256 });
    expect(result.text).toBe("analyze data-response");
    expect(generateMock).toHaveBeenCalled();
  });
});



