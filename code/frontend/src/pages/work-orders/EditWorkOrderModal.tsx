import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useTranslation } from 'react-i18next'
import { Edit, Trash2, Loader2, Check, ChevronDown, ChevronRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
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
  repairStartTime: z.string().nullable().optional(),
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

interface UserRef {
  id: string
  name: string
}

interface WorkOrder {
  id: string
  title: string
  descriptionRaw: string | null
  type?: string | null
  priority: string
  assetId?: string | null
  asset?: {
    id: string
    name: string
    pathString: string
  } | null
  machine?: {
    id: string
    name: string
  } | null
  assignedTo?: UserRef | null
  // Timestamps
  equipmentStopTime?: string | null
  faultReportTime?: string | null
  repairStartTime?: string | null
  maintenanceStartTime?: string | null
  maintenanceEndTime?: string | null
  // Classification
  maintenanceType?: string | null
  maintenanceDisciplines?: string[]
  // Text fields
  rootCause?: string | null
  maintenanceDescription?: string | null
  correctiveAction?: string | null
  notesAndRecommendations?: string | null
  // Equipment status
  equipmentStatusAfter?: string | null
  // Role assignments
  areaLeader?: UserRef | null
  maintenanceSupervisor?: UserRef | null
  performer?: UserRef | null
  machineReceiver?: UserRef | null
  responsibleEngineer?: UserRef | null
  maintenanceEngineer?: UserRef | null
  maintenanceManager?: UserRef | null
}

interface EditWorkOrderModalProps {
  workOrder: WorkOrder | null
  isOpen: boolean
  onClose: () => void
  onUpdate?: () => void
}

// Helper to format datetime-local input value
const formatDateTimeLocal = (dateStr: string | null | undefined): string => {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    return date.toISOString().slice(0, 16)
  } catch {
    return ''
  }
}

