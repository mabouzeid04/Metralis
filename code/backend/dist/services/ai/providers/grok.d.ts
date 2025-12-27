import type { GenerateParams, GenerateResult, LLMProvider } from "../types";
export declare class GrokProvider implements LLMProvider {
    private apiKey;
    private baseUrl;
    generate(params: GenerateParams): Promise<GenerateResult>;
}
//# sourceMappingURL=grok.d.ts.map