import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { api } from '@/lib/api'

const partSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  partNumber: z.string().optional(),
  category: z.string().optional(),
  manufacturer: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  stockQty: z.number().int().min(0, { message: 'Stock must be 0 or greater' }),
  minStock: z.number().int().min(0, { message: 'Min stock must be 0 or greater' }),
  cost: z.number().min(0, { message: 'Must be 0 or greater' }).optional().or(z.undefined()),
})

type PartFormValues = z.infer<typeof partSchema>

const defaultValues: PartFormValues = {
  name: '',
  partNumber: '',
  category: '',
  manufacturer: '',
  location: '',
  description: '',
  stockQty: 0,
  minStock: 0,
  cost: undefined,
}

export default function CreatePart() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PartFormValues>({
    resolver: zodResolver(partSchema),
    defaultValues,
  })

  const onSubmit = async (values: PartFormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const payload = {
        name: values.name.trim(),
        partNumber: values.partNumber?.trim() || undefined,
        category: values.category?.trim() || undefined,
        manufacturer: values.manufacturer?.trim() || undefined,
        location: values.location?.trim() || undefined,
        description: values.description?.trim() || undefined,
        stockQty: values.stockQty,
        minStock: values.minStock,
        cost: typeof values.cost === 'number' ? values.cost : undefined,
      }

      await api.post('/parts', payload)
      reset(defaultValues)
      navigate('/parts')
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { error?: { message?: string } } } }
      setError(apiError?.response?.data?.error?.message || 'Failed to create part')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0 hover:bg-transparent">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Parts
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add Part</CardTitle>
          <CardDescription>Capture spec, stocking, and costing data for new spare parts.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" placeholder="e.g. Bearing 6203" {...register('name')} />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="partNumber">Part Number</Label>
                <Input id="partNumber" placeholder="OEM reference" {...register('partNumber')} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="e.g. Bearings" {...register('category')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manufacturer">Manufacturer</Label>
                <Input id="manufacturer" placeholder="OEM or supplier" {...register('manufacturer')} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Storage Location</Label>
                <Input id="location" placeholder="Aisle 4, Bin 12" {...register('location')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Unit Cost</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register('cost', {
                    valueAsNumber: true,
                    setValueAs: (v) => (v === '' || Number.isNaN(v) ? undefined : Number(v)),
                  })}
                />
                {errors.cost && <p className="text-sm text-destructive">{errors.cost.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stockQty">Current Stock</Label>
                <Input
                  id="stockQty"
                  type="number"
                  min={0}
                  step={1}
                  placeholder="0"
                  {...register('stockQty', { valueAsNumber: true })}
                />
                {errors.stockQty && <p className="text-sm text-destructive">{errors.stockQty.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="minStock">Minimum Stock</Label>
                <Input
                  id="minStock"
                  type="number"
                  min={0}
                  step={1}
                  placeholder="0"
                  {...register('minStock', { valueAsNumber: true })}
                />
                {errors.minStock && <p className="text-sm text-destructive">{errors.minStock.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Materials, compatible machines, sourcing notes..."
                {...register('description')}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate('/parts')}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Part
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}


