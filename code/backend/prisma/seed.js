const bcrypt = require('bcryptjs')
let PrismaClient
let Prisma

try {
  ;({ PrismaClient, Prisma } = require('../dist/generated/prisma/client'))
} catch (_error) {
  ;({ PrismaClient, Prisma } = require('@prisma/client'))
}

const prisma = new PrismaClient()

const adminId = 'user-admin-0001'
const techAId = 'user-tech-0001'
const techBId = 'user-tech-0002'
const machineId = 'machine-robot-a1'
const workOrderId = 'workorder-robot-calibration-001'
const workOrderPartId = 'workorderpart-001'
const repairActionId = 'repair-action-robot-001'
const documentId = 'document-robot-manual'
const conversationId = 'chat-convo-robot-a1'

const hashPassword = (plain) => bcrypt.hashSync(plain, 10)

async function main() {
  const admin = await prisma.user.upsert({
    where: { id: adminId },
    update: {
      name: 'System Admin',
      email: 'admin@metralis.com',
      role: 'ADMIN',
      status: 'APPROVED',
      active: true,
      passwordHash: hashPassword('Admin123!'),
      approvedAt: new Date(),
    },
    create: {
      id: adminId,
      email: 'admin@metralis.com',
      passwordHash: hashPassword('Admin123!'),
      name: 'System Admin',
      role: 'ADMIN',
      status: 'APPROVED',
      active: true,
      approvedAt: new Date(),
    },
  })

  const technicianA = await prisma.user.upsert({
    where: { id: techAId },
    update: {
      name: 'River Chen',
      email: 'river@metralis.com',
      role: 'TECHNICIAN',
      status: 'APPROVED',
      active: true,
      passwordHash: hashPassword('Tech123!'),
      approvedAt: new Date(),
      approvedById: admin.id,
    },
    create: {
      id: techAId,
      name: 'River Chen',
      email: 'river@metralis.com',
      passwordHash: hashPassword('Tech123!'),
      role: 'TECHNICIAN',
      status: 'APPROVED',
      active: true,
      approvedAt: new Date(),
      approvedById: adminId,
    },
  })

  const technicianB = await prisma.user.upsert({
    where: { id: techBId },
    update: {
      name: 'Sasha Patel',
      email: 'sasha@metralis.com',
      role: 'TECHNICIAN',
      status: 'APPROVED',
      active: true,
      passwordHash: hashPassword('Tech123!'),
      approvedAt: new Date(),
      approvedById: admin.id,
    },
    create: {
      id: techBId,
      name: 'Sasha Patel',
      email: 'sasha@metralis.com',
      passwordHash: hashPassword('Tech123!'),
      role: 'TECHNICIAN',
      status: 'APPROVED',
      active: true,
      approvedAt: new Date(),
      approvedById: adminId,
    },
  })

  const machine = await prisma.machine.upsert({
    where: { id: machineId },
    update: {
      name: 'Assembly Robot A1',
      category: 'Robotics',
      line: 'Production Line 3',
      area: 'Staging',
      manufacturer: 'Nova Robotics',
      model: 'AR-8200',
      status: 'MAINTENANCE',
      criticality: 'HIGH',
      metadata: {
        shift: 'Night',
        lastCalibration: new Date().toISOString(),
      },
    },
    create: {
      id: machineId,
      name: 'Assembly Robot A1',
      category: 'Robotics',
      line: 'Production Line 3',
      area: 'Staging',
      manufacturer: 'Nova Robotics',
      model: 'AR-8200',
      serialNumber: 'AR-8200-4567',
      status: 'MAINTENANCE',
      criticality: 'HIGH',
      metadata: {
        shift: 'Night',
        lastCalibration: new Date().toISOString(),
      },
    },
  })

  const parts = [
    {
      id: 'part-bearing-6203',
      name: 'Bearing 6203',
      category: 'Bearings',
      manufacturer: 'SKF',
      cost: new Prisma.Decimal('12.50'),
      stockQty: 48,
      minStock: 12,
      location: 'Warehouse 1 · Bin 4',
      description: 'Deep groove ball bearing used in robot joints.',
    },
    {
      id: 'part-seal-6401',
      name: 'Hydraulic Seal 6401',
      category: 'Seals',
      manufacturer: 'Parker',
      cost: new Prisma.Decimal('7.20'),
      stockQty: 72,
      minStock: 20,
      location: 'Warehouse 1 · Bin 6',
      description: 'High-temp seal for hydraulic cylinder.',
    },
  ]

  for (const partData of parts) {
    await prisma.part.upsert({
      where: { id: partData.id },
      update: {
        ...partData,
        updatedAt: new Date(),
      },
      create: partData,
    })
  }

  const workOrder = await prisma.workOrder.upsert({
    where: { id: workOrderId },
    update: {
      title: 'Calibrate Assembly Robot A1',
      descriptionRaw: 'Robot arms report drift on the second axis during the last calibration cycle.',
      status: 'IN_PROGRESS',
      type: 'PREVENTIVE',
      priority: 'HIGH',
      machineId: machine.id,
      reportedById: admin.id,
      assignedToId: technicianA.id,
      startedAt: new Date(),
      symptoms: {
        drift: 'Axis 2 rotated -0.4° after 6 hours',
        vibration: 'Spikes near bearing assemblies',
      },
      suspectedCause: 'Worn bearing and seal',
      metadata: {
        shift: 'Night',
        tools: ['caliper', 'torque wrench'],
      },
    },
    create: {
      id: workOrderId,
      title: 'Calibrate Assembly Robot A1',
      descriptionRaw: 'Robot arms report drift on the second axis during the last calibration cycle.',
      status: 'IN_PROGRESS',
      type: 'PREVENTIVE',
      priority: 'HIGH',
      machineId: machine.id,
      reportedById: admin.id,
      assignedToId: technicianA.id,
      startedAt: new Date(),
      symptoms: {
        drift: 'Axis 2 rotated -0.4° after 6 hours',
        vibration: 'Spikes near bearing assemblies',
      },
      suspectedCause: 'Worn bearing and seal',
      metadata: {
        shift: 'Night',
        tools: ['caliper', 'torque wrench'],
      },
    },
  })

  await prisma.workOrderPart.upsert({
    where: { id: workOrderPartId },
    update: {
      quantity: 2,
      partId: 'part-bearing-6203',
      workOrderId: workOrder.id,
    },
    create: {
      id: workOrderPartId,
      workOrderId: workOrder.id,
      partId: 'part-bearing-6203',
      quantity: 2,
    },
  })

  await prisma.repairAction.upsert({
    where: { id: repairActionId },
    update: {
      workOrderId: workOrder.id,
      performedById: technicianA.id,
      actions: 'Replaced worn bearing, re-tightened axis bolts, recalibrated sensors.',
      success: true,
      verification: 'Test cycle passed with ±0.03° drift',
      partsUsed: { bearings: ['part-bearing-6203'] },
    },
    create: {
      id: repairActionId,
      workOrderId: workOrder.id,
      performedById: technicianA.id,
      actions: 'Replaced worn bearing, re-tightened axis bolts, recalibrated sensors.',
      success: true,
      verification: 'Test cycle passed with ±0.03° drift',
      partsUsed: { bearings: ['part-bearing-6203'] },
    },
  })

  await prisma.document.upsert({
    where: { id: documentId },
    update: {
      title: 'Assembly Robot A1 - Operation Manual',
      filePath: 'docs/robot-a1-ops.pdf',
      type: 'MANUAL',
      machineId: machine.id,
      uploadedById: admin.id,
      ingestionStatus: 'COMPLETE',
      ingestedAt: new Date(),
      metadata: { version: 'v1.4', language: 'en' },
    },
    create: {
      id: documentId,
      title: 'Assembly Robot A1 - Operation Manual',
      filePath: 'docs/robot-a1-ops.pdf',
      type: 'MANUAL',
      machineId: machine.id,
      uploadedById: admin.id,
      ingestionStatus: 'COMPLETE',
      ingestedAt: new Date(),
      metadata: { version: 'v1.4', language: 'en' },
    },
  })

  const conversation = await prisma.chatConversation.upsert({
    where: { id: conversationId },
    update: {
      userId: technicianA.id,
      machineId: machine.id,
      title: 'Robot A1 calibration follow-up',
      summary: 'Technician discussed drift and bearing wear with AI assistant.',
      lastMessageAt: new Date(),
    },
    create: {
      id: conversationId,
      userId: technicianA.id,
      machineId: machine.id,
      title: 'Robot A1 calibration follow-up',
      summary: 'Technician discussed drift and bearing wear with AI assistant.',
      lastMessageAt: new Date(),
    },
  })

  await prisma.chatMessage.upsert({
    where: { id: `${conversationId}-message-1` },
    update: {
      conversationId: conversation.id,
      role: 'USER',
      content: 'AI, what adjustments should I make after replacing the bearing?',
    },
    create: {
      id: `${conversationId}-message-1`,
      conversationId: conversation.id,
      role: 'USER',
      content: 'AI, what adjustments should I make after replacing the bearing?',
    },
  })

  await prisma.chatMessage.upsert({
    where: { id: `${conversationId}-message-2` },
    update: {
      conversationId: conversation.id,
      role: 'ASSISTANT',
      content: 'Verify torque is within ±2 Nm and run a 3-cycle test. Document the drift.',
    },
    create: {
      id: `${conversationId}-message-2`,
      conversationId: conversation.id,
      role: 'ASSISTANT',
      content: 'Verify torque is within ±2 Nm and run a 3-cycle test. Document the drift.',
    },
  })

  console.log('✅ Supabase mock data inserted/updated.')
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

