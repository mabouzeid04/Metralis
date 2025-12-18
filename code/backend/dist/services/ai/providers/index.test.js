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
const geminiFactory = vitest_1.vi.fn(() => ({
    generate: vitest_1.vi.fn(async () => ({ text: "gemini-text" })),
}));
const openaiFactory = vitest_1.vi.fn(() => ({
    generate: vitest_1.vi.fn(async () => ({ text: "openai-text" })),
}));
vitest_1.vi.doMock("./googleGemini", () => ({
    GoogleGeminiProvider: geminiFactory,
}));
vitest_1.vi.doMock("./openai", () => ({
    OpenAIProvider: openaiFactory,
}));
(0, vitest_1.describe)("getLLMProvider", () => {
    (0, vitest_1.it)("returns cached provider instances and supports aliases", async () => {
        vitest_1.vi.resetModules();
        const { getLLMProvider } = await Promise.resolve().then(() => __importStar(require("./index")));
        const first = getLLMProvider("gemini");
        const second = getLLMProvider("google-gemini");
        (0, vitest_1.expect)(first).toBe(second);
        (0, vitest_1.expect)(geminiFactory).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.it)("throws for unsupported providers", async () => {
        vitest_1.vi.resetModules();
        const { getLLMProvider } = await Promise.resolve().then(() => __importStar(require("./index")));
        (0, vitest_1.expect)(() => getLLMProvider("unknown")).toThrow("Unsupported AI provider");
    });
});
//# sourceMappingURL=index.test.js.map