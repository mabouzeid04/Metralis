import type { AiFeedbackValue, ChatConversation, ChatMessageRole } from "../../generated/prisma/client";
import type { Citation, RetrievedChunk } from "./types";
export declare const ensureConversation: (userId: string, conversationId?: string, machineId?: string) => Promise<{
    conversation: ChatConversation & {
        machine: {
            id: string;
            name: string;
            model: string | null;
            manufacturer: string | null;
            line: string | null;
        } | null;
    };
    isNew: boolean;
}>;
export declare const listConversationsForUser: (userId: string) => Promise<{
    id: string;
    title: string;
    lastMessageAt: Date;
    machine: {
        name: string;
        id: string;
        model: string | null;
    } | null;
    lastMessagePreview: string | null;
}[]>;
export declare const getConversationDetail: (userId: string, conversationId: string) => Promise<{
    conversation: {
        machine: {
            name: string;
            id: string;
            line: string | null;
            manufacturer: string | null;
            model: string | null;
        } | null;
    } & {
        id: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        machineId: string | null;
        title: string;
        summary: string | null;
        lastMessageAt: Date;
        userId: string;
    };
    messages: {
        feedback: AiFeedbackValue[];
        id: string;
        role: ChatMessageRole;
        createdAt: Date;
        content: string;
        citations: import("@prisma/client/runtime/library").JsonValue | null;
        conversationId: string;
        contextChunks: import("@prisma/client/runtime/library").JsonValue | null;
        structuredOutput: import("@prisma/client/runtime/library").JsonValue | null;
    }[];
}>;
type HandleChatParams = {
    userId: string;
    message: string;
    conversationId?: string | undefined;
    machineId?: string | undefined;
};
export declare const handleChatMessage: ({ userId, message, conversationId, machineId }: HandleChatParams) => Promise<{
    conversation: {
        machine: {
            id: string;
            name: string;
            model: string | null;
            manufacturer: string | null;
            line: string | null;
        } | null;
        id: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        machineId: string | null;
        title: string;
        summary: string | null;
        lastMessageAt: Date;
        userId: string;
    };
    userMessage: {
        id: string;
        role: ChatMessageRole;
        createdAt: Date;
        content: string;
        citations: import("@prisma/client/runtime/library").JsonValue | null;
        conversationId: string;
        contextChunks: import("@prisma/client/runtime/library").JsonValue | null;
        structuredOutput: import("@prisma/client/runtime/library").JsonValue | null;
    };
    assistantMessage: {
        id: string;
        role: ChatMessageRole;
        createdAt: Date;
        content: string;
        citations: import("@prisma/client/runtime/library").JsonValue | null;
        conversationId: string;
        contextChunks: import("@prisma/client/runtime/library").JsonValue | null;
        structuredOutput: import("@prisma/client/runtime/library").JsonValue | null;
    };
    citations: Citation[];
    structuredOutput: {
        summary: string;
        likelyCauses: {
            title: string;
            confidence: "LOW" | "MEDIUM" | "HIGH";
            rationale: string;
            citations: number[];
        }[];
        recommendedSteps: {
            title: string;
            action: string;
            citations: number[];
        }[];
        references: {
            id: number;
            source: string;
        }[];
        needsMoreData: boolean;
        missingDataNotes: string;
    } | null;
    retrievedChunks: RetrievedChunk[];
}>;
export declare const submitMessageFeedback: ({ userId, messageId, value }: {
    userId: string;
    messageId: string;
    value: AiFeedbackValue;
}) => Promise<AiFeedbackValue[]>;
export {};
//# sourceMappingURL=chatService.d.ts.map