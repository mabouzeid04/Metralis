import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export interface Part {
    id: string
    name: string
    partNumber: string | null
    category: string | null
    stockQuantity: number
    minStock: number
    manufacturer: string | null
    location: string | null
    unitCost: number | null
}

async function fetchParts(): Promise<Part[]> {
    const response = await api.get('/parts')
    return response.data.data || []
}

export function useParts() {
    return useQuery({
        queryKey: ['parts'],
        queryFn: fetchParts,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}
