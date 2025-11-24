import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, ArrowLeft } from 'lucide-react'

const workOrderSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  machineId: z.string().min(1, { message: "Please select a machine" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
  type: z.enum(["Corrective", "Preventive", "Inspection"]),
})

type WorkOrderFormValues = z.infer<typeof workOrderSchema>

const mockMachines = [
  { id: '1', name: 'Filler 01' },
  { id: '2', name: 'Labeler 02' },
  { id: '3', name: 'Packer 01' },
]

export default function CreateWorkOrder() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<WorkOrderFormValues>({
    resolver: zodResolver(workOrderSchema),
    defaultValues: {
      priority: 'Medium',
      type: 'Corrective'
    }
  })

  const onSubmit = async (data: WorkOrderFormValues) => {
    setIsLoading(true)
    console.log('Work Order data:', data)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    navigate('/work-orders')
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
                    >
                        <option value="">Select Machine</option>
                        {mockMachines.map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                    </select>
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
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Work Order
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

