import { useState, useEffect, useRef } from 'react'
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
import { Loader2, ArrowLeft, User, Paperclip, Trash2, Check, ChevronDown, Search } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { api } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'

const workOrderSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  machineId: z.string().min(1, { message: "Please select a machine" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
  type: z.enum(["Corrective", "Preventive", "Inspection"]),
  assignedToId: z.string().uuid().nullable().optional(),
})

type WorkOrderFormValues = z.infer<typeof workOrderSchema>

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

const formatFileSize = (bytes?: number | null) => {
  if (!bytes) return '-'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function CreateWorkOrder() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { t } = useTranslation('common')
  const [isLoading, setIsLoading] = useState(false)
  const [machines, setMachines] = useState<Machine[]>([])
  const [loadingMachines, setLoadingMachines] = useState(true)
  const [machinesError, setMachinesError] = useState<string | null>(null)
  const [users, setUsers] = useState<UserOption[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [attachments, setAttachments] = useState<File[]>([])
  const [attachmentError, setAttachmentError] = useState<string | null>(null)
  const attachmentInputRef = useRef<HTMLInputElement | null>(null)
  const [machineSearch, setMachineSearch] = useState('')

  const { register, handleSubmit, control, formState: { errors } } = useForm<WorkOrderFormValues>({
    resolver: zodResolver(workOrderSchema),
    defaultValues: {
      priority: 'Medium',
      type: 'Corrective',
      assignedToId: null,
    }
  })

  const isMachineSelectDisabled = loadingMachines || !!machinesError || machines.length === 0
  const isSubmitDisabled = isLoading || isMachineSelectDisabled

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMachinesError(null)
        setLoadingMachines(true)

        try {
          const machinesResponse = await api.get('/machines')
          const remoteMachines = Array.isArray(machinesResponse.data.data)
            ? machinesResponse.data.data
            : []

          setMachines(
            remoteMachines
              .filter((machine: { id?: string; name?: string }) => Boolean(machine?.id) && Boolean(machine?.name))
              .map((machine: { id: string; name: string }) => ({
                id: machine.id,
                name: machine.name,
              })),
          )
        } catch (err: unknown) {
          const error = err as { response?: { data?: { error?: { message?: string } } } }
          setMachines([])
          setMachinesError(error?.response?.data?.error?.message || 'Failed to load machines')
        } finally {
          setLoadingMachines(false)
        }

        // Fetch users for assignment
        try {
          const usersResponse = await api.get('/users/list')
          setUsers(usersResponse.data.data || [])
        } catch (err: unknown) {
          const error = err as { response?: { data?: { error?: { message?: string } } } }
          console.error('Failed to load users:', error?.response?.data?.error?.message)
        } finally {
          setLoadingUsers(false)
        }
      } catch {
        setError('Failed to load form data')
      }
    }

    fetchData()
  }, [])

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
        machineId: data.machineId,
        title: data.title,
        descriptionRaw: data.description,
        type: data.type.toUpperCase() as 'CORRECTIVE' | 'PREVENTIVE' | 'INSPECTION',
        priority: data.priority.toUpperCase() as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
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
        setAttachmentError('Work order created, but some attachments failed to upload. You can add them from the work order page.')
      }

      setAttachments([])
      if (workOrderId) {
        navigate(`/work-orders/${workOrderId}`)
      } else {
        navigate('/work-orders')
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: { message?: string } } } }
      setError(error?.response?.data?.error?.message || 'Failed to create work order')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0 hover:bg-transparent">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Create Work Order</CardTitle>
          <CardDescription>
            Log a new issue or maintenance task.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Column: Main Content */}
              <div className="lg:col-span-3 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
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
                  <Label htmlFor="machineId">Machine</Label>
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
                              <div className="p-2 text-sm text-muted-foreground">{t('noMachinesFound')}</div>
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
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the issue in detail..."
                    className="min-h-[200px] resize-y"
                    {...register('description')}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Include symptoms, alarms, noises, smells, leaks, and anything else that will help diagnose the issue quickly.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Attachments (optional)</Label>
                  <div className="flex flex-col gap-4 p-4 border rounded-lg bg-muted/20">
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => attachmentInputRef.current?.click()}
                        disabled={isLoading}
                      >
                        <Paperclip className="mr-2 h-4 w-4" />
                        Add files
                      </Button>
                      <p className="text-xs text-muted-foreground">Up to 25MB per file.</p>
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

                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                  <User className="w-4 h-4" />
                  <span>Created by <span className="font-medium text-foreground">{user?.name || 'Current User'}</span></span>
                </div>
              </div>

              {/* Right Column: Metadata */}
              <div className="lg:col-span-1 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
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
                  <Label htmlFor="priority">Priority</Label>
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
                  <Label htmlFor="assignedToId">Assign To</Label>
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
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6 bg-muted/10">
            <Button variant="ghost" type="button" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitDisabled} size="lg">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Work Order
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
