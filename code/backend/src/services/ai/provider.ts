import { env } from "../../config/env";
import type { GenerateParams, GenerateResult } from "./types";
import { getLLMProvider, getChatLLMProvider, getInsightsLLMProvider } from "./providers";

export const generateLLMResponse = async (params: GenerateParams): Promise<GenerateResult> => {
  const provider = getLLMProvider(env.ai.provider);
  return provider.generate(params);
};

// Feature-specific LLM response generators
export const generateChatLLMResponse = async (params: GenerateParams): Promise<GenerateResult> => {
  const provider = getChatLLMProvider();
  return provider.generate(params);
};

export const generateInsightsLLMResponse = async (params: GenerateParams): Promise<GenerateResult> => {
  const provider = getInsightsLLMProvider();
  return provider.generate(params);
};

