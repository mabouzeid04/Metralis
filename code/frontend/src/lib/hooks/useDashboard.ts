import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export interface DashboardStats {
    openWorkOrders: number
    machinesDown: number
    completedToday: number
}

export interface Machine {
    id: string
    name: string
    code: string | null
    category: string | null
    status: string
    area: string | null
    line: string | null
    updatedAt: string
}

interface MachineStatusChartData {
    name: string
    value: number
    color: string
}

async function fetchDashboardStats(): Promise<DashboardStats> {
    const response = await api.get('/dashboard/stats')
    return response.data.data
}

async function fetchMachines(): Promise<Machine[]> {
    const response = await api.get('/machines')
    return response.data.data || []
}

export function useDashboardStats() {
    return useQuery({
        queryKey: ['dashboard', 'stats'],
        queryFn: fetchDashboardStats,
        staleTime: 1000 * 60 * 2, // 2 minutes - dashboard stats should be relatively fresh
    })
}

export function useMachines() {
    return useQuery({
        queryKey: ['machines'],
        queryFn: fetchMachines,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}

// Helper to transform machines into chart data
export function getMachineStatusChartData(
    machines: Machine[],
    translator: (key: string, options?: { defaultValue?: string }) => string
): MachineStatusChartData[] {
    const statusCounts: Record<string, number> = {}

    machines.forEach((machine) => {
        const status = machine.status || 'UNKNOWN'
        statusCounts[status] = (statusCounts[status] || 0) + 1
    })

    const statusColors: Record<string, string> = {
        RUNNING: '#10B981',
        MAINTENANCE: '#F59E0B',
        DOWN: '#EF4444',
        RETIRED: '#94A3B8',
    }

    return Object.entries(statusCounts).map(([status, count]) => {
        const normalized = status.toLowerCase()
        return {
            name: translator(`common:status.${normalized}`, {
                defaultValue: status.charAt(0) + status.slice(1).toLowerCase(),
            }),
            value: count,
            color: statusColors[status] || '#94A3B8',
        }
    })
}
