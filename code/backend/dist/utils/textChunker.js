"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countApproxTokens = exports.chunkText = void 0;
const DEFAULT_CHUNK_SIZE = 1200;
const DEFAULT_CHUNK_OVERLAP = 200;
const chunkText = (input, options) => {
    const chunkSize = options?.chunkSize ?? DEFAULT_CHUNK_SIZE;
    const chunkOverlap = options?.chunkOverlap ?? DEFAULT_CHUNK_OVERLAP;
    const sanitized = input.replace(/\s+/g, " ").trim();
    if (!sanitized) {
        return [];
    }
    const chunks = [];
    let start = 0;
    while (start < sanitized.length) {
        const end = Math.min(start + chunkSize, sanitized.length);
        chunks.push(sanitized.slice(start, end).trim());
        const nextStart = end - chunkOverlap;
        // Ensure forward progress to avoid infinite loops when overlap >= chunk size or very short input
        if (nextStart <= start) {
            break;
        }
        start = nextStart;
    }
    // Remove empty fragments and ensure uniqueness when overlap degenerates
    return chunks.filter((chunk, idx) => chunk.length > 0 && (idx === 0 || chunk !== chunks[idx - 1]));
};
exports.chunkText = chunkText;
const countApproxTokens = (text) => {
    if (!text) {
        return 0;
    }
    return Math.ceil(text.split(/\s+/).length * 1.3);
};
exports.countApproxTokens = countApproxTokens;
//# sourceMappingURL=textChunker.js.map