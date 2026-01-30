import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AssetPicker } from '@/components/assets'
import {
  useCreateAsset,
  useAsset,
  type Asset,
} from '@/lib/hooks/useAssets'
import {
  useFactoryConfig,
  getTranslatedHierarchyLevelName,
  getTranslatedStatusReason,
  getStatusReasons,
} from '@/lib/hooks/useFactoryConfig'

const createAssetSchema = z.object({
  name: z.string().min(1, 'English name is required'),
  nameAr: z.string().optional(),
  code: z.string().optional(),
  levelType: z.string().min(1, 'Level type is required'),
  status: z.enum(['RUNNING', 'DOWN']).optional(),
  statusReason: z.string().optional(),
  criticality: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  commissionedAt: z.string().optional(),
})

type CreateAssetFormValues = z.infer<typeof createAssetSchema>

export default function CreateAsset() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const preselectedParentId = searchParams.get('parentId')

  const { t, i18n } = useTranslation(['assets', 'common'])
  const currentLanguage = i18n.language

  const [parentId, setParentId] = useState<string | null>(preselectedParentId)
  const [parentAsset, setParentAsset] = useState<Asset | null>(null)
  const [error, setError] = useState<string | null>(null)

  const createAsset = useCreateAsset()
  const config = useFactoryConfig()
  const factoryConfig = config.data?.data
  const primaryLanguage = factoryConfig?.primaryLanguage || 'en'

  // Fetch parent to determine default level type
  const { data: parentResponse } = useAsset(preselectedParentId || undefined)

  // Determine the default level type based on parent depth
  const defaultLevelType = useMemo(() => {
    if (!factoryConfig) return ''
    const parentDepth = parentAsset?.depth ?? parentResponse?.data?.depth ?? -1
    const childDepth = parentDepth + 1
    const level = factoryConfig.hierarchyLevels.find((l) => l.depth === childDepth)
    return level?.key || factoryConfig.hierarchyLevels[0]?.key || ''
  }, [factoryConfig, parentAsset, parentResponse])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateAssetFormValues>({
    resolver: zodResolver(createAssetSchema),
    defaultValues: {
      name: '',
      nameAr: '',
      code: '',
      levelType: '',
      status: undefined,
      statusReason: '',
      criticality: undefined,
      commissionedAt: '',
    },
  })

  // Update levelType when default changes
  const levelTypeValue = watch('levelType')
  const statusValue = watch('status')

  // Set default levelType when factoryConfig and parent load
  useMemo(() => {
    if (defaultLevelType && !levelTypeValue) {
      setValue('levelType', defaultLevelType)
    }
  }, [defaultLevelType, levelTypeValue, setValue])

  // Get status reasons based on selected status
  const statusReasons = useMemo(() => {
    if (!factoryConfig || !statusValue) return []
    return getStatusReasons(factoryConfig, statusValue)
  }, [factoryConfig, statusValue])

  const onSubmit = async (values: CreateAssetFormValues) => {
    setError(null)

    try {
      const nameTranslations: Record<string, string> = {}
      if (values.nameAr?.trim()) {
        nameTranslations.ar = values.nameAr.trim()
      }

      await createAsset.mutateAsync({
        name: values.name,
        nameTranslations: Object.keys(nameTranslations).length > 0 ? nameTranslations : undefined,
        code: values.code?.trim() || undefined,
        levelType: values.levelType,
        parentId: parentId || undefined,
        status: values.status || undefined,
        statusReason: values.statusReason?.trim() || undefined,
        criticality: values.criticality || undefined,
        commissionedAt: values.commissionedAt
          ? new Date(values.commissionedAt).toISOString()
          : undefined,
      })

      navigate('/assets')
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { error?: { message?: string } } } }
      setError(apiError?.response?.data?.error?.message || t('messages.createError'))
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

            {/* Parent Asset Picker */}
            <div className="space-y-2">
              <AssetPicker
                value={parentId}
                onChange={(id, asset) => {
                  setParentId(id)
                  setParentAsset(asset)
                  // Auto-update level type based on parent depth
                  if (factoryConfig && asset) {
                    const childDepth = asset.depth + 1
                    const level = factoryConfig.hierarchyLevels.find((l) => l.depth === childDepth)
                    if (level) {
                      setValue('levelType', level.key)
                    }
                  } else if (factoryConfig && !asset) {
                    const rootLevel = factoryConfig.hierarchyLevels.find((l) => l.depth === 0)
                    if (rootLevel) {
                      setValue('levelType', rootLevel.key)
                    }
                  }
                }}
                label={t('form.parent')}
                placeholder={t('form.parentPlaceholder')}
              />
            </div>

            {/* Level Type */}
            <div className="space-y-2">
              <Label htmlFor="levelType">{t('form.levelType')} *</Label>
              <select
                id="levelType"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                {...register('levelType')}
              >
                <option value="">{t('filters.all')}</option>
                {factoryConfig?.hierarchyLevels.map((level) => (
                  <option key={level.key} value={level.key}>
                    {getTranslatedHierarchyLevelName(level, currentLanguage, primaryLanguage)}
                  </option>
                ))}
              </select>
              {errors.levelType && (
                <p className="text-sm text-destructive">{errors.levelType.message}</p>
              )}
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

            {/* Code */}
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
            <Button type="button" variant="outline" onClick={() => navigate('/assets')}>
              {t('form.cancel')}
            </Button>
            <Button type="submit" disabled={createAsset.isPending}>
              {createAsset.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('form.save')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
