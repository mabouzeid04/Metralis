import { prisma } from "../../lib/prisma";
import type { AiFeedbackValue, ChatConversation, ChatMessageRole, Prisma } from "../../generated/prisma/client";
import { z } from "zod";
import { buildPrompt } from "./prompt";
import { retrieveContext } from "./retrieval";
import { generateLLMResponse } from "./provider";
import type { Citation, RetrievedChunk } from "./types";
import { env } from "../../config/env";

const HISTORY_LIMIT = 10;

const createTitleFromMessage = (content: string) => {
  const trimmed = content.trim();
  if (!trimmed) return "Metralis AI Chat";
  return trimmed.length > 60 ? `${trimmed.slice(0, 57)}...` : trimmed;
};

const mapCitations = (chunks: RetrievedChunk[]): Citation[] =>
  chunks.map((chunk) => ({
    documentId: chunk.documentId,
    chunkId: chunk.id,
    similarity: chunk.similarity,
    documentTitle: chunk.metadata?.documentTitle ?? chunk.metadata?.title,
    machineId: chunk.metadata?.machineId,
    machineType: chunk.metadata?.machineType,
    language: chunk.metadata?.language,
    version: chunk.metadata?.version,
  }));

const structuredOutputSchema = z.object({
  summary: z.string().optional().default(""),
  likelyCauses: z
    .array(
      z.object({
        title: z.string().optional().default(""),
        confidence: z.enum(["HIGH", "MEDIUM", "LOW"]).optional().default("MEDIUM"),
        rationale: z.string().optional().default(""),
        citations: z.array(z.number()).optional().default([]),
      }),
    )
    .optional()
    .default([]),
  recommendedSteps: z
    .array(
      z.object({
        title: z.string().optional().default(""),
        action: z.string().optional().default(""),
        citations: z.array(z.number()).optional().default([]),
      }),
    )
    .optional()
    .default([]),
  references: z
    .array(
      z.object({
        id: z.number(),
        source: z.string().optional().default(""),
      }),
    )
    .optional()
    .default([]),
  needsMoreData: z.boolean().optional().default(false),
  missingDataNotes: z.string().optional().default(""),
});

type StructuredAnswer = z.infer<typeof structuredOutputSchema>;

const extractJsonBlock = (text: string) => {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    return null;
  }
  return text.slice(start, end + 1);
};

const parseStructuredOutput = (rawText: string): StructuredAnswer | null => {
  const payload = extractJsonBlock(rawText.trim());
  if (!payload) {
    return null;
  }
  try {
    const parsed = JSON.parse(payload);
    return structuredOutputSchema.parse(parsed);
  } catch {
    return null;
  }
};

const formatHistory = (messages: { role: ChatMessageRole; content: string }[]) =>
  messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

export const ensureConversation = async (
  userId: string,
  conversationId?: string,
  machineId?: string,
): Promise<{ conversation: ChatConversation & { machine: { id: string; name: string; model: string | null; manufacturer: string | null; line: string | null } | null }; isNew: boolean }> => {
  if (conversationId) {
    const conversation = await prisma.chatConversation.findFirst({
      where: { id: conversationId, userId },
      include: {
        machine: {
          select: { id: true, name: true, model: true, manufacturer: true, line: true },
        },
      },
    });

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    return { conversation, isNew: false };
  }

  const conversation = await prisma.chatConversation.create({
    data: {
      userId,
      machineId: machineId ?? null,
      title: "Metralis AI Chat",
    },
    include: {
      machine: {
        select: { id: true, name: true, model: true, manufacturer: true, line: true },
      },
    },
  });

  return { conversation, isNew: true };
};

export const listConversationsForUser = async (userId: string) => {
  const conversations = await prisma.chatConversation.findMany({
    where: { userId },
    orderBy: { lastMessageAt: "desc" },
    include: {
      machine: { select: { id: true, name: true, model: true } },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { content: true },
      },
    },
  });

  return conversations.map((conversation) => ({
    id: conversation.id,
    title: conversation.title,
    lastMessageAt: conversation.lastMessageAt,
    machine: conversation.machine,
    lastMessagePreview: conversation.messages[0]?.content ?? null,
  }));
};

