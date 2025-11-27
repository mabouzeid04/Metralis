import { useState, useEffect } from 'react'
import { Plus, Search, Filter, FileText, Download, Eye, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { api } from '@/lib/api'

interface Document {
  id: string
  title: string
  type: string
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

function formatFileSize(bytes: number | null): string {
  if (!bytes) return '-'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function DocumentsList() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get('/documents')
        setDocuments(response.data.data || [])
        setError(null)
      } catch (err) {
        console.error('Failed to fetch documents:', err)
        setError('Failed to load documents')
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  const handleDownload = async (doc: Document) => {
    try {
      const response = await api.get(`/documents/${doc.id}/file`, {
        responseType: 'blob'
      })
      
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', doc.filename)
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Failed to download document:', err)
    }
  }

  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.machine?.name && doc.machine.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <FileText className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
          <p className="text-muted-foreground">Centralized library for manuals, SOPs, and diagrams.</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Upload Document
        </Button>
      </div>

      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredDocs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No documents found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'Try a different search term' : 'Get started by uploading your first document'}
              </p>
              {!searchTerm && (
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Upload Document
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30px]"></TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden md:table-cell">Machine</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead className="hidden lg:table-cell">Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocs.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                          <span>{doc.title}</span>
                          <span className="text-xs text-muted-foreground md:hidden">
                            {doc.type} • {formatFileSize(doc.fileSize)}
                          </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{doc.type}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{doc.machine?.name || '-'}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                      {formatFileSize(doc.fileSize)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="View">
                              <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Download"
                            onClick={() => handleDownload(doc)}
                          >
                              <Download className="h-4 w-4" />
                          </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
