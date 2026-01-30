import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

export interface Asset {
  id: string
  name: string
  nameTranslations: Record<string, string> | null
  code: string | null
  levelType: string
  depth: number
  parentId: string | null
  pathString: string
  pathStringTranslations: Record<string, string> | null
  status: 'RUNNING' | 'DOWN' | null
  statusReason: string | null
  criticality: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | null
  attributes: Record<string, unknown> | null
  commissionedAt: string | null
  hasChildren?: boolean
  createdAt: string
  updatedAt: string
}

export interface AssetWithDetails extends Asset {
  parent?: { id: string; name: string; pathString: string } | null
  children?: Asset[]
  documents?: Array<{
    id: string
    document: {
      id: string
      title: string
      type: string
      mimeType: string | null
    }
    isPrimary: boolean
  }>
}

export interface CreateAssetInput {
  name: string
  nameTranslations?: Record<string, string>
  code?: string
  levelType: string
  parentId?: string
  status?: 'RUNNING' | 'DOWN'
  statusReason?: string
  criticality?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  attributes?: Record<string, unknown>
  commissionedAt?: string
}

export interface UpdateAssetInput {
  name?: string
  nameTranslations?: Record<string, string>
  code?: string
  status?: 'RUNNING' | 'DOWN'
  statusReason?: string
  criticality?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  attributes?: Record<string, unknown>
  commissionedAt?: string
}

export interface AssetFilters {
  parentId?: string | null
  levelType?: string
  status?: 'RUNNING' | 'DOWN'
  search?: string
}

interface AssetsResponse {
  data: Asset[]
}

interface AssetResponse {
  data: AssetWithDetails
}

async function fetchAssets(filters: AssetFilters = {}): Promise<AssetsResponse> {
  const params: Record<string, string | undefined> = {}

  if (filters.parentId !== undefined) {
    params.parentId = filters.parentId === null ? 'null' : filters.parentId
  }
  if (filters.levelType) params.levelType = filters.levelType
  if (filters.status) params.status = filters.status
  if (filters.search) params.search = filters.search

  const response = await api.get('/assets', { params })
  return response.data
}

async function fetchAsset(id: string): Promise<AssetResponse> {
  const response = await api.get(`/assets/${id}`)
  return response.data
}

async function fetchAssetChildren(id: string): Promise<AssetsResponse> {
  const response = await api.get(`/assets/${id}/children`)
  return response.data
}

async function fetchAssetAncestors(id: string): Promise<AssetsResponse> {
  const response = await api.get(`/assets/${id}/ancestors`)
  return response.data
}

async function createAsset(input: CreateAssetInput): Promise<AssetResponse> {
  const response = await api.post('/assets', input)
  return response.data
}

async function updateAsset(id: string, input: UpdateAssetInput): Promise<AssetResponse> {
  const response = await api.put(`/assets/${id}`, input)
  return response.data
}

async function deleteAsset(id: string): Promise<void> {
  await api.delete(`/assets/${id}`)
}

// Hooks

export function useAssets(filters: AssetFilters = {}) {
  return useQuery({
    queryKey: ['assets', filters],
    queryFn: () => fetchAssets(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useRootAssets() {
  return useAssets({ parentId: null })
}

export function useAsset(id: string | undefined) {
  return useQuery({
    queryKey: ['asset', id],
    queryFn: () => fetchAsset(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}

export function useAssetChildren(id: string | undefined) {
  return useQuery({
    queryKey: ['asset-children', id],
    queryFn: () => fetchAssetChildren(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}

export function useAssetAncestors(id: string | undefined) {
  return useQuery({
    queryKey: ['asset-ancestors', id],
    queryFn: () => fetchAssetAncestors(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}

export function useCreateAsset() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
    },
  })
}

export function useUpdateAsset() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAssetInput }) =>
      updateAsset(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
      queryClient.invalidateQueries({ queryKey: ['asset', variables.id] })
    },
  })
}

export function useDeleteAsset() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
    },
  })
}

// Search assets hook with debounced query
export function useSearchAssets(query: string, options: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: ['assets-search', query],
    queryFn: () => fetchAssets({ search: query }),
    enabled: options.enabled !== false && query.length >= 2,
    staleTime: 1000 * 30, // 30 seconds for search results
  })
}

// Fetch multiple assets by IDs
async function fetchAssetsByIds(ids: string[]): Promise<AssetsResponse> {
  if (ids.length === 0) return { data: [] }

  // Fetch each asset individually (can be optimized with a batch endpoint later)
  const assets = await Promise.all(
    ids.map(async (id) => {
      try {
        const response = await fetchAsset(id)
        return response.data
      } catch {
        return null
      }
    })
  )

  return { data: assets.filter((a): a is Asset => a !== null) as Asset[] }
}

export function useAssetsByIds(ids: string[]) {
  return useQuery({
    queryKey: ['assets-by-ids', ids],
    queryFn: () => fetchAssetsByIds(ids),
    enabled: ids.length > 0,
    staleTime: 1000 * 60 * 5,
  })
}

// Helper function to get translated name
export function getAssetTranslatedName(
  asset: Asset,
  language: string,
  primaryLanguage = 'en'
): string {
  if (language === primaryLanguage) {
    return asset.name
  }
  return asset.nameTranslations?.[language] || asset.name
}

// Helper function to get translated path
export function getAssetTranslatedPath(
  asset: Asset,
  language: string,
  primaryLanguage = 'en'
): string {
  if (language === primaryLanguage) {
    return asset.pathString
  }
  return asset.pathStringTranslations?.[language] || asset.pathString
}
