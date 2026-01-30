"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRequestSchema = void 0;
const zod_1 = require("zod");
const uuidSchema = zod_1.z.string().uuid().optional();
const normalizeUuidInput = zod_1.z.preprocess((value) => {
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
exports.chatRequestSchema = zod_1.z.object({
    message: zod_1.z.string().min(1, "Message cannot be empty"),
    machineId: normalizeUuidInput,
    assetId: normalizeUuidInput,
    conversationId: normalizeUuidInput,
    language: zod_1.z.enum(["en", "ar"]).optional().default("en"),
});
//# sourceMappingURL=aiChatSchema.js.map