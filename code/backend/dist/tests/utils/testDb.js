"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedBaseData = exports.resetDatabase = exports.ensureDatabase = exports.prisma = void 0;
const child_process_1 = require("child_process");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("../../generated/prisma/client");
exports.prisma = new client_1.PrismaClient();
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
const ensureDatabase = async () => {
    if (hasMigrated)
        return;
    (0, child_process_1.execSync)("npx prisma migrate deploy", {
        stdio: "inherit",
        env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL },
    });
    hasMigrated = true;
};
exports.ensureDatabase = ensureDatabase;
const resetDatabase = async () => {
    const joined = TABLES.map((name) => `"${name}"`).join(", ");
    await exports.prisma.$executeRawUnsafe(`TRUNCATE TABLE ${joined} RESTART IDENTITY CASCADE`);
};
exports.resetDatabase = resetDatabase;
const seedBaseData = async () => {
    const adminPasswordHash = await bcryptjs_1.default.hash("Admin123!", 8);
    const technicianPasswordHash = await bcryptjs_1.default.hash("Tech123!", 8);
    const admin = await exports.prisma.user.create({
        data: {
            id: "user-admin-test",
            email: "admin@test.com",
            name: "Test Admin",
            role: client_1.UserRole.ADMIN,
            status: client_1.UserStatus.APPROVED,
            active: true,
            passwordHash: adminPasswordHash,
        },
    });
    const technician = await exports.prisma.user.create({
        data: {
            id: "user-tech-test",
            email: "tech@test.com",
            name: "Test Technician",
            role: client_1.UserRole.TECHNICIAN,
            status: client_1.UserStatus.APPROVED,
            active: true,
            passwordHash: technicianPasswordHash,
            approvedById: admin.id,
        },
    });
    const machine = await exports.prisma.machine.create({
        data: {
            id: "machine-test-1",
            name: "Test Machine",
            status: client_1.MachineStatus.RUNNING,
            criticality: client_1.MachineCriticality.MEDIUM,
        },
    });
    return { admin, technician, machine };
};
exports.seedBaseData = seedBaseData;
//# sourceMappingURL=testDb.js.map