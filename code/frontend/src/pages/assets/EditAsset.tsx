import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Loader2, ServerOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import {
  useAsset,
  useUpdateAsset,
  getAssetTranslatedName,
} from '@/lib/hooks/useAssets'
import {
  useFactoryConfig,
  getTranslatedHierarchyLevelName,
  getTranslatedStatusReason,
  getStatusReasons,
} from '@/lib/hooks/useFactoryConfig'

const editAssetSchema = z.object({
  name: z.string().min(1, 'English name is required'),
  nameAr: z.string().optional(),
  code: z.string().optional(),
  status: z.enum(['RUNNING', 'DOWN']).optional(),
  statusReason: z.string().optional(),
  criticality: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  commissionedAt: z.string().optional(),
})

type EditAssetFormValues = z.infer<typeof editAssetSchema>

export default function EditAsset() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation(['assets', 'common'])
  const currentLanguage = i18n.language

  const [error, setError] = useState<string | null>(null)

  const { data: assetResponse, isLoading, error: loadError } = useAsset(id)
  const asset = assetResponse?.data

  const updateAsset = useUpdateAsset()
  const config = useFactoryConfig()
  const factoryConfig = config.data?.data
  const primaryLanguage = factoryConfig?.primaryLanguage || 'en'

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EditAssetFormValues>({
    resolver: zodResolver(editAssetSchema),
    defaultValues: {
      name: '',
      nameAr: '',
      code: '',
      status: undefined,
      statusReason: '',
      criticality: undefined,
      commissionedAt: '',
    },
  })

  // Populate form when asset loads
  useEffect(() => {
    if (asset) {
      reset({
        name: asset.name,
        nameAr: asset.nameTranslations?.ar || '',
        code: asset.code || '',
        status: asset.status || undefined,
        statusReason: asset.statusReason || '',
        criticality: asset.criticality || undefined,
        commissionedAt: asset.commissionedAt
          ? new Date(asset.commissionedAt).toISOString().split('T')[0]
          : '',
      })
    }
  }, [asset, reset])

  const statusValue = watch('status')

  // Get status reasons based on selected status
  const statusReasons = useMemo(() => {
    if (!factoryConfig || !statusValue) return []
    return getStatusReasons(factoryConfig, statusValue)
  }, [factoryConfig, statusValue])

  // Get level name
  const levelName = useMemo(() => {
    if (!asset || !factoryConfig) return asset?.levelType || ''
    const level = factoryConfig.hierarchyLevels.find((l) => l.key === asset.levelType)
    if (level) {
      return getTranslatedHierarchyLevelName(level, currentLanguage, factoryConfig.primaryLanguage)
    }
    return asset.levelType
  }, [asset, factoryConfig, currentLanguage])

  const onSubmit = async (values: EditAssetFormValues) => {
    if (!id) return
    setError(null)

    try {
      const nameTranslations: Record<string, string> = {}
      if (values.nameAr?.trim()) {
        nameTranslations.ar = values.nameAr.trim()
      }

      await updateAsset.mutateAsync({
        id,
        input: {
          name: values.name,
          nameTranslations: Object.keys(nameTranslations).length > 0 ? nameTranslations : undefined,
          code: values.code?.trim() || undefined,
          status: values.status || undefined,
          statusReason: values.statusReason?.trim() || undefined,
          criticality: values.criticality || undefined,
          commissionedAt: values.commissionedAt
            ? new Date(values.commissionedAt).toISOString()
            : undefined,
        },
      })

      navigate(`/assets/${id}`)
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { error?: { message?: string } } } }
      setError(apiError?.response?.data?.error?.message || t('messages.updateError'))
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (loadError || !asset) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <ServerOff className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">{t('detail.notFound')}</p>
        <Button asChild>
          <Link to="/assets">{t('form.back')}</Link>
        </Button>
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
          <CardDescription>
            {t('form.editDescription')} - {getAssetTranslatedName(asset, currentLanguage, primaryLanguage)}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}

            {/* Level (read-only) */}
            <div className="space-y-2">
              <Label>{t('form.levelType')}</Label>
              <div className="flex h-9 w-full items-center rounded-md border border-input bg-muted/50 px-3 py-1 text-sm">
                {levelName}
              </div>
            </div>

            {/* Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('form.name')} *</Label>
                <Input
                  id="name"
                  placeholder="e.g. Freeze Dryer"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="nameAr">{t('form.nameAr')}</Label>
                <Input
                  id="nameAr"
                  placeholder="مثال: خط التجفيد"
                  dir="rtl"
                  {...register('nameAr')}
                />
              </div>
            </div>

            {/* Code & Commissioned */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">{t('form.code')}</Label>
                <Input
                  id="code"
                  placeholder={t('form.codePlaceholder')}
                  {...register('code')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="commissionedAt">{t('form.commissionedAt')}</Label>
                <Input
                  id="commissionedAt"
                  type="date"
                  {...register('commissionedAt')}
                />
              </div>
            </div>

            {/* Status & Reason */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">{t('form.status')}</Label>
                <select
                  id="status"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  {...register('status')}
                  onChange={(e) => {
                    const val = e.target.value as 'RUNNING' | 'DOWN' | ''
                    setValue('status', val || undefined)
                    setValue('statusReason', '')
                  }}
                >
                  <option value="">--</option>
                  <option value="RUNNING">{t('status.running')}</option>
                  <option value="DOWN">{t('status.down')}</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="statusReason">{t('form.statusReason')}</Label>
                <select
                  id="statusReason"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  {...register('statusReason')}
                  disabled={!statusValue}
                >
                  <option value="">--</option>
                  {statusReasons.map((reason) => (
                    <option key={reason.id} value={reason.id}>
                      {getTranslatedStatusReason(reason, currentLanguage, primaryLanguage)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Criticality */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="criticality">{t('form.criticality')}</Label>
                <select
                  id="criticality"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  {...register('criticality')}
                >
                  <option value="">--</option>
                  <option value="LOW">{t('criticality.low')}</option>
                  <option value="MEDIUM">{t('criticality.medium')}</option>
                  <option value="HIGH">{t('criticality.high')}</option>
                  <option value="CRITICAL">{t('criticality.critical')}</option>
                </select>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate(`/assets/${id}`)}>
              {t('form.cancel')}
            </Button>
            <Button type="submit" disabled={updateAsset.isPending}>
              {updateAsset.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('form.save')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
