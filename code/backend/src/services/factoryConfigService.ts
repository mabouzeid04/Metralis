import { prisma } from '../lib/prisma';
import { Prisma } from '../generated/prisma/client';
import type { FactoryConfig } from '../generated/prisma/client';

/**
 * Factory Config Service
 * Manages factory-wide configuration including hierarchy levels,
 * supported languages, status reasons, and maintenance types.
 */

// Type definitions for factory config JSON fields
export interface HierarchyLevel {
  depth: number;
  key: string;
  name: string;
  translations?: Record<string, string> | undefined;
}

export interface StatusReason {
  id: string;
  name: string;
  translations?: Record<string, string> | undefined;
}

export interface StatusReasonOptions {
  RUNNING: StatusReason[];
  DOWN: StatusReason[];
}

export interface MaintenanceDiscipline {
  id: string;
  name: string;
  translations?: Record<string, string> | undefined;
}

export interface MaintenanceType {
  id: string;
  name: string;
  translations?: Record<string, string> | undefined;
}

export interface FactoryConfigWithTypes extends Omit<FactoryConfig, 'hierarchyLevels' | 'statusReasonOptions' | 'maintenanceDisciplines' | 'maintenanceTypes'> {
  hierarchyLevels: HierarchyLevel[];
  statusReasonOptions: StatusReasonOptions;
  maintenanceDisciplines: MaintenanceDiscipline[];
  maintenanceTypes: MaintenanceType[];
}

// Input type for creating/updating factory config
export interface FactoryConfigInput {
  primaryLanguage?: string | undefined;
  supportedLanguages?: string[] | undefined;
  hierarchyLevels?: HierarchyLevel[] | undefined;
  defaultMaxDepth?: number | undefined;
  statusReasonOptions?: StatusReasonOptions | undefined;
  maintenanceDisciplines?: MaintenanceDiscipline[] | undefined;
  maintenanceTypes?: MaintenanceType[] | undefined;
}

/**
 * Get the factory configuration (assumes single config per deployment)
 */
export async function getFactoryConfig(): Promise<FactoryConfigWithTypes | null> {
  const config = await prisma.factoryConfig.findFirst();
  return config as unknown as FactoryConfigWithTypes | null;
}

/**
 * Get or create factory configuration with defaults
 */
export async function getOrCreateFactoryConfig(): Promise<FactoryConfigWithTypes> {
  const existing = await getFactoryConfig();
  if (existing) {
    return existing;
  }

  // Create with defaults
  return createFactoryConfig({
    primaryLanguage: 'en',
    supportedLanguages: ['en'],
    hierarchyLevels: [
      { depth: 0, key: 'machine', name: 'Machine' },
      { depth: 1, key: 'group', name: 'Group' },
      { depth: 2, key: 'component', name: 'Component' },
    ],
    defaultMaxDepth: 3,
    statusReasonOptions: {
      RUNNING: [
        { id: 'operational', name: 'Operational' },
        { id: 'standby', name: 'Standby' },
      ],
      DOWN: [
        { id: 'breakdown', name: 'Breakdown' },
        { id: 'maintenance', name: 'Scheduled Maintenance' },
        { id: 'waiting_parts', name: 'Waiting for Parts' },
      ],
    },
    maintenanceDisciplines: [
      { id: 'electrical', name: 'Electrical' },
      { id: 'mechanical', name: 'Mechanical' },
      { id: 'plumbing', name: 'Plumbing' },
      { id: 'refrigeration', name: 'Refrigeration' },
    ],
    maintenanceTypes: [
      { id: 'corrective', name: 'Corrective' },
      { id: 'preventive', name: 'Preventive' },
      { id: 'inspection', name: 'Inspection' },
    ],
  });
}

/**
 * Create factory configuration
 */
export async function createFactoryConfig(
  input: FactoryConfigInput
): Promise<FactoryConfigWithTypes> {
  const config = await prisma.factoryConfig.create({
    data: {
      primaryLanguage: input.primaryLanguage || 'en',
      supportedLanguages: input.supportedLanguages || ['en'],
      hierarchyLevels: JSON.parse(JSON.stringify(input.hierarchyLevels || [])),
      defaultMaxDepth: input.defaultMaxDepth || 3,
      statusReasonOptions: JSON.parse(JSON.stringify(input.statusReasonOptions || { RUNNING: [], DOWN: [] })),
      maintenanceDisciplines: JSON.parse(JSON.stringify(input.maintenanceDisciplines || [])),
      maintenanceTypes: JSON.parse(JSON.stringify(input.maintenanceTypes || [])),
    },
  });

  return config as unknown as FactoryConfigWithTypes;
}

/**
 * Update factory configuration
 */
export async function updateFactoryConfig(
  configId: string,
  input: FactoryConfigInput
): Promise<FactoryConfigWithTypes> {
  const data: Prisma.FactoryConfigUpdateInput = {};

  if (input.primaryLanguage !== undefined) {
    data.primaryLanguage = input.primaryLanguage;
  }
  if (input.supportedLanguages !== undefined) {
    data.supportedLanguages = input.supportedLanguages;
  }
  if (input.hierarchyLevels !== undefined) {
    data.hierarchyLevels = JSON.parse(JSON.stringify(input.hierarchyLevels));
  }
  if (input.defaultMaxDepth !== undefined) {
    data.defaultMaxDepth = input.defaultMaxDepth;
  }
  if (input.statusReasonOptions !== undefined) {
    data.statusReasonOptions = JSON.parse(JSON.stringify(input.statusReasonOptions));
  }
  if (input.maintenanceDisciplines !== undefined) {
    data.maintenanceDisciplines = JSON.parse(JSON.stringify(input.maintenanceDisciplines));
  }
  if (input.maintenanceTypes !== undefined) {
    data.maintenanceTypes = JSON.parse(JSON.stringify(input.maintenanceTypes));
  }

  const config = await prisma.factoryConfig.update({
    where: { id: configId },
    data,
  });

  return config as unknown as FactoryConfigWithTypes;
}

/**
 * Get hierarchy level by depth
 */
export function getHierarchyLevelByDepth(
  config: FactoryConfigWithTypes,
  depth: number
): HierarchyLevel | undefined {
  return config.hierarchyLevels.find((level) => level.depth === depth);
}

/**
 * Get hierarchy level by key
 */
export function getHierarchyLevelByKey(
  config: FactoryConfigWithTypes,
  key: string
): HierarchyLevel | undefined {
  return config.hierarchyLevels.find((level) => level.key === key);
}

/**
 * Get translated hierarchy level name
 */
export function getTranslatedLevelName(
  level: HierarchyLevel,
  language: string,
  primaryLanguage: string
): string {
  if (language === primaryLanguage) {
    return level.name;
  }
  return level.translations?.[language] || level.name;
}

/**
 * Get status reasons for a given status
 */
export function getStatusReasons(
  config: FactoryConfigWithTypes,
  status: 'RUNNING' | 'DOWN'
): StatusReason[] {
  return config.statusReasonOptions[status] || [];
}

/**
 * Get translated status reason name
 */
export function getTranslatedStatusReason(
  reason: StatusReason,
  language: string,
  primaryLanguage: string
): string {
  if (language === primaryLanguage) {
    return reason.name;
  }
  return reason.translations?.[language] || reason.name;
}

/**
 * Get translated maintenance discipline name
 */
export function getTranslatedDiscipline(
  discipline: MaintenanceDiscipline,
  language: string,
  primaryLanguage: string
): string {
  if (language === primaryLanguage) {
    return discipline.name;
  }
  return discipline.translations?.[language] || discipline.name;
}

/**
 * Get translated maintenance type name
 */
export function getTranslatedMaintenanceType(
  type: MaintenanceType,
  language: string,
  primaryLanguage: string
): string {
  if (language === primaryLanguage) {
    return type.name;
  }
  return type.translations?.[language] || type.name;
}

/**
 * Check if a language is supported
 */
export function isLanguageSupported(
  config: FactoryConfigWithTypes,
  language: string
): boolean {
  return config.supportedLanguages.includes(language);
}

/**
 * Get all supported languages
 */
export function getSupportedLanguages(
  config: FactoryConfigWithTypes
): string[] {
  return config.supportedLanguages;
}
