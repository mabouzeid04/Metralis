"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.embedTexts = void 0;
const openai_1 = __importDefault(require("openai"));
const env_1 = require("../config/env");
const client = new openai_1.default({
    apiKey: env_1.env.embeddings.apiKey,
});
const embedTexts = async (inputs) => {
    if (!inputs.length) {
        return [];
    }
    const response = await client.embeddings.create({
        model: env_1.env.embeddings.model,
        input: inputs,
        dimensions: env_1.env.embeddings.dimensions,
    });
    return response.data.map((item) => {
        if (!item.embedding) {
            throw new Error("Embedding provider returned empty vector");
        }
        return item.embedding;
    });
};
exports.embedTexts = embedTexts;
//# sourceMappingURL=embeddings.js.map