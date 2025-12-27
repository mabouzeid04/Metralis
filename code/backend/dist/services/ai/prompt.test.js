"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const prompt_1 = require("./prompt");
(0, vitest_1.describe)("buildPrompt", () => {
    (0, vitest_1.it)("includes machine context, history, and retrieved knowledge", () => {
        const prompt = (0, prompt_1.buildPrompt)({
            question: "How to fix vibration?",
            machine: { id: "machine-1", name: "Pump A", model: "P-100", manufacturer: "Acme", line: "Line 1" },
            retrievedChunks: [
                {
                    id: "chunk-1",
                    source: "DOCUMENT",
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
        (0, vitest_1.expect)(prompt).toContain("Pump A");
        (0, vitest_1.expect)(prompt).toContain("Bearing Manual");
        (0, vitest_1.expect)(prompt).toContain("[H1]");
        (0, vitest_1.expect)(prompt).toContain("How to fix vibration?");
    });
    (0, vitest_1.it)("uses fallback text when no retrieved chunks are available", () => {
        const prompt = (0, prompt_1.buildPrompt)({
            question: "What next?",
            machine: null,
            retrievedChunks: [],
            maintenanceHistory: [],
        });
        (0, vitest_1.expect)(prompt).toContain("No relevant documentation was retrieved");
        (0, vitest_1.expect)(prompt).toContain("Machine Context: Not specified");
    });
});
//# sourceMappingURL=prompt.test.js.map