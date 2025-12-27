"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const testDb_1 = require("./utils/testDb");
(_a = process.env).NODE_ENV ?? (_a.NODE_ENV = "test");
(_b = process.env).DATABASE_URL ?? (_b.DATABASE_URL = process.env.TEST_DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/metralis_test");
(_c = process.env).JWT_SECRET ?? (_c.JWT_SECRET = "test-secret");
(_d = process.env).S3_BUCKET ?? (_d.S3_BUCKET = "test-bucket");
(_e = process.env).S3_REGION ?? (_e.S3_REGION = "us-east-1");
(_f = process.env).S3_ACCESS_KEY ?? (_f.S3_ACCESS_KEY = "test-access-key");
(_g = process.env).S3_SECRET_KEY ?? (_g.S3_SECRET_KEY = "test-secret-key");
(_h = process.env).OPENAI_API_KEY ?? (_h.OPENAI_API_KEY = "test-openai-key");
(_j = process.env).GEMINI_API_KEY ?? (_j.GEMINI_API_KEY = "test-gemini-key");
(_k = process.env).AI_PROVIDER ?? (_k.AI_PROVIDER = "gemini");
// Avoid network calls in tests
vitest_1.vi.mock("@google/generative-ai", () => {
    return {
        GoogleGenerativeAI: class {
            constructor(apiKey) {
                this.apiKey = apiKey;
            }
            getGenerativeModel() {
                return {
                    generateContent: vitest_1.vi.fn(async () => ({
                        response: { text: () => "gemini-mock-response" },
                    })),
                };
            }
        },
    };
});
vitest_1.vi.mock("openai", () => {
    return {
        default: class OpenAI {
            constructor() {
                this.chat = {
                    completions: {
                        create: vitest_1.vi.fn(async () => ({
                            choices: [{ message: { content: "openai-mock-response" } }],
                        })),
                    },
                };
                this.embeddings = {
                    create: vitest_1.vi.fn(async ({ input }) => ({
                        data: input.map((value, index) => ({
                            embedding: Array(3).fill(index + 1),
                            index,
                            object: "embedding",
                            usage: { prompt_tokens: value.length, total_tokens: value.length },
                        })),
                    })),
                };
            }
        },
    };
});
vitest_1.vi.mock("@aws-sdk/client-s3", () => {
    class MockCommand {
        constructor(params) {
            this.params = params;
        }
    }
    class MockS3Client {
        constructor() {
            this.send = vitest_1.vi.fn(async () => ({
                Body: {
                    transformToByteArray: async () => new Uint8Array(Buffer.from("mock-s3-body")),
                },
                ContentType: "application/octet-stream",
            }));
        }
    }
    return {
        S3Client: MockS3Client,
        PutObjectCommand: MockCommand,
        GetObjectCommand: MockCommand,
    };
});
(0, vitest_1.beforeAll)(async () => {
    await (0, testDb_1.ensureDatabase)();
});
(0, vitest_1.beforeEach)(async () => {
    await (0, testDb_1.resetDatabase)();
    await (0, testDb_1.seedBaseData)();
});
(0, vitest_1.afterAll)(async () => {
    await testDb_1.prisma.$disconnect();
});
//# sourceMappingURL=setupTestEnv.js.map