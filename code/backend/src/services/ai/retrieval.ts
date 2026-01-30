import { embedTexts } from "../embeddings";
import { searchSimilarChunks, searchSimilarIncidents } from "../vectorStore";
import { getDocumentsForAsset } from "../documentService";
import type { RetrievedChunk } from "./types";

type RetrieveParams = {
  question: string;
  machineId?: string | null | undefined;
  machineType?: string | null | undefined;
  assetId?: string | null | undefined;
  language?: string | null | undefined;
  limit?: number;
};

export const retrieveContext = async ({
  question,
  machineId,
  machineType,
  assetId,
  language,
  limit = 5,
}: RetrieveParams): Promise<RetrievedChunk[]> => {
  const [questionEmbedding] = await embedTexts([question]);

  if (!questionEmbedding) {
    return [];
  }

  // If assetId is provided, resolve all applicable document IDs
  // (direct + inherited from ancestors + factory-wide) and filter by those
  let applicableDocumentIds: string[] | undefined;
  if (assetId) {
    const applicableDocs = await getDocumentsForAsset(assetId);
    applicableDocumentIds = applicableDocs.map((d) => d.document.id);
  }

  const docChunks = await searchSimilarChunks(questionEmbedding, limit, {
    // Use asset-based document scoping when available, fall back to machineId
    documentIds: applicableDocumentIds,
    machineId: !applicableDocumentIds ? (machineId ?? undefined) : undefined,
    machineType: machineType ?? undefined,
    language: language ?? undefined,
  });

  const incidentChunks = await searchSimilarIncidents(questionEmbedding, limit, {
    machineId: machineId ?? undefined,
    machineType: machineType ?? undefined,
    language: language ?? undefined,
  });

  const mappedDocs: RetrievedChunk[] = docChunks.map((chunk) => ({
    id: chunk.id,
    source: "DOCUMENT",
    documentId: chunk.documentId,
    chunkIndex: chunk.chunkIndex,
    content: chunk.content,
    metadata: chunk.metadata ?? null,
    similarity: chunk.similarity,
  }));

  const mappedIncidents: RetrievedChunk[] = incidentChunks.map((chunk) => ({
    id: chunk.id,
    source: "INCIDENT",
    workOrderId: chunk.workOrderId,
    content: chunk.content,
    metadata: chunk.metadata ?? null,
    similarity: chunk.similarity,
  }));

  return [...mappedDocs, ...mappedIncidents]
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit * 2);
};

