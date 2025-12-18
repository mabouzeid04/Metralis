const DEFAULT_CHUNK_SIZE = 1200;
const DEFAULT_CHUNK_OVERLAP = 200;

export type ChunkerOptions = {
  chunkSize?: number;
  chunkOverlap?: number;
};

export const chunkText = (input: string, options?: ChunkerOptions) => {
  const chunkSize = options?.chunkSize ?? DEFAULT_CHUNK_SIZE;
  const chunkOverlap = options?.chunkOverlap ?? DEFAULT_CHUNK_OVERLAP;
  const sanitized = input.replace(/\s+/g, " ").trim();

  if (!sanitized) {
    return [];
  }

  const chunks: string[] = [];
  let start = 0;

  while (start < sanitized.length) {
    const end = Math.min(start + chunkSize, sanitized.length);
    chunks.push(sanitized.slice(start, end).trim());

    if (end >= sanitized.length) {
      break;
    }

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

export const countApproxTokens = (text: string) => {
  if (!text) {
    return 0;
  }
  return Math.ceil(text.split(/\s+/).length * 1.3);
};