export const getConversationDetail = async (userId: string, conversationId: string) => {
  const conversation = await prisma.chatConversation.findFirst({
    where: { id: conversationId, userId },
    include: {
      machine: { select: { id: true, name: true, model: true, manufacturer: true, line: true } },
    },
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  const messages = await prisma.chatMessage.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
    include: {
      feedback: {
        where: { userId },
        select: { value: true },
      },
    },
  });

  return {
    conversation,
    messages: messages.map((message) => ({
      ...message,
      feedback: message.feedback.map((item) => item.value),
    })),
  };
};

type HandleChatParams = {
  userId: string;
  message: string;
  conversationId?: string | undefined;
  machineId?: string | undefined;
};

export const handleChatMessage = async ({ userId, message, conversationId, machineId }: HandleChatParams) => {
  const { conversation, isNew } = await ensureConversation(userId, conversationId, machineId);

  if (!conversation.machine && machineId) {
    const machine = await prisma.machine.findUnique({
      where: { id: machineId },
      select: { id: true, name: true, model: true, manufacturer: true, line: true },
    });
    if (machine) {
      conversation.machine = machine;
      await prisma.chatConversation.update({
        where: { id: conversation.id },
        data: { machineId: machine.id },
      });
    }
  }

  const history = await prisma.chatMessage.findMany({
    where: { conversationId: conversation.id },
    orderBy: { createdAt: "asc" },
    take: HISTORY_LIMIT,
    select: { role: true, content: true },
  });

  const retrievedChunks = await retrieveContext({
    question: message,
    machineId: conversation.machineId ?? machineId,
    machineType: conversation.machine?.model ?? undefined,
  });

  const prompt = buildPrompt({
    question: message,
    machine: conversation.machine,
    retrievedChunks,
  });

  const llmResponse = await generateLLMResponse({
    history: formatHistory(history),
    prompt,
    temperature: env.ai.temperature,
    maxTokens: env.ai.maxTokens,
  });

  const citations = mapCitations(retrievedChunks);
  const structuredOutput = parseStructuredOutput(llmResponse.text);

  const titleUpdate = !isNew && conversation.title !== "Metralis AI Chat" ? undefined : createTitleFromMessage(message);
  const now = new Date();
  const updateData: Prisma.ChatConversationUpdateInput = {
    lastMessageAt: now,
  };
  if (titleUpdate) {
    updateData.title = titleUpdate;
  }

  const [userMessage, assistantMessage, updatedConversation] = await prisma.$transaction([
    prisma.chatMessage.create({
      data: {
        conversationId: conversation.id,
        role: "USER",
        content: message,
      },
    }),
    prisma.chatMessage.create({
      data: {
        conversationId: conversation.id,
        role: "ASSISTANT",
        content: llmResponse.text,
        citations,
        contextChunks: retrievedChunks,
        structuredOutput: structuredOutput ?? undefined,
      },
    }),
    prisma.chatConversation.update({
      where: { id: conversation.id },
      data: updateData,
    }),
  ]);

  return {
    conversation: {
      ...updatedConversation,
      machine: conversation.machine,
    },
    userMessage,
    assistantMessage,
    citations,
    structuredOutput,
    retrievedChunks,
  };
};

export const submitMessageFeedback = async ({ userId, messageId, value }: { userId: string; messageId: string; value: AiFeedbackValue }) => {
  const message = await prisma.chatMessage.findFirst({
    where: {
      id: messageId,
      conversation: { userId },
    },
    select: { id: true },
  });

  if (!message) {
    throw new Error("Message not found");
  }

  await prisma.chatMessageFeedback.upsert({
    where: {
      messageId_userId_value: {
        messageId,
        userId,
        value,
      },
    },
    update: {},
    create: {
      messageId,
      userId,
      value,
    },
  });

  const feedback = await prisma.chatMessageFeedback.findMany({
    where: { messageId, userId },
    select: { value: true },
  });

  return feedback.map((item) => item.value);
};

