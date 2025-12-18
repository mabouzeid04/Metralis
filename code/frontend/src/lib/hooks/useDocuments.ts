import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

export interface Document {
    id: string
    title: string
    type: DocumentType
    filename: string
    fileSize: number | null
    mimeType: string | null
    createdAt: string
    machine: {
        id: string
        name: string
    } | null
    uploadedBy: {
        id: string
        name: string
    } | null
}

export type DocumentType = 'MANUAL' | 'SOP' | 'TROUBLESHOOTING' | 'OTHER'

async function fetchDocuments(): Promise<Document[]> {
    const response = await api.get('/documents')
    return response.data.data || []
}

export function useDocuments() {
    return useQuery({
        queryKey: ['documents'],
        queryFn: fetchDocuments,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}

// Hook to invalidate documents cache after upload
export function useInvalidateDocuments() {
    const queryClient = useQueryClient()
    return () => queryClient.invalidateQueries({ queryKey: ['documents'] })
}
