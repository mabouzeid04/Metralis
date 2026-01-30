import { describe, expect, it, vi } from "vitest";

const pdfParseMock = vi.fn(async () => ({ text: "pdf text" }));

vi.mock("pdf-parse", () => pdfParseMock);

vi.mock("canvas", () => ({
  DOMMatrix: class {},
  Path2D: class {},
  ImageData: class {},
}));

import { extractTextFromBuffer } from "./textExtraction";

describe("extractTextFromBuffer", () => {
  it("returns empty string for empty buffer", async () => {
    const result = await extractTextFromBuffer(Buffer.from(""));
    expect(result).toBe("");
  });

  it("uses pdf-parse for pdf mime types", async () => {
    const result = await extractTextFromBuffer(Buffer.from("pdf-data"), "application/pdf");
    expect(pdfParseMock).toHaveBeenCalled();
    expect(result).toBe("pdf text");
  });

  it("returns utf-8 text for textual mime types", async () => {
    const result = await extractTextFromBuffer(Buffer.from("hello"), "text/plain");
    expect(result).toBe("hello");
  });

  it("falls back to utf-8 text for unknown mime types", async () => {
    const result = await extractTextFromBuffer(Buffer.from("unknown-data"), "application/octet-stream");
    expect(result).toBe("unknown-data");
  });
});




