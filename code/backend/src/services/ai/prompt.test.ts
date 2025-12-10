import { describe, expect, it } from "vitest";
import { buildPrompt } from "./prompt";

describe("buildPrompt", () => {
  it("includes machine context, history, and retrieved knowledge", () => {
    const prompt = buildPrompt({
      question: "How to fix vibration?",
      machine: { id: "machine-1", name: "Pump A", model: "P-100", manufacturer: "Acme", line: "Line 1" },
      retrievedChunks: [
        {
          id: "chunk-1",
          documentId: "doc-1",
          chunkIndex: 0,
          content: "Check the bearing alignment.",
          metadata: { documentTitle: "Bearing Manual", machineId: "machine-1" },
          similarity: 0.9,
        },
      ],
      maintenanceHistory: [
        {
          id: "wo-1",
          title: "Replace bearing",
          descriptionRaw: "Did the replacement",
          status: "CLOSED",
          type: "CORRECTIVE",
          reportedAt: new Date("2024-01-01T00:00:00Z"),
          completedAt: null,
        },
      ],
    });

    expect(prompt).toContain("Pump A");
    expect(prompt).toContain("Bearing Manual");
    expect(prompt).toContain("[H1]");
    expect(prompt).toContain("How to fix vibration?");
  });

  it("uses fallback text when no retrieved chunks are available", () => {
    const prompt = buildPrompt({
      question: "What next?",
      machine: null,
      retrievedChunks: [],
      maintenanceHistory: [],
    });

    expect(prompt).toContain("No relevant documentation was retrieved");
    expect(prompt).toContain("Machine Context: Not specified");
  });
});
