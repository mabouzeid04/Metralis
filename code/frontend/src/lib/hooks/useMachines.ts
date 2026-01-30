import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

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

export interface MachineFilters {
  status?: string
  q?: string
}

interface MachinesResponse {
  data: Machine[]
}

async function fetchMachines(filters: MachineFilters): Promise<MachinesResponse> {
  const response = await api.get('/machines', {
    params: {
      status: filters.status || undefined,
      q: filters.q || undefined,
    },
  })
  return response.data
}

export function useMachines(filters: MachineFilters = {}) {
  return useQuery({
    queryKey: ['machines', filters],
    queryFn: () => fetchMachines(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
