import { embedTexts } from "../embeddings";
import { searchSimilarChunks } from "../vectorStore";
import type { RetrievedChunk } from "./types";

type RetrieveParams = {
  question: string;
  machineId?: string | null | undefined;
  machineType?: string | null | undefined;
  language?: string | null | undefined;
  limit?: number;
};

export const retrieveContext = async ({
  question,
  machineId,
  machineType,
  language,
  limit = 5,
}: RetrieveParams): Promise<RetrievedChunk[]> => {
  const [questionEmbedding] = await embedTexts([question]);

  if (!questionEmbedding) {
    return [];
  }

  const chunks = await searchSimilarChunks(questionEmbedding, limit, {
    machineId: machineId ?? undefined,
    machineType: machineType ?? undefined,
    language: language ?? undefined,
  });

  return chunks.map((chunk) => ({
    id: chunk.id,
    documentId: chunk.documentId,
    chunkIndex: chunk.chunkIndex,
    content: chunk.content,
    metadata: chunk.metadata ?? null,
    similarity: chunk.similarity,
  }));
};

