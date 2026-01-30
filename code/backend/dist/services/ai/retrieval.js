"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveContext = void 0;
const embeddings_1 = require("../embeddings");
const vectorStore_1 = require("../vectorStore");
const documentService_1 = require("../documentService");
const retrieveContext = async ({ question, machineId, machineType, assetId, language, limit = 5, }) => {
    const [questionEmbedding] = await (0, embeddings_1.embedTexts)([question]);
    if (!questionEmbedding) {
        return [];
    }
    // If assetId is provided, resolve all applicable document IDs
    // (direct + inherited from ancestors + factory-wide) and filter by those
    let applicableDocumentIds;
    if (assetId) {
        const applicableDocs = await (0, documentService_1.getDocumentsForAsset)(assetId);
        applicableDocumentIds = applicableDocs.map((d) => d.document.id);
    }
    const docChunks = await (0, vectorStore_1.searchSimilarChunks)(questionEmbedding, limit, {
        // Use asset-based document scoping when available, fall back to machineId
        documentIds: applicableDocumentIds,
        machineId: !applicableDocumentIds ? (machineId ?? undefined) : undefined,
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