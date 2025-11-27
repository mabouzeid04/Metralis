import type { ChatMessageRole } from "../../generated/prisma/client";

export type ConversationMessage = {
  role: ChatMessageRole;
  content: string;
};

export type RetrievedChunk = {
  id: string;
  documentId: string;
  chunkIndex?: number;
  content: string;
  metadata: Record<string, any> | null;
  similarity: number;
};

export type Citation = {
  documentId: string;
  chunkId: string;
  similarity: number;
  documentTitle?: string;
  machineId?: string | null;
  machineType?: string | null;
  language?: string | null;
  version?: string | null;
};

export type GenerateParams = {
  history: ConversationMessage[];
  prompt: string;
  temperature: number;
  maxTokens: number;
};

export type GenerateResult = {
  text: string;
};

export interface LLMProvider {
  generate(params: GenerateParams): Promise<GenerateResult>;
}

