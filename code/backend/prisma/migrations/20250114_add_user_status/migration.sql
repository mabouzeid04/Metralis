-- AlterEnum
ALTER TYPE "UserRole" DROP VALUE IF EXISTS 'MANAGER';

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
ALTER TABLE "User"
    ADD CONSTRAINT IF NOT EXISTS "User_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
