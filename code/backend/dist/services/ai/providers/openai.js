"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIProvider = void 0;
const openai_1 = __importDefault(require("openai"));
const env_1 = require("../../../config/env");
const systemPrompt_1 = require("./systemPrompt");
class OpenAIProvider {
    constructor() {
        this.client = new openai_1.default({ apiKey: env_1.env.ai.openai.apiKey });
    }
    async generate(params) {
        const historyMessages = params.history.map((message) => ({
            role: message.role === "ASSISTANT" ? "assistant" : "user",
            content: message.content,
        }));
        const messages = [
            { role: "system", content: (0, systemPrompt_1.buildSystemPrompt)(params.language) },
            ...historyMessages,
            { role: "user", content: params.prompt },
        ];
        const completion = await this.client.chat.completions.create({
            model: env_1.env.ai.openai.model,
            messages,
            temperature: params.temperature,
            max_tokens: params.maxTokens,
        });
        const text = completion.choices[0]?.message?.content?.trim();
        if (!text) {
            throw new Error("OpenAI returned an empty response");
        }
        return { text };
    }
}
exports.OpenAIProvider = OpenAIProvider;
//# sourceMappingURL=openai.js.map