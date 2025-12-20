"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const geminiFactory = vitest_1.vi.fn().mockImplementation(() => ({
    generate: vitest_1.vi.fn(async () => ({ text: "gemini-text" })),
}));
const openaiFactory = vitest_1.vi.fn().mockImplementation(() => ({
    generate: vitest_1.vi.fn(async () => ({ text: "openai-text" })),
}));
const grokFactory = vitest_1.vi.fn().mockImplementation(() => ({
    generate: vitest_1.vi.fn(async () => ({ text: "grok-text" })),
}));
vitest_1.vi.doMock("./googleGemini", () => ({
    GoogleGeminiProvider: vitest_1.vi.fn().mockImplementation(() => geminiFactory()),
}));
vitest_1.vi.doMock("./openai", () => ({
    OpenAIProvider: vitest_1.vi.fn().mockImplementation(() => openaiFactory()),
}));
vitest_1.vi.doMock("./grok", () => ({
    GrokProvider: vitest_1.vi.fn().mockImplementation(() => grokFactory()),
}));
(0, vitest_1.describe)("getLLMProvider", () => {
    (0, vitest_1.it)("returns cached provider instances and supports aliases", async () => {
        vitest_1.vi.resetModules();
        const { getLLMProvider } = await Promise.resolve().then(() => __importStar(require("./index")));
        const gemini1 = getLLMProvider("gemini");
        const gemini2 = getLLMProvider("google-gemini");
        const grok1 = getLLMProvider("grok");
        const grok2 = getLLMProvider("grok-4-latest");
        (0, vitest_1.expect)(gemini1).toBe(gemini2);
        (0, vitest_1.expect)(grok1).toBe(grok2);
        (0, vitest_1.expect)(geminiFactory).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(grokFactory).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.it)("throws for unsupported providers", async () => {
        vitest_1.vi.resetModules();
        const { getLLMProvider } = await Promise.resolve().then(() => __importStar(require("./index")));
        (0, vitest_1.expect)(() => getLLMProvider("unknown")).toThrow("Unsupported AI provider");
    });
    (0, vitest_1.describe)("feature-specific providers", () => {
        (0, vitest_1.it)("getChatLLMProvider returns the configured chat provider", async () => {
            vitest_1.vi.resetModules();
            const { getChatLLMProvider } = await Promise.resolve().then(() => __importStar(require("./index")));
            const provider = getChatLLMProvider();
            (0, vitest_1.expect)(geminiFactory).toHaveBeenCalledTimes(1); // Uses gemini as default
            (0, vitest_1.expect)(typeof provider.generate).toBe("function");
        });
        (0, vitest_1.it)("getInsightsLLMProvider returns the configured insights provider", async () => {
            vitest_1.vi.resetModules();
            const { getInsightsLLMProvider } = await Promise.resolve().then(() => __importStar(require("./index")));
            const provider = getInsightsLLMProvider();
            (0, vitest_1.expect)(geminiFactory).toHaveBeenCalledTimes(1); // Uses gemini as default
            (0, vitest_1.expect)(typeof provider.generate).toBe("function");
        });
    });
});
//# sourceMappingURL=index.test.js.map