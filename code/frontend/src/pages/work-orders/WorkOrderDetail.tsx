import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, User, Calendar, AlertCircle, Loader2, CheckCircle2, ClipboardList, Paperclip, Download, Trash2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { api } from '@/lib/api'
import { format } from 'date-fns'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Attachment {
  id: string
  title: string
  mimeType: string | null
  fileSize: number | null
  createdAt: string
  uploadedBy?: {
    id: string
    name: string | null
  } | null
}

interface RepairPartUsage {
  partId: string
  quantity: number
}

interface WorkOrderPartSummary {
  id: string
  quantity: number
  part: {
    id: string
    name: string
  }
}

interface RepairAction {
  id: string
  actions: string
  verification: string | null
  failureNote: string | null
  success: boolean
  rootCause: string | null
  createdAt: string
  performedBy: {
    id: string
    name: string
  } | null
  partsUsed?: unknown
  attachments: Attachment[]
}

interface WorkOrder {
  id: string
  publicId?: string
  title: string
  descriptionRaw: string | null
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING' | 'CLOSED'
  type: string
  priority: string
  reportedAt: string | null
  createdAt: string
  startedAt: string | null
  completedAt: string | null
  machine: {
    id: string
    name: string
  } | null
  reportedBy: {
    id: string
    name: string
  } | null
  assignedTo: {
    id: string
    name: string
  } | null
  attachments: Attachment[]
  repairActions: RepairAction[]
  parts: WorkOrderPartSummary[]
}

interface PartOption {
  id: string
  name: string
  partNumber: string | null
}

interface RepairFormState {
  actions: string
  success: boolean
  verification: string
  failureNote: string
  rootCause: string
  parts: RepairPartUsage[]
  attachments: File[]
}

const statusOptions = [
  { value: 'OPEN', label: 'Open' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'WAITING', label: 'Waiting' },
  { value: 'CLOSED', label: 'Closed' },
]

const successOptions = [
  { value: true, label: 'Successful' },
  { value: false, label: 'Needs follow-up' },
]

const formatFileSize = (bytes?: number | null) => {
  if (!bytes) return '-'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return 'N/A'
  try {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm')
  } catch {
    return dateString
  }
}

const parsePartsUsed = (partsUsed: unknown): RepairPartUsage[] => {
  if (!Array.isArray(partsUsed)) return []
  return partsUsed
    .map((entry) => {
      if (!entry || typeof entry !== 'object') return null
      const partId = (entry as { partId?: string }).partId
      const quantity = Number((entry as { quantity?: number }).quantity ?? 1)
      if (!partId) return null
      return { partId, quantity: Number.isNaN(quantity) ? 1 : quantity }
    })
    .filter(Boolean) as RepairPartUsage[]
}

export default function WorkOrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [workOrder, setWorkOrder] = useState<WorkOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [attachmentError, setAttachmentError] = useState<string | null>(null)
  const [attachmentUploading, setAttachmentUploading] = useState(false)
  const attachmentInputRef = useRef<HTMLInputElement | null>(null)
  const [parts, setParts] = useState<PartOption[]>([])
  const [partsLoading, setPartsLoading] = useState(true)
  const [repairSubmitting, setRepairSubmitting] = useState(false)
  const [repairFormError, setRepairFormError] = useState<string | null>(null)
  const repairAttachmentInputRef = useRef<HTMLInputElement | null>(null)
  const [repairForm, setRepairForm] = useState<RepairFormState>({
    actions: '',
    success: true,
    verification: '',
    failureNote: '',
    rootCause: '',
    parts: [],
    attachments: [],
  })

  const fetchWorkOrder = useCallback(
    async (withSpinner = false) => {
      if (!id) return
      try {
        if (withSpinner) {
          setLoading(true)
        }
        const { data } = await api.get(`/work-orders/${id}`)
        setWorkOrder(data.data)
        setError(null)
      } catch (err: unknown) {
        const apiError = err as { response?: { data?: { error?: { message?: string } } } }
        setError(apiError?.response?.data?.error?.message || 'Failed to load work order')
      } finally {
        if (withSpinner) {
          setLoading(false)
        }
      }
    },
    [id],
  )

  useEffect(() => {
    fetchWorkOrder(true)
  }, [fetchWorkOrder])

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const { data } = await api.get<{ data: PartOption[] }>('/parts')
        const list = Array.isArray(data.data) ? data.data : []
        setParts(list)
      } catch (err) {
        console.error('Failed to load parts', err)
      } finally {
        setPartsLoading(false)
      }
    }
    fetchParts()
  }, [])

  const partsLookup = useMemo(() => new Map(parts.map((part) => [part.id, part])), [parts])

  const handleStatusChange = async (newStatus: string) => {
    if (!id || !workOrder) return
    setUpdatingStatus(true)
    try {
      await api.patch(`/work-orders/${id}/status`, { status: newStatus })
      await fetchWorkOrder()
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { error?: { message?: string } } } }
      setError(apiError?.response?.data?.error?.message || 'Failed to update status')
    } finally {
      setUpdatingStatus(false)
    }
  }

  const uploadAttachment = async (file: File, repairActionId?: string) => {
    if (!workOrder) return null
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', file.name)
    const endpoint = repairActionId
      ? `/work-orders/${workOrder.id}/repair/${repairActionId}/attachments`
      : `/work-orders/${workOrder.id}/attachments`
    const { data } = await api.post<{ data: Attachment }>(endpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data.data
  }

  const handleAttachmentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!workOrder) return
    const files = event.target.files ? Array.from(event.target.files) : []
    if (!files.length) return
    setAttachmentError(null)
    setAttachmentUploading(true)
    try {
      const uploaded: Attachment[] = []
      for (const file of files) {
        const result = await uploadAttachment(file)
        if (result) uploaded.push(result)
      }
      if (uploaded.length) {
        setWorkOrder((prev) => (prev ? { ...prev, attachments: [...uploaded, ...prev.attachments] } : prev))
      }
    } catch (err) {
      console.error('Attachment upload failed', err)
      setAttachmentError('Failed to upload attachment. Please try again.')
    } finally {
      setAttachmentUploading(false)
      event.target.value = ''
    }
  }

  const downloadAttachment = async (attachment: Attachment) => {
    try {
      const response = await api.get(`/documents/${attachment.id}/file`, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', attachment.title)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Failed to download file', err)
    }
  }

  const addRepairPart = () => {
    setRepairForm((prev) => ({ ...prev, parts: [...prev.parts, { partId: '', quantity: 1 }] }))
  }

  const updateRepairPart = (index: number, key: keyof RepairPartUsage, value: string) => {
    setRepairForm((prev) => ({
      ...prev,
      parts: prev.parts.map((part, idx) =>
        idx === index
          ? {
              ...part,
              [key]: key === 'quantity' ? Math.max(1, Number(value) || 1) : value,
            }
          : part,
      ),
    }))
  }

  const removeRepairPart = (index: number) => {
    setRepairForm((prev) => ({ ...prev, parts: prev.parts.filter((_, idx) => idx !== index) }))
  }

  const handleRepairAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : []
    if (!files.length) return
    setRepairForm((prev) => ({ ...prev, attachments: [...prev.attachments, ...files] }))
    event.target.value = ''
  }

  const removePendingRepairAttachment = (index: number) => {
    setRepairForm((prev) => ({ ...prev, attachments: prev.attachments.filter((_, idx) => idx !== index) }))
  }

  const resetRepairForm = () => {
    setRepairForm({
      actions: '',
      success: true,
      verification: '',
      failureNote: '',
      rootCause: '',
      parts: [],
      attachments: [],
    })
  }

  const handleRepairSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!workOrder) return
    setRepairSubmitting(true)
    setRepairFormError(null)
    try {
      const payload: Record<string, unknown> = {
        actions: repairForm.actions,
        success: repairForm.success,
      }
      if (repairForm.verification.trim()) payload.verification = repairForm.verification.trim()
      if (repairForm.failureNote.trim()) payload.failureNote = repairForm.failureNote.trim()
      if (repairForm.rootCause.trim()) payload.rootCause = repairForm.rootCause.trim()
      const partsPayload = repairForm.parts
        .filter((part) => part.partId)
        .map((part) => ({ partId: part.partId, quantity: part.quantity }))
      if (partsPayload.length) {
        payload.partsUsed = partsPayload
      }

      const { data } = await api.post<{ data: RepairAction }>(`/work-orders/${workOrder.id}/repair`, payload)
      const repairId = data.data?.id

      if (repairId && repairForm.attachments.length) {
        for (const file of repairForm.attachments) {
          await uploadAttachment(file, repairId)
        }
      }

      await fetchWorkOrder()
      resetRepairForm()
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { error?: { message?: string } } } }
      setRepairFormError(apiError?.response?.data?.error?.message || 'Failed to log repair')
    } finally {
      setRepairSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !workOrder) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0 hover:bg-transparent">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
        </Button>
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
          <ClipboardList className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">{error || 'Work order not found'}</p>
          <Button asChild>
            <Link to="/work-orders">Back to Work Orders</Link>
          </Button>
        </div>
      </div>
    )
  }

  const repairParts = (repair: RepairAction) => parsePartsUsed(repair.partsUsed)
  const displayId = workOrder.publicId || workOrder.id

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0 hover:bg-transparent">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold tracking-tight">{workOrder.title}</h2>
            <StatusBadge status={workOrder.status} />
          </div>
          <h3 className="text-xl font-medium text-muted-foreground font-mono break-all">{displayId}</h3>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" disabled={updatingStatus}>
                {updatingStatus ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                  </>
                ) : (
                  <>Change Status: {statusOptions.find((opt) => opt.value === workOrder.status)?.label || workOrder.status}</>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {statusOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onSelect={() => handleStatusChange(option.value)}
                  disabled={workOrder.status === option.value}
                >
                  {workOrder.status === option.value && <CheckCircle2 className="mr-2 h-4 w-4" />}
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm">{workOrder.descriptionRaw || 'No description provided'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paperclip className="h-4 w-4" /> Attachments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  ref={attachmentInputRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  className="hidden"
                  onChange={handleAttachmentUpload}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => attachmentInputRef.current?.click()}
                  disabled={attachmentUploading}
                >
                  {attachmentUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                    </>
                  ) : (
                    <>
                      <Paperclip className="mr-2 h-4 w-4" /> Add file
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">Share photos, PDFs, or notes that help describe the issue.</p>
              </div>
              {attachmentError && <p className="text-sm text-destructive">{attachmentError}</p>}
              {workOrder.attachments.length ? (
                <div className="space-y-3">
                  {workOrder.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center justify-between gap-3 rounded-md border p-3">
                      <div>
                        <p className="text-sm font-medium">{attachment.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(attachment.fileSize)} · {formatDate(attachment.createdAt)}
                          {attachment.uploadedBy?.name ? ` · ${attachment.uploadedBy.name}` : ''}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => downloadAttachment(attachment)}>
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No attachments yet.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Repair Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {workOrder.repairActions.length ? (
                <div className="space-y-4">
                  {workOrder.repairActions.map((repair) => (
                    <div key={repair.id} className="rounded-lg border p-4 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium">{repair.performedBy?.name || 'Technician'}</p>
                          <p className="text-xs text-muted-foreground">Logged {formatDate(repair.createdAt)}</p>
                        </div>
                        <Badge variant={repair.success ? 'outline' : 'destructive'}>
                          {repair.success ? 'Successful' : 'Needs follow-up'}
                        </Badge>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{repair.actions}</p>
                      {repair.rootCause && (
                        <p className="text-sm"><span className="font-semibold">Root cause:</span> {repair.rootCause}</p>
                      )}
                      {repairParts(repair).length > 0 && (
                        <div className="text-sm">
                          <p className="font-semibold">Parts used</p>
                          <ul className="mt-1 list-disc space-y-1 pl-5 text-muted-foreground">
                            {repairParts(repair).map((part) => {
                              const detail = partsLookup.get(part.partId)
                              return (
                                <li key={`${repair.id}-${part.partId}`}>
                                  {detail?.name || part.partId} · Qty {part.quantity}
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      )}
                      {repair.verification && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">Verification:</span> {repair.verification}
                        </p>
                      )}
                      {repair.failureNote && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">Notes:</span> {repair.failureNote}
                        </p>
                      )}
                      {repair.attachments?.length ? (
                        <div className="flex flex-wrap gap-2">
                          {repair.attachments.map((attachment) => (
                            <Button
                              key={attachment.id}
                              variant="secondary"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => downloadAttachment(attachment)}
                            >
                              <Paperclip className="h-3 w-3" /> {attachment.title}
                            </Button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                  No repair actions logged yet.
                </div>
              )}

              <div className="rounded-lg border bg-muted/20 p-4">
                <form className="space-y-4" onSubmit={handleRepairSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="repair-actions">What was done?</Label>
                    <Textarea
                      id="repair-actions"
                      placeholder="Describe the repair steps that were taken"
                      value={repairForm.actions}
                      onChange={(event) => setRepairForm((prev) => ({ ...prev, actions: event.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="repair-success">Outcome</Label>
                      <select
                        id="repair-success"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                        value={repairForm.success ? 'true' : 'false'}
                        onChange={(event) => setRepairForm((prev) => ({ ...prev, success: event.target.value === 'true' }))}
                      >
                        {successOptions.map((option) => (
                          <option key={String(option.value)} value={String(option.value)}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="repair-root-cause">Root cause (optional)</Label>
                      <Input
                        id="repair-root-cause"
                        placeholder="e.g. Bearing misalignment"
                        value={repairForm.rootCause}
                        onChange={(event) => setRepairForm((prev) => ({ ...prev, rootCause: event.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Parts used</Label>
                    {repairForm.parts.length === 0 && (
                      <p className="text-xs text-muted-foreground">Add any spare parts that were consumed during this repair.</p>
                    )}
                    <div className="space-y-3">
                      {repairForm.parts.map((part, index) => (
                        <div key={`part-${index}`} className="flex flex-col gap-2 rounded-md border p-3 md:flex-row md:items-center">
                          <select
                            className="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                            value={part.partId}
                            onChange={(event) => updateRepairPart(index, 'partId', event.target.value)}
                          >
                            <option value="">Select part</option>
                            {parts.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                                {option.partNumber ? ` (${option.partNumber})` : ''}
                              </option>
                            ))}
                          </select>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min={1}
                              className="w-24"
                              value={part.quantity}
                              onChange={(event) => updateRepairPart(index, 'quantity', event.target.value)}
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeRepairPart(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button type="button" variant="secondary" size="sm" onClick={addRepairPart} disabled={partsLoading}>
                      <Plus className="mr-2 h-4 w-4" />
                      {partsLoading ? 'Loading parts...' : 'Add part'}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="repair-verification">Verification steps (optional)</Label>
                    <Textarea
                      id="repair-verification"
                      placeholder="How did you verify the fix?"
                      value={repairForm.verification}
                      onChange={(event) => setRepairForm((prev) => ({ ...prev, verification: event.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="repair-notes">Notes (optional)</Label>
                    <Textarea
                      id="repair-notes"
                      placeholder="Share any follow-up recommendations or observations"
                      value={repairForm.failureNote}
                      onChange={(event) => setRepairForm((prev) => ({ ...prev, failureNote: event.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Attachments</Label>
                    <input
                      ref={repairAttachmentInputRef}
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.txt"
                      className="hidden"
                      onChange={handleRepairAttachmentChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => repairAttachmentInputRef.current?.click()}
                    >
                      <Paperclip className="mr-2 h-4 w-4" /> Add files
                    </Button>
                    {repairForm.attachments.length > 0 && (
                      <ul className="space-y-2 rounded-md border bg-muted/30 p-3 text-sm">
                        {repairForm.attachments.map((file, index) => (
                          <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-2">
                            <div className="flex flex-col">
                              <span className="font-medium">{file.name}</span>
                              <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={() => removePendingRepairAttachment(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {repairFormError && <p className="text-sm text-destructive">{repairFormError}</p>}

                  <div className="flex justify-end">
                    <Button type="submit" disabled={repairSubmitting}>
                      {repairSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Log Repair
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Priority
                </span>
                <Badge
                  variant={
                    workOrder.priority === 'CRITICAL'
                      ? 'destructive'
                      : workOrder.priority === 'HIGH'
                      ? 'warning'
                      : 'outline'
                  }
                >
                  {workOrder.priority}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <User className="w-4 h-4" /> Assignee
                </span>
                <span className="text-sm font-medium">{workOrder.assignedTo?.name || 'Unassigned'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Created
                </span>
                <span className="text-sm font-medium">{formatDate(workOrder.createdAt || workOrder.reportedAt)}</span>
              </div>
              {workOrder.startedAt && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Started
                  </span>
                  <span className="text-sm font-medium">{formatDate(workOrder.startedAt)}</span>
                </div>
              )}
              {workOrder.completedAt && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Resolved
                  </span>
                  <span className="text-sm font-medium">{formatDate(workOrder.completedAt)}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Type</span>
                <span className="text-sm font-medium">{workOrder.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Machine</span>
                <span className="text-sm font-medium">{workOrder.machine?.name || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Reported By</span>
                <span className="text-sm font-medium">{workOrder.reportedBy?.name || '-'}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
