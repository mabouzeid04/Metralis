import { pgPool } from "../lib/pg";

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

  const values: Array<string | number | null> = [];
  const placeholders: string[] = [];

  chunks.forEach((chunk, index) => {
    const baseIndex = index * 6;
    placeholders.push(
      `($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4}, $${baseIndex + 5}::vector, $${
        baseIndex + 6
      })`,
    );
    values.push(
      chunk.documentId,
      chunk.chunkIndex,
      chunk.content,
      chunk.tokens,
      `[${chunk.embedding.join(",")}]`,
      chunk.metadata ? JSON.stringify(chunk.metadata) : null,
    );
  });

  await pgPool.query(
    `INSERT INTO "DocumentChunk" ("documentId","chunkIndex","content","tokens","embedding","metadata") VALUES ${placeholders.join(",")}`,
    values,
  );
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

