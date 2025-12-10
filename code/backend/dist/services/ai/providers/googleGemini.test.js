"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const generateContentMock = vitest_1.vi.fn(async () => ({
    response: { text: () => "gemini-response" },
}));
vitest_1.vi.mock("@google/generative-ai", () => ({
    GoogleGenerativeAI: vitest_1.vi.fn(() => ({
        getGenerativeModel: vitest_1.vi.fn(() => ({
            generateContent: generateContentMock,
        })),
    })),
}));
const googleGemini_1 = require("./googleGemini");
(0, vitest_1.describe)("GoogleGeminiProvider", () => {
    (0, vitest_1.it)("returns generated text", async () => {
        const provider = new googleGemini_1.GoogleGeminiProvider();
        const result = await provider.generate({ prompt: "Q", history: [], temperature: 0.2, maxTokens: 128 });
        (0, vitest_1.expect)(result.text).toBe("gemini-response");
        (0, vitest_1.expect)(generateContentMock).toHaveBeenCalled();
    });
    (0, vitest_1.it)("throws when the response text is empty", async () => {
        generateContentMock.mockResolvedValueOnce({ response: { text: () => "" } });
        const provider = new googleGemini_1.GoogleGeminiProvider();
        await (0, vitest_1.expect)(provider.generate({ prompt: "Q", history: [], temperature: 0.2, maxTokens: 128 })).rejects.toThrow("Gemini returned an empty response");
    });
});
//# sourceMappingURL=googleGemini.test.js.map