"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const completionMock = vitest_1.vi.fn(async () => ({
    choices: [{ message: { content: "openai-response" } }],
}));
vitest_1.vi.mock("openai", () => ({
    default: class OpenAI {
        constructor() {
            this.chat = {
                completions: {
                    create: completionMock,
                },
            };
        }
    },
}));
const openai_1 = require("./openai");
(0, vitest_1.describe)("OpenAIProvider", () => {
    (0, vitest_1.it)("returns text from the first choice", async () => {
        const provider = new openai_1.OpenAIProvider();
        const result = await provider.generate({ prompt: "Q", history: [], temperature: 0.1, maxTokens: 50 });
        (0, vitest_1.expect)(result.text).toBe("openai-response");
        (0, vitest_1.expect)(completionMock).toHaveBeenCalled();
    });
    (0, vitest_1.it)("throws when no text is returned", async () => {
        completionMock.mockResolvedValueOnce({ choices: [{ message: { content: "" } }] });
        const provider = new openai_1.OpenAIProvider();
        await (0, vitest_1.expect)(provider.generate({ prompt: "Q", history: [], temperature: 0.1, maxTokens: 50 })).rejects.toThrow("OpenAI returned an empty response");
    });
});
//# sourceMappingURL=openai.test.js.map