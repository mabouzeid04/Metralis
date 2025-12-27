"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const generateMock = vitest_1.vi.fn(async (params) => ({ text: `${params.prompt}-response` }));
vitest_1.vi.mock("./providers", () => ({
    getLLMProvider: vitest_1.vi.fn(() => ({
        generate: generateMock,
    })),
    getChatLLMProvider: vitest_1.vi.fn(() => ({
        generate: generateMock,
    })),
    getInsightsLLMProvider: vitest_1.vi.fn(() => ({
        generate: generateMock,
    })),
}));
const provider_1 = require("./provider");
(0, vitest_1.describe)("generateLLMResponse", () => {
    (0, vitest_1.it)("delegates to the configured provider", async () => {
        const result = await (0, provider_1.generateLLMResponse)({ prompt: "hello", history: [], temperature: 0.2, maxTokens: 64 });
        (0, vitest_1.expect)(result.text).toBe("hello-response");
        (0, vitest_1.expect)(generateMock).toHaveBeenCalled();
    });
});
(0, vitest_1.describe)("generateChatLLMResponse", () => {
    (0, vitest_1.it)("delegates to the chat-specific provider", async () => {
        const result = await (0, provider_1.generateChatLLMResponse)({ prompt: "chat message", history: [], temperature: 0.3, maxTokens: 128 });
        (0, vitest_1.expect)(result.text).toBe("chat message-response");
        (0, vitest_1.expect)(generateMock).toHaveBeenCalled();
    });
});
(0, vitest_1.describe)("generateInsightsLLMResponse", () => {
    (0, vitest_1.it)("delegates to the insights-specific provider", async () => {
        const result = await (0, provider_1.generateInsightsLLMResponse)({ prompt: "analyze data", history: [], temperature: 0.1, maxTokens: 256 });
        (0, vitest_1.expect)(result.text).toBe("analyze data-response");
        (0, vitest_1.expect)(generateMock).toHaveBeenCalled();
    });
});
//# sourceMappingURL=provider.test.js.map