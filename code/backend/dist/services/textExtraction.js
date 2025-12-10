"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTextFromBuffer = void 0;
// pdf-parse expects browser globals; use canvas (when available) or lightweight shims
// eslint-disable-next-line @typescript-eslint/no-var-requires
const canvas = require("canvas");
const globalCanvas = globalThis;
if (!globalCanvas.DOMMatrix && canvas.DOMMatrix) {
    globalCanvas.DOMMatrix = canvas.DOMMatrix;
}
if (!globalCanvas.Path2D) {
    globalCanvas.Path2D = canvas.Path2D ?? (class Path2DShim {
    });
}
if (!globalCanvas.ImageData) {
    globalCanvas.ImageData = canvas.ImageData ?? (class ImageDataShim {
    });
}
const pdfParse = require("pdf-parse");
const TEXTUAL_MIME_PREFIXES = ["text/", "application/json", "application/xml", "application/javascript"];
const extractTextFromBuffer = async (buffer, mimeType) => {
    if (!buffer || buffer.length === 0) {
        return "";
    }
    if (mimeType?.includes("pdf")) {
        const { text } = await pdfParse(buffer);
        return text;
    }
    if (mimeType && TEXTUAL_MIME_PREFIXES.some((prefix) => mimeType.startsWith(prefix))) {
        return buffer.toString("utf-8");
    }
    // Best effort fallback for unknown mime types (treat as UTF-8 text)
    return buffer.toString("utf-8");
};
exports.extractTextFromBuffer = extractTextFromBuffer;
//# sourceMappingURL=textExtraction.js.map