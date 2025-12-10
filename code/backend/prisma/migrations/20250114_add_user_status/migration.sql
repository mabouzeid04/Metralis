-- Postgres does not support dropping enum values directly.
-- Keep existing values as-is and skip removal of MANAGER if present.
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM pg_enum e
        JOIN pg_type t ON e.enumtypid = t.oid
        WHERE t.typname = 'UserRole' AND e.enumlabel = 'MANAGER'
    ) THEN
        RAISE NOTICE 'UserRole value MANAGER present; not removed (unsupported).';
    END IF;
END
$$;

-- CreateEnum
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'UserStatus') THEN
        CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
    END IF;
END
$$;

-- AlterTable
ALTER TABLE "User"
    ADD COLUMN IF NOT EXISTS "status" "UserStatus" NOT NULL DEFAULT 'APPROVED',
    ADD COLUMN IF NOT EXISTS "approvedById" TEXT,
    ADD COLUMN IF NOT EXISTS "approvedAt" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "rejectedAt" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "rejectionReason" TEXT;

-- Foreign Key Constraint
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'User_approvedById_fkey'
    ) THEN
        ALTER TABLE "User"
            ADD CONSTRAINT "User_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END
$$;
