"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPrompt = void 0;
const buildPrompt = ({ question, machine, retrievedChunks, maintenanceHistory }) => {
    const machineContext = machine
        ? `Machine Context:
- Name: ${machine.name}
- Model: ${machine.model ?? "Unknown"}
- Manufacturer: ${machine.manufacturer ?? "Unknown"}
- Line/Area: ${machine.line ?? "N/A"}
- Machine ID: ${machine.id}
- Machine Type: ${machine.model ?? "Unknown"}`
        : "Machine Context: Not specified by the user.";
    const contextText = retrievedChunks.length > 0
        ? retrievedChunks
            .map((chunk, index) => {
            const title = chunk.source === "INCIDENT"
                ? chunk.metadata?.workOrderTitle ?? chunk.metadata?.title ?? chunk.workOrderId ?? "Incident"
                : chunk.metadata?.documentTitle ?? chunk.metadata?.title ?? chunk.documentId ?? "Document";
            const label = chunk.source === "INCIDENT" ? "Incident" : "Document";
            return `[${index + 1}] ${label}: ${title}\n${chunk.content.trim()}`;
        })
            .join("\n\n")
        : "No relevant documentation was retrieved. Ask clarifying questions before suggesting risky steps.";
    const historyText = maintenanceHistory.length > 0
        ? maintenanceHistory
            .map((item, index) => {
            const reportedAt = item.reportedAt.toISOString();
            const status = item.status;
            const type = item.type;
            const title = item.title;
            const description = item.descriptionRaw?.trim() ?? "";
            const truncatedDescription = description.length > 320 ? `${description.slice(0, 317)}...` : description;
            return `[H${index + 1}] ${reportedAt} — ${status} — ${type} — Title: ${title}${truncatedDescription ? ` — Description: ${truncatedDescription}` : ""}`;
        })
            .join("\n")
        : "No maintenance history entries were provided for this machine.";
    return `${machineContext}

Maintenance History (most recent first):
${historyText}

Retrieved Knowledge:
${contextText}

User Question:
${question}

Instructions:
- Ground your answer in Machine Context, Maintenance History, and Retrieved Knowledge first; cite entries as [H#] for history and [#] for retrieved knowledge.
- Choose the format based on intent: troubleshooting/RCA → brief summary, likely causes, stepwise actions with citations; overviews/how-it-works/dependencies/status/training → concise prose/lists with citations; honor user-specified formats (JSON/table/checklist/schema) when safe; otherwise default to concise prose.
- If critical info is missing for risky steps, state what is missing and ask for it before prescribing hazardous actions.
- Use background knowledge only after using provided context, and mark it as general when you do.`;
};
exports.buildPrompt = buildPrompt;
//# sourceMappingURL=prompt.js.map