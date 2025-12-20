"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInsightsLLMResponse = exports.generateChatLLMResponse = exports.generateLLMResponse = void 0;
const env_1 = require("../../config/env");
const providers_1 = require("./providers");
const generateLLMResponse = async (params) => {
    const provider = (0, providers_1.getLLMProvider)(env_1.env.ai.provider);
    return provider.generate(params);
};
exports.generateLLMResponse = generateLLMResponse;
// Feature-specific LLM response generators
const generateChatLLMResponse = async (params) => {
    const provider = (0, providers_1.getChatLLMProvider)();
    return provider.generate(params);
};
exports.generateChatLLMResponse = generateChatLLMResponse;
const generateInsightsLLMResponse = async (params) => {
    const provider = (0, providers_1.getInsightsLLMProvider)();
    return provider.generate(params);
};
exports.generateInsightsLLMResponse = generateInsightsLLMResponse;
//# sourceMappingURL=provider.js.map