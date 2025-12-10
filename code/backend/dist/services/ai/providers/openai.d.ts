import type { GenerateParams, GenerateResult, LLMProvider } from "../types";
export declare class OpenAIProvider implements LLMProvider {
    private client;
    generate(params: GenerateParams): Promise<GenerateResult>;
}
//# sourceMappingURL=openai.d.ts.map