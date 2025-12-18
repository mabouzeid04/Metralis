SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE TABLE IF NOT EXISTS "public"."IncidentChunk" (
    "id" text NOT NULL,
    "workOrderId" text NOT NULL,
    "chunkIndex" integer NOT NULL,
    "content" text NOT NULL,
    "tokens" integer NOT NULL,
    "embedding" vector(1536) NOT NULL,
    "machineId" text,
    "machineType" text,
    "language" text DEFAULT 'en',
    "metadata" jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "IncidentChunk_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "IncidentChunk_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "public"."WorkOrder"("id") ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "IncidentChunk_workOrderId_chunkIndex_key" ON "public"."IncidentChunk"("workOrderId", "chunkIndex");
CREATE INDEX IF NOT EXISTS "IncidentChunk_workOrderId_idx" ON "public"."IncidentChunk"("workOrderId");
CREATE INDEX IF NOT EXISTS "IncidentChunk_machineId_idx" ON "public"."IncidentChunk"("machineId");
CREATE INDEX IF NOT EXISTS "IncidentChunk_machineType_idx" ON "public"."IncidentChunk"("machineType");
