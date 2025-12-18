import { prisma } from "../src/lib/prisma";
import { upsertIncidentChunksForWorkOrder } from "../src/services/incidentIngestion";

async function main() {
  const workOrders = await prisma.workOrder.findMany({ select: { id: true, publicId: true } });
  for (const wo of workOrders) {
    const label = wo.publicId ?? wo.id;
    console.log(`Backfilling incident embeddings for work order ${label}...`);
    try {
      await upsertIncidentChunksForWorkOrder(wo.id);
    } catch (error) {
      console.error(`Failed to backfill work order ${label}`, error);
    }
  }
  await prisma.$disconnect();
  console.log("Incident backfill complete.");
}

main().catch((error) => {
  console.error("Backfill failed", error);
  process.exit(1);
});
