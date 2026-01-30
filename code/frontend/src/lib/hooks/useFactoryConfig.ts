import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

export interface HierarchyLevel {
  depth: number
  key: string
  name: string
  translations?: Record<string, string>
}

export interface StatusReason {
  id: string
  name: string
  translations?: Record<string, string>
}

export interface StatusReasonOptions {
  RUNNING: StatusReason[]
  DOWN: StatusReason[]
}

export interface MaintenanceDiscipline {
  id: string
  name: string
  translations?: Record<string, string>
}

export interface MaintenanceType {
  id: string
  name: string
  translations?: Record<string, string>
}

export interface FactoryConfig {
  id: string
  primaryLanguage: string
  supportedLanguages: string[]
  hierarchyLevels: HierarchyLevel[]
  defaultMaxDepth: number
  statusReasonOptions: StatusReasonOptions
  maintenanceDisciplines: MaintenanceDiscipline[]
  maintenanceTypes: MaintenanceType[]
  createdAt: string
  updatedAt: string
}

export interface UpdateFactoryConfigInput {
  primaryLanguage?: string
  supportedLanguages?: string[]
  hierarchyLevels?: HierarchyLevel[]
  defaultMaxDepth?: number
  statusReasonOptions?: StatusReasonOptions
  maintenanceDisciplines?: MaintenanceDiscipline[]
  maintenanceTypes?: MaintenanceType[]
}

interface FactoryConfigResponse {
  data: FactoryConfig
}

async function fetchFactoryConfig(): Promise<FactoryConfigResponse> {
  const response = await api.get('/factory-config')
  return response.data
}

async function updateFactoryConfig(
  input: UpdateFactoryConfigInput
): Promise<FactoryConfigResponse> {
  const response = await api.put('/factory-config', input)
  return response.data
}

export function useFactoryConfig() {
  return useQuery({
    queryKey: ['factory-config'],
    queryFn: fetchFactoryConfig,
    staleTime: 1000 * 60 * 30, // 30 minutes - config changes rarely
  })
}

export function useUpdateFactoryConfig() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateFactoryConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['factory-config'] })
    },
  })
}

// Helper functions

export function getTranslatedHierarchyLevelName(
  level: HierarchyLevel,
  language: string,
  primaryLanguage = 'en'
): string {
  if (language === primaryLanguage) {
    return level.name
  }
  return level.translations?.[language] || level.name
}

export function getTranslatedStatusReason(
  reason: StatusReason,
  language: string,
  primaryLanguage = 'en'
): string {
  if (language === primaryLanguage) {
    return reason.name
  }
  return reason.translations?.[language] || reason.name
}

export function getTranslatedDiscipline(
  discipline: MaintenanceDiscipline,
  language: string,
  primaryLanguage = 'en'
): string {
  if (language === primaryLanguage) {
    return discipline.name
  }
  return discipline.translations?.[language] || discipline.name
}

export function getTranslatedMaintenanceType(
  type: MaintenanceType,
  language: string,
  primaryLanguage = 'en'
): string {
  if (language === primaryLanguage) {
    return type.name
  }
  return type.translations?.[language] || type.name
}

export function getHierarchyLevelByDepth(
  config: FactoryConfig,
  depth: number
): HierarchyLevel | undefined {
  return config.hierarchyLevels.find((level) => level.depth === depth)
}

export function getHierarchyLevelByKey(
  config: FactoryConfig,
  key: string
): HierarchyLevel | undefined {
  return config.hierarchyLevels.find((level) => level.key === key)
}

export function getStatusReasons(
  config: FactoryConfig,
  status: 'RUNNING' | 'DOWN'
): StatusReason[] {
  return config.statusReasonOptions[status] || []
}
