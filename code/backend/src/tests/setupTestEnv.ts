import { afterAll, beforeAll, beforeEach, vi } from "vitest";
import { ensureDatabase, prisma, resetDatabase, seedBaseData } from "./utils/testDb";

process.env.NODE_ENV ??= "test";
process.env.DATABASE_URL ??=
  process.env.TEST_DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/metralis_test";
process.env.JWT_SECRET ??= "test-secret";
process.env.S3_BUCKET ??= "test-bucket";
process.env.S3_REGION ??= "us-east-1";
process.env.S3_ACCESS_KEY ??= "test-access-key";
process.env.S3_SECRET_KEY ??= "test-secret-key";
process.env.OPENAI_API_KEY ??= "test-openai-key";
process.env.GEMINI_API_KEY ??= "test-gemini-key";
process.env.AI_PROVIDER ??= "gemini";

// Avoid network calls in tests
vi.mock("@google/generative-ai", () => {
  return {
    GoogleGenerativeAI: class {
      apiKey: string;
      constructor(apiKey: string) {
        this.apiKey = apiKey;
      }
      getGenerativeModel() {
        return {
          generateContent: vi.fn(async () => ({
            response: { text: () => "gemini-mock-response" },
          })),
        };
      }
    },
  };
});

vi.mock("openai", () => {
  return {
    default: class OpenAI {
      chat = {
        completions: {
          create: vi.fn(async () => ({
            choices: [{ message: { content: "openai-mock-response" } }],
          })),
        },
      };
      embeddings = {
        create: vi.fn(async ({ input }: { input: string[] }) => ({
          data: input.map((value, index) => ({
            embedding: Array(3).fill(index + 1),
            index,
            object: "embedding",
            usage: { prompt_tokens: value.length, total_tokens: value.length },
          })),
        })),
      };
    },
  };
});

vi.mock("@aws-sdk/client-s3", () => {
  class MockCommand {
    params: Record<string, unknown>;
    constructor(params: Record<string, unknown>) {
      this.params = params;
    }
  }

  class MockS3Client {
    send = vi.fn(async () => ({
      Body: {
        transformToByteArray: async () => new Uint8Array(Buffer.from("mock-s3-body")),
      },
      ContentType: "application/octet-stream",
    }));
  }

  return {
    S3Client: MockS3Client,
    PutObjectCommand: MockCommand,
    GetObjectCommand: MockCommand,
  };
});

beforeAll(async () => {
  await ensureDatabase();
});

beforeEach(async () => {
  await resetDatabase();
  await seedBaseData();
});

afterAll(async () => {
  await prisma.$disconnect();
});
