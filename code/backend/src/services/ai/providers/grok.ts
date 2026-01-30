import { env } from "../../../config/env";
import type { GenerateParams, GenerateResult, LLMProvider } from "../types";
import { buildSystemPrompt } from "./systemPrompt";

interface GrokMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GrokRequest {
  messages: GrokMessage[];
  model: string;
  stream: boolean;
  temperature: number;
  max_tokens?: number;
}

interface GrokResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class GrokProvider implements LLMProvider {
  private apiKey = env.ai.grok.apiKey;
  private baseUrl = "https://api.x.ai/v1";

  async generate(params: GenerateParams): Promise<GenerateResult> {
    const historyMessages: GrokMessage[] = params.history.map((message) => ({
      role: message.role === "ASSISTANT" ? "assistant" : "user",
      content: message.content,
    }));

    const messages: GrokMessage[] = [
      { role: "system", content: buildSystemPrompt(params.language) },
      ...historyMessages,
      { role: "user", content: params.prompt },
    ];

    const requestBody: GrokRequest = {
      messages,
      model: env.ai.grok.model,
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

    const data = await response.json() as GrokResponse;

    const text = data.choices[0]?.message?.content?.trim();
    if (!text) {
      throw new Error("Grok returned an empty response");
    }

    return { text };
  }
}
