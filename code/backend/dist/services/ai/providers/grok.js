"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrokProvider = void 0;
const env_1 = require("../../../config/env");
const systemPrompt_1 = require("./systemPrompt");
class GrokProvider {
    constructor() {
        this.apiKey = env_1.env.ai.grok.apiKey;
        this.baseUrl = "https://api.x.ai/v1";
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
        const requestBody = {
            messages,
            model: env_1.env.ai.grok.model,
            stream: false,
            temperature: params.temperature,
            max_tokens: params.maxTokens,
        };
        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Grok API error: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const data = await response.json();
        const text = data.choices[0]?.message?.content?.trim();
        if (!text) {
            throw new Error("Grok returned an empty response");
        }
        return { text };
    }
}
exports.GrokProvider = GrokProvider;
//# sourceMappingURL=grok.js.map