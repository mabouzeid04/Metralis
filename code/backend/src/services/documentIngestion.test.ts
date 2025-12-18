import { describe, expect, it, vi } from "vitest";
import { prisma } from "../tests/utils/testDb";

const downloadDocumentBuffer = vi.hoisted(() =>
  vi.fn(async () => Buffer.from("Example text for chunking")),
);
const extractTextFromBuffer = vi.hoisted(() =>
  vi.fn(async () => "Example text for chunking"),
);
const embedTexts = vi.hoisted(() => vi.fn(async (chunks: string[]) => chunks.map(() => [0.1, 0.2])));
const replaceDocumentChunks = vi.hoisted(() => vi.fn(async () => undefined));

vi.mock("./storage", () => ({ downloadDocumentBuffer }));
vi.mock("./textExtraction", () => ({ extractTextFromBuffer }));
vi.mock("./embeddings", () => ({ embedTexts }));
vi.mock("./vectorStore", () => ({ replaceDocumentChunks }));

import { ingestDocument } from "./documentIngestion";

const createTestDocument = async () => {
  const uploader = await prisma.user.findFirstOrThrow({ where: { email: "admin@test.com" } });
  const machine = await prisma.machine.findFirst();

  return prisma.document.create({
    data: {
      title: "Test Doc",
      type: "MANUAL",
      filePath: "docs/test.pdf",
      uploadedById: uploader.id,
      machineId: machine?.id ?? null,
      ingestionStatus: "PENDING",
    },
  });
};

describe("ingestDocument", () => {
  it("ingests document, creates chunks, and updates status", async () => {
    const doc = await createTestDocument();

    await ingestDocument(doc.id);

    expect(downloadDocumentBuffer).toHaveBeenCalledWith("docs/test.pdf");
    expect(extractTextFromBuffer).toHaveBeenCalled();
    expect(embedTexts).toHaveBeenCalled();
    expect(replaceDocumentChunks).toHaveBeenCalledWith(
      doc.id,
      expect.arrayContaining([
        expect.objectContaining({
          documentId: doc.id,
          content: expect.stringContaining("Example text"),
        }),
      ]),
    );

    const updated = await prisma.document.findUniqueOrThrow({ where: { id: doc.id } });
    expect(updated.ingestionStatus).toBe("COMPLETE");
    expect(updated.ingestedAt).not.toBeNull();
    expect(updated.ingestionError).toBeNull();
  });

  it("marks document as failed when extraction throws", async () => {
    const doc = await createTestDocument();
    extractTextFromBuffer.mockRejectedValueOnce(new Error("parse failure"));

    await expect(ingestDocument(doc.id)).rejects.toThrow("parse failure");

    const updated = await prisma.document.findUniqueOrThrow({ where: { id: doc.id } });
    expect(updated.ingestionStatus).toBe("FAILED");
    expect(updated.ingestionError).toContain("parse failure");
  });
});
