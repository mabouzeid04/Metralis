import { describe, expect, it } from "vitest";
import { chunkText, countApproxTokens } from "./textChunker";

describe("chunkText", () => {
  it("returns empty array for blank input", () => {
    expect(chunkText("   ")).toEqual([]);
  });

  it("splits text using provided chunk size and overlap", () => {
    const input = "A B C D E F G H I J K L M N O P";
    const chunks = chunkText(input, { chunkSize: 10, chunkOverlap: 2 });

    expect(chunks).toEqual(["A B C D E", "E F G H I", "I J K L M", "M N O P"]);
  });

  it("removes duplicate chunks when overlap exceeds chunk size", () => {
    const input = "alpha beta gamma delta";
    const chunks = chunkText(input, { chunkSize: 5, chunkOverlap: 10 });

    expect(chunks.length).toBe(1);
    expect(chunks[0]).toBe("alpha");
  });
});

describe("countApproxTokens", () => {
  it("returns 0 for empty text", () => {
    expect(countApproxTokens("")).toBe(0);
  });

  it("estimates tokens with small multiplier", () => {
    expect(countApproxTokens("one two three four")).toBe(Math.ceil(4 * 1.3));
  });
});
