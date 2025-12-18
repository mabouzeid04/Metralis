"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfiguredLLMProvider = exports.getLLMProvider = void 0;
const env_1 = require("../../../config/env");
const googleGemini_1 = require("./googleGemini");
const openai_1 = require("./openai");
const providerFactories = {
    gemini: () => new googleGemini_1.GoogleGeminiProvider(),
    "google-gemini": () => new googleGemini_1.GoogleGeminiProvider(),
    google: () => new googleGemini_1.GoogleGeminiProvider(),
    openai: () => new openai_1.OpenAIProvider(),
    "gpt-4o": () => new openai_1.OpenAIProvider(),
};
const providerInstances = {};
const resolveProviderKey = (provider) => provider.toLowerCase();
const getLLMProvider = (provider) => {
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
exports.getLLMProvider = getLLMProvider;
const getConfiguredLLMProvider = () => (0, exports.getLLMProvider)(env_1.env.ai.provider);
exports.getConfiguredLLMProvider = getConfiguredLLMProvider;
//# sourceMappingURL=index.js.map