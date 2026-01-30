import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, ArrowLeft, User, Paperclip, Trash2, Check, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import { AssetPicker } from '@/components/assets/AssetPicker'
import { UserPicker } from '@/components/shared/UserPicker'
import { DisciplineSelector } from '@/components/work-orders/DisciplineSelector'
import { MaintenanceTypeSelector } from '@/components/work-orders/MaintenanceTypeSelector'
import { StatusReasonSelector } from '@/components/work-orders/StatusReasonSelector'

const workOrderSchema = z.object({
  // Basic info
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  assetId: z.string().min(1, { message: "Please select an asset" }),
  descriptionRaw: z.string().min(10, { message: "Description must be at least 10 characters" }),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),

  // Timestamps
  equipmentStopTime: z.string().nullable().optional(),
  faultReportTime: z.string().nullable().optional(),
  maintenanceStartTime: z.string().nullable().optional(),
  maintenanceEndTime: z.string().nullable().optional(),

  // Classification
  maintenanceType: z.string().nullable().optional(),
  maintenanceDisciplines: z.array(z.string()).optional(),

  // Text fields
  rootCause: z.string().nullable().optional(),
  maintenanceDescription: z.string().nullable().optional(),
  correctiveAction: z.string().nullable().optional(),
  notesAndRecommendations: z.string().nullable().optional(),

  // Equipment status
  equipmentStatusAfter: z.string().nullable().optional(),

  // Role assignments
  areaLeaderId: z.string().uuid().nullable().optional(),
  maintenanceSupervisorId: z.string().uuid().nullable().optional(),
  performerId: z.string().uuid().nullable().optional(),
  machineReceiverId: z.string().uuid().nullable().optional(),
  responsibleEngineerId: z.string().uuid().nullable().optional(),
  maintenanceEngineerId: z.string().uuid().nullable().optional(),
  maintenanceManagerId: z.string().uuid().nullable().optional(),
  assignedToId: z.string().uuid().nullable().optional(),
})

type WorkOrderFormValues = z.infer<typeof workOrderSchema>