export default function EditWorkOrderModal({ workOrder, isOpen, onClose, onUpdate }: EditWorkOrderModalProps) {
  const { t } = useTranslation(['workOrders', 'common'])
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    timestamps: false,
    classification: false,
    details: false,
    roles: false,
  })

  const { register, handleSubmit, control, watch, formState: { errors }, reset } = useForm<WorkOrderFormValues>({
    resolver: zodResolver(workOrderSchema),
    defaultValues: {
      priority: 'MEDIUM',
      maintenanceDisciplines: [],
      maintenanceType: null,
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

  // Reset form when work order changes
  useEffect(() => {
    if (workOrder) {
      reset({
        title: workOrder.title,
        assetId: workOrder.assetId || workOrder.asset?.id || '',
        descriptionRaw: workOrder.descriptionRaw || '',
        priority: (workOrder.priority?.toUpperCase() as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL') || 'MEDIUM',
        // Timestamps
        equipmentStopTime: formatDateTimeLocal(workOrder.equipmentStopTime),
        faultReportTime: formatDateTimeLocal(workOrder.faultReportTime),
        repairStartTime: formatDateTimeLocal(workOrder.repairStartTime),
        maintenanceStartTime: formatDateTimeLocal(workOrder.maintenanceStartTime),
        maintenanceEndTime: formatDateTimeLocal(workOrder.maintenanceEndTime),
        // Classification
        maintenanceType: workOrder.maintenanceType || null,
        maintenanceDisciplines: workOrder.maintenanceDisciplines || [],
        // Text fields
        rootCause: workOrder.rootCause || '',
        maintenanceDescription: workOrder.maintenanceDescription || '',
        correctiveAction: workOrder.correctiveAction || '',
        notesAndRecommendations: workOrder.notesAndRecommendations || '',
        // Equipment status
        equipmentStatusAfter: workOrder.equipmentStatusAfter || null,
        // Role assignments
        assignedToId: workOrder.assignedTo?.id || null,
        areaLeaderId: workOrder.areaLeader?.id || null,
        maintenanceSupervisorId: workOrder.maintenanceSupervisor?.id || null,
        performerId: workOrder.performer?.id || null,
        machineReceiverId: workOrder.machineReceiver?.id || null,
        responsibleEngineerId: workOrder.responsibleEngineer?.id || null,
        maintenanceEngineerId: workOrder.maintenanceEngineer?.id || null,
        maintenanceManagerId: workOrder.maintenanceManager?.id || null,
      })
      setShowDeleteConfirm(false)
    }
  }, [workOrder, reset])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const updateMutation = useMutation({
    mutationFn: async (data: WorkOrderFormValues) => {
      const updateData = {
        title: data.title,
        assetId: data.assetId,
        descriptionRaw: data.descriptionRaw,
        priority: data.priority,
        // Timestamps
        equipmentStopTime: data.equipmentStopTime ? new Date(data.equipmentStopTime).toISOString() : null,
        faultReportTime: data.faultReportTime ? new Date(data.faultReportTime).toISOString() : null,
        repairStartTime: data.repairStartTime ? new Date(data.repairStartTime).toISOString() : null,
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
      await api.patch(`/work-orders/${workOrder?.id}`, updateData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workOrders'] })
      queryClient.invalidateQueries({ queryKey: ['workOrder', workOrder?.id] })
      toast({
        title: t('workOrderUpdated'),
        description: t('workOrderUpdatedDescription'),
      })
      onUpdate?.()
      onClose()
    },
    onError: (error) => {
      toast({
        title: t('updateFailed'),
        description: (error as any)?.response?.data?.error?.message || t('updateFailedDescription'),
        variant: 'destructive',
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/work-orders/${workOrder?.id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workOrders'] })
      toast({
        title: t('workOrderDeleted'),
        description: t('workOrderDeletedDescription'),
      })
      onClose()
      navigate('/work-orders')
    },
    onError: (error) => {
      toast({
        title: t('deleteFailed'),
        description: (error as any)?.response?.data?.error?.message || t('deleteFailedDescription'),
        variant: 'destructive',
      })
    },
  })

  const onSubmit = async (data: WorkOrderFormValues) => {
    if (!workOrder) return
    await updateMutation.mutateAsync(data)
  }

  const handleDelete = async () => {
    if (!workOrder) return
    await deleteMutation.mutateAsync()
  }

  if (!workOrder) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            {t('editWorkOrder')}
          </DialogTitle>
          <DialogDescription>
            {workOrder.title}
          </DialogDescription>
        </DialogHeader>

        {!showDeleteConfirm ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Basic Information Section */}
            <Collapsible open={expandedSections.basic} onOpenChange={() => toggleSection('basic')}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-2 h-auto">
                  <span className="font-semibold">{t('operatorSection', 'Basic Information')}</span>
                  {expandedSections.basic ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 pt-2">
                <Controller
                  control={control}
                  name="assetId"
                  render={({ field }) => (
                    <AssetPicker
                      value={field.value}
                      onChange={(assetId) => field.onChange(assetId || '')}
                      label={t('asset', 'Asset')}
                      placeholder={t('selectAsset', 'Select asset')}
                      error={errors.assetId?.message}
                    />
                  )}
                />

                <div className="space-y-2">
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

                <div className="space-y-2">
                  <Label htmlFor="descriptionRaw">{t('problemDescription', 'Problem Description')}</Label>
                  <Textarea
                    id="descriptionRaw"
                    placeholder={t('descriptionPlaceholder', 'Describe the issue in detail...')}
                    className="min-h-[100px] resize-y"
                    {...register('descriptionRaw')}
                  />
                  {errors.descriptionRaw && (
                    <p className="text-sm text-destructive">{errors.descriptionRaw.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Separator />

            {/* Timestamps Section */}
            <Collapsible open={expandedSections.timestamps} onOpenChange={() => toggleSection('timestamps')}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-2 h-auto">
                  <span className="font-semibold">{t('timestamps', 'Timestamps')}</span>
                  {expandedSections.timestamps ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4">
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
                    <Label htmlFor="repairStartTime">{t('repairStartTime', 'Repair Start Time')}</Label>
                    <Input
                      id="repairStartTime"
                      type="datetime-local"
                      {...register('repairStartTime')}
                    />
                  </div>

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
                    <div className="flex items-end">
                      <div className="p-3 bg-muted/50 rounded-md w-full">
                        <span className="text-sm text-muted-foreground">{t('calculatedDuration', 'Duration')}: </span>
                        <span className="font-medium">{calculatedDuration}</span>
                      </div>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Separator />

            {/* Classification Section */}
            <Collapsible open={expandedSections.classification} onOpenChange={() => toggleSection('classification')}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-2 h-auto">
                  <span className="font-semibold">{t('maintenanceSection', 'Maintenance Classification')}</span>
                  {expandedSections.classification ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4">
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
                </div>

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
              </CollapsibleContent>
            </Collapsible>

            <Separator />

            {/* Details Section */}
            <Collapsible open={expandedSections.details} onOpenChange={() => toggleSection('details')}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-2 h-auto">
                  <span className="font-semibold">{t('detailsSection', 'Details & Actions')}</span>
                  {expandedSections.details ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="rootCause">{t('rootCauseSection', 'Root Cause')}</Label>
                  <Textarea
                    id="rootCause"
                    placeholder={t('rootCausePlaceholder', 'Describe the root cause...')}
                    className="min-h-[80px] resize-y"
                    {...register('rootCause')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maintenanceDescription">{t('maintenanceDescriptionSection', 'Maintenance Description')}</Label>
                  <Textarea
                    id="maintenanceDescription"
                    placeholder={t('maintenanceDescriptionPlaceholder', 'Describe the maintenance work...')}
                    className="min-h-[80px] resize-y"
                    {...register('maintenanceDescription')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correctiveAction">{t('correctiveActionSection', 'Corrective Action')}</Label>
                  <Textarea
                    id="correctiveAction"
                    placeholder={t('correctiveActionPlaceholder', 'Describe the corrective action...')}
                    className="min-h-[80px] resize-y"
                    {...register('correctiveAction')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notesAndRecommendations">{t('notesSection', 'Notes & Recommendations')}</Label>
                  <Textarea
                    id="notesAndRecommendations"
                    placeholder={t('notesPlaceholder', 'Add any notes or recommendations...')}
                    className="min-h-[80px] resize-y"
                    {...register('notesAndRecommendations')}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Separator />

            {/* Role Assignments Section */}
            <Collapsible open={expandedSections.roles} onOpenChange={() => toggleSection('roles')}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-2 h-auto">
                  <span className="font-semibold">{t('roleAssignmentsSection', 'Role Assignments')}</span>
                  {expandedSections.roles ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4">
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
              </CollapsibleContent>
            </Collapsible>

            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                {t('deleteWorkOrder')}
              </Button>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  {t('cancel', 'Cancel')}
                </Button>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {t('common:actions.save', 'Save')}
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <Trash2 className="h-12 w-12 text-destructive mx-auto" />
              <h3 className="text-lg font-semibold">{t('deleteWorkOrder')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('deleteWorkOrderConfirm')}
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                {workOrder.id}
              </p>
            </div>
          </div>
        )}

        {showDeleteConfirm && (
          <DialogFooter>
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1"
              >
                {t('cancel', 'Cancel')}
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="flex-1"
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                {t('common:actions.delete', 'Delete')}
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
