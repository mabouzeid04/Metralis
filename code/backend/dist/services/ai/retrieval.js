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
    const docChunks = await (0, vectorStore_1.searchSimilarChunks)(questionEmbedding, limit, {
        machineId: machineId ?? undefined,
        machineType: machineType ?? undefined,
        language: language ?? undefined,
    });
    const incidentChunks = await (0, vectorStore_1.searchSimilarIncidents)(questionEmbedding, limit, {
        machineId: machineId ?? undefined,
        machineType: machineType ?? undefined,
        language: language ?? undefined,
    });
    const mappedDocs = docChunks.map((chunk) => ({
        id: chunk.id,
        source: "DOCUMENT",
        documentId: chunk.documentId,
        chunkIndex: chunk.chunkIndex,
        content: chunk.content,
        metadata: chunk.metadata ?? null,
        similarity: chunk.similarity,
    }));
    const mappedIncidents = incidentChunks.map((chunk) => ({
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
exports.retrieveContext = retrieveContext;
//# sourceMappingURL=retrieval.js.map