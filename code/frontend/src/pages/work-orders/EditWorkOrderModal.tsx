import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useTranslation } from 'react-i18next'
import { Edit, Trash2, Loader2, Check, ChevronDown, Search } from 'lucide-react'
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
import { api } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

const workOrderSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  machineId: z.string().min(1, { message: "Please select a machine" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
  type: z.enum(["Corrective", "Preventive", "Inspection"]),
  assignedToId: z.string().uuid().nullable().optional(),
})

type WorkOrderFormValues = z.infer<typeof workOrderSchema>

interface WorkOrder {
  id: string
  title: string
  descriptionRaw: string | null
  type: string
  priority: string
  machine: {
    id: string
    name: string
  } | null
  assignedTo: {
    id: string
    name: string
  } | null
}

interface Machine {
  id: string
  name: string
}

interface UserOption {
  id: string
  name: string
  email: string
  role: string
}

interface EditWorkOrderModalProps {
  workOrder: WorkOrder | null
  isOpen: boolean
  onClose: () => void
  onUpdate?: () => void
}

export default function EditWorkOrderModal({ workOrder, isOpen, onClose, onUpdate }: EditWorkOrderModalProps) {
  const { t } = useTranslation(['workOrders', 'common'])
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [machines, setMachines] = useState<Machine[]>([])
  const [loadingMachines, setLoadingMachines] = useState(true)
  const [machinesError, setMachinesError] = useState<string | null>(null)
  const [users, setUsers] = useState<UserOption[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [machineSearch, setMachineSearch] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<WorkOrderFormValues>({
    resolver: zodResolver(workOrderSchema),
    defaultValues: {
      priority: 'Medium',
      type: 'Corrective',
      assignedToId: null,
    }
  })

  // Reset form when work order changes
  useEffect(() => {
    if (workOrder) {
      reset({
        title: workOrder.title,
        machineId: workOrder.machine?.id || '',
        description: workOrder.descriptionRaw || '',
        type: workOrder.type as 'Corrective' | 'Preventive' | 'Inspection',
        priority: workOrder.priority as 'Low' | 'Medium' | 'High' | 'Critical',
        assignedToId: workOrder.assignedTo?.id || null,
      })
      setShowDeleteConfirm(false)
    }
  }, [workOrder, reset])

  useEffect(() => {
    if (!isOpen) return

    const fetchData = async () => {
      setMachinesError(null)
      setLoadingMachines(true)

      try {
        const machinesResponse = await api.get('/machines')
        const remoteMachines = machinesResponse.data.data || []

        setMachines(
          remoteMachines
            .filter((machine: any) => machine?.id && machine?.name)
            .map((machine: any) => ({
              id: machine.id,
              name: machine.name,
            })),
        )
      } catch (err: any) {
        setMachines([])
        setMachinesError(err?.response?.data?.error?.message || 'Failed to load machines')
      } finally {
        setLoadingMachines(false)
      }

      try {
        const usersResponse = await api.get('/users/list')
        setUsers(usersResponse.data.data || [])
      } catch (err: any) {
        console.error('Failed to load users:', err?.response?.data?.error?.message)
      } finally {
        setLoadingUsers(false)
      }
    }

    fetchData()
  }, [isOpen])

  const updateMutation = useMutation({
    mutationFn: async (data: WorkOrderFormValues) => {
      // Update work order details
      const updateData = {
        title: data.title,
        machineId: data.machineId,
        descriptionRaw: data.description,
        type: data.type.toUpperCase(),
        priority: data.priority.toUpperCase(),
      }
      await api.patch(`/work-orders/${workOrder?.id}`, updateData)

      // Update assignment separately
      if (data.assignedToId !== workOrder?.assignedTo?.id) {
        await api.patch(`/work-orders/${workOrder?.id}/assign`, {
          assignedToId: data.assignedToId || null
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workOrders'] })
      toast({
        title: t('workOrderUpdated'),
        description: t('workOrderUpdatedDescription'),
      })
      onUpdate?.() // Trigger parent component to refetch
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

  const isMachineSelectDisabled = loadingMachines || !!machinesError || machines.length === 0

  if (!workOrder) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Column: Main Content */}
              <div className="lg:col-span-3 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{t('common:title')}</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Vibration on gearbox"
                    {...register('title')}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="machineId">{t('common:machine')}</Label>
                  <Controller
                    control={control}
                    name="machineId"
                    render={({ field }) => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-between font-normal ${!field.value && "text-muted-foreground"}`}
                            disabled={isMachineSelectDisabled}
                          >
                            {(() => {
                              const m = machines.find(m => m.id === field.value);
                              return m ? m.name : "Select Machine";
                            })()}
                            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[500px]" align="start">
                          <div className="flex items-center border-b px-3">
                            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                            <Input
                              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 focus-visible:ring-0 px-0 shadow-none"
                              placeholder="Search machines..."
                              value={machineSearch}
                              onChange={(e) => setMachineSearch(e.target.value)}
                            />
                          </div>
                          <div className="max-h-[300px] overflow-y-auto p-1">
                            {machines
                              .filter(m => m.name.toLowerCase().includes(machineSearch.toLowerCase()))
                              .map(m => (
                                <DropdownMenuItem key={m.id} onSelect={() => field.onChange(m.id)}>
                                  {m.name}
                                  {field.value === m.id && <Check className="ml-auto h-4 w-4 opacity-50" />}
                                </DropdownMenuItem>
                              ))}
                            {machines.length === 0 && !loadingMachines && (
                              <div className="p-2 text-sm text-muted-foreground">{t('common:noMachinesFound')}</div>
                            )}
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  />
                  {errors.machineId && (
                    <p className="text-sm text-destructive">{errors.machineId.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{t('common:description')}</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the issue in detail..."
                    className="min-h-[150px] resize-y"
                    {...register('description')}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                  )}
                </div>
              </div>

              {/* Right Column: Metadata */}
              <div className="lg:col-span-1 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">{t('common:type')}</Label>
                  <Controller
                    control={control}
                    name="type"
                    render={({ field }) => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between font-normal">
                            {field.value}
                            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]" align="start">
                          {["Corrective", "Preventive", "Inspection"].map(type => (
                            <DropdownMenuItem key={type} onSelect={() => field.onChange(type)}>
                              {type}
                              {field.value === type && <Check className="ml-auto h-4 w-4 opacity-50" />}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">{t('common:priority')}</Label>
                  <Controller
                    control={control}
                    name="priority"
                    render={({ field }) => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between font-normal">
                            {field.value}
                            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]" align="start">
                          {["Low", "Medium", "High", "Critical"].map(priority => (
                            <DropdownMenuItem key={priority} onSelect={() => field.onChange(priority)}>
                              {priority}
                              {field.value === priority && <Check className="ml-auto h-4 w-4 opacity-50" />}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignedToId">{t('common:assignTo')}</Label>
                  <Controller
                    control={control}
                    name="assignedToId"
                    render={({ field }) => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between font-normal" disabled={loadingUsers}>
                            {(() => {
                              const user = users.find(u => u.id === field.value);
                              return user ? user.name : "Unassigned";
                            })()}
                            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]" align="start">
                          <DropdownMenuItem onSelect={() => field.onChange(null)}>
                            Unassigned
                          </DropdownMenuItem>
                          {users.map(u => (
                            <DropdownMenuItem key={u.id} onSelect={() => field.onChange(u.id)}>
                              <span>{u.name}</span>
                              <span className="ml-2 text-xs text-muted-foreground">({u.role})</span>
                              {field.value === u.id && <Check className="ml-auto h-4 w-4 opacity-50" />}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  />
                </div>
              </div>
            </div>

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
                  {t('common:actions.cancel')}
                </Button>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {t('common:actions.save')}
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
                {t('common:actions.cancel')}
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
                {t('common:actions.delete')}
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
