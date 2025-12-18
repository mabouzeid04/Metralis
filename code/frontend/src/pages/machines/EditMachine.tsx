import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { api } from '@/lib/api'

const buildMachineSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, { message: t('validation.nameMin') }),
    code: z.string().optional(),
    category: z.string().optional(),
    area: z.string().optional(),
    line: z.string().optional(),
    manufacturer: z.string().optional(),
    model: z.string().optional(),
    serialNumber: z.string().optional(),
    commissionedAt: z.string().optional(),
    status: z.enum(['RUNNING', 'DOWN', 'MAINTENANCE', 'RETIRED']),
  })

type MachineFormValues = z.infer<ReturnType<typeof buildMachineSchema>>

type MachineResponse = {
  id: string
  name: string
  code: string | null
  category: string | null
  area: string | null
  line: string | null
  manufacturer: string | null
  model: string | null
  serialNumber: string | null
  commissionedAt: string | null
  status: 'RUNNING' | 'DOWN' | 'MAINTENANCE' | 'RETIRED'
}

const defaultValues: MachineFormValues = {
  name: '',
  code: '',
  category: '',
  area: '',
  line: '',
  manufacturer: '',
  model: '',
  serialNumber: '',
  commissionedAt: '',
  status: 'RUNNING',
}

function formatDateInput(value: string | null) {
  if (!value) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0]
}

export default function EditMachine() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const { t } = useTranslation(['machines', 'common'])
  const machineSchema = buildMachineSchema(t)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MachineFormValues>({
    resolver: zodResolver(machineSchema),
    defaultValues,
  })

  useEffect(() => {
    const fetchMachine = async () => {
      if (!id) return
      setLoading(true)
      setError(null)

      try {
        const response = await api.get(`/machines/${id}`)
        const machine = response.data.data as MachineResponse

        reset({
          name: machine.name,
          code: machine.code || '',
          category: machine.category || '',
          area: machine.area || '',
          line: machine.line || '',
          manufacturer: machine.manufacturer || '',
          model: machine.model || '',
          serialNumber: machine.serialNumber || '',
          commissionedAt: formatDateInput(machine.commissionedAt),
          status: machine.status,
        })
      } catch (err: unknown) {
        const apiError = err as { response?: { data?: { error?: { message?: string } } } }
        setError(apiError?.response?.data?.error?.message || t('errors.notFound'))
      } finally {
        setLoading(false)
      }
    }

    fetchMachine()
  }, [id, reset, t])

  const onSubmit = async (values: MachineFormValues) => {
    if (!id) return
    setIsSubmitting(true)
    setError(null)
    setDeleteError(null)

    try {
      const payload = {
        name: values.name.trim(),
        code: values.code?.trim(),
        category: values.category?.trim(),
        area: values.area?.trim(),
        line: values.line?.trim(),
        manufacturer: values.manufacturer?.trim(),
        model: values.model?.trim(),
        serialNumber: values.serialNumber?.trim(),
        commissionedAt: values.commissionedAt
          ? new Date(values.commissionedAt).toISOString()
          : '',
        status: values.status,
      }

      await api.patch(`/machines/${id}`, payload)
      navigate(`/machines/${id}`)
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { error?: { message?: string } } } }
      setError(apiError?.response?.data?.error?.message || t('errors.update'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!id || deleting) return
    const confirmed = window.confirm(t('actions.deleteConfirm'))
    if (!confirmed) return

    setDeleting(true)
    setDeleteError(null)
    try {
      await api.delete(`/machines/${id}`)
      navigate('/machines')
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { error?: { message?: string } } } }
      setDeleteError(apiError?.response?.data?.error?.message || t('errors.deleteFailed'))
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => navigate(-1)}>{t('form.back')}</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0 hover:bg-transparent">
        <ArrowLeft className="mr-2 h-4 w-4" /> {t('form.back')}
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{t('form.editTitle')}</CardTitle>
          <CardDescription>{t('form.editDescription')}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}
            {deleteError && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {deleteError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('form.fields.name')}</Label>
                <Input id="name" placeholder={t('form.placeholders.name')} {...register('name')} />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">{t('form.fields.code')}</Label>
                <Input id="code" placeholder={t('form.placeholders.code')} {...register('code')} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">{t('form.fields.category')}</Label>
                <Input
                  id="category"
                  placeholder={t('form.placeholders.category')}
                  {...register('category')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">{t('form.fields.status')}</Label>
                <select
                  id="status"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  {...register('status')}
                >
                  <option value="RUNNING">{t('common:status.running')}</option>
                  <option value="DOWN">{t('common:status.down')}</option>
                  <option value="MAINTENANCE">{t('common:status.maintenance')}</option>
                  <option value="RETIRED">{t('common:status.retired')}</option>
                </select>
                {errors.status && (
                  <p className="text-sm text-destructive">{errors.status.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="area">{t('form.fields.area')}</Label>
                <Input id="area" placeholder={t('form.placeholders.area')} {...register('area')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="line">{t('form.fields.line')}</Label>
                <Input id="line" placeholder={t('form.placeholders.line')} {...register('line')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="commissionedAt">{t('form.fields.commissionedAt')}</Label>
                <Input id="commissionedAt" type="date" {...register('commissionedAt')} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="manufacturer">{t('form.fields.manufacturer')}</Label>
                <Input
                  id="manufacturer"
                  placeholder={t('form.placeholders.manufacturer')}
                  {...register('manufacturer')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">{t('form.fields.model')}</Label>
                <Input id="model" placeholder={t('form.placeholders.model')} {...register('model')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serialNumber">{t('form.fields.serialNumber')}</Label>
                <Input
                  id="serialNumber"
                  placeholder={t('form.placeholders.serialNumber')}
                  {...register('serialNumber')}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap justify-between items-center gap-3">
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('actions.delete')}
            </Button>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => navigate(`/machines/${id}`)}>
                {t('form.cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('common:actions.saveChanges')}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
