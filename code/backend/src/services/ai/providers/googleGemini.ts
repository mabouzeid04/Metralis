import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../../../config/env";
import type { GenerateParams, GenerateResult, LLMProvider } from "../types";
import { SYSTEM_PROMPT } from "./systemPrompt";

export class GoogleGeminiProvider implements LLMProvider {
  private model = new GoogleGenerativeAI(env.ai.gemini.apiKey).getGenerativeModel({
    model: env.ai.gemini.model,
    systemInstruction: SYSTEM_PROMPT,
  });

  async generate(params: GenerateParams): Promise<GenerateResult> {
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
