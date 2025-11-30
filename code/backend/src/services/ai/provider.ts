import { env } from "../../config/env";
import type { GenerateParams, GenerateResult } from "./types";
import { getLLMProvider } from "./providers";

export const generateLLMResponse = async (params: GenerateParams): Promise<GenerateResult> => {
  const provider = getLLMProvider(env.ai.provider);
  return provider.generate(params);
};

