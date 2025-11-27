import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../../../config/env";
import type { GenerateParams, GenerateResult, LLMProvider } from "../types";

const SYSTEM_PROMPT = `You are Metralis AI, a factory maintenance copilot.
- Ground every answer in the provided machine manuals, SOPs, work orders, or maintenance history.
- Provide concise, stepwise troubleshooting guidance.
- When referencing retrieved documents, cite the document title or identifier.
- If the context is insufficient, explicitly state the missing information and provide safe next steps.
- For safety-critical steps, include warnings before instructions.
- Default tone: confident, professional, and collaborative.`;

const geminiClient = new GoogleGenerativeAI(env.ai.gemini.apiKey);

export class GeminiProvider implements LLMProvider {
  private model = geminiClient.getGenerativeModel({
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

