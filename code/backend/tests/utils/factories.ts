import { randomUUID } from "crypto";
import type { Prisma } from "../../src/generated/prisma/client";
import { prisma } from "./testDb";
import bcrypt from "bcryptjs";

const defaultPassword = "FactoryPass123!";

const hash = (value: string) => bcrypt.hash(value, 8);

const getAnyUserId = async () => {
  const user = await prisma.user.findFirst();
  if (user) return user.id;
  const created = await createUser();
  return created.id;
};

const getAnyMachineId = async () => {
  const machine = await prisma.machine.findFirst();
  if (machine) return machine.id;
  const created = await createMachine();
  return created.id;
};

export const createUser = async (overrides?: Partial<Prisma.UserCreateInput>) => {
  return prisma.user.create({
    data: {
      name: overrides?.name ?? "Factory User",
      email: overrides?.email ?? `user+${randomUUID()}@test.com`,
      passwordHash: overrides?.passwordHash ?? (await hash(defaultPassword)),
      role: overrides?.role ?? "TECHNICIAN",
      status: overrides?.status ?? "APPROVED",
      active: overrides?.active ?? true,
      ...overrides,
    },
  });
};

export const createMachine = async (overrides?: Partial<Prisma.MachineCreateInput>) => {
  return prisma.machine.create({
    data: {
      name: overrides?.name ?? `Machine-${randomUUID().slice(0, 8)}`,
      status: overrides?.status ?? "RUNNING",
      criticality: overrides?.criticality ?? "MEDIUM",
      ...overrides,
    },
  });
};

export const createWorkOrder = async (overrides?: Partial<Prisma.WorkOrderCreateInput>) => {
  const machineId = overrides?.machine?.connect?.id ?? (await getAnyMachineId());
  const reporterId = overrides?.reportedBy?.connect?.id ?? (await getAnyUserId());

  return prisma.workOrder.create({
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

export const createDocument = async (overrides?: Partial<Prisma.DocumentCreateInput>) => {
  const uploaderId = overrides?.uploadedBy?.connect?.id ?? (await getAnyUserId());

  return prisma.document.create({
    data: {
      title: overrides?.title ?? "Factory Document",
      type: overrides?.type ?? "MANUAL",
      filePath: overrides?.filePath ?? `docs/${randomUUID()}.txt`,
      language: overrides?.language ?? "en",
      fileSize: overrides?.fileSize ?? 10,
      mimeType: overrides?.mimeType ?? "text/plain",
      uploadedBy: overrides?.uploadedBy ?? { connect: { id: uploaderId } },
      ...overrides,
    },
  });
};