const formatFileSize = (bytes?: number | null) => {
  if (!bytes) return '-'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// Helper to format datetime-local input value
const formatDateTimeLocal = (date: Date | null): string => {
  if (!date) return ''
  return date.toISOString().slice(0, 16)
}

export default function CreateWorkOrder() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { t } = useTranslation('workOrders')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [attachments, setAttachments] = useState<File[]>([])
  const [attachmentError, setAttachmentError] = useState<string | null>(null)
  const attachmentInputRef = useRef<HTMLInputElement | null>(null)

  const now = new Date()

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<WorkOrderFormValues>({
    resolver: zodResolver(workOrderSchema),
    defaultValues: {
      priority: 'MEDIUM',
      faultReportTime: formatDateTimeLocal(now),
      maintenanceDisciplines: [],
      maintenanceType: null,
      areaLeaderId: null,
      maintenanceSupervisorId: null,
      performerId: null,
      machineReceiverId: null,
      responsibleEngineerId: null,
      maintenanceEngineerId: null,
      maintenanceManagerId: null,
      assignedToId: null,
      equipmentStatusAfter: null,
    }
  })

  const watchMaintenanceStart = watch('maintenanceStartTime')
  const watchMaintenanceEnd = watch('maintenanceEndTime')

  // Calculate duration
  const calculatedDuration = (() => {
    if (!watchMaintenanceStart || !watchMaintenanceEnd) return null
    const start = new Date(watchMaintenanceStart)
    const end = new Date(watchMaintenanceEnd)
    const diffMs = end.getTime() - start.getTime()
    if (diffMs < 0) return null
    const minutes = Math.round(diffMs / 60000)
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  })()

  const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : []
    if (!files.length) return
    setAttachments((prev) => [...prev, ...files])
    setAttachmentError(null)
    event.target.value = ''
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, idx) => idx !== index))
  }

  const uploadAttachments = async (workOrderId: string) => {
    if (!attachments.length) return
    for (const file of attachments) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', file.name)
      await api.post(`/work-orders/${workOrderId}/attachments`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    }
  }

  const onSubmit = async (data: WorkOrderFormValues) => {
    setIsLoading(true)
    setError(null)
    setAttachmentError(null)

    try {
      // Map form values to API format
      const apiData = {
        assetId: data.assetId,
        title: data.title,
        descriptionRaw: data.descriptionRaw,
        priority: data.priority,
        // Timestamps
        equipmentStopTime: data.equipmentStopTime ? new Date(data.equipmentStopTime).toISOString() : null,
        faultReportTime: data.faultReportTime ? new Date(data.faultReportTime).toISOString() : null,
        maintenanceStartTime: data.maintenanceStartTime ? new Date(data.maintenanceStartTime).toISOString() : null,
        maintenanceEndTime: data.maintenanceEndTime ? new Date(data.maintenanceEndTime).toISOString() : null,
        // Classification
        maintenanceType: data.maintenanceType || null,
        maintenanceDisciplines: data.maintenanceDisciplines || [],
        // Text fields
        rootCause: data.rootCause || null,
        maintenanceDescription: data.maintenanceDescription || null,
        correctiveAction: data.correctiveAction || null,
        notesAndRecommendations: data.notesAndRecommendations || null,
        // Equipment status
        equipmentStatusAfter: data.equipmentStatusAfter || null,
        // Role assignments
        areaLeaderId: data.areaLeaderId || null,
        maintenanceSupervisorId: data.maintenanceSupervisorId || null,
        performerId: data.performerId || null,
        machineReceiverId: data.machineReceiverId || null,
        responsibleEngineerId: data.responsibleEngineerId || null,
        maintenanceEngineerId: data.maintenanceEngineerId || null,
        maintenanceManagerId: data.maintenanceManagerId || null,
        assignedToId: data.assignedToId || null,
      }

      const response = await api.post('/work-orders', apiData)
      const workOrderId: string = response.data.data?.id

      try {
        if (workOrderId) {
          await uploadAttachments(workOrderId)
        }
      } catch (attachmentErr) {
        console.error('Failed to upload attachments', attachmentErr)
        setAttachmentError(t('attachmentUploadError', 'Work order created, but some attachments failed to upload.'))
      }

      setAttachments([])
      if (workOrderId) {
        navigate(`/work-orders/${workOrderId}`)
      } else {
        navigate('/work-orders')
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: { message?: string } } } }
      setError(error?.response?.data?.error?.message || t('createFailed', 'Failed to create work order'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0 hover:bg-transparent">
        <ArrowLeft className="mr-2 h-4 w-4" /> {t('backToList', 'Back to List')}
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{t('createWorkOrder', 'Create Work Order')}</CardTitle>
          <CardDescription>
            {t('createDescription', 'Log a new issue or maintenance task.')}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}

            {/* SECTION 1: Operator Section */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</span>
                {t('operatorSection', 'Operator Section')}
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <Controller
                    control={control}
                    name="assetId"
                    render={({ field }) => (
                      <AssetPicker
                        value={field.value}
                        onChange={(assetId) => {
                          field.onChange(assetId || '')
                        }}
                        label={t('asset', 'Asset')}
                        placeholder={t('selectAsset', 'Select machine, group, or component')}
                        error={errors.assetId?.message}
                      />
                    )}
                  />
                </div>

                <div className="lg:col-span-2 space-y-2">
                  <Label htmlFor="title">{t('title', 'Title')}</Label>
                  <Input
                    id="title"
                    placeholder={t('titlePlaceholder', 'e.g. Vibration on gearbox')}
                    {...register('title')}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>

                <div className="lg:col-span-2 space-y-2">
                  <Label htmlFor="descriptionRaw">{t('problemDescription', 'Problem Description')}</Label>
                  <Textarea
                    id="descriptionRaw"
                    placeholder={t('descriptionPlaceholder', 'Describe the issue in detail...')}
                    className="min-h-[150px] resize-y"
                    {...register('descriptionRaw')}
                  />
                  {errors.descriptionRaw && (
                    <p className="text-sm text-destructive">{errors.descriptionRaw.message}</p>
                  )}
                </div>

                <Controller
                  control={control}
                  name="areaLeaderId"
                  render={({ field }) => (
                    <UserPicker
                      value={field.value}
                      onChange={field.onChange}
                      label={t('areaLeader', 'Area Leader')}
                      placeholder={t('selectAreaLeader', 'Select area leader')}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="maintenanceSupervisorId"
                  render={({ field }) => (
                    <UserPicker
                      value={field.value}
                      onChange={field.onChange}
                      label={t('maintenanceSupervisor', 'Maintenance Supervisor')}
                      placeholder={t('selectMaintenanceSupervisor', 'Select supervisor')}
                    />
                  )}
                />

                <div className="space-y-2">
                  <Label htmlFor="equipmentStopTime">{t('equipmentStopTime', 'Equipment Stop Time')}</Label>
                  <Input
                    id="equipmentStopTime"
                    type="datetime-local"
                    {...register('equipmentStopTime')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="faultReportTime">{t('faultReportTime', 'Fault Report Time')}</Label>
                  <Input
                    id="faultReportTime"
                    type="datetime-local"
                    {...register('faultReportTime')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">{t('priority', 'Priority')}</Label>
                  <Controller
                    control={control}
                    name="priority"
                    render={({ field }) => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between font-normal">
                            {t(`priority_${field.value}`, field.value)}
                            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]" align="start">
                          {["LOW", "MEDIUM", "HIGH", "CRITICAL"].map(priority => (
                            <DropdownMenuItem key={priority} onSelect={() => field.onChange(priority)}>
                              {t(`priority_${priority}`, priority)}
                              {field.value === priority && <Check className="ml-auto h-4 w-4 opacity-50" />}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{t('createdBy', 'Created by')} <span className="font-medium text-foreground">{user?.name || t('currentUser', 'Current User')}</span></span>
                </div>
              </div>
            </section>

            <Separator />

            {/* SECTION 2: Maintenance Section */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">2</span>
                {t('maintenanceSection', 'Maintenance Section')}
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Controller
                  control={control}
                  name="maintenanceDisciplines"
                  render={({ field }) => (
                    <DisciplineSelector
                      value={field.value || []}
                      onChange={field.onChange}
                      label={t('maintenanceDisciplines', 'Maintenance Disciplines')}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="maintenanceType"
                  render={({ field }) => (
                    <MaintenanceTypeSelector
                      value={field.value || null}
                      onChange={field.onChange}
                      label={t('maintenanceType', 'Maintenance Type')}
                    />
                  )}
                />

                <div className="space-y-2">
                  <Label htmlFor="maintenanceStartTime">{t('maintenanceStartTime', 'Maintenance Start Time')}</Label>
                  <Input
                    id="maintenanceStartTime"
                    type="datetime-local"
                    {...register('maintenanceStartTime')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maintenanceEndTime">{t('maintenanceEndTime', 'Maintenance End Time')}</Label>
                  <Input
                    id="maintenanceEndTime"
                    type="datetime-local"
                    {...register('maintenanceEndTime')}
                  />
                </div>

                {calculatedDuration && (
                  <div className="lg:col-span-2 p-3 bg-muted/50 rounded-md">
                    <span className="text-sm text-muted-foreground">{t('calculatedDuration', 'Calculated Duration')}: </span>
                    <span className="font-medium">{calculatedDuration}</span>
                  </div>
                )}
              </div>
            </section>

            <Separator />

            {/* SECTION 3: Root Cause */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">3</span>
                {t('rootCauseSection', 'Root Cause')}
              </h3>

              <div className="space-y-2">
                <Textarea
                  id="rootCause"
                  placeholder={t('rootCausePlaceholder', 'Describe the root cause of the issue...')}
                  className="min-h-[100px] resize-y"
                  {...register('rootCause')}
                />
              </div>
            </section>

            <Separator />

            {/* SECTION 4: Maintenance Description */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">4</span>
                {t('maintenanceDescriptionSection', 'Maintenance Description')}
              </h3>

              <div className="space-y-2">
                <Textarea
                  id="maintenanceDescription"
                  placeholder={t('maintenanceDescriptionPlaceholder', 'Describe the maintenance work performed...')}
                  className="min-h-[100px] resize-y"
                  {...register('maintenanceDescription')}
                />
              </div>
            </section>

            <Separator />

            {/* SECTION 5: Corrective Action */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">5</span>
                {t('correctiveActionSection', 'Corrective Action')}
              </h3>

              <div className="space-y-2">
                <Textarea
                  id="correctiveAction"
                  placeholder={t('correctiveActionPlaceholder', 'Describe the corrective action taken...')}
                  className="min-h-[100px] resize-y"
                  {...register('correctiveAction')}
                />
              </div>
            </section>

            <Separator />

            {/* SECTION 6: Parts & Status */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">6</span>
                {t('partsStatusSection', 'Parts & Status')}
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Controller
                  control={control}
                  name="equipmentStatusAfter"
                  render={({ field }) => (
                    <StatusReasonSelector
                      value={field.value || null}
                      onChange={field.onChange}
                      status="RUNNING"
                      label={t('equipmentStatusAfter', 'Equipment Status After Maintenance')}
                      placeholder={t('selectEquipmentStatus', 'Select status')}
                    />
                  )}
                />

                <div className="space-y-2">
                  <Label>{t('attachments', 'Attachments')} ({t('optional', 'optional')})</Label>
                  <div className="flex flex-col gap-4 p-4 border rounded-lg bg-muted/20">
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => attachmentInputRef.current?.click()}
                        disabled={isLoading}
                      >
                        <Paperclip className="mr-2 h-4 w-4" />
                        {t('addFiles', 'Add files')}
                      </Button>
                      <p className="text-xs text-muted-foreground">{t('maxFileSize', 'Up to 25MB per file.')}</p>
                    </div>
                    <input
                      ref={attachmentInputRef}
                      type="file"
                      accept="image/*,.pdf,.doc,.docx,.txt"
                      multiple
                      className="hidden"
                      onChange={handleAttachmentChange}
                    />

                    {attachmentError && (
                      <p className="text-sm text-destructive">{attachmentError}</p>
                    )}

                    {attachments.length > 0 && (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {attachments.map((file, index) => (
                          <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-2 p-2 rounded border bg-background text-sm">
                            <div className="flex items-center gap-2 truncate">
                              <Paperclip className="h-3 w-3 text-muted-foreground shrink-0" />
                              <span className="truncate">{file.name}</span>
                              <span className="text-xs text-muted-foreground ml-1 shrink-0">({formatFileSize(file.size)})</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 shrink-0"
                              onClick={() => removeAttachment(index)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* SECTION 7: Notes */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">7</span>
                {t('notesSection', 'Notes & Recommendations')}
              </h3>

              <div className="space-y-2">
                <Textarea
                  id="notesAndRecommendations"
                  placeholder={t('notesPlaceholder', 'Add any notes or recommendations...')}
                  className="min-h-[100px] resize-y"
                  {...register('notesAndRecommendations')}
                />
              </div>
            </section>

            <Separator />

            {/* SECTION 8: Role Assignments */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">8</span>
                {t('roleAssignmentsSection', 'Role Assignments')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Controller
                  control={control}
                  name="assignedToId"
                  render={({ field }) => (
                    <UserPicker
                      value={field.value}
                      onChange={field.onChange}
                      label={t('assignedTo', 'Assigned To')}
                      placeholder={t('selectAssignee', 'Select assignee')}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="performerId"
                  render={({ field }) => (
                    <UserPicker
                      value={field.value}
                      onChange={field.onChange}
                      label={t('performer', 'Performer')}
                      placeholder={t('selectPerformer', 'Select performer')}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="machineReceiverId"
                  render={({ field }) => (
                    <UserPicker
                      value={field.value}
                      onChange={field.onChange}
                      label={t('machineReceiver', 'Machine Receiver')}
                      placeholder={t('selectMachineReceiver', 'Select receiver')}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="responsibleEngineerId"
                  render={({ field }) => (
                    <UserPicker
                      value={field.value}
                      onChange={field.onChange}
                      label={t('responsibleEngineer', 'Responsible Engineer')}
                      placeholder={t('selectResponsibleEngineer', 'Select engineer')}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="maintenanceEngineerId"
                  render={({ field }) => (
                    <UserPicker
                      value={field.value}
                      onChange={field.onChange}
                      label={t('maintenanceEngineer', 'Maintenance Engineer')}
                      placeholder={t('selectMaintenanceEngineer', 'Select engineer')}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="maintenanceManagerId"
                  render={({ field }) => (
                    <UserPicker
                      value={field.value}
                      onChange={field.onChange}
                      label={t('maintenanceManager', 'Maintenance Manager')}
                      placeholder={t('selectMaintenanceManager', 'Select manager')}
                    />
                  )}
                />
              </div>
            </section>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6 bg-muted/10">
            <Button variant="ghost" type="button" onClick={() => navigate(-1)}>
              {t('cancel', 'Cancel')}
            </Button>
            <Button type="submit" disabled={isLoading} size="lg">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('createWorkOrder', 'Create Work Order')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
