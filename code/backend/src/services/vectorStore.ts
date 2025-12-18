import { pgPool } from "../lib/pg";
import { randomUUID } from "crypto";

export type DocumentChunkRecord = {
  documentId: string;
  chunkIndex: number;
  content: string;
  tokens: number;
  embedding: number[];
  metadata?: Record<string, unknown>;
};

export const replaceDocumentChunks = async (documentId: string, chunks: DocumentChunkRecord[]) => {
  await pgPool.query('DELETE FROM "DocumentChunk" WHERE "documentId" = $1', [documentId]);

  if (!chunks.length) {
    return;
  }

  const BATCH_SIZE = 50;
  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const values: Array<string | number | null> = [];
    const placeholders: string[] = [];

    batch.forEach((chunk, index) => {
      const baseIndex = index * 7;
      placeholders.push(
        `($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4}, $${baseIndex + 5}, $${baseIndex + 6}::vector, $${baseIndex + 7})`,
      );
      values.push(
        randomUUID(),
        chunk.documentId,
        chunk.chunkIndex,
        chunk.content,
        chunk.tokens,
        `[${chunk.embedding.join(",")}]`,
        chunk.metadata ? JSON.stringify(chunk.metadata) : null,
      );
    });

    await pgPool.query(
      `INSERT INTO "DocumentChunk" ("id","documentId","chunkIndex","content","tokens","embedding","metadata") VALUES ${placeholders.join(",")}`,
      values,
    );
  }
};

export type SimilarChunkFilter = {
  documentId?: string | undefined;
  machineId?: string | undefined;
  machineType?: string | undefined;
  language?: string | undefined;
};

export const searchSimilarChunks = async (embedding: number[], limit: number, filter?: SimilarChunkFilter) => {
  if (!embedding.length) {
    return [];
  }

  const safeLimit = Math.max(1, Math.min(limit, 50));

  const values: Array<string | number> = [`[${embedding.join(",")}]`];
  const filters: string[] = [];
  let paramIndex = 2;

  if (filter?.documentId) {
    filters.push(`dc."documentId" = $${paramIndex}`);
    values.push(filter.documentId);
    paramIndex += 1;
  }

  if (filter?.machineId) {
    filters.push(`dc."metadata"->>'machineId' = $${paramIndex}`);
    values.push(filter.machineId);
    paramIndex += 1;
  }

  if (filter?.machineType) {
    filters.push(`dc."metadata"->>'machineType' = $${paramIndex}`);
    values.push(filter.machineType);
    paramIndex += 1;
  }

  if (filter?.language) {
    filters.push(`dc."metadata"->>'language' = $${paramIndex}`);
    values.push(filter.language);
    paramIndex += 1;
  }

  const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

  const { rows } = await pgPool.query(
    `
      SELECT
        dc."id",
        dc."documentId",
        dc."chunkIndex",
        dc."content",
        dc."metadata",
        1 - (dc.embedding <=> $1::vector) AS similarity
      FROM "DocumentChunk" dc
      ${whereClause}
      ORDER BY dc.embedding <=> $1::vector
      LIMIT ${safeLimit}
    `,
    values,
  );

  return rows as Array<{
    id: string;
    documentId: string;
    chunkIndex: number;
    content: string;
    metadata: Record<string, unknown> | null;
    similarity: number;
  }>;
};

// Incident chunks (work order / repair embeddings)
export type IncidentChunkRecord = {
  workOrderId: string;
  chunkIndex: number;
  content: string;
  tokens: number;
  embedding: number[];
  machineId?: string | null;
  machineType?: string | null;
  language?: string | null;
  metadata?: Record<string, unknown>;
};

export type SimilarIncidentFilter = {
  workOrderId?: string | undefined;
  machineId?: string | undefined;
  machineType?: string | undefined;
  language?: string | undefined;
};

export const replaceIncidentChunks = async (workOrderId: string, chunks: IncidentChunkRecord[]) => {
  await pgPool.query('DELETE FROM "IncidentChunk" WHERE "workOrderId" = $1', [workOrderId]);

  if (!chunks.length) {
    return;
  }

  const values: Array<string | number | null> = [];
  const placeholders: string[] = [];

  chunks.forEach((chunk, index) => {
    const baseIndex = index * 10;
    placeholders.push(
      `($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4}, $${baseIndex + 5}, $${baseIndex + 6}::vector, $${baseIndex + 7}, $${baseIndex + 8}, $${baseIndex + 9}, $${baseIndex + 10})`,
    );
    values.push(
      randomUUID(),
      chunk.workOrderId,
      chunk.chunkIndex,
      chunk.content,
      chunk.tokens,
      `[${chunk.embedding.join(",")}]`,
      chunk.machineId ?? null,
      chunk.machineType ?? null,
      chunk.language ?? null,
      chunk.metadata ? JSON.stringify(chunk.metadata) : null,
    );
  });

  await pgPool.query(
    `INSERT INTO "IncidentChunk" ("id","workOrderId","chunkIndex","content","tokens","embedding","machineId","machineType","language","metadata") VALUES ${placeholders.join(
      ",",
    )}`,
    values,
  );
};

export const searchSimilarIncidents = async (embedding: number[], limit: number, filter?: SimilarIncidentFilter) => {
  if (!embedding.length) {
    return [];
  }

  const safeLimit = Math.max(1, Math.min(limit, 50));

  const values: Array<string | number> = [`[${embedding.join(",")}]`];
  const filters: string[] = [];
  let paramIndex = 2;

  if (filter?.workOrderId) {
    filters.push(`ic."workOrderId" = $${paramIndex}`);
    values.push(filter.workOrderId);
    paramIndex += 1;
  }

  if (filter?.machineId) {
    filters.push(`ic."machineId" = $${paramIndex}`);
    values.push(filter.machineId);
    paramIndex += 1;
  }

  if (filter?.machineType) {
    filters.push(`ic."machineType" = $${paramIndex}`);
    values.push(filter.machineType);
    paramIndex += 1;
  }

  if (filter?.language) {
    filters.push(`ic."language" = $${paramIndex}`);
    values.push(filter.language);
    paramIndex += 1;
  }

  const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

  const { rows } = await pgPool.query(
    `
      SELECT
        ic."id",
        ic."workOrderId",
        ic."chunkIndex",
        ic."content",
        ic."metadata",
        ic."machineId",
        ic."machineType",
        ic."language",
        1 - (ic.embedding <=> $1::vector) AS similarity
      FROM "IncidentChunk" ic
      ${whereClause}
      ORDER BY ic.embedding <=> $1::vector
      LIMIT ${safeLimit}
    `,
    values,
  );

  return rows as Array<{
    id: string;
    workOrderId: string;
    chunkIndex: number;
    content: string;
    metadata: Record<string, unknown> | null;
    machineId: string | null;
    machineType: string | null;
    language: string | null;
    similarity: number;
  }>;
};

