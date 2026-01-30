"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestDocument = void 0;
const prisma_1 = require("../lib/prisma");
const storage_1 = require("./storage");
const textExtraction_1 = require("./textExtraction");
const textChunker_1 = require("../utils/textChunker");
const embeddings_1 = require("./embeddings");
const vectorStore_1 = require("./vectorStore");
const ingestDocument = async (documentId) => {
    const document = await prisma_1.prisma.document.findUnique({
        where: { id: documentId },
        include: {
            assets: { select: { assetId: true } },
        },
    });
    if (!document) {
        throw new Error("Document not found");
    }
    await prisma_1.prisma.document.update({
        where: { id: documentId },
        data: { ingestionStatus: "PROCESSING", ingestionError: null },
    });
    try {
        const buffer = await (0, storage_1.downloadDocumentBuffer)(document.filePath);
        const text = (await (0, textExtraction_1.extractTextFromBuffer)(buffer, document.mimeType ?? undefined)).trim();
        if (!text) {
            throw new Error("No extractable text found in document");
        }
        const chunkContents = (0, textChunker_1.chunkText)(text);
        if (!chunkContents.length) {
            throw new Error("Document text could not be chunked");
        }
        const embeddings = await (0, embeddings_1.embedTexts)(chunkContents);
        if (embeddings.length !== chunkContents.length) {
            throw new Error("Embedding service returned mismatched chunk count");
        }
        // Collect linked asset IDs for metadata
        const assetIds = document.assets.map((a) => a.assetId);
        const chunkRecords = chunkContents.map((content, idx) => {
            const embedding = embeddings[idx];
            if (!embedding) {
                throw new Error("Missing embedding for chunk");
            }
            return {
                documentId,
                chunkIndex: idx,
                content,
                tokens: (0, textChunker_1.countApproxTokens)(content),
                embedding,
                metadata: {
                    documentId,
                    documentTitle: document.title,
                    machineId: document.machineId,
                    machineType: document.machineType,
                    documentType: document.type,
                    language: document.language,
                    version: document.version,
                    isFactoryWide: document.isFactoryWide,
                    assetIds,
                },
            };
        });
        await (0, vectorStore_1.replaceDocumentChunks)(documentId, chunkRecords);
        await prisma_1.prisma.document.update({
            where: { id: documentId },
            data: { ingestionStatus: "COMPLETE", ingestedAt: new Date(), ingestionError: null },
        });
    }
    catch (error) {
        await prisma_1.prisma.document.update({
            where: { id: documentId },
            data: {
                ingestionStatus: "FAILED",
                ingestionError: error?.message ?? "Unknown ingestion error",
            },
        });
        throw error;
    }
};
exports.ingestDocument = ingestDocument;
//# sourceMappingURL=documentIngestion.js.map