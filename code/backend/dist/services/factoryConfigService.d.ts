import type { FactoryConfig } from '../generated/prisma/client';
/**
 * Factory Config Service
 * Manages factory-wide configuration including hierarchy levels,
 * supported languages, status reasons, and maintenance types.
 */
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
export declare function getFactoryConfig(): Promise<FactoryConfigWithTypes | null>;
/**
 * Get or create factory configuration with defaults
 */
export declare function getOrCreateFactoryConfig(): Promise<FactoryConfigWithTypes>;
/**
 * Create factory configuration
 */
export declare function createFactoryConfig(input: FactoryConfigInput): Promise<FactoryConfigWithTypes>;
/**
 * Update factory configuration
 */
export declare function updateFactoryConfig(configId: string, input: FactoryConfigInput): Promise<FactoryConfigWithTypes>;
/**
 * Get hierarchy level by depth
 */
export declare function getHierarchyLevelByDepth(config: FactoryConfigWithTypes, depth: number): HierarchyLevel | undefined;
/**
 * Get hierarchy level by key
 */
export declare function getHierarchyLevelByKey(config: FactoryConfigWithTypes, key: string): HierarchyLevel | undefined;
/**
 * Get translated hierarchy level name
 */
export declare function getTranslatedLevelName(level: HierarchyLevel, language: string, primaryLanguage: string): string;
/**
 * Get status reasons for a given status
 */
export declare function getStatusReasons(config: FactoryConfigWithTypes, status: 'RUNNING' | 'DOWN'): StatusReason[];
/**
 * Get translated status reason name
 */
export declare function getTranslatedStatusReason(reason: StatusReason, language: string, primaryLanguage: string): string;
/**
 * Get translated maintenance discipline name
 */
export declare function getTranslatedDiscipline(discipline: MaintenanceDiscipline, language: string, primaryLanguage: string): string;
/**
 * Get translated maintenance type name
 */
export declare function getTranslatedMaintenanceType(type: MaintenanceType, language: string, primaryLanguage: string): string;
/**
 * Check if a language is supported
 */
export declare function isLanguageSupported(config: FactoryConfigWithTypes, language: string): boolean;
/**
 * Get all supported languages
 */
export declare function getSupportedLanguages(config: FactoryConfigWithTypes): string[];
//# sourceMappingURL=factoryConfigService.d.ts.map