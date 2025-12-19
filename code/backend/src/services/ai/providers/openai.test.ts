import { describe, expect, it, vi } from "vitest";

const completionMock = vi.fn(async () => ({
  choices: [{ message: { content: "openai-response" } }],
}));

vi.mock("openai", () => ({
  default: class OpenAI {
    chat = {
      completions: {
        create: completionMock,
      },
    };
  },
}));

import { OpenAIProvider } from "./openai";

describe("OpenAIProvider", () => {
  it("returns text from the first choice", async () => {
    const provider = new OpenAIProvider();
    const result = await provider.generate({ prompt: "Q", history: [], temperature: 0.1, maxTokens: 50 });
    expect(result.text).toBe("openai-response");
    expect(completionMock).toHaveBeenCalled();
  });

  it("throws when no text is returned", async () => {
    completionMock.mockResolvedValueOnce({ choices: [{ message: { content: "" } }] });
    const provider = new OpenAIProvider();

    await expect(
      provider.generate({ prompt: "Q", history: [], temperature: 0.1, maxTokens: 50 }),
    ).rejects.toThrow("OpenAI returned an empty response");
  });
});


