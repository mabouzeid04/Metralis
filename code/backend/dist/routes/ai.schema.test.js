"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const aiChatSchema_1 = require("./schemas/aiChatSchema");
(0, vitest_1.describe)("chatRequestSchema", () => {
    (0, vitest_1.it)("validates a minimal payload", () => {
        const data = aiChatSchema_1.chatRequestSchema.parse({ message: "Help me diagnose" });
        (0, vitest_1.expect)(data.message).toBe("Help me diagnose");
    });
    (0, vitest_1.it)("rejects empty messages", () => {
        (0, vitest_1.expect)(() => aiChatSchema_1.chatRequestSchema.parse({ message: "" })).toThrow();
    });
    (0, vitest_1.it)("validates optional identifiers", () => {
        const payload = aiChatSchema_1.chatRequestSchema.parse({
            message: "Check machine",
            machineId: "8f1a7cf9-6a9f-4c96-8f93-5c2a52f94d2e",
            conversationId: "4b7f0f99-0bae-46c4-b6d2-454f3dda3f7c",
        });
        (0, vitest_1.expect)(payload.machineId).toBeDefined();
        (0, vitest_1.expect)(payload.conversationId).toBeDefined();
    });
    (0, vitest_1.it)("skips sentinel identifier values", () => {
        const payload = aiChatSchema_1.chatRequestSchema.parse({
            message: "Check machine",
            machineId: "",
            conversationId: "null",
        });
        (0, vitest_1.expect)(payload.machineId).toBeUndefined();
        (0, vitest_1.expect)(payload.conversationId).toBeUndefined();
    });
    (0, vitest_1.it)("rejects invalid uuid values", () => {
        (0, vitest_1.expect)(() => aiChatSchema_1.chatRequestSchema.parse({
            message: "Invalid ids",
            machineId: "not-a-uuid",
        })).toThrow();
    });
    (0, vitest_1.it)("normalizes whitespace around identifiers", () => {
        const payload = aiChatSchema_1.chatRequestSchema.parse({
            message: "Check machine",
            machineId: " 8f1a7cf9-6a9f-4c96-8f93-5c2a52f94d2e ",
        });
        (0, vitest_1.expect)(payload.machineId).toBe("8f1a7cf9-6a9f-4c96-8f93-5c2a52f94d2e");
    });
    (0, vitest_1.it)("treats nullish identifier values as undefined", () => {
        const payload = aiChatSchema_1.chatRequestSchema.parse({
            message: "Check machine",
            machineId: null,
            conversationId: undefined,
        });
        (0, vitest_1.expect)(payload.machineId).toBeUndefined();
        (0, vitest_1.expect)(payload.conversationId).toBeUndefined();
    });
});
//# sourceMappingURL=ai.schema.test.js.map