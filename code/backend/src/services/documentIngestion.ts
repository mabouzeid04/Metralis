import { prisma } from "../lib/prisma";
import { downloadDocumentBuffer } from "./storage";
import { extractTextFromBuffer } from "./textExtraction";
import { chunkText, countApproxTokens } from "../utils/textChunker";
import { embedTexts } from "./embeddings";
import { replaceDocumentChunks } from "./vectorStore";

export const ingestDocument = async (documentId: string) => {
  const document = await prisma.document.findUnique({ where: { id: documentId } });
  if (!document) {
    throw new Error("Document not found");
  }

  await prisma.document.update({
    where: { id: documentId },
    data: { ingestionStatus: "PROCESSING", ingestionError: null },
  });

  try {
    const buffer = await downloadDocumentBuffer(document.filePath);
    const text = (await extractTextFromBuffer(buffer, document.mimeType ?? undefined)).trim();

    if (!text) {
      throw new Error("No extractable text found in document");
    }

    const chunkContents = chunkText(text);

    if (!chunkContents.length) {
      throw new Error("Document text could not be chunked");
    }

    const embeddings = await embedTexts(chunkContents);

    if (embeddings.length !== chunkContents.length) {
      throw new Error("Embedding service returned mismatched chunk count");
    }

    const chunkRecords = chunkContents.map((content, idx) => {
      const embedding = embeddings[idx];
      if (!embedding) {
        throw new Error("Missing embedding for chunk");
      }
      return {
        documentId,
        chunkIndex: idx,
        content,
        tokens: countApproxTokens(content),
        embedding,
        metadata: {
          documentId,
          documentTitle: document.title,
          machineId: document.machineId,
          machineType: document.machineType,
          documentType: document.type,
          language: document.language,
          version: document.version,
        },
      };
    });

    await replaceDocumentChunks(documentId, chunkRecords);

    await prisma.document.update({
      where: { id: documentId },
      data: { ingestionStatus: "COMPLETE", ingestedAt: new Date(), ingestionError: null },
    });
  } catch (error: any) {
    await prisma.document.update({
      where: { id: documentId },
      data: {
        ingestionStatus: "FAILED",
        ingestionError: error?.message ?? "Unknown ingestion error",
      },
    });
    throw error;
  }
};

