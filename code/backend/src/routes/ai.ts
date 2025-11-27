import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth";
import { handleChatMessage, listConversationsForUser, getConversationDetail } from "../services/ai/chatService";

export const chatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  machineId: z.string().uuid().optional(),
  conversationId: z.string().uuid().optional(),
});

const router = Router();

router.use(requireAuth);

router.post("/chat", async (req, res, next) => {
  try {
    const parsed = chatRequestSchema.parse(req.body);

    const result = await handleChatMessage({
      userId: req.user!.id,
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
        },
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Conversation not found") {
      return res.status(404).json({ error: { message: error.message } });
    }
    return next(error);
  }
});

router.get("/conversations", async (req, res, next) => {
  try {
    const conversations = await listConversationsForUser(req.user!.id);
    return res.json({ data: conversations });
  } catch (error) {
    return next(error);
  }
});

router.get("/conversations/:id", async (req, res, next) => {
  try {
    const detail = await getConversationDetail(req.user!.id, req.params.id);
    return res.json({
      data: {
        conversation: detail.conversation,
        messages: detail.messages,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Conversation not found") {
      return res.status(404).json({ error: { message: error.message } });
    }
    return next(error);
  }
});

export default router;

