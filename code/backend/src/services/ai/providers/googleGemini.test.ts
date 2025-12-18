import { describe, expect, it, vi } from "vitest";

const generateContentMock = vi.fn().mockImplementation(async () => ({
  response: { text: () => "gemini-response" },
}));

vi.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: vi.fn(() => ({
    getGenerativeModel: vi.fn(() => ({
      generateContent: generateContentMock,
    })),
  })),
}));

import { GoogleGeminiProvider } from "./googleGemini";

describe("GoogleGeminiProvider", () => {
  it("returns generated text", async () => {
    const provider = new GoogleGeminiProvider();
    const result = await provider.generate({ prompt: "Q", history: [], temperature: 0.2, maxTokens: 128 });

    expect(result.text).toBe("gemini-response");
    expect(generateContentMock).toHaveBeenCalled();
  });

  it("throws when the response text is empty", async () => {
    generateContentMock.mockResolvedValueOnce({ response: { text: () => "" } });
    const provider = new GoogleGeminiProvider();

    await expect(
      provider.generate({ prompt: "Q", history: [], temperature: 0.2, maxTokens: 128 }),
    ).rejects.toThrow("Gemini returned an empty response");
  });
});
