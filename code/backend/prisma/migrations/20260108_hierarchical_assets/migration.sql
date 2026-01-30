-- CreateEnum
CREATE TYPE "AssetStatus" AS ENUM ('RUNNING', 'DOWN');

-- CreateEnum
CREATE TYPE "AssetCriticality" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateTable
CREATE TABLE "FactoryConfig" (
    "id" TEXT NOT NULL,
    "primaryLanguage" TEXT NOT NULL DEFAULT 'en',
    "supportedLanguages" TEXT[] DEFAULT ARRAY['en']::TEXT[],
    "hierarchyLevels" JSONB NOT NULL,
    "defaultMaxDepth" INTEGER NOT NULL DEFAULT 3,
    "statusReasonOptions" JSONB NOT NULL,
    "maintenanceDisciplines" JSONB NOT NULL,
    "maintenanceTypes" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FactoryConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL,
    "parentId" TEXT,
    "depth" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "nameTranslations" JSONB,
    "code" TEXT,
    "levelType" TEXT NOT NULL,
    "pathString" TEXT NOT NULL,
    "pathStringTranslations" JSONB,
    "status" "AssetStatus",
    "statusReason" TEXT,
    "criticality" "AssetCriticality",
    "attributes" JSONB,
    "commissionedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentAsset" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentAsset_pkey" PRIMARY KEY ("id")
);

-- Add assetId columns to existing tables
ALTER TABLE "WorkOrder" ADD COLUMN "assetId" TEXT;
ALTER TABLE "ChatConversation" ADD COLUMN "assetId" TEXT;
ALTER TABLE "IncidentChunk" ADD COLUMN "assetId" TEXT;

-- CreateIndex
CREATE INDEX "Asset_parentId_idx" ON "Asset"("parentId");
CREATE INDEX "Asset_depth_idx" ON "Asset"("depth");
CREATE INDEX "Asset_levelType_idx" ON "Asset"("levelType");
CREATE INDEX "Asset_status_idx" ON "Asset"("status");
CREATE INDEX "Asset_name_idx" ON "Asset"("name");
CREATE UNIQUE INDEX "Asset_parentId_name_key" ON "Asset"("parentId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentAsset_documentId_assetId_key" ON "DocumentAsset"("documentId", "assetId");
CREATE INDEX "DocumentAsset_documentId_idx" ON "DocumentAsset"("documentId");
CREATE INDEX "DocumentAsset_assetId_idx" ON "DocumentAsset"("assetId");

-- CreateIndex
CREATE INDEX "WorkOrder_assetId_idx" ON "WorkOrder"("assetId");
CREATE INDEX "ChatConversation_assetId_idx" ON "ChatConversation"("assetId");
CREATE INDEX "IncidentChunk_assetId_idx" ON "IncidentChunk"("assetId");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentAsset" ADD CONSTRAINT "DocumentAsset_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DocumentAsset" ADD CONSTRAINT "DocumentAsset_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ChatConversation" ADD CONSTRAINT "ChatConversation_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "IncidentChunk" ADD CONSTRAINT "IncidentChunk_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
