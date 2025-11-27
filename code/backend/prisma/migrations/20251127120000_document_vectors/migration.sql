-- Enable pgvector for Supabase (safe to run repeatedly)
CREATE EXTENSION IF NOT EXISTS vector;

-- Create ingestion status enum if missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'DocumentIngestionStatus') THEN
        CREATE TYPE "DocumentIngestionStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETE', 'FAILED');
    END IF;
END
$$;

-- Add ingestion tracking columns to documents
ALTER TABLE "Document"
    ADD COLUMN IF NOT EXISTS "ingestionStatus" "DocumentIngestionStatus" NOT NULL DEFAULT 'PENDING',
    ADD COLUMN IF NOT EXISTS "ingestedAt" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "ingestionError" TEXT;

-- Create table for document chunks
CREATE TABLE IF NOT EXISTS "DocumentChunk" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "tokens" INTEGER NOT NULL,
    "embedding" vector(1536) NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DocumentChunk_pkey" PRIMARY KEY ("id")
);

-- Indexes for fast lookup
CREATE INDEX IF NOT EXISTS "DocumentChunk_documentId_chunkIndex_idx"
    ON "DocumentChunk" ("documentId", "chunkIndex");
CREATE INDEX IF NOT EXISTS "DocumentChunk_documentId_idx"
    ON "DocumentChunk" ("documentId");

-- Foreign key
ALTER TABLE "DocumentChunk"
    ADD CONSTRAINT "DocumentChunk_documentId_fkey"
    FOREIGN KEY ("documentId") REFERENCES "Document"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

-- Optional IVF index for similarity search (requires populated data later)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_indexes
        WHERE schemaname = 'public'
          AND indexname = 'DocumentChunk_embedding_ivfflat_idx'
    ) THEN
        -- Choose cosine distance + 100 lists as a sensible default
        CREATE INDEX "DocumentChunk_embedding_ivfflat_idx"
            ON "DocumentChunk"
            USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
    END IF;
END
$$;

