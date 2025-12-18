import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export interface WorkOrder {
    id: string
    publicId?: string
    title: string
    status: string
    type: string
    priority: string
    createdAt: string
    reportedAt: string
    completedAt: string | null
    machine: {
        id: string
        name: string
    } | null
    assignedTo: {
        id: string
        name: string
    } | null
}

export interface WorkOrderFilters {
    status?: string
    priority?: string
    type?: string
    machineId?: string
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
