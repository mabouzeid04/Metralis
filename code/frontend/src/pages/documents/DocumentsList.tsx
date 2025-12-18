import { useState, useRef, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, Search, Filter, FileText, Download, Eye, Loader2, X } from 'lucide-react'
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { api } from '@/lib/api'
import { useDocuments, useInvalidateDocuments, type Document, type DocumentType } from '@/lib/hooks/useDocuments'
import { useMachines } from '@/lib/hooks/useDashboard'

const documentTypes: { value: DocumentType; labelKey: string }[] = [
  { value: 'MANUAL', labelKey: 'types.manual' },
  { value: 'SOP', labelKey: 'types.sop' },
  { value: 'TROUBLESHOOTING', labelKey: 'types.troubleshooting' },
  { value: 'OTHER', labelKey: 'types.other' },
]
const allowedExtensions = ['pdf', 'doc', 'docx']
const allowedMimeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

function formatFileSize(bytes: number | null): string {
  if (!bytes) return '-'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function DocumentsList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<{ machineId?: string; type?: DocumentType }>({})
  const [machineSearch, setMachineSearch] = useState('')
  const [uploadOpen, setUploadOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [formValues, setFormValues] = useState<{ title: string; type: DocumentType; machineId: string }>({
    title: '',
    type: 'MANUAL',
    machineId: '',
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const previewDocIdRef = useRef<string | null>(null)
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [previewError, setPreviewError] = useState<string | null>(null)
  const { t } = useTranslation(['documents', 'common'])

  // React Query - data cached for 5 minutes, instant on back navigation
  const { data: documents = [], isLoading: loading, error } = useDocuments()
  const invalidateDocuments = useInvalidateDocuments()

  // Machines for upload form (also cached)
  const { data: machines = [], isLoading: machinesLoading, error: machinesError } = useMachines()

  const filteredDocs = useMemo(() =>
    documents.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.machine?.name && doc.machine.name.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesMachine = !filters.machineId || doc.machine?.id === filters.machineId
      const matchesType = !filters.type || doc.type === filters.type

      return matchesSearch && matchesMachine && matchesType
    }),
    [documents, searchTerm, filters]
  )

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

  const resetUploadState = () => {
    setFormValues({ title: '', type: 'MANUAL', machineId: '' })
    setSelectedFile(null)
    setUploadError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const closeUploader = () => {
    setUploadOpen(false)
    resetUploadState()
  }

  const closePreview = () => {
    setPreviewDoc(null)
    previewDocIdRef.current = null
    setPreviewError(null)
    setPreviewLoading(false)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      setSelectedFile(null)
      return
    }

    const hasAllowedExtension = allowedExtensions.some((ext) =>
      file.name.toLowerCase().endsWith(`.${ext}`)
    )
    if (!hasAllowedExtension && !allowedMimeTypes.includes(file.type)) {
      setUploadError(t('uploadErrors.unsupported'))
      setSelectedFile(null)
      return
    }

    setUploadError(null)
    setSelectedFile(file)
  }

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formValues.title.trim()) {
      setUploadError(t('uploadErrors.titleRequired'))
      return
    }

    if (!selectedFile) {
      setUploadError(t('uploadErrors.fileRequired'))
      return
    }

    const formData = new FormData()
    formData.append('title', formValues.title.trim())
    formData.append('type', formValues.type)
    if (formValues.machineId) {
      formData.append('machineId', formValues.machineId)
    }
    formData.append('file', selectedFile)

    setUploading(true)
    setUploadError(null)
    try {
      await api.post('/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      await invalidateDocuments()
      closeUploader()
    } catch (err) {
      console.error('Failed to upload document:', err)
      setUploadError(t('uploadErrors.failed'))
    } finally {
      setUploading(false)
    }
  }



  const canPreviewDocument = (doc?: Document | null) => {
    if (!doc) return false
    const mime = doc.mimeType?.toLowerCase()
    if (mime?.includes('pdf')) {
      return true
    }
    return doc.filename.toLowerCase().endsWith('.pdf')
  }

  const handlePreview = async (doc: Document) => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }

    setPreviewDoc(doc)
    previewDocIdRef.current = doc.id
    setPreviewError(null)
    const previewable = canPreviewDocument(doc)
    if (!previewable) {
      setPreviewLoading(false)
      return
    }

    setPreviewLoading(true)
    try {
      const response = await api.get(`/documents/${doc.id}/file`, {
        responseType: 'blob'
      })

      const blob: Blob = response.data
      const url = window.URL.createObjectURL(blob)
      if (previewDocIdRef.current !== doc.id) {
        window.URL.revokeObjectURL(url)
        return
      }

      setPreviewUrl(url)
    } catch (err) {
      console.error('Failed to preview document:', err)
      setPreviewError(t('errors.preview'))
    } finally {
      setPreviewLoading(false)
    }
  }

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
        <p className="text-muted-foreground">{error.message || t('errors.load')}</p>
        <Button onClick={() => window.location.reload()}>{t('common:actions.retry')}</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={() => setUploadOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> {t('upload')}
        </Button>
      </div>

      {uploadOpen && (
        <Card>
          <CardHeader className="pb-2">
            <h3 className="text-xl font-semibold">{t('uploadTitle')}</h3>
            <p className="text-sm text-muted-foreground">{t('uploadSubtitle')}</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleUpload}>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('form.title')}</label>
                <Input
                  value={formValues.title}
                  onChange={(e) => setFormValues((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder={t('form.titlePlaceholder')}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('form.type')}</label>
                <select
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                  value={formValues.type}
                  onChange={(e) =>
                    setFormValues((prev) => ({ ...prev, type: e.target.value as DocumentType }))
                  }
                >
                  {documentTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {t(option.labelKey)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('form.machine')}</label>
                <select
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                  value={formValues.machineId}
                  onChange={(e) =>
                    setFormValues((prev) => ({ ...prev, machineId: e.target.value }))
                  }
                  disabled={machinesLoading || !!machinesError}
                >
                  <option value="">{t('form.machinePlaceholder')}</option>
                  {machines.map((machine) => (
                    <option key={machine.id} value={machine.id}>
                      {machine.name}
                    </option>
                  ))}
                </select>
                {machinesLoading && (
                  <p className="text-sm text-muted-foreground">{t('form.machineLoading')}</p>
                )}
                {!machinesLoading && machinesError && (
                  <p className="text-sm text-destructive">{machinesError.message || t('errors.loadMachines')}</p>
                )}
                {!machinesLoading && !machinesError && machines.length === 0 && (
                  <p className="text-sm text-muted-foreground">{t('form.machineEmpty')}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('form.file')}</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {t('form.chooseFile')}
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {selectedFile ? selectedFile.name : t('form.noFile')}
                  </span>
                </div>
              </div>
              {uploadError && <p className="text-sm text-destructive">{uploadError}</p>}
              <div className="flex items-center gap-2">
                <Button type="submit" disabled={uploading}>
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('form.uploading')}
                    </>
                  ) : (
                    t('upload')
                  )}
                </Button>
                <Button type="button" variant="ghost" onClick={closeUploader} disabled={uploading}>
                  {t('common:actions.cancel')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchPlaceholder')}
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{t('table.type')}</DropdownMenuLabel>
                <DropdownMenuGroup>
                  {documentTypes.map((type) => (
                    <DropdownMenuCheckboxItem
                      key={type.value}
                      checked={filters.type === type.value}
                      onCheckedChange={(checked) => {
                        setFilters((prev) => ({
                          ...prev,
                          type: checked ? type.value : undefined,
                        }))
                      }}
                    >
                      {t(type.labelKey)}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>{t('table.machine')}</DropdownMenuLabel>
                <div className="px-2 py-1.5" onKeyDown={(e) => e.stopPropagation()}>
                  <Input
                    placeholder={t('searchMachinesPlaceholder')}
                    value={machineSearch}
                    onChange={(e) => setMachineSearch(e.target.value)}
                    className="h-8"
                  />
                </div>
                <DropdownMenuGroup className="max-h-[200px] overflow-yscroll">
                  {machines
                    .filter((m) => m.name.toLowerCase().includes(machineSearch.toLowerCase()))
                    .map((machine) => (
                      <DropdownMenuCheckboxItem
                        key={machine.id}
                        checked={filters.machineId === machine.id}
                        onCheckedChange={(checked) => {
                          setFilters((prev) => ({
                            ...prev,
                            machineId: checked ? machine.id : undefined,
                          }))
                        }}
                      >
                        {machine.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                  {machines.filter((m) => m.name.toLowerCase().includes(machineSearch.toLowerCase())).length === 0 && (
                    <div className="px-2 py-1.5 text-sm text-muted-foreground">{t('noMachinesFound')}</div>
                  )}
                </DropdownMenuGroup>
                {(filters.type || filters.machineId) && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => setFilters({})}
                      className="justify-center text-center"
                    >
                      {t('filters.clear')}
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredDocs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">{t('emptyTitle')}</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? t('emptySearchHint') : t('emptyCreateHint')}
              </p>
              {!searchTerm && (
                <Button onClick={() => setUploadOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> {t('upload')}
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30px]"></TableHead>
                  <TableHead>{t('table.title')}</TableHead>
                  <TableHead className="hidden md:table-cell">{t('table.type')}</TableHead>
                  <TableHead className="hidden md:table-cell">{t('table.machine')}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t('table.date')}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t('table.size')}</TableHead>
                  <TableHead className="text-right">{t('table.actions')}</TableHead>
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
                          {doc.type} {' • '} {formatFileSize(doc.fileSize)}
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
                        <Button variant="ghost" size="icon" title={t('view')} onClick={() => handlePreview(doc)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          title={t('download')}
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

      {previewDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
          onClick={closePreview}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-background rounded-lg shadow-xl w-full max-w-5xl h-full max-h-[90vh] flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <p className="text-sm text-muted-foreground">{t('previewing')}</p>
                <h3 className="text-lg font-semibold">{previewDoc.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleDownload(previewDoc)}>
                  <Download className="h-4 w-4 mr-2" />
                  {t('download')}
                </Button>
                <Button variant="ghost" size="icon" onClick={closePreview} title={t('close')}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex-1 p-6 bg-muted/40 rounded-b-lg">
              {previewLoading && (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <p>{t('loadingPreview')}</p>
                </div>
              )}

              {!previewLoading && previewError && (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
                  <p className="text-sm text-destructive">{previewError}</p>
                  <div className="flex gap-2">
                    <Button onClick={() => handlePreview(previewDoc)}>{t('common:actions.retry')}</Button>
                    <Button variant="ghost" onClick={closePreview}>
                      {t('common:actions.close')}
                    </Button>
                  </div>
                </div>
              )}

              {!previewLoading && !previewError && previewUrl && canPreviewDocument(previewDoc) && (
                <iframe
                  src={previewUrl}
                  title={`Preview ${previewDoc.title}`}
                  className="w-full h-full rounded-md border"
                />
              )}

              {!previewLoading &&
                !previewError &&
                previewDoc &&
                !canPreviewDocument(previewDoc) && (
                  <div className="h-full flex flex-col items-center justify-center gap-4 text-center text-sm text-muted-foreground px-6">
                    <p>{t('previewUnavailable')}</p>
                    <Button onClick={() => handleDownload(previewDoc)}>
                      <Download className="h-4 w-4 mr-2" />
                      {t('downloadDocument')}
                    </Button>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
