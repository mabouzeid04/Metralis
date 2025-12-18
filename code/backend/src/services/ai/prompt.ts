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
  maintenanceHistory: Array<{
    id: string;
    title: string;
    descriptionRaw: string;
    status: string;
    type: string;
    reportedAt: Date;
    completedAt: Date | null;
  }>;
};

export const buildPrompt = ({ question, machine, retrievedChunks, maintenanceHistory }: BuildPromptParams) => {
  const machineContext = machine
    ? `Machine Context:
- Name: ${machine.name}
- Model: ${machine.model ?? "Unknown"}
- Manufacturer: ${machine.manufacturer ?? "Unknown"}
- Line/Area: ${machine.line ?? "N/A"}
- Machine ID: ${machine.id}
- Machine Type: ${machine.model ?? "Unknown"}`
    : "Machine Context: Not specified by the user.";

  const contextText =
    retrievedChunks.length > 0
      ? retrievedChunks
        .map((chunk, index) => {
          const title =
            chunk.source === "INCIDENT"
              ? chunk.metadata?.workOrderTitle ?? chunk.metadata?.title ?? chunk.workOrderId ?? "Incident"
              : chunk.metadata?.documentTitle ?? chunk.metadata?.title ?? chunk.documentId ?? "Document";
          const label = chunk.source === "INCIDENT" ? "Incident" : "Document";
          return `[${index + 1}] ${label}: ${title}\n${chunk.content.trim()}`;
        })
        .join("\n\n")
      : "No relevant documentation was retrieved. Ask clarifying questions before suggesting risky steps.";

  const historyText =
    maintenanceHistory.length > 0
      ? maintenanceHistory
        .map((item, index) => {
          const reportedAt = item.reportedAt.toISOString();
          const status = item.status;
          const type = item.type;
          const title = item.title;
          const description = item.descriptionRaw?.trim() ?? "";
          const truncatedDescription = description.length > 320 ? `${description.slice(0, 317)}...` : description;
          return `[H${index + 1}] ${reportedAt} — ${status} — ${type} — Title: ${title}${truncatedDescription ? ` — Description: ${truncatedDescription}` : ""
            }`;
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

// System Analysis Prompt for generating plant-wide insights

export type SystemSnapshot = {
  recentWorkOrders: Array<{
    id: string;
    title: string;
    machineId: string;
    machineName: string;
    type: string;
    status: string;
    rootCause?: string | null;
    failureMode?: string | null;
    reportedAt: Date;
    completedAt?: Date | null;
  }>;
  negativeFeedbackCount: number;
  machinesWithoutDocs: Array<{ id: string; name: string }>;
  lowStockParts: Array<{ id: string; name: string; stockQty: number; minStock: number }>;
  recurringFailures: Array<{ machineName: string; failureMode: string; count: number }>;
  totalAiQueries: number;
  avgDiagnosisTimeHours: number | null;
  avgRepairTimeDays: number | null;
};

export const buildSystemAnalysisPrompt = (snapshot: SystemSnapshot): string => {
  const workOrdersSummary = snapshot.recentWorkOrders.length > 0
    ? snapshot.recentWorkOrders
      .map((wo, i) => {
        const failureInfo = wo.failureMode ? ` (Failure: ${wo.failureMode})` : "";
        const rootCauseInfo = wo.rootCause ? ` [Root Cause: ${wo.rootCause}]` : "";
        return `[WO${i + 1}] ${wo.machineName}: ${wo.title} — ${wo.status}${failureInfo}${rootCauseInfo}`;
      })
      .join("\n")
    : "No work orders in the last 48 hours.";

  const recurringFailuresSummary = snapshot.recurringFailures.length > 0
    ? snapshot.recurringFailures
      .map((rf) => `- ${rf.machineName}: "${rf.failureMode}" occurred ${rf.count} times`)
      .join("\n")
    : "No recurring failure patterns detected.";

  const docGapsSummary = snapshot.machinesWithoutDocs.length > 0
    ? snapshot.machinesWithoutDocs
      .map((m) => `- ${m.name} (ID: ${m.id})`)
      .join("\n")
    : "All machines have documentation.";

  const inventoryRisksSummary = snapshot.lowStockParts.length > 0
    ? snapshot.lowStockParts
      .map((p) => `- ${p.name}: ${p.stockQty} in stock (min: ${p.minStock})`)
      .join("\n")
    : "No parts below minimum stock level.";

  const metricsText = `
Performance Metrics (Last 24h):
- Total AI Queries: ${snapshot.totalAiQueries}
- AI Feedback: ${snapshot.negativeFeedbackCount} marked "Not Helpful"
- Avg Time to Diagnose: ${snapshot.avgDiagnosisTimeHours !== null ? `${snapshot.avgDiagnosisTimeHours.toFixed(1)} hours` : "N/A"}
- Avg Time to Repair: ${snapshot.avgRepairTimeDays !== null ? `${snapshot.avgRepairTimeDays.toFixed(1)} days` : "N/A"}`;

  return `You are an AI maintenance analyst for a manufacturing plant. Analyze the following system snapshot and generate actionable insights.

${metricsText}

Recent Work Orders (Last 48 hours):
${workOrdersSummary}

Recurring Failure Patterns:
${recurringFailuresSummary}

Machines Without Documentation:
${docGapsSummary}

Inventory Risks (Parts Below Min Stock):
${inventoryRisksSummary}

Instructions:
- Generate 3-5 prioritized insights based on this data.
- Each insight should have:
  1. A clear, concise title
  2. A 2-3 sentence explanation with specific data points
  3. Category: MAINTENANCE, INVENTORY, DOCUMENTATION, or TRAINING
  4. Priority: HIGH (urgent action needed), MEDIUM (should address soon), LOW (informational)
  5. Suggested action

Respond ONLY with valid JSON in this exact format:
{
  "insights": [
    {
      "title": "string",
      "content": "string",
      "category": "MAINTENANCE" | "INVENTORY" | "DOCUMENTATION" | "TRAINING",
      "priority": "HIGH" | "MEDIUM" | "LOW",
      "metadata": {
        "relatedWorkOrders": ["id1", "id2"],
        "relatedMachines": ["id1"],
        "relatedParts": ["id1"],
        "dataPoints": ["string describing evidence"]
      }
    }
  ]
}`;
};
