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
(0, vitest_1.afterEach)(() => {
    vitest_1.vi.resetModules();
    vitest_1.vi.clearAllMocks();
});
(0, vitest_1.describe)("embedTexts", () => {
    (0, vitest_1.it)("returns empty array when no inputs are provided", async () => {
        const { embedTexts } = await Promise.resolve().then(() => __importStar(require("./embeddings")));
        await (0, vitest_1.expect)(embedTexts([])).resolves.toEqual([]);
    });
    (0, vitest_1.it)("throws when provider returns missing embeddings", async () => {
        vitest_1.vi.doMock("openai", () => ({
            default: class OpenAI {
                constructor() {
                    this.embeddings = {
                        create: vitest_1.vi.fn(async () => ({
                            data: [{ embedding: null }],
                        })),
                    };
                }
            },
        }));
        await vitest_1.vi.isolateModulesAsync(async () => {
            const { embedTexts } = await Promise.resolve().then(() => __importStar(require("./embeddings")));
            await (0, vitest_1.expect)(embedTexts(["Hello"])).rejects.toThrow("Embedding provider returned empty vector");
        });
    });
});
//# sourceMappingURL=embeddings.test.js.map