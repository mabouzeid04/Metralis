/*
  Warnings:

  - The values [MANAGER] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "AiFeedbackValue" AS ENUM ('HELPFUL', 'NOT_HELPFUL', 'CORRECT_CAUSE');

-- CreateEnum
CREATE TYPE "InsightCategory" AS ENUM ('MAINTENANCE', 'INVENTORY', 'DOCUMENTATION', 'TRAINING');

-- CreateEnum
CREATE TYPE "InsightPriority" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "InsightStatus" AS ENUM ('NEW', 'REVIEWED', 'ACTIONED', 'DISMISSED');

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('ADMIN', 'TECHNICIAN');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'TECHNICIAN';
COMMIT;

-- DropForeignKey
ALTER TABLE "ChatConversation" DROP CONSTRAINT "ChatConversation_userId_fkey";

-- DropIndex
DROP INDEX "DocumentChunk_embedding_ivfflat_idx";

-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "structuredOutput" JSONB;

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "repairActionId" TEXT,
ADD COLUMN     "workOrderId" TEXT;

-- AlterTable
ALTER TABLE "RepairAction" ADD COLUMN     "rootCause" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedById" TEXT,
ADD COLUMN     "rejectedAt" TIMESTAMP(3),
ADD COLUMN     "rejectionReason" TEXT,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'APPROVED';

-- AlterTable
ALTER TABLE "WorkOrder" ALTER COLUMN "publicId" SET DEFAULT upper(substr(md5(random()::text), 1, 8));

-- CreateTable
CREATE TABLE "IncidentChunk" (
    "id" TEXT NOT NULL,
    "workOrderId" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "tokens" INTEGER NOT NULL,
    "embedding" vector(1536) NOT NULL,
    "machineId" TEXT,
    "machineType" TEXT,
    "language" TEXT DEFAULT 'en',
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IncidentChunk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessageFeedback" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "value" "AiFeedbackValue" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessageFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemInsight" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" "InsightCategory" NOT NULL,
    "priority" "InsightPriority" NOT NULL,
    "status" "InsightStatus" NOT NULL DEFAULT 'NEW',
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemInsight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IncidentChunk_workOrderId_idx" ON "IncidentChunk"("workOrderId");

-- CreateIndex
CREATE INDEX "IncidentChunk_machineId_idx" ON "IncidentChunk"("machineId");

-- CreateIndex
CREATE INDEX "IncidentChunk_machineType_idx" ON "IncidentChunk"("machineType");

-- CreateIndex
CREATE UNIQUE INDEX "IncidentChunk_workOrderId_chunkIndex_key" ON "IncidentChunk"("workOrderId", "chunkIndex");

-- CreateIndex
CREATE INDEX "ChatMessageFeedback_userId_idx" ON "ChatMessageFeedback"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatMessageFeedback_messageId_userId_value_key" ON "ChatMessageFeedback"("messageId", "userId", "value");

-- CreateIndex
CREATE INDEX "SystemInsight_status_idx" ON "SystemInsight"("status");

-- CreateIndex
CREATE INDEX "SystemInsight_priority_idx" ON "SystemInsight"("priority");

-- CreateIndex
CREATE INDEX "SystemInsight_category_idx" ON "SystemInsight"("category");

-- CreateIndex
CREATE INDEX "SystemInsight_createdAt_idx" ON "SystemInsight"("createdAt");

-- CreateIndex
CREATE INDEX "Document_workOrderId_idx" ON "Document"("workOrderId");

-- CreateIndex
CREATE INDEX "Document_repairActionId_idx" ON "Document"("repairActionId");

-- CreateIndex
CREATE INDEX "RepairAction_workOrderId_idx" ON "RepairAction"("workOrderId");

-- CreateIndex
CREATE INDEX "WorkOrder_reportedAt_idx" ON "WorkOrder"("reportedAt");

-- CreateIndex
CREATE INDEX "WorkOrder_machineId_idx" ON "WorkOrder"("machineId");

-- CreateIndex
CREATE INDEX "WorkOrder_assignedToId_idx" ON "WorkOrder"("assignedToId");

-- CreateIndex
CREATE INDEX "WorkOrder_status_idx" ON "WorkOrder"("status");

-- CreateIndex
CREATE INDEX "WorkOrder_priority_idx" ON "WorkOrder"("priority");

-- CreateIndex
CREATE INDEX "WorkOrder_type_idx" ON "WorkOrder"("type");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_repairActionId_fkey" FOREIGN KEY ("repairActionId") REFERENCES "RepairAction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentChunk" ADD CONSTRAINT "IncidentChunk_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatConversation" ADD CONSTRAINT "ChatConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessageFeedback" ADD CONSTRAINT "ChatMessageFeedback_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "ChatMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessageFeedback" ADD CONSTRAINT "ChatMessageFeedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
