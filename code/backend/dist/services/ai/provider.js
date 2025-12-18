"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLLMResponse = void 0;
const env_1 = require("../../config/env");
const providers_1 = require("./providers");
const generateLLMResponse = async (params) => {
    const provider = (0, providers_1.getLLMProvider)(env_1.env.ai.provider);
    return provider.generate(params);
};
exports.generateLLMResponse = generateLLMResponse;
//# sourceMappingURL=provider.js.map