import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient, Prisma } from '../src/generated/prisma/client';

const prisma = new PrismaClient();

/**
 * Seed data for Food Basket freeze-drying factory
 * Creates factory config and hierarchical asset structure
 */

async function seedFactoryConfig() {
  console.log('Seeding factory config...');

  const existingConfig = await prisma.factoryConfig.findFirst();
  if (existingConfig) {
    console.log('Factory config already exists, skipping...');
    return existingConfig;
  }

  const config = await prisma.factoryConfig.create({
    data: {
      primaryLanguage: 'en',
      supportedLanguages: ['en', 'ar'],
      hierarchyLevels: JSON.parse(JSON.stringify([
        {
          depth: 0,
          key: 'machine',
          name: 'Machine',
          translations: { ar: 'الماكينة' },
        },
        {
          depth: 1,
          key: 'group',
          name: 'Group',
          translations: { ar: 'المجموعة' },
        },
        {
          depth: 2,
          key: 'component',
          name: 'Component',
          translations: { ar: 'المكون' },
        },
      ])),
      defaultMaxDepth: 3,
      statusReasonOptions: JSON.parse(JSON.stringify({
        RUNNING: [
          { id: 'operational', name: 'Operational', translations: { ar: 'يعمل' } },
          { id: 'standby', name: 'Standby', translations: { ar: 'في وضع الاستعداد' } },
        ],
        DOWN: [
          { id: 'breakdown', name: 'Breakdown', translations: { ar: 'عطل' } },
          { id: 'maintenance', name: 'Scheduled Maintenance', translations: { ar: 'صيانة مجدولة' } },
          { id: 'waiting_parts', name: 'Waiting for Parts', translations: { ar: 'في انتظار قطع الغيار' } },
        ],
      })),
      maintenanceDisciplines: JSON.parse(JSON.stringify([
        { id: 'electrical', name: 'Electrical', translations: { ar: 'كهربى' } },
        { id: 'mechanical', name: 'Mechanical', translations: { ar: 'ميكانيكى' } },
        { id: 'plumbing', name: 'Plumbing', translations: { ar: 'سباكة' } },
        { id: 'refrigeration', name: 'Refrigeration', translations: { ar: 'تبريد' } },
        { id: 'vacuum', name: 'Vacuum', translations: { ar: 'فاكيوم' } },
      ])),
      maintenanceTypes: JSON.parse(JSON.stringify([
        { id: 'corrective', name: 'Corrective', translations: { ar: 'علاجى' } },
        { id: 'preventive', name: 'Preventive', translations: { ar: 'وقائى' } },
        { id: 'inspection', name: 'Inspection', translations: { ar: 'فحص' } },
      ])),
    },
  });

  console.log('Factory config created:', config.id);
  return config;
}

async function seedAssets() {
  console.log('Seeding assets...');

  // Check if assets already exist
  const existingAssets = await prisma.asset.count();
  if (existingAssets > 0) {
    console.log('Assets already exist, skipping...');
    return;
  }

  // Food Basket Freeze-Drying Factory asset structure
  // Based on the spreadsheet provided

  // Machine 1: Freeze Dryer
  const freezeDryer = await createAsset({
    name: 'Freeze Dryer',
    nameTranslations: { ar: 'مجفف التجميد' },
    code: 'FD-01',
    levelType: 'machine',
    depth: 0,
    status: 'RUNNING',
    statusReason: 'operational',
    criticality: 'CRITICAL',
  });

  // Freeze Dryer Groups
  const vacuumSystem = await createAsset({
    name: 'Vacuum System',
    nameTranslations: { ar: 'نظام الفاكيوم' },
    code: 'FD-01-VAC',
    levelType: 'group',
    depth: 1,
    parentId: freezeDryer.id,
  });

  const refrigerationSystem = await createAsset({
    name: 'Refrigeration System',
    nameTranslations: { ar: 'نظام التبريد' },
    code: 'FD-01-REF',
    levelType: 'group',
    depth: 1,
    parentId: freezeDryer.id,
  });

  const heatingSystem = await createAsset({
    name: 'Heating System',
    nameTranslations: { ar: 'نظام التسخين' },
    code: 'FD-01-HEAT',
    levelType: 'group',
    depth: 1,
    parentId: freezeDryer.id,
  });

  const controlSystem = await createAsset({
    name: 'Control System',
    nameTranslations: { ar: 'نظام التحكم' },
    code: 'FD-01-CTRL',
    levelType: 'group',
    depth: 1,
    parentId: freezeDryer.id,
  });

  // Vacuum System Components
  await createAsset({
    name: 'Booster Pump D1G02',
    nameTranslations: { ar: 'طلمبة بوستر D1G02' },
    code: 'D1G02',
    levelType: 'component',
    depth: 2,
    parentId: vacuumSystem.id,
    criticality: 'HIGH',
  });

  await createAsset({
    name: 'Booster Pump D1G01',
    nameTranslations: { ar: 'طلمبة بوستر D1G01' },
    code: 'D1G01',
    levelType: 'component',
    depth: 2,
    parentId: vacuumSystem.id,
    criticality: 'HIGH',
  });

  await createAsset({
    name: 'Rotary Vane Pump',
    nameTranslations: { ar: 'طلمبة دوارة' },
    code: 'RV-01',
    levelType: 'component',
    depth: 2,
    parentId: vacuumSystem.id,
    criticality: 'HIGH',
  });

  await createAsset({
    name: 'Vacuum Valve',
    nameTranslations: { ar: 'صمام الفاكيوم' },
    code: 'VV-01',
    levelType: 'component',
    depth: 2,
    parentId: vacuumSystem.id,
    criticality: 'MEDIUM',
  });

  // Refrigeration System Components
  await createAsset({
    name: 'Compressor Unit',
    nameTranslations: { ar: 'وحدة الضاغط' },
    code: 'COMP-01',
    levelType: 'component',
    depth: 2,
    parentId: refrigerationSystem.id,
    criticality: 'CRITICAL',
  });

  await createAsset({
    name: 'Condenser',
    nameTranslations: { ar: 'المكثف' },
    code: 'COND-01',
    levelType: 'component',
    depth: 2,
    parentId: refrigerationSystem.id,
    criticality: 'HIGH',
  });

  await createAsset({
    name: 'Evaporator',
    nameTranslations: { ar: 'المبخر' },
    code: 'EVAP-01',
    levelType: 'component',
    depth: 2,
    parentId: refrigerationSystem.id,
    criticality: 'HIGH',
  });

  await createAsset({
    name: 'Cold Trap',
    nameTranslations: { ar: 'مصيدة البرودة' },
    code: 'CT-01',
    levelType: 'component',
    depth: 2,
    parentId: refrigerationSystem.id,
    criticality: 'HIGH',
  });

  // Heating System Components
  await createAsset({
    name: 'Heating Plates',
    nameTranslations: { ar: 'لوحات التسخين' },
    code: 'HP-01',
    levelType: 'component',
    depth: 2,
    parentId: heatingSystem.id,
    criticality: 'HIGH',
  });

  await createAsset({
    name: 'Heat Exchanger',
    nameTranslations: { ar: 'مبادل حراري' },
    code: 'HX-01',
    levelType: 'component',
    depth: 2,
    parentId: heatingSystem.id,
    criticality: 'MEDIUM',
  });

  await createAsset({
    name: 'Silicone Oil Pump',
    nameTranslations: { ar: 'طلمبة زيت السيليكون' },
    code: 'SOP-01',
    levelType: 'component',
    depth: 2,
    parentId: heatingSystem.id,
    criticality: 'MEDIUM',
  });

  // Control System Components
  await createAsset({
    name: 'PLC Controller',
    nameTranslations: { ar: 'وحدة تحكم PLC' },
    code: 'PLC-01',
    levelType: 'component',
    depth: 2,
    parentId: controlSystem.id,
    criticality: 'CRITICAL',
  });

  await createAsset({
    name: 'HMI Panel',
    nameTranslations: { ar: 'لوحة HMI' },
    code: 'HMI-01',
    levelType: 'component',
    depth: 2,
    parentId: controlSystem.id,
    criticality: 'HIGH',
  });

  await createAsset({
    name: 'Temperature Sensors',
    nameTranslations: { ar: 'حساسات الحرارة' },
    code: 'TS-01',
    levelType: 'component',
    depth: 2,
    parentId: controlSystem.id,
    criticality: 'MEDIUM',
  });

  await createAsset({
    name: 'Pressure Sensors',
    nameTranslations: { ar: 'حساسات الضغط' },
    code: 'PS-01',
    levelType: 'component',
    depth: 2,
    parentId: controlSystem.id,
    criticality: 'MEDIUM',
  });

  console.log('Assets created successfully');
}

interface CreateAssetInput {
  name: string;
  nameTranslations: Record<string, string>;
  code: string;
  levelType: string;
  depth: number;
  parentId?: string;
  status?: 'RUNNING' | 'DOWN';
  statusReason?: string;
  criticality?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

async function createAsset(input: CreateAssetInput) {
  // Build path string
  let pathString = input.name;
  let pathStringTranslations: Record<string, string> = {};

  if (input.parentId) {
    const ancestors = await getAncestors(input.parentId);
    const ancestorNames = ancestors.map((a) => a.name);
    pathString = [...ancestorNames, input.name].join(' / ');

    // Build Arabic path
    const ancestorNamesAr = ancestors.map((a) => {
      const trans = a.nameTranslations as Record<string, string> | null;
      return trans?.ar || a.name;
    });
    pathStringTranslations.ar = [...ancestorNamesAr, input.nameTranslations.ar || input.name].join(' / ');
  } else {
    pathStringTranslations.ar = input.nameTranslations.ar || input.name;
  }

  return prisma.asset.create({
    data: {
      name: input.name,
      nameTranslations: input.nameTranslations,
      code: input.code,
      levelType: input.levelType,
      depth: input.depth,
      parentId: input.parentId || null,
      pathString,
      pathStringTranslations,
      status: input.status || null,
      statusReason: input.statusReason || null,
      criticality: input.criticality || null,
    },
  });
}

async function getAncestors(assetId: string) {
  const ancestors: Array<{ id: string; name: string; nameTranslations: Prisma.JsonValue }> = [];
  let currentId: string | null = assetId;

  while (currentId) {
    const asset = await prisma.asset.findUnique({
      where: { id: currentId },
      select: { id: true, name: true, nameTranslations: true, parentId: true },
    });

    if (!asset) break;

    if (asset.parentId) {
      const parent = await prisma.asset.findUnique({
        where: { id: asset.parentId },
        select: { id: true, name: true, nameTranslations: true, parentId: true },
      });
      if (parent) {
        ancestors.push(parent);
        currentId = parent.parentId;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  return ancestors.reverse();
}

async function main() {
  console.log('Starting seed...');

  await seedFactoryConfig();
  await seedAssets();

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
