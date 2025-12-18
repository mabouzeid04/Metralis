"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleGeminiProvider = void 0;
const generative_ai_1 = require("@google/generative-ai");
const env_1 = require("../../../config/env");
const systemPrompt_1 = require("./systemPrompt");
class GoogleGeminiProvider {
    constructor() {
        this.model = new generative_ai_1.GoogleGenerativeAI(env_1.env.ai.gemini.apiKey).getGenerativeModel({
            model: env_1.env.ai.gemini.model,
            systemInstruction: systemPrompt_1.SYSTEM_PROMPT,
        });
    }
    async generate(params) {
        const contents = [
            ...params.history.map((message) => ({
                role: message.role === "ASSISTANT" ? "model" : "user",
                parts: [{ text: message.content }],
            })),
            {
                role: "user",
                parts: [{ text: params.prompt }],
            },
        ];
        const result = await this.model.generateContent({
            contents,
            generationConfig: {
                temperature: params.temperature,
                maxOutputTokens: params.maxTokens,
            },
        });
        const text = result.response.text();
        if (!text) {
            throw new Error("Gemini returned an empty response");
        }
        return { text };
    }
}
exports.GoogleGeminiProvider = GoogleGeminiProvider;
//# sourceMappingURL=googleGemini.js.map