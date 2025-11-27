import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, ArrowLeft, User } from 'lucide-react'
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

export default function CreateWorkOrder() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [machines, setMachines] = useState<Machine[]>([])
  const [loadingMachines, setLoadingMachines] = useState(true)
  const [machinesError, setMachinesError] = useState<string | null>(null)
  const [users, setUsers] = useState<UserOption[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const { register, handleSubmit, formState: { errors } } = useForm<WorkOrderFormValues>({
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

  const onSubmit = async (data: WorkOrderFormValues) => {
    setIsLoading(true)
    setError(null)

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

      await api.post('/work-orders', apiData)
      navigate('/work-orders')
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: { message?: string } } } }
      setError(error?.response?.data?.error?.message || 'Failed to create work order')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
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
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="machineId">Machine</Label>
                    <select 
                        id="machineId"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        {...register('machineId')}
                        disabled={isMachineSelectDisabled}
                    >
                        <option value="">Select Machine</option>
                        {machines.map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                    </select>
                    {loadingMachines && (
                        <p className="text-sm text-muted-foreground">Loading machines...</p>
                    )}
                    {!loadingMachines && machinesError && (
                        <p className="text-sm text-destructive">{machinesError}</p>
                    )}
                    {!loadingMachines && !machinesError && machines.length === 0 && (
                        <p className="text-sm text-muted-foreground">No machines found. Add one to continue.</p>
                    )}
                    {errors.machineId && (
                        <p className="text-sm text-destructive">{errors.machineId.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <select 
                        id="priority"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        {...register('priority')}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <select 
                        id="type"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        {...register('type')}
                    >
                        <option value="Corrective">Corrective</option>
                        <option value="Preventive">Preventive</option>
                        <option value="Inspection">Inspection</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="assignedToId">Assign To (Optional)</Label>
                    <select 
                        id="assignedToId"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        {...register('assignedToId')}
                        disabled={loadingUsers}
                    >
                        <option value="">Unassigned</option>
                        {users.map(u => (
                            <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe the issue in detail..." 
                className="min-h-[150px]"
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2 p-3 bg-muted/50 rounded-md">
              <Label className="text-sm text-muted-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                Created By
              </Label>
              <p className="text-sm font-medium">{user?.name || 'Current User'}</p>
              <p className="text-xs text-muted-foreground">This work order will be created by you</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitDisabled}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Work Order
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
