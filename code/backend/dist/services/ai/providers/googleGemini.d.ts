import type { GenerateParams, GenerateResult, LLMProvider } from "../types";
export declare class GoogleGeminiProvider implements LLMProvider {
    private client;
    generate(params: GenerateParams): Promise<GenerateResult>;
}
//# sourceMappingURL=googleGemini.d.ts.map