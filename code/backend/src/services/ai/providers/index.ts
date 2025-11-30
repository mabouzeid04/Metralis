import { env } from "../../../config/env";
import type { LLMProvider } from "../types";
import { GeminiProvider } from "./gemini";

type ProviderFactory = () => LLMProvider;

const providerFactories: Record<string, ProviderFactory> = {
  gemini: () => new GeminiProvider(),
};

const providerInstances: Record<string, LLMProvider> = {};

const resolveProviderKey = (provider: string) => provider.toLowerCase();

export const getLLMProvider = (provider: string): LLMProvider => {
  const key = resolveProviderKey(provider);
  const factory = providerFactories[key];
  if (!factory) {
    throw new Error(`Unsupported AI provider: ${provider}`);
  }
  if (!providerInstances[key]) {
    providerInstances[key] = factory();
  }
  return providerInstances[key];
};

export const getConfiguredLLMProvider = () => getLLMProvider(env.ai.provider);


