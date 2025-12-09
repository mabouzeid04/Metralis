-- Add a short, human-friendly publicId to work orders.
ALTER TABLE "WorkOrder"
ADD COLUMN "publicId" TEXT NOT NULL DEFAULT (upper(substr(md5(random()::text), 1, 8)));

-- Enforce uniqueness to avoid collisions.
CREATE UNIQUE INDEX "WorkOrder_publicId_key" ON "WorkOrder"("publicId");
