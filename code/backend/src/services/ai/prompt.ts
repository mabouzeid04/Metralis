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

You MUST respond with a single valid JSON object that matches this schema exactly:
{
  "summary": "One or two sentences that recap the situation.",
  "likelyCauses": [
    {
      "title": "Short name for the hypothesis.",
      "confidence": "HIGH" | "MEDIUM" | "LOW",
      "rationale": "Why this cause is likely (reference similar incidents or docs).",
      "citations": [Numbers referencing Retrieved Knowledge entries, e.g., 1,2]
    }
  ],
  "recommendedSteps": [
    {
      "title": "Name of the diagnostic or repair step.",
      "action": "Step-by-step instructions.",
      "citations": [Numbers referencing Retrieved Knowledge entries]
    }
  ],
  "references": [
    { "id": Number matching the Retrieved Knowledge entry, "source": "Document title or context" }
  ],
  "needsMoreData": Boolean,
  "missingDataNotes": "If needsMoreData is true, explain what information is missing (otherwise use an empty string)."
}

Guidelines:
- Always include arrays even if they are empty.
- Confidence must be one of HIGH, MEDIUM, LOW.
- Citations should reference the numbered Retrieved Knowledge entries; use an empty array when nothing is cited.
- If there are no documents, references should be an empty array and citations should be empty arrays.
- Do NOT wrap the JSON in backticks or add commentary—return JSON only.`;
};

