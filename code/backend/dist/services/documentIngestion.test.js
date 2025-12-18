"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const testDb_1 = require("../../tests/utils/testDb");
const downloadDocumentBuffer = vitest_1.vi.hoisted(() => vitest_1.vi.fn(async () => Buffer.from("Example text for chunking")));
const extractTextFromBuffer = vitest_1.vi.hoisted(() => vitest_1.vi.fn(async () => "Example text for chunking"));
const embedTexts = vitest_1.vi.hoisted(() => vitest_1.vi.fn(async (chunks) => chunks.map(() => [0.1, 0.2])));
const replaceDocumentChunks = vitest_1.vi.hoisted(() => vitest_1.vi.fn(async () => undefined));
vitest_1.vi.mock("./storage", () => ({ downloadDocumentBuffer }));
vitest_1.vi.mock("./textExtraction", () => ({ extractTextFromBuffer }));
vitest_1.vi.mock("./embeddings", () => ({ embedTexts }));
vitest_1.vi.mock("./vectorStore", () => ({ replaceDocumentChunks }));
const documentIngestion_1 = require("./documentIngestion");
const createTestDocument = async () => {
    const uploader = await testDb_1.prisma.user.findFirstOrThrow({ where: { email: "admin@test.com" } });
    const machine = await testDb_1.prisma.machine.findFirst();
    return testDb_1.prisma.document.create({
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
(0, vitest_1.describe)("ingestDocument", () => {
    (0, vitest_1.it)("ingests document, creates chunks, and updates status", async () => {
        const doc = await createTestDocument();
        await (0, documentIngestion_1.ingestDocument)(doc.id);
        (0, vitest_1.expect)(downloadDocumentBuffer).toHaveBeenCalledWith("docs/test.pdf");
        (0, vitest_1.expect)(extractTextFromBuffer).toHaveBeenCalled();
        (0, vitest_1.expect)(embedTexts).toHaveBeenCalled();
        (0, vitest_1.expect)(replaceDocumentChunks).toHaveBeenCalledWith(doc.id, vitest_1.expect.arrayContaining([
            vitest_1.expect.objectContaining({
                documentId: doc.id,
                content: vitest_1.expect.stringContaining("Example text"),
            }),
        ]));
        const updated = await testDb_1.prisma.document.findUniqueOrThrow({ where: { id: doc.id } });
        (0, vitest_1.expect)(updated.ingestionStatus).toBe("COMPLETE");
        (0, vitest_1.expect)(updated.ingestedAt).not.toBeNull();
        (0, vitest_1.expect)(updated.ingestionError).toBeNull();
    });
    (0, vitest_1.it)("marks document as failed when extraction throws", async () => {
        const doc = await createTestDocument();
        extractTextFromBuffer.mockRejectedValueOnce(new Error("parse failure"));
        await (0, vitest_1.expect)((0, documentIngestion_1.ingestDocument)(doc.id)).rejects.toThrow("parse failure");
        const updated = await testDb_1.prisma.document.findUniqueOrThrow({ where: { id: doc.id } });
        (0, vitest_1.expect)(updated.ingestionStatus).toBe("FAILED");
        (0, vitest_1.expect)(updated.ingestionError).toContain("parse failure");
    });
});
//# sourceMappingURL=documentIngestion.test.js.map