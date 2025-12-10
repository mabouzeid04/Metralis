"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSimilarChunks = exports.replaceDocumentChunks = void 0;
const pg_1 = require("../lib/pg");
const replaceDocumentChunks = async (documentId, chunks) => {
    await pg_1.pgPool.query('DELETE FROM "DocumentChunk" WHERE "documentId" = $1', [documentId]);
    if (!chunks.length) {
        return;
    }
    const values = [];
    const placeholders = [];
    chunks.forEach((chunk, index) => {
        const baseIndex = index * 6;
        placeholders.push(`($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4}, $${baseIndex + 5}::vector, $${baseIndex + 6})`);
        values.push(chunk.documentId, chunk.chunkIndex, chunk.content, chunk.tokens, `[${chunk.embedding.join(",")}]`, chunk.metadata ? JSON.stringify(chunk.metadata) : null);
    });
    await pg_1.pgPool.query(`INSERT INTO "DocumentChunk" ("documentId","chunkIndex","content","tokens","embedding","metadata") VALUES ${placeholders.join(",")}`, values);
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
//# sourceMappingURL=vectorStore.js.map