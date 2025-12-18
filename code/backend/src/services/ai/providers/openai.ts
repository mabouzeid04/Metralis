import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { env } from "../../../config/env";
import type { GenerateParams, GenerateResult, LLMProvider } from "../types";
import { SYSTEM_PROMPT } from "./systemPrompt";

export class OpenAIProvider implements LLMProvider {
  private client = new OpenAI({ apiKey: env.ai.openai.apiKey });

  async generate(params: GenerateParams): Promise<GenerateResult> {
    const historyMessages: ChatCompletionMessageParam[] = params.history.map((message) =>
      ({
        role: message.role === "ASSISTANT" ? "assistant" : "user",
        content: message.content,
      }) satisfies ChatCompletionMessageParam,
    );

    const messages: ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...historyMessages,
      { role: "user", content: params.prompt },
    ];

    const completion = await this.client.chat.completions.create({
      model: env.ai.openai.model,
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
