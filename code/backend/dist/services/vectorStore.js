"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSimilarIncidents = exports.replaceIncidentChunks = exports.searchSimilarChunks = exports.replaceDocumentChunks = void 0;
const pg_1 = require("../lib/pg");
const crypto_1 = require("crypto");
const replaceDocumentChunks = async (documentId, chunks) => {
    await pg_1.pgPool.query('DELETE FROM "DocumentChunk" WHERE "documentId" = $1', [documentId]);
    if (!chunks.length) {
        return;
    }
    const BATCH_SIZE = 50;
    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
        const batch = chunks.slice(i, i + BATCH_SIZE);
        const values = [];
        const placeholders = [];
        batch.forEach((chunk, index) => {
            const baseIndex = index * 7;
            placeholders.push(`($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4}, $${baseIndex + 5}, $${baseIndex + 6}::vector, $${baseIndex + 7})`);
            values.push((0, crypto_1.randomUUID)(), chunk.documentId, chunk.chunkIndex, chunk.content, chunk.tokens, `[${chunk.embedding.join(",")}]`, chunk.metadata ? JSON.stringify(chunk.metadata) : null);
        });
        await pg_1.pgPool.query(`INSERT INTO "DocumentChunk" ("id","documentId","chunkIndex","content","tokens","embedding","metadata") VALUES ${placeholders.join(",")}`, values);
    }
};
exports.replaceDocumentChunks = replaceDocumentChunks;
const searchSimilarChunks = async (embedding, limit, filter) => {
    if (!embedding.length) {
        return [];
    }
    const safeLimit = Math.max(1, Math.min(limit, 50));
    const values = [`[${embedding.join(",")}]`];
    const filters = [];
    let paramIndex = 2;
    if (filter?.documentId) {
        filters.push(`dc."documentId" = $${paramIndex}`);
        values.push(filter.documentId);
        paramIndex += 1;
    }
    if (filter?.documentIds && filter.documentIds.length > 0) {
        const placeholders = filter.documentIds.map((_, i) => `$${paramIndex + i}`);
        filters.push(`dc."documentId" IN (${placeholders.join(", ")})`);
        values.push(...filter.documentIds);
        paramIndex += filter.documentIds.length;
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
    const { rows } = await pg_1.pgPool.query(`
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
    `, values);
    return rows;
};
exports.searchSimilarChunks = searchSimilarChunks;
const replaceIncidentChunks = async (workOrderId, chunks) => {
    await pg_1.pgPool.query('DELETE FROM "IncidentChunk" WHERE "workOrderId" = $1', [workOrderId]);
    if (!chunks.length) {
        return;
    }
    const values = [];
    const placeholders = [];
    chunks.forEach((chunk, index) => {
        const baseIndex = index * 10;
        placeholders.push(`($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4}, $${baseIndex + 5}, $${baseIndex + 6}::vector, $${baseIndex + 7}, $${baseIndex + 8}, $${baseIndex + 9}, $${baseIndex + 10})`);
        values.push((0, crypto_1.randomUUID)(), chunk.workOrderId, chunk.chunkIndex, chunk.content, chunk.tokens, `[${chunk.embedding.join(",")}]`, chunk.machineId ?? null, chunk.machineType ?? null, chunk.language ?? null, chunk.metadata ? JSON.stringify(chunk.metadata) : null);
    });
    await pg_1.pgPool.query(`INSERT INTO "IncidentChunk" ("id","workOrderId","chunkIndex","content","tokens","embedding","machineId","machineType","language","metadata") VALUES ${placeholders.join(",")}`, values);
};
exports.replaceIncidentChunks = replaceIncidentChunks;
const searchSimilarIncidents = async (embedding, limit, filter) => {
    if (!embedding.length) {
        return [];
    }
    const safeLimit = Math.max(1, Math.min(limit, 50));
    const values = [`[${embedding.join(",")}]`];
    const filters = [];
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
    const { rows } = await pg_1.pgPool.query(`
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
    `, values);
    return rows;
};
exports.searchSimilarIncidents = searchSimilarIncidents;
//# sourceMappingURL=vectorStore.js.map