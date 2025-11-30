-- Add phone number and WhatsApp notification opt-in for users
ALTER TABLE "User"
ADD COLUMN "phoneNumber" TEXT,
ADD COLUMN "assignmentWhatsappOptIn" BOOLEAN NOT NULL DEFAULT FALSE;

