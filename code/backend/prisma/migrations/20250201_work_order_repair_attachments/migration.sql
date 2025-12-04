-- AlterTable
ALTER TABLE "Document"
    ADD COLUMN IF NOT EXISTS "workOrderId" TEXT,
    ADD COLUMN IF NOT EXISTS "repairActionId" TEXT;

-- AlterTable
ALTER TABLE "RepairAction"
    ADD COLUMN IF NOT EXISTS "rootCause" TEXT;

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Document_workOrderId_idx" ON "Document"("workOrderId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Document_repairActionId_idx" ON "Document"("repairActionId");

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'Document_workOrderId_fkey'
    ) THEN
        ALTER TABLE "Document"
            ADD CONSTRAINT "Document_workOrderId_fkey" 
            FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") 
            ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'Document_repairActionId_fkey'
    ) THEN
        ALTER TABLE "Document"
            ADD CONSTRAINT "Document_repairActionId_fkey" 
            FOREIGN KEY ("repairActionId") REFERENCES "RepairAction"("id") 
            ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;




