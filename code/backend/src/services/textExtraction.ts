// pdf-parse uses CommonJS exports
type PdfParseFn = (dataBuffer: Buffer, options?: unknown) => Promise<{ text: string }>;
const pdfParse: PdfParseFn = require("pdf-parse");

const TEXTUAL_MIME_PREFIXES = ["text/", "application/json", "application/xml", "application/javascript"];

export const extractTextFromBuffer = async (buffer: Buffer, mimeType?: string) => {
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

