import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { api } from '@/lib/api'

const buildPartSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, { message: t('validation.nameMin') }),
    partNumber: z.string().optional(),
    category: z.string().optional(),
    manufacturer: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    stockQty: z.number().int().min(0, { message: t('validation.stockMin') }),
    minStock: z.number().int().min(0, { message: t('validation.minStockMin') }),
    cost: z.number().min(0, { message: t('validation.costMin') }).optional().or(z.undefined()),
  })

type PartFormValues = z.infer<ReturnType<typeof buildPartSchema>>

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
  const { t } = useTranslation(['parts', 'common'])
  const partSchema = useMemo(() => buildPartSchema(t), [t])

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
      setError(apiError?.response?.data?.error?.message || t('errors.create'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0 hover:bg-transparent">
        <ArrowLeft className="mr-2 h-4 w-4" /> {t('actions.backToParts')}
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{t('form.createTitle')}</CardTitle>
          <CardDescription>{t('form.createSubtitle')}</CardDescription>
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
                <Label htmlFor="name">{t('form.fields.name')}</Label>
                <Input id="name" placeholder={t('form.placeholders.name')} {...register('name')} />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="partNumber">{t('form.fields.partNumber')}</Label>
                <Input id="partNumber" placeholder={t('form.placeholders.partNumber')} {...register('partNumber')} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">{t('form.fields.category')}</Label>
                <Input id="category" placeholder={t('form.placeholders.category')} {...register('category')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manufacturer">{t('form.fields.manufacturer')}</Label>
                <Input id="manufacturer" placeholder={t('form.placeholders.manufacturer')} {...register('manufacturer')} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">{t('form.fields.location')}</Label>
                <Input id="location" placeholder={t('form.placeholders.location')} {...register('location')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">{t('form.fields.cost')}</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  placeholder={t('form.placeholders.cost')}
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
                <Label htmlFor="stockQty">{t('form.fields.stockQty')}</Label>
                <Input
                  id="stockQty"
                  type="number"
                  min={0}
                  step={1}
                  placeholder={t('form.placeholders.stock')}
                  {...register('stockQty', { valueAsNumber: true })}
                />
                {errors.stockQty && <p className="text-sm text-destructive">{errors.stockQty.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="minStock">{t('form.fields.minStock')}</Label>
                <Input
                  id="minStock"
                  type="number"
                  min={0}
                  step={1}
                  placeholder={t('form.placeholders.minStock')}
                  {...register('minStock', { valueAsNumber: true })}
                />
                {errors.minStock && <p className="text-sm text-destructive">{errors.minStock.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t('form.fields.description')}</Label>
              <Textarea
                id="description"
                placeholder={t('form.placeholders.description')}
                {...register('description')}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate('/parts')}>
              {t('form.cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('form.submitCreate')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}


