import { describe, expect, it } from "vitest";
import { chatRequestSchema } from "./schemas/aiChatSchema";

describe("chatRequestSchema", () => {
  it("validates a minimal payload", () => {
    const data = chatRequestSchema.parse({ message: "Help me diagnose" });
    expect(data.message).toBe("Help me diagnose");
  });

  it("rejects empty messages", () => {
    expect(() => chatRequestSchema.parse({ message: "" })).toThrow();
  });

  it("validates optional identifiers", () => {
    const payload = chatRequestSchema.parse({
      message: "Check machine",
      machineId: "8f1a7cf9-6a9f-4c96-8f93-5c2a52f94d2e",
      conversationId: "4b7f0f99-0bae-46c4-b6d2-454f3dda3f7c",
    });

    expect(payload.machineId).toBeDefined();
    expect(payload.conversationId).toBeDefined();
  });

  it("skips sentinel identifier values", () => {
    const payload = chatRequestSchema.parse({
      message: "Check machine",
      machineId: "",
      conversationId: "null",
    });

    expect(payload.machineId).toBeUndefined();
    expect(payload.conversationId).toBeUndefined();
  });
});

