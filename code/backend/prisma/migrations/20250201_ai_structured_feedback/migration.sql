-- Create Enum for AI feedback if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'AiFeedbackValue') THEN
        CREATE TYPE "AiFeedbackValue" AS ENUM ('HELPFUL', 'NOT_HELPFUL', 'CORRECT_CAUSE');
    END IF;
END
$$;

-- Add structured output column to chat messages
ALTER TABLE "ChatMessage"
    ADD COLUMN IF NOT EXISTS "structuredOutput" JSONB;

-- Create feedback table
CREATE TABLE IF NOT EXISTS "ChatMessageFeedback" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "value" "AiFeedbackValue" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ChatMessageFeedback_pkey" PRIMARY KEY ("id")
);

-- Indexes for feedback
CREATE UNIQUE INDEX IF NOT EXISTS "ChatMessageFeedback_messageId_userId_value_key" ON "ChatMessageFeedback" ("messageId", "userId", "value");
CREATE INDEX IF NOT EXISTS "ChatMessageFeedback_userId_idx" ON "ChatMessageFeedback" ("userId");

-- Foreign keys
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'ChatMessageFeedback_messageId_fkey'
    ) THEN
        ALTER TABLE "ChatMessageFeedback"
            ADD CONSTRAINT "ChatMessageFeedback_messageId_fkey"
            FOREIGN KEY ("messageId") REFERENCES "ChatMessage"("id") 
            ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'ChatMessageFeedback_userId_fkey'
    ) THEN
        ALTER TABLE "ChatMessageFeedback"
            ADD CONSTRAINT "ChatMessageFeedback_userId_fkey"
            FOREIGN KEY ("userId") REFERENCES "User"("id") 
            ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
