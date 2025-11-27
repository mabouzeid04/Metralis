import type { RetrievedChunk } from "./types";

type BuildPromptParams = {
  question: string;
  machine?: {
    id: string;
    name: string;
    model?: string | null;
    manufacturer?: string | null;
    line?: string | null;
  } | null;
  retrievedChunks: RetrievedChunk[];
};

export const buildPrompt = ({ question, machine, retrievedChunks }: BuildPromptParams) => {
  const machineContext = machine
    ? `Machine Context:
- Name: ${machine.name}
- Model: ${machine.model ?? "Unknown"}
- Manufacturer: ${machine.manufacturer ?? "Unknown"}
- Line/Area: ${machine.line ?? "N/A"}`
    : "Machine Context: Not specified by the user.";

  const contextText =
    retrievedChunks.length > 0
      ? retrievedChunks
          .map((chunk, index) => {
            const title = chunk.metadata?.documentTitle ?? chunk.metadata?.title ?? chunk.documentId;
            return `(${index + 1}) [${title}] ${chunk.content.trim()}`;
          })
          .join("\n\n")
      : "No relevant documentation was retrieved. Ask clarifying questions before suggesting risky steps.";

  return `${machineContext}

Retrieved Knowledge:
${contextText}

User Question:
${question}

Response Guidelines:
1. Start with a short summary (2 sentences).
2. List likely causes ranked by confidence.
3. Provide stepwise troubleshooting actions referencing the numbered documents above when relevant.
4. Include a final section titled "Citations" referencing the associated numbers.
5. Clearly state if more data is required before taking action.`;
};

