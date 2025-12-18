import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const requiredEnv = [
  "DATABASE_URL",
  "JWT_SECRET",
  "S3_BUCKET",
  "S3_REGION",
  "S3_ACCESS_KEY",
  "S3_SECRET_KEY",
  "OPENAI_API_KEY",
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

// Conditionally require GEMINI_API_KEY based on AI provider
const aiProvider = (process.env.AI_PROVIDER || "gemini").toLowerCase();
if (aiProvider === "gemini" && !process.env.GEMINI_API_KEY) {
  throw new Error(`Missing required environment variable: GEMINI_API_KEY (required when AI_PROVIDER is gemini)`);
}

const whatsappEnabled = process.env.WHATSAPP_ASSIGNMENT_ENABLED === "true";
const whatsappConfig = {
  enabled: whatsappEnabled && Boolean(process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID),
  token: process.env.WHATSAPP_TOKEN,
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
  templateName: process.env.WHATSAPP_TEMPLATE_WORKORDER_ASSIGNED || "workorder_assigned",
  languageCode: process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en_US",
};

if (whatsappEnabled && (!whatsappConfig.token || !whatsappConfig.phoneNumberId)) {
  throw new Error(
    "Missing required environment variables for WhatsApp assignment alerts: WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID",
  );
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 4000,
  jwtSecret: process.env.JWT_SECRET as string,
  databaseUrl: process.env.DATABASE_URL as string,
  s3: {
    bucket: process.env.S3_BUCKET as string,
    region: process.env.S3_REGION as string,
    accessKey: process.env.S3_ACCESS_KEY as string,
    secretKey: process.env.S3_SECRET_KEY as string,
    endpoint: process.env.S3_ENDPOINT,
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
  },
  embeddings: {
    apiKey: process.env.OPENAI_API_KEY as string,
    model: process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small",
    dimensions: Number(process.env.OPENAI_EMBEDDING_DIMENSIONS) || 1536,
  },
  ai: {
    provider: process.env.AI_PROVIDER || "gemini",
    temperature: Number(process.env.AI_TEMPERATURE ?? "0.4"),
    maxTokens: Number(process.env.AI_MAX_TOKENS ?? "1024"),
    gemini: {
      apiKey: process.env.GEMINI_API_KEY as string,
      model: process.env.GEMINI_MODEL || "gemini-3-flash-preview",
    },
    openai: {
      apiKey: process.env.OPENAI_API_KEY as string,
      model: process.env.OPENAI_MODEL || "gpt-5.1-2025-11-13",
    },
  },
  whatsapp: whatsappConfig,
};


