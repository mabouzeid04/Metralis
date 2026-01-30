import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export interface UserRef {
    id: string
    name: string
    email?: string
}

export interface WorkOrder {
    id: string
    publicId?: string
    title: string
    descriptionRaw?: string
    status: string
    type?: string | null
    priority: string
    createdAt: string
    reportedAt: string
    completedAt: string | null

    // Asset/Machine references
    assetId?: string | null
    asset?: {
        id: string
        name: string
        pathString: string
    } | null
    machineId?: string | null
    machine?: {
        id: string
        name: string
    } | null

    // Classification
    maintenanceType?: string | null
    maintenanceDisciplines?: string[]

    // Timestamps
    equipmentStopTime?: string | null
    faultReportTime?: string | null
    repairStartTime?: string | null
    maintenanceStartTime?: string | null
    maintenanceEndTime?: string | null

    // Durations (minutes)
    maintenanceDurationMin?: number | null
    downtimeDurationMin?: number | null

    // Text fields
    maintenanceDescription?: string | null
    correctiveAction?: string | null
    rootCause?: string | null
    notesAndRecommendations?: string | null

    // Equipment status
    equipmentStatusAfter?: string | null

    // Role assignments
    assignedTo?: UserRef | null
    areaLeader?: UserRef | null
    maintenanceSupervisor?: UserRef | null
    performer?: UserRef | null
    machineReceiver?: UserRef | null
    responsibleEngineer?: UserRef | null
    maintenanceEngineer?: UserRef | null
    maintenanceManager?: UserRef | null
    reportedBy?: UserRef | null
}

export interface WorkOrderFilters {
    status?: string
    priority?: string
    type?: string
    machineId?: string
    assetId?: string
    maintenanceType?: string
    maintenanceDiscipline?: string
    performerId?: string
    q?: string
}

interface WorkOrdersResponse {
    data: WorkOrder[]
    meta: {
        total: number
        take: number
        skip: number
    }
}

async function fetchWorkOrders(filters: WorkOrderFilters): Promise<WorkOrdersResponse> {
    const response = await api.get('/work-orders', {
        params: {
            status: filters.status || undefined,
            priority: filters.priority || undefined,
            type: filters.type || undefined,
            machineId: filters.machineId || undefined,
            assetId: filters.assetId || undefined,
            maintenanceType: filters.maintenanceType || undefined,
            maintenanceDiscipline: filters.maintenanceDiscipline || undefined,
            performerId: filters.performerId || undefined,
            q: filters.q || undefined,
        },
    })
    return response.data
}

export function useWorkOrders(filters: WorkOrderFilters) {
    return useQuery({
        queryKey: ['workOrders', filters],
        queryFn: () => fetchWorkOrders(filters),
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}

// Hook for machines (used in filter dropdown)
export function useMachines() {
    return useQuery({
        queryKey: ['machines'],
        queryFn: async () => {
            const response = await api.get('/machines')
            return response.data.data as Array<{ id: string; name: string }>
        },
        staleTime: 1000 * 60 * 10, // 10 minutes - machines don't change often
    })
}
