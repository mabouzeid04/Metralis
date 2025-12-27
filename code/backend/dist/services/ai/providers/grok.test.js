"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const fetchMock = vitest_1.vi.fn();
global.fetch = fetchMock;
const grok_1 = require("./grok");
(0, vitest_1.describe)("GrokProvider", () => {
    (0, vitest_1.it)("returns text from the API response", async () => {
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                choices: [{ message: { content: "grok-response" } }],
            }),
        });
        const provider = new grok_1.GrokProvider();
        const result = await provider.generate({
            prompt: "Test prompt",
            history: [],
            temperature: 0.1,
            maxTokens: 50
        });
        (0, vitest_1.expect)(result.text).toBe("grok-response");
        (0, vitest_1.expect)(fetchMock).toHaveBeenCalledWith("https://api.x.ai/v1/chat/completions", vitest_1.expect.objectContaining({
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": vitest_1.expect.stringContaining("Bearer "),
            },
        }));
    });
    (0, vitest_1.it)("throws when API returns error", async () => {
        fetchMock.mockResolvedValueOnce({
            ok: false,
            status: 400,
            statusText: "Bad Request",
            text: async () => "Invalid request",
        });
        const provider = new grok_1.GrokProvider();
        await (0, vitest_1.expect)(provider.generate({
            prompt: "Test prompt",
            history: [],
            temperature: 0.1,
            maxTokens: 50
        })).rejects.toThrow("Grok API error: 400 Bad Request - Invalid request");
    });
    (0, vitest_1.it)("throws when no text is returned", async () => {
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                choices: [{ message: { content: "" } }],
            }),
        });
        const provider = new grok_1.GrokProvider();
        await (0, vitest_1.expect)(provider.generate({
            prompt: "Test prompt",
            history: [],
            temperature: 0.1,
            maxTokens: 50
        })).rejects.toThrow("Grok returned an empty response");
    });
    (0, vitest_1.it)("includes system prompt and history in messages", async () => {
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                choices: [{ message: { content: "response" } }],
            }),
        });
        const provider = new grok_1.GrokProvider();
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
        (0, vitest_1.expect)(callArgs).toBeDefined();
        const body = JSON.parse(callArgs.body);
        (0, vitest_1.expect)(body.messages).toEqual([
            { role: "system", content: vitest_1.expect.any(String) }, // SYSTEM_PROMPT
            { role: "user", content: "Previous user message" },
            { role: "assistant", content: "Previous assistant message" },
            { role: "user", content: "Current prompt" },
        ]);
        (0, vitest_1.expect)(body.model).toBe("grok-4-1-fast-non-reasoning");
        (0, vitest_1.expect)(body.temperature).toBe(0.5);
        (0, vitest_1.expect)(body.max_tokens).toBe(100);
        (0, vitest_1.expect)(body.stream).toBe(false);
    });
});
//# sourceMappingURL=grok.test.js.map