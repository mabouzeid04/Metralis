import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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

type PartApiResponse = {
  id: string
  name: string
  partNumber?: string | null
  category?: string | null
  manufacturer?: string | null
  location?: string | null
  description?: string | null
  stockQty?: number | null
  minStock?: number | null
  cost?: number | string | null
}

const parseNumber = (value: unknown, fallback = 0) => {
  if (value === null || value === undefined) return fallback
  const parsed = Number(value)
  return Number.isNaN(parsed) ? fallback : parsed
}

const parseOptionalNumber = (value: unknown) => {
  if (value === null || value === undefined) return undefined
  const parsed = Number(value)
  return Number.isNaN(parsed) ? undefined : parsed
}

const getApiError = (err: unknown) =>
  (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message

export default function EditPart() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation(['parts', 'common'])
  const partSchema = useMemo(() => buildPartSchema(t), [t])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    const fetchPart = async () => {
      if (!id) {
        setError(t('errors.notFound'))
        setLoading(false)
        return
      }
      setLoading(true)
      setError(null)
      try {
        const { data } = await api.get<{ data?: PartApiResponse }>(`/parts/${id}`)
        const part = data?.data
        if (!part) {
        throw new Error(t('errors.notFound'))
        }
        const values: PartFormValues = {
          name: part.name,
          partNumber: part.partNumber || '',
          category: part.category || '',
          manufacturer: part.manufacturer || '',
          location: part.location || '',
          description: part.description || '',
          stockQty: parseNumber(part.stockQty, 0),
          minStock: parseNumber(part.minStock, 0),
          cost: parseOptionalNumber(part.cost),
        }
        reset(values)
      } catch (err: unknown) {
        setError(getApiError(err) || t('errors.loadDetail'))
      } finally {
        setLoading(false)
      }
    }

    fetchPart()
  }, [id, reset, t])

  const onSubmit = async (values: PartFormValues) => {
    if (!id) {
      setError(t('errors.notFound'))
      return
    }
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

      await api.patch(`/parts/${id}`, payload)
      navigate(`/parts/${id}`)
    } catch (err: unknown) {
      setError(getApiError(err) || t('errors.update'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0 hover:bg-transparent">
        <ArrowLeft className="mr-2 h-4 w-4" /> {t('actions.backToPart')}
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{t('form.editTitle')}</CardTitle>
          <CardDescription>{t('form.editSubtitle')}</CardDescription>
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
            <Button type="button" variant="outline" onClick={() => navigate(`/parts/${id ?? ''}`)}>
              {t('form.cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('form.submitEdit')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
