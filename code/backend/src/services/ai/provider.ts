import { env } from "../../config/env";
import type { GenerateParams, GenerateResult, LLMProvider } from "./types";
import { GeminiProvider } from "./providers/gemini";

const providers: Record<string, LLMProvider> = {
  gemini: new GeminiProvider(),
};

export const generateLLMResponse = async (params: GenerateParams): Promise<GenerateResult> => {
  const providerKey = env.ai.provider.toLowerCase();
  const provider = providers[providerKey];
  if (!provider) {
    throw new Error(`Unsupported AI provider: ${env.ai.provider}`);
  }
  return provider.generate(params);
};

