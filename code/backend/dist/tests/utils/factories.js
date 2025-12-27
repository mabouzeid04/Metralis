"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocument = exports.createWorkOrder = exports.createMachine = exports.createUser = void 0;
const crypto_1 = require("crypto");
const testDb_1 = require("./testDb");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const defaultPassword = "FactoryPass123!";
const hash = (value) => bcryptjs_1.default.hash(value, 8);
const getAnyUserId = async () => {
    const user = await testDb_1.prisma.user.findFirst();
    if (user)
        return user.id;
    const created = await (0, exports.createUser)();
    return created.id;
};
const getAnyMachineId = async () => {
    const machine = await testDb_1.prisma.machine.findFirst();
    if (machine)
        return machine.id;
    const created = await (0, exports.createMachine)();
    return created.id;
};
const createUser = async (overrides) => {
    return testDb_1.prisma.user.create({
        data: {
            name: overrides?.name ?? "Factory User",
            email: overrides?.email ?? `user+${(0, crypto_1.randomUUID)()}@test.com`,
            passwordHash: overrides?.passwordHash ?? (await hash(defaultPassword)),
            role: overrides?.role ?? "TECHNICIAN",
            status: overrides?.status ?? "APPROVED",
            active: overrides?.active ?? true,
            ...overrides,
        },
    });
};
exports.createUser = createUser;
const createMachine = async (overrides) => {
    return testDb_1.prisma.machine.create({
        data: {
            name: overrides?.name ?? `Machine-${(0, crypto_1.randomUUID)().slice(0, 8)}`,
            status: overrides?.status ?? "RUNNING",
            criticality: overrides?.criticality ?? "MEDIUM",
            ...overrides,
        },
    });
};
exports.createMachine = createMachine;
const createWorkOrder = async (overrides) => {
    const machineId = overrides?.machine?.connect?.id ?? (await getAnyMachineId());
    const reporterId = overrides?.reportedBy?.connect?.id ?? (await getAnyUserId());
    return testDb_1.prisma.workOrder.create({
        data: {
            title: overrides?.title ?? "Factory Work Order",
            descriptionRaw: overrides?.descriptionRaw ?? "Test description",
            type: overrides?.type ?? "CORRECTIVE",
            priority: overrides?.priority ?? "MEDIUM",
            machine: overrides?.machine ?? { connect: { id: machineId } },
            reportedBy: overrides?.reportedBy ?? { connect: { id: reporterId } },
            ...overrides,
        },
    });
};
exports.createWorkOrder = createWorkOrder;
const createDocument = async (overrides) => {
    const uploaderId = overrides?.uploadedBy?.connect?.id ?? (await getAnyUserId());
    return testDb_1.prisma.document.create({
        data: {
            title: overrides?.title ?? "Factory Document",
            type: overrides?.type ?? "MANUAL",
            filePath: overrides?.filePath ?? `docs/${(0, crypto_1.randomUUID)()}.txt`,
            language: overrides?.language ?? "en",
            fileSize: overrides?.fileSize ?? 10,
            mimeType: overrides?.mimeType ?? "text/plain",
            uploadedBy: overrides?.uploadedBy ?? { connect: { id: uploaderId } },
            ...overrides,
        },
    });
};
exports.createDocument = createDocument;
//# sourceMappingURL=factories.js.map