import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../../../config/env";
import type { GenerateParams, GenerateResult, LLMProvider } from "../types";
import { buildSystemPrompt } from "./systemPrompt";

export class GoogleGeminiProvider implements LLMProvider {
  private client = new GoogleGenerativeAI(env.ai.gemini.apiKey);

  async generate(params: GenerateParams): Promise<GenerateResult> {
    const model = this.client.getGenerativeModel({
      model: env.ai.gemini.model,
      systemInstruction: buildSystemPrompt(params.language),
    });

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

    const result = await model.generateContent({
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
