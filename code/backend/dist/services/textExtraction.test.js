"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const pdfParseMock = vitest_1.vi.fn(async () => ({ text: "pdf text" }));
vitest_1.vi.mock("pdf-parse", () => pdfParseMock);
vitest_1.vi.mock("canvas", () => ({
    DOMMatrix: class {
    },
    Path2D: class {
    },
    ImageData: class {
    },
}));
const textExtraction_1 = require("./textExtraction");
(0, vitest_1.describe)("extractTextFromBuffer", () => {
    (0, vitest_1.it)("returns empty string for empty buffer", async () => {
        const result = await (0, textExtraction_1.extractTextFromBuffer)(Buffer.from(""));
        (0, vitest_1.expect)(result).toBe("");
    });
    (0, vitest_1.it)("uses pdf-parse for pdf mime types", async () => {
        const result = await (0, textExtraction_1.extractTextFromBuffer)(Buffer.from("pdf-data"), "application/pdf");
        (0, vitest_1.expect)(pdfParseMock).toHaveBeenCalled();
        (0, vitest_1.expect)(result).toBe("pdf text");
    });
    (0, vitest_1.it)("returns utf-8 text for textual mime types", async () => {
        const result = await (0, textExtraction_1.extractTextFromBuffer)(Buffer.from("hello"), "text/plain");
        (0, vitest_1.expect)(result).toBe("hello");
    });
    (0, vitest_1.it)("falls back to utf-8 text for unknown mime types", async () => {
        const result = await (0, textExtraction_1.extractTextFromBuffer)(Buffer.from("unknown-data"), "application/octet-stream");
        (0, vitest_1.expect)(result).toBe("unknown-data");
    });
});
//# sourceMappingURL=textExtraction.test.js.map