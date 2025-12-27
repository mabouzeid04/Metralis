export declare const env: {
    nodeEnv: string;
    port: number;
    jwtSecret: string;
    databaseUrl: string;
    s3: {
        bucket: string;
        region: string;
        accessKey: string;
        secretKey: string;
        endpoint: string | undefined;
        forcePathStyle: boolean;
    };
    embeddings: {
        apiKey: string;
        model: string;
        dimensions: number;
    };
    ai: {
        provider: string;
        temperature: number;
        maxTokens: number;
        chatProvider: string;
        insightsProvider: string;
        gemini: {
            apiKey: string;
            model: string;
        };
        openai: {
            apiKey: string;
            model: string;
        };
        grok: {
            apiKey: string;
            model: string;
        };
    };
    whatsapp: {
        enabled: boolean;
        token: string | undefined;
        phoneNumberId: string | undefined;
        templateName: string;
        languageCode: string;
    };
};
//# sourceMappingURL=env.d.ts.map