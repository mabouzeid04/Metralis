import { prisma } from "../../lib/prisma";
import type { ChatConversation, ChatMessageRole, Prisma } from "../../generated/prisma/client";
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
  });

  return { conversation, messages };
};

type HandleChatParams = {
  userId: string;
  message: string;
  conversationId?: string;
  machineId?: string;
};

export const handleChatMessage = async ({ userId, message, conversationId, machineId }: HandleChatParams) => {
  const { conversation, isNew } = await ensureConversation(userId, conversationId, machineId);

  if (!conversation.machine && machineId && !conversationId) {
    // conversation freshly created but machine may not have been set if creation happened earlier
    conversation.machine = await prisma.machine.findUnique({
      where: { id: machineId },
      select: { id: true, name: true, model: true, manufacturer: true, line: true },
    });
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
    retrievedChunks,
  };
};

