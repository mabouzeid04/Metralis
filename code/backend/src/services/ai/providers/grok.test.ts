import { describe, expect, it, vi } from "vitest";

const fetchMock = vi.fn();

global.fetch = fetchMock;

import { GrokProvider } from "./grok";

describe("GrokProvider", () => {
  it("returns text from the API response", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: "grok-response" } }],
      }),
    });

    const provider = new GrokProvider();
    const result = await provider.generate({
      prompt: "Test prompt",
      history: [],
      temperature: 0.1,
      maxTokens: 50
    });

    expect(result.text).toBe("grok-response");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.x.ai/v1/chat/completions",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": expect.stringContaining("Bearer "),
        },
      })
    );
  });

  it("throws when API returns error", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: "Bad Request",
      text: async () => "Invalid request",
    });

    const provider = new GrokProvider();

    await expect(
      provider.generate({
        prompt: "Test prompt",
        history: [],
        temperature: 0.1,
        maxTokens: 50
      })
    ).rejects.toThrow("Grok API error: 400 Bad Request - Invalid request");
  });

  it("throws when no text is returned", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: "" } }],
      }),
    });

    const provider = new GrokProvider();

    await expect(
      provider.generate({
        prompt: "Test prompt",
        history: [],
        temperature: 0.1,
        maxTokens: 50
      })
    ).rejects.toThrow("Grok returned an empty response");
  });

  it("includes system prompt and history in messages", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: "response" } }],
      }),
    });

    const provider = new GrokProvider();
    await provider.generate({
      prompt: "Current prompt",
      history: [
        { role: "USER", content: "Previous user message" },
        { role: "ASSISTANT", content: "Previous assistant message" },
      ],
      temperature: 0.5,
      maxTokens: 100
    });

    const callArgs = fetchMock.mock.calls[0]?.[1];
    expect(callArgs).toBeDefined();
    const body = JSON.parse((callArgs as any).body);

    expect(body.messages).toEqual([
      { role: "system", content: expect.any(String) }, // SYSTEM_PROMPT
      { role: "user", content: "Previous user message" },
      { role: "assistant", content: "Previous assistant message" },
      { role: "user", content: "Current prompt" },
    ]);
    expect(body.model).toBe("grok-4-1-fast-non-reasoning");
    expect(body.temperature).toBe(0.5);
    expect(body.max_tokens).toBe(100);
    expect(body.stream).toBe(false);
  });
});
