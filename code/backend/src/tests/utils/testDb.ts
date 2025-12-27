import { execSync } from "child_process";
import bcrypt from "bcryptjs";
import {
  MachineCriticality,
  MachineStatus,
  PrismaClient,
  UserRole,
  UserStatus,
} from "../../generated/prisma/client";

export const prisma = new PrismaClient();

const TABLES = [
  "SystemInsight",
  "IncidentChunk",
  "ChatMessageFeedback",
  "ChatMessage",
  "ChatConversation",
  "DocumentChunk",
  "Document",
  "RepairAction",
  "WorkOrderPart",
  "WorkOrder",
  "Part",
  "Machine",
  "User",
];

let hasMigrated = false;

export const ensureDatabase = async () => {
  if (hasMigrated) return;

  execSync("npx prisma migrate deploy", {
    stdio: "inherit",
    env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL },
  });

  hasMigrated = true;
};

export const resetDatabase = async () => {
  const joined = TABLES.map((name) => `"${name}"`).join(", ");
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${joined} RESTART IDENTITY CASCADE`);
};

export const seedBaseData = async () => {
  const adminPasswordHash = await bcrypt.hash("Admin123!", 8);
  const technicianPasswordHash = await bcrypt.hash("Tech123!", 8);

  const admin = await prisma.user.create({
    data: {
      id: "user-admin-test",
      email: "admin@test.com",
      name: "Test Admin",
      role: UserRole.ADMIN,
      status: UserStatus.APPROVED,
      active: true,
      passwordHash: adminPasswordHash,
    },
  });

  const technician = await prisma.user.create({
    data: {
      id: "user-tech-test",
      email: "tech@test.com",
      name: "Test Technician",
      role: UserRole.TECHNICIAN,
      status: UserStatus.APPROVED,
      active: true,
      passwordHash: technicianPasswordHash,
      approvedById: admin.id,
    },
  });

  const machine = await prisma.machine.create({
    data: {
      id: "machine-test-1",
      name: "Test Machine",
      status: MachineStatus.RUNNING,
      criticality: MachineCriticality.MEDIUM,
    },
  });

  return { admin, technician, machine };
};
