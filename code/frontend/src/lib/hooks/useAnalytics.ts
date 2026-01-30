import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

// ── Types ──────────────────────────────────────────────────────────────────

export interface AnalyticsFilters {
    from: string
    to: string
    assetId?: string
    includeChildren?: boolean
    maintenanceType?: string
}

export interface AnalyticsSummary {
    totalWorkOrders: number
    openWorkOrders: number
    closedWorkOrders: number
    avgMttrMinutes: number | null
    totalDowntimeMinutes: number
    mtbfHours: number | null
    firstTimeFixRate: number | null
    previousPeriod: {
        totalWorkOrders: number
        avgMttrMinutes: number | null
        totalDowntimeMinutes: number
        totalWorkOrdersChange: number | null
        avgMttrChange: number | null
        totalDowntimeChange: number | null
    }
}

export interface BreakdownItem {
    label: string
    count: number
    percentage: number
}

export interface DisciplineItem {
    discipline: string
    count: number
}

export interface AssetBreakdown {
    assetId: string
    assetNameEn: string
    assetNameAr: string | null
    assetPath: string
    workOrderCount: number
    totalDowntimeMinutes: number
    avgMttrMinutes: number | null
}

export interface TrendPoint {
    date: string
    value: number
}

// ── Fetch Functions ────────────────────────────────────────────────────────

function buildParams(filters: AnalyticsFilters) {
    return {
        from: filters.from,
        to: filters.to,
        assetId: filters.assetId || undefined,
        includeChildren: filters.includeChildren === false ? 'false' : undefined,
        maintenanceType: filters.maintenanceType || undefined,
    }
}

async function fetchSummary(filters: AnalyticsFilters): Promise<AnalyticsSummary> {
    const response = await api.get('/analytics/summary', { params: buildParams(filters) })
    return response.data.data
}

async function fetchByStatus(filters: AnalyticsFilters): Promise<BreakdownItem[]> {
    const response = await api.get('/analytics/by-status', { params: buildParams(filters) })
    return response.data.data
}

async function fetchByType(filters: AnalyticsFilters): Promise<BreakdownItem[]> {
    const response = await api.get('/analytics/by-type', { params: buildParams(filters) })
    return response.data.data
}

async function fetchByDiscipline(filters: AnalyticsFilters): Promise<DisciplineItem[]> {
    const response = await api.get('/analytics/by-discipline', { params: buildParams(filters) })
    return response.data.data
}

async function fetchByAsset(
    filters: AnalyticsFilters & { limit?: number; orderBy?: string }
): Promise<AssetBreakdown[]> {
    const response = await api.get('/analytics/by-asset', {
        params: {
            ...buildParams(filters),
            limit: filters.limit?.toString(),
            orderBy: filters.orderBy,
        },
    })
    return response.data.data
}

async function fetchTrend(
    filters: AnalyticsFilters & { metric: string; granularity: string }
): Promise<TrendPoint[]> {
    const response = await api.get('/analytics/trend', {
        params: {
            ...buildParams(filters),
            metric: filters.metric,
            granularity: filters.granularity,
        },
    })
    return response.data.data
}

// ── Hooks ──────────────────────────────────────────────────────────────────

export function useAnalyticsSummary(filters: AnalyticsFilters) {
    return useQuery({
        queryKey: ['analytics', 'summary', filters],
        queryFn: () => fetchSummary(filters),
        staleTime: 1000 * 60 * 5,
    })
}

export function useAnalyticsByStatus(filters: AnalyticsFilters) {
    return useQuery({
        queryKey: ['analytics', 'by-status', filters],
        queryFn: () => fetchByStatus(filters),
        staleTime: 1000 * 60 * 5,
    })
}

export function useAnalyticsByType(filters: AnalyticsFilters) {
    return useQuery({
        queryKey: ['analytics', 'by-type', filters],
        queryFn: () => fetchByType(filters),
        staleTime: 1000 * 60 * 5,
    })
}

export function useAnalyticsByDiscipline(filters: AnalyticsFilters) {
    return useQuery({
        queryKey: ['analytics', 'by-discipline', filters],
        queryFn: () => fetchByDiscipline(filters),
        staleTime: 1000 * 60 * 5,
    })
}

export function useAnalyticsByAsset(
    filters: AnalyticsFilters & { limit?: number; orderBy?: string }
) {
    return useQuery({
        queryKey: ['analytics', 'by-asset', filters],
        queryFn: () => fetchByAsset(filters),
        staleTime: 1000 * 60 * 5,
    })
}

export function useAnalyticsTrend(
    filters: AnalyticsFilters & { metric: string; granularity: string }
) {
    return useQuery({
        queryKey: ['analytics', 'trend', filters],
        queryFn: () => fetchTrend(filters),
        staleTime: 1000 * 60 * 5,
    })
}

// ── Export Download ────────────────────────────────────────────────────────

export async function downloadAnalyticsExport(
    filters: AnalyticsFilters,
    format: 'csv' | 'xlsx'
) {
    const response = await api.get('/analytics/export', {
        params: { ...buildParams(filters), format },
        responseType: 'blob',
    })

    const blob = new Blob([response.data])
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `work-orders-${filters.from}-${filters.to}.${format}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
}
