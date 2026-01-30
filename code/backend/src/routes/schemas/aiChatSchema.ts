import { z } from "zod";

const uuidSchema = z.string().uuid().optional();

const normalizeUuidInput = z.preprocess((value) => {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    return value;
  }

  const normalized = value.trim();

  if (!normalized || normalized === "null" || normalized === "undefined") {
    return undefined;
  }

  return normalized;
}, uuidSchema);

export const chatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  machineId: normalizeUuidInput,
  assetId: normalizeUuidInput,
  conversationId: normalizeUuidInput,
  language: z.enum(["en", "ar"]).optional().default("en"),
});

