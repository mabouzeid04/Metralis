"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitMessageFeedback = exports.handleChatMessage = exports.getConversationDetail = exports.listConversationsForUser = exports.ensureConversation = void 0;
const prisma_1 = require("../../lib/prisma");
const zod_1 = require("zod");
const prompt_1 = require("./prompt");
const retrieval_1 = require("./retrieval");
const provider_1 = require("./provider");
const env_1 = require("../../config/env");
const HISTORY_LIMIT = 10;
const createTitleFromMessage = (content) => {
    const trimmed = content.trim();
    if (!trimmed)
        return "Metralis AI Chat";
    return trimmed.length > 60 ? `${trimmed.slice(0, 57)}...` : trimmed;
};
const mapCitations = (chunks) => {
    const dedup = new Map();
    chunks.forEach((chunk) => {
        const title = chunk.source === "INCIDENT"
            ? chunk.metadata?.workOrderTitle ?? chunk.metadata?.title
            : chunk.metadata?.documentTitle ?? chunk.metadata?.title;
        const documentId = chunk.documentId ?? chunk.workOrderId ?? chunk.id;
        const key = chunk.source === "INCIDENT"
            ? `incident:${chunk.workOrderId ?? documentId}`
            : `doc:${documentId}`;
        const candidate = {
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
const structuredOutputSchema = zod_1.z.object({
    summary: zod_1.z.string().optional().default(""),
    likelyCauses: zod_1.z
        .array(zod_1.z.object({
        title: zod_1.z.string().optional().default(""),
        confidence: zod_1.z.enum(["HIGH", "MEDIUM", "LOW"]).optional().default("MEDIUM"),
        rationale: zod_1.z.string().optional().default(""),
        citations: zod_1.z.array(zod_1.z.number()).optional().default([]),
    }))
        .optional()
        .default([]),
    recommendedSteps: zod_1.z
        .array(zod_1.z.object({
        title: zod_1.z.string().optional().default(""),
        action: zod_1.z.string().optional().default(""),
        citations: zod_1.z.array(zod_1.z.number()).optional().default([]),
    }))
        .optional()
        .default([]),
    references: zod_1.z
        .array(zod_1.z.object({
        id: zod_1.z.number(),
        source: zod_1.z.string().optional().default(""),
    }))
        .optional()
        .default([]),
    needsMoreData: zod_1.z.boolean().optional().default(false),
    missingDataNotes: zod_1.z.string().optional().default(""),
});
const extractJsonBlock = (text) => {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) {
        return null;
    }
    return text.slice(start, end + 1);
};
const parseStructuredOutput = (rawText) => {
    const payload = extractJsonBlock(rawText.trim());
    if (!payload) {
        return null;
    }
    try {
        const parsed = JSON.parse(payload);
        return structuredOutputSchema.parse(parsed);
    }
    catch {
        return null;
    }
};
const formatHistory = (messages) => messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
}));
const ensureConversation = async (userId, conversationId, machineId, assetId) => {
    if (conversationId) {
        const conversation = await prisma_1.prisma.chatConversation.findFirst({
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
    const conversation = await prisma_1.prisma.chatConversation.create({
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
exports.ensureConversation = ensureConversation;
const listConversationsForUser = async (userId) => {
    const conversations = await prisma_1.prisma.chatConversation.findMany({
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
exports.listConversationsForUser = listConversationsForUser;
const getConversationDetail = async (userId, conversationId) => {
    const conversation = await prisma_1.prisma.chatConversation.findFirst({
        where: { id: conversationId, userId },
        include: {
            machine: { select: { id: true, name: true, model: true, manufacturer: true, line: true } },
        },
    });
    if (!conversation) {
        throw new Error("Conversation not found");
    }
    const messages = await prisma_1.prisma.chatMessage.findMany({
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
exports.getConversationDetail = getConversationDetail;
const handleChatMessage = async ({ userId, message, conversationId, machineId, assetId: inputAssetId, language = "en" }) => {
    const { conversation, isNew } = await (0, exports.ensureConversation)(userId, conversationId, machineId, inputAssetId);
    const targetMachineId = conversation.machineId ?? machineId;
    // Resolve asset ID early so we can use it for maintenance history lookup
    const assetId = conversation.assetId ?? inputAssetId ?? undefined;
    // Query maintenance history by machineId (legacy) and/or assetId (new)
    const historyOrConditions = [];
    if (targetMachineId)
        historyOrConditions.push({ machineId: targetMachineId });
    if (assetId)
        historyOrConditions.push({ assetId });
    const maintenanceHistory = historyOrConditions.length > 0
        ? await prisma_1.prisma.workOrder.findMany({
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
        const machine = await prisma_1.prisma.machine.findUnique({
            where: { id: machineId },
            select: { id: true, name: true, model: true, manufacturer: true, line: true },
        });
        if (machine) {
            conversation.machine = machine;
            await prisma_1.prisma.chatConversation.update({
                where: { id: conversation.id },
                data: { machineId: machine.id },
            });
        }
    }
    // Bind asset to conversation if not already bound
    if (!conversation.assetId && assetId) {
        await prisma_1.prisma.chatConversation.update({
            where: { id: conversation.id },
            data: { assetId },
        });
    }
    const history = await prisma_1.prisma.chatMessage.findMany({
        where: { conversationId: conversation.id },
        orderBy: { createdAt: "asc" },
        take: HISTORY_LIMIT,
        select: { role: true, content: true },
    });
    let asset = null;
    if (assetId) {
        const raw = await prisma_1.prisma.asset.findUnique({
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
                nameTranslations: raw.nameTranslations,
                pathStringTranslations: raw.pathStringTranslations,
            };
        }
    }
    const retrievedChunks = await (0, retrieval_1.retrieveContext)({
        question: message,
        machineId: conversation.machineId ?? machineId,
        machineType: conversation.machine?.model ?? undefined,
        assetId,
        language,
    });
    const prompt = (0, prompt_1.buildPrompt)({
        question: message,
        machine: conversation.machine,
        retrievedChunks,
        maintenanceHistory,
        language,
        asset,
    });
    const llmResponse = await (0, provider_1.generateChatLLMResponse)({
        history: formatHistory(history),
        prompt,
        temperature: env_1.env.ai.temperature,
        maxTokens: env_1.env.ai.maxTokens,
        language,
    });
    const citations = mapCitations(retrievedChunks);
    const structuredOutput = parseStructuredOutput(llmResponse.text);
    const titleUpdate = !isNew && conversation.title !== "Metralis AI Chat" ? undefined : createTitleFromMessage(message);
    const now = new Date();
    const updateData = {
        lastMessageAt: now,
    };
    if (titleUpdate) {
        updateData.title = titleUpdate;
    }
    const assistantMessageData = {
        conversationId: conversation.id,
        role: "ASSISTANT",
        content: llmResponse.text,
        citations,
        contextChunks: retrievedChunks,
    };
    if (structuredOutput) {
        assistantMessageData.structuredOutput = structuredOutput;
    }
    const [userMessage, assistantMessage, updatedConversation] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.chatMessage.create({
            data: {
                conversationId: conversation.id,
                role: "USER",
                content: message,
            },
        }),
        prisma_1.prisma.chatMessage.create({
            data: assistantMessageData,
        }),
        prisma_1.prisma.chatConversation.update({
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
exports.handleChatMessage = handleChatMessage;
const submitMessageFeedback = async ({ userId, messageId, value }) => {
    try {
        const message = await prisma_1.prisma.chatMessage.findFirst({
            where: {
                id: messageId,
                conversation: { userId },
            },
            select: { id: true },
        });
        if (!message) {
            throw new Error("Message not found");
        }
        await prisma_1.prisma.chatMessageFeedback.upsert({
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
        const feedback = await prisma_1.prisma.chatMessageFeedback.findMany({
            where: { messageId, userId },
            select: { value: true },
        });
        return feedback.map((item) => item.value);
    }
    catch (error) {
        if (error && typeof error === "object" && "code" in error && error.code === "P2022") {
            console.error("Feedback column missing; returning empty feedback.", error);
            return [];
        }
        throw error;
    }
};
exports.submitMessageFeedback = submitMessageFeedback;
//# sourceMappingURL=chatService.js.map