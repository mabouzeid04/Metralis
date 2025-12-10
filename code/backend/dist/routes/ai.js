"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const chatService_1 = require("../services/ai/chatService");
const aiChatSchema_1 = require("./schemas/aiChatSchema");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
router.use(auth_1.requireAuth);
router.post("/chat", async (req, res, next) => {
    try {
        const parsed = aiChatSchema_1.chatRequestSchema.parse(req.body);
        const result = await (0, chatService_1.handleChatMessage)({
            userId: req.user.id,
            message: parsed.message,
            machineId: parsed.machineId,
            conversationId: parsed.conversationId,
        });
        return res.json({
            data: {
                conversationId: result.conversation.id,
                conversationTitle: result.conversation.title,
                machine: result.conversation.machine,
                userMessage: {
                    id: result.userMessage.id,
                    role: result.userMessage.role,
                    content: result.userMessage.content,
                    createdAt: result.userMessage.createdAt,
                },
                assistantMessage: {
                    id: result.assistantMessage.id,
                    role: result.assistantMessage.role,
                    content: result.assistantMessage.content,
                    createdAt: result.assistantMessage.createdAt,
                    citations: result.citations,
                    structuredOutput: result.assistantMessage.structuredOutput ?? null,
                    feedback: [],
                },
            },
        });
    }
    catch (error) {
        if (error instanceof Error && error.message === "Conversation not found") {
            return res.status(404).json({ error: { message: error.message } });
        }
        return next(error);
    }
});
router.get("/conversations", async (req, res, next) => {
    try {
        const conversations = await (0, chatService_1.listConversationsForUser)(req.user.id);
        return res.json({ data: conversations });
    }
    catch (error) {
        return next(error);
    }
});
router.get("/conversations/:id", async (req, res, next) => {
    try {
        const detail = await (0, chatService_1.getConversationDetail)(req.user.id, req.params.id);
        return res.json({
            data: {
                conversation: detail.conversation,
                messages: detail.messages,
            },
        });
    }
    catch (error) {
        if (error instanceof Error && error.message === "Conversation not found") {
            return res.status(404).json({ error: { message: error.message } });
        }
        return next(error);
    }
});
const feedbackSchema = zod_1.z.object({
    value: zod_1.z.enum(["HELPFUL", "NOT_HELPFUL", "CORRECT_CAUSE"]),
});
router.post("/messages/:id/feedback", async (req, res, next) => {
    try {
        const parsed = feedbackSchema.parse(req.body);
        const feedback = await (0, chatService_1.submitMessageFeedback)({
            userId: req.user.id,
            messageId: req.params.id,
            value: parsed.value,
        });
        return res.json({ data: feedback });
    }
    catch (error) {
        if (error instanceof Error && error.message === "Message not found") {
            return res.status(404).json({ error: { message: error.message } });
        }
        return next(error);
    }
});
exports.default = router;
//# sourceMappingURL=ai.js.map