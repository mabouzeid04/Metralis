import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Loader2 } from 'lucide-react'
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

export default function CreateMachine() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

  const onSubmit = async (values: MachineFormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const payload = {
        name: values.name,
        code: values.code?.trim() || undefined,
        category: values.category?.trim() || undefined,
        area: values.area?.trim() || undefined,
        line: values.line?.trim() || undefined,
        manufacturer: values.manufacturer?.trim() || undefined,
        model: values.model?.trim() || undefined,
        serialNumber: values.serialNumber?.trim() || undefined,
        commissionedAt: values.commissionedAt
          ? new Date(values.commissionedAt).toISOString()
          : undefined,
        status: values.status,
      }

      await api.post('/machines', payload)
      reset(defaultValues)
      navigate('/machines')
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { error?: { message?: string } } } }
      setError(apiError?.response?.data?.error?.message || t('errors.load'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0 hover:bg-transparent">
        <ArrowLeft className="mr-2 h-4 w-4" /> {t('form.back')}
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{t('form.createTitle')}</CardTitle>
          <CardDescription>{t('form.createDescription')}</CardDescription>
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
                <Label htmlFor="code">{t('form.fields.code')}</Label>
                <Input id="code" placeholder={t('form.placeholders.code')} {...register('code')} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">{t('form.fields.category')}</Label>
                <Input id="category" placeholder={t('form.placeholders.category')} {...register('category')} />
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
                <Input id="manufacturer" placeholder={t('form.placeholders.manufacturer')} {...register('manufacturer')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">{t('form.fields.model')}</Label>
                <Input id="model" placeholder={t('form.placeholders.model')} {...register('model')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serialNumber">{t('form.fields.serialNumber')}</Label>
                <Input id="serialNumber" placeholder={t('form.placeholders.serialNumber')} {...register('serialNumber')} />
              </div>
            </div>

          </CardContent>
          <CardFooter className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate('/machines')}>
              {t('form.cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('form.submit')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}


