"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const textChunker_1 = require("./textChunker");
(0, vitest_1.describe)("chunkText", () => {
    (0, vitest_1.it)("returns empty array for blank input", () => {
        (0, vitest_1.expect)((0, textChunker_1.chunkText)("   ")).toEqual([]);
    });
    (0, vitest_1.it)("splits text using provided chunk size and overlap", () => {
        const input = "A B C D E F G H I J K L M N O P";
        const chunks = (0, textChunker_1.chunkText)(input, { chunkSize: 10, chunkOverlap: 2 });
        (0, vitest_1.expect)(chunks).toEqual(["A B C D E", "E F G H I", "I J K L M", "M N O P", "P"]);
    });
    (0, vitest_1.it)("removes duplicate chunks when overlap exceeds chunk size", () => {
        const input = "alpha beta gamma delta";
        const chunks = (0, textChunker_1.chunkText)(input, { chunkSize: 5, chunkOverlap: 10 });
        (0, vitest_1.expect)(chunks.length).toBe(1);
        (0, vitest_1.expect)(chunks[0]).toBe("alpha");
    });
});
(0, vitest_1.describe)("countApproxTokens", () => {
    (0, vitest_1.it)("returns 0 for empty text", () => {
        (0, vitest_1.expect)((0, textChunker_1.countApproxTokens)("")).toBe(0);
    });
    (0, vitest_1.it)("estimates tokens with small multiplier", () => {
        (0, vitest_1.expect)((0, textChunker_1.countApproxTokens)("one two three four")).toBe(Math.ceil(4 * 1.3));
    });
});
//# sourceMappingURL=textChunker.test.js.map