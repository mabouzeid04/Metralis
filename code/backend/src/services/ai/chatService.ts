import { prisma } from "../../lib/prisma";
import type { AiFeedbackValue, ChatConversation, ChatMessageRole, Prisma } from "../../generated/prisma/client";
import { z } from "zod";
import { buildPrompt } from "./prompt";
import { retrieveContext } from "./retrieval";
import { generateChatLLMResponse } from "./provider";
import type { Citation, RetrievedChunk } from "./types";
import { env } from "../../config/env";

const HISTORY_LIMIT = 10;

const createTitleFromMessage = (content: string) => {
  const trimmed = content.trim();
  if (!trimmed) return "Metralis AI Chat";
  return trimmed.length > 60 ? `${trimmed.slice(0, 57)}...` : trimmed;
};

const mapCitations = (chunks: RetrievedChunk[]): Citation[] => {
  const dedup = new Map<string, Citation>();

  chunks.forEach((chunk) => {
    const title =
      chunk.source === "INCIDENT"
        ? chunk.metadata?.workOrderTitle ?? chunk.metadata?.title
        : chunk.metadata?.documentTitle ?? chunk.metadata?.title;

    const documentId = chunk.documentId ?? chunk.workOrderId ?? chunk.id;
    const key =
      chunk.source === "INCIDENT"
        ? `incident:${chunk.workOrderId ?? documentId}`
        : `doc:${documentId}`;

    const candidate: Citation = {
      documentId,
      workOrderId: chunk.workOrderId ?? null,
      chunkId: chunk.id,
      similarity: chunk.similarity,
      documentTitle: title,
      machineId: chunk.metadata?.machineId,
      machineType: chunk.metadata?.machineType ?? chunk.metadata?.machineModel,
      language: chunk.metadata?.language,
      version: chunk.metadata?.version,
      source: chunk.source,
    };

    const existing = dedup.get(key);
    if (!existing || candidate.similarity > existing.similarity) {
      dedup.set(key, candidate);
    }
  });

  return Array.from(dedup.values());
};

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
  assetId?: string,
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
      assetId: assetId ?? null,
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

  return {
    conversation,
    messages: messages.map((message) => ({
      ...message,
      feedback: [],
    })),
  };
};

type HandleChatParams = {
  userId: string;
  message: string;
  conversationId?: string | undefined;
  machineId?: string | undefined;
  assetId?: string | undefined;
  language?: "en" | "ar";
};

export const handleChatMessage = async ({ userId, message, conversationId, machineId, assetId: inputAssetId, language = "en" }: HandleChatParams) => {
  const { conversation, isNew } = await ensureConversation(userId, conversationId, machineId, inputAssetId);

  const targetMachineId = conversation.machineId ?? machineId;
  // Resolve asset ID early so we can use it for maintenance history lookup
  const assetId = conversation.assetId ?? inputAssetId ?? undefined;

  // Query maintenance history by machineId (legacy) and/or assetId (new)
  const historyOrConditions: Record<string, string>[] = [];
  if (targetMachineId) historyOrConditions.push({ machineId: targetMachineId });
  if (assetId) historyOrConditions.push({ assetId });

  const maintenanceHistory = historyOrConditions.length > 0
    ? await prisma.workOrder.findMany({
      where: { OR: historyOrConditions },
      orderBy: { reportedAt: "desc" },
      take: 15,
      select: {
        id: true,
        title: true,
        descriptionRaw: true,
        status: true,
        type: true,
        reportedAt: true,
        completedAt: true,
      },
    })
    : [];

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

  // Bind asset to conversation if not already bound
  if (!conversation.assetId && assetId) {
    await prisma.chatConversation.update({
      where: { id: conversation.id },
      data: { assetId },
    });
  }

  const history = await prisma.chatMessage.findMany({
    where: { conversationId: conversation.id },
    orderBy: { createdAt: "asc" },
    take: HISTORY_LIMIT,
    select: { role: true, content: true },
  });

  // Load asset context for bilingual prompting when available
  type AssetContext = {
    id: string;
    name: string;
    nameTranslations: Record<string, string> | null;
    code: string | null;
    pathString: string;
    pathStringTranslations: Record<string, string> | null;
    status: string | null;
    statusReason: string | null;
    criticality: string | null;
  };
  let asset: AssetContext | null = null;
  if (assetId) {
    const raw = await prisma.asset.findUnique({
      where: { id: assetId },
      select: {
        id: true,
        name: true,
        nameTranslations: true,
        code: true,
        pathString: true,
        pathStringTranslations: true,
        status: true,
        statusReason: true,
        criticality: true,
      },
    });
    if (raw) {
      asset = {
        ...raw,
        nameTranslations: raw.nameTranslations as Record<string, string> | null,
        pathStringTranslations: raw.pathStringTranslations as Record<string, string> | null,
      };
    }
  }

  const retrievedChunks = await retrieveContext({
    question: message,
    machineId: conversation.machineId ?? machineId,
    machineType: conversation.machine?.model ?? undefined,
    assetId,
    language,
  });

  const prompt = buildPrompt({
    question: message,
    machine: conversation.machine,
    retrievedChunks,
    maintenanceHistory,
    language,
    asset,
  });

  const llmResponse = await generateChatLLMResponse({
    history: formatHistory(history),
    prompt,
    temperature: env.ai.temperature,
    maxTokens: env.ai.maxTokens,
    language,
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

  const assistantMessageData: Prisma.ChatMessageUncheckedCreateInput = {
    conversationId: conversation.id,
    role: "ASSISTANT",
    content: llmResponse.text,
    citations,
    contextChunks: retrievedChunks,
  };

  if (structuredOutput) {
    assistantMessageData.structuredOutput = structuredOutput;
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
      data: assistantMessageData,
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
  try {
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
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && (error as { code?: string }).code === "P2022") {
      console.error("Feedback column missing; returning empty feedback.", error);
      return [];
    }
    throw error;
  }
};

