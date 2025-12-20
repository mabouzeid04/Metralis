import { env } from "../../../config/env";
import type { LLMProvider } from "../types";
import { GoogleGeminiProvider } from "./googleGemini";
import { GrokProvider } from "./grok";
import { OpenAIProvider } from "./openai";

type ProviderFactory = () => LLMProvider;

const providerFactories: Record<string, ProviderFactory> = {
  gemini: () => new GoogleGeminiProvider(),
  "google-gemini": () => new GoogleGeminiProvider(),
  google: () => new GoogleGeminiProvider(),
  openai: () => new OpenAIProvider(),
  "gpt-4o": () => new OpenAIProvider(),
  grok: () => new GrokProvider(),
  "grok-4-latest": () => new GrokProvider(),
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

// Feature-specific provider getters
export const getChatLLMProvider = () => getLLMProvider(env.ai.chatProvider);
export const getInsightsLLMProvider = () => getLLMProvider(env.ai.insightsProvider);


