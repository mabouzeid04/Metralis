"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveContext = void 0;
const embeddings_1 = require("../embeddings");
const vectorStore_1 = require("../vectorStore");
const retrieveContext = async ({ question, machineId, machineType, language, limit = 5, }) => {
    const [questionEmbedding] = await (0, embeddings_1.embedTexts)([question]);
    if (!questionEmbedding) {
        return [];
    }
    const chunks = await (0, vectorStore_1.searchSimilarChunks)(questionEmbedding, limit, {
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
exports.retrieveContext = retrieveContext;
//# sourceMappingURL=retrieval.js.map