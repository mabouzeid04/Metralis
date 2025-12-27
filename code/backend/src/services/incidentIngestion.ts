import type { Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";
import { chunkText, countApproxTokens } from "../utils/textChunker";
import { embedTexts } from "./embeddings";
import { replaceIncidentChunks, type IncidentChunkRecord } from "./vectorStore";

const formatParts = (parts?: Array<{ part?: { name: string | null; partNumber: string | null; manufacturer: string | null } }>) => {
  if (!parts || !parts.length) return "None recorded";
  return parts
    .map((p) => {
      const name = p.part?.name ?? "Unknown part";
      const number = p.part?.partNumber ? ` (${p.part.partNumber})` : "";
      const manufacturer = p.part?.manufacturer ? ` by ${p.part.manufacturer}` : "";
      return `${name}${number}${manufacturer}`;
    })
    .join("; ");
};

const formatPartsUsed = (partsUsed: Prisma.JsonValue | null | undefined) => {
  if (!Array.isArray(partsUsed) || partsUsed.length === 0) return "none";

  return partsUsed
    .map((p) => {
      if (!p || typeof p !== "object") return "part x1";
      const entry = p as Record<string, unknown>;
      const name = typeof entry.name === "string" ? entry.name : typeof entry.partId === "string" ? entry.partId : "part";
      const quantity = typeof entry.quantity === "number" ? entry.quantity : 1;
      return `${name} x${quantity}`;
    })
    .join(", ");
};

const formatRepairActions = (
  repairs: Array<{
    id: string;
    actions: string;
    success: boolean;
    rootCause: string | null;
    failureNote: string | null;
    adjustments: string | null;
    verification: string | null;
    partsUsed: Prisma.JsonValue | null;
    createdAt: Date;
    performedBy?: { name: string | null } | null;
  }>,
) => {
  if (!repairs.length) return "No repair actions logged yet.";

  return repairs
    .map((repair, idx) => {
      const partsList = formatPartsUsed(repair.partsUsed);
      const status = repair.success ? "success" : "incomplete/failed";
      const performer = repair.performedBy?.name ? ` by ${repair.performedBy.name}` : "";
      return [
        `Repair #${idx + 1}${performer} (${status}) @ ${repair.createdAt.toISOString()}:`,
        `Actions: ${repair.actions}`,
        repair.rootCause ? `Root cause: ${repair.rootCause}` : null,
        repair.failureNote ? `Failure note: ${repair.failureNote}` : null,
        repair.adjustments ? `Adjustments: ${repair.adjustments}` : null,
        repair.verification ? `Verification: ${repair.verification}` : null,
        `Parts used: ${partsList}`,
      ]
        .filter(Boolean)
        .join(" ");
    })
    .join("\n");
};

const workOrderInclude = {
  machine: {
    select: { id: true, name: true, model: true, manufacturer: true, line: true },
  },
  parts: {
    include: { part: true },
  },
  repairActions: {
    orderBy: { createdAt: "asc" },
    include: {
      performedBy: {
        select: { name: true },
      },
    },
  },
} satisfies Prisma.WorkOrderInclude;

type WorkOrderWithRelations = Prisma.WorkOrderGetPayload<{ include: typeof workOrderInclude }>;

const buildIncidentText = (workOrder: WorkOrderWithRelations) => {
  if (!workOrder) return "";

  const machine = workOrder.machine;
  const repairs = workOrder.repairActions ?? [];
  const parts = workOrder.parts ?? [];
  const symptoms = Array.isArray(workOrder.symptoms) ? workOrder.symptoms.join(", ") : "";

  const header = [
    `Work Order ${workOrder.publicId ?? workOrder.id}: ${workOrder.title}`,
    `Machine: ${machine?.name ?? "Unknown"} ${machine?.model ? `(${machine.model})` : ""} ${machine?.manufacturer ? `- ${machine.manufacturer}` : ""}`,
    `Status: ${workOrder.status}, Type: ${workOrder.type}, Priority: ${workOrder.priority}`,
    `Reported: ${workOrder.reportedAt?.toISOString?.() ?? workOrder.reportedAt}`,
    workOrder.completedAt ? `Completed: ${workOrder.completedAt.toISOString()}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const body = [
    `Description: ${workOrder.descriptionRaw}`,
    symptoms ? `Symptoms: ${symptoms}` : null,
    workOrder.suspectedCause ? `Suspected cause: ${workOrder.suspectedCause}` : null,
    workOrder.rootCause ? `Root cause: ${workOrder.rootCause}` : null,
    workOrder.failureMode ? `Failure mode: ${workOrder.failureMode}` : null,
    parts.length ? `Parts (work order): ${formatParts(parts)}` : null,
    `Repairs:\n${formatRepairActions(repairs)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const fullText = [header, body].filter(Boolean).join("\n\n");

  // Safety guard: avoid excessively large payloads that can cause memory issues when chunking
  const MAX_CHARS = 200_000;
  if (fullText.length > MAX_CHARS) {
    return `${fullText.slice(0, MAX_CHARS)}\n\n[Truncated incident text at ${MAX_CHARS} characters]`;
  }

  return fullText;
};

export const upsertIncidentChunksForWorkOrder = async (workOrderId: string) => {
  const workOrder = await prisma.workOrder.findUnique({
    where: { id: workOrderId },
    include: workOrderInclude,
  });

  if (!workOrder) {
    throw new Error("Work order not found");
  }

  const incidentText = buildIncidentText(workOrder).trim();
  if (!incidentText) {
    await replaceIncidentChunks(workOrderId, []);
    return;
  }

  const chunkContents = chunkText(incidentText, { chunkSize: 900, chunkOverlap: 150 });
  const embeddings = await embedTexts(chunkContents);

  if (embeddings.length !== chunkContents.length) {
    throw new Error("Embedding service returned mismatched chunk count for incidents");
  }

  const records: IncidentChunkRecord[] = chunkContents.map((content, idx) => {
    const embedding = embeddings[idx];
    if (!embedding) {
      throw new Error(`Failed to generate embedding for chunk ${idx}`);
    }
    return {
      workOrderId,
      chunkIndex: idx,
      content,
      tokens: countApproxTokens(content),
      embedding,
      machineId: workOrder.machineId,
      machineType: workOrder.machine?.model ?? null,
      language: "en",
      metadata: {
        source: "INCIDENT",
        workOrderId: workOrder.id,
        workOrderPublicId: workOrder.publicId,
        workOrderTitle: workOrder.title,
        status: workOrder.status,
        type: workOrder.type,
        priority: workOrder.priority,
        machineId: workOrder.machineId,
        machineName: workOrder.machine?.name,
        machineModel: workOrder.machine?.model,
        reportedAt: workOrder.reportedAt,
        completedAt: workOrder.completedAt,
      },
    };
  });

  await replaceIncidentChunks(workOrderId, records);
};
