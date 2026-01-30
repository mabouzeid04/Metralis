import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Loader2,
  ServerOff,
  ArrowLeft,
  Pencil,
  Plus,
  FileText,
  Wrench,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/shared/StatusBadge'
import {
  useAsset,
  useAssetAncestors,
  getAssetTranslatedName,
  getAssetTranslatedPath,
} from '@/lib/hooks/useAssets'
import {
  useFactoryConfig,
  getTranslatedHierarchyLevelName,
  getTranslatedStatusReason,
} from '@/lib/hooks/useFactoryConfig'
import { useAuth } from '@/contexts/AuthContext'

export default function AssetDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const isAdmin = user?.role === 'ADMIN'
  const { t, i18n } = useTranslation(['assets', 'common'])
  const currentLanguage = i18n.language

  const { data: assetResponse, isLoading, error } = useAsset(id)
  const asset = assetResponse?.data

  const { data: ancestorsResponse } = useAssetAncestors(id)
  const ancestors = ancestorsResponse?.data || []

  const config = useFactoryConfig()
  const factoryConfig = config.data?.data
  const primaryLanguage = factoryConfig?.primaryLanguage || 'en'

  // Get translated names
  const assetName = useMemo(() => {
    if (!asset) return ''
    return getAssetTranslatedName(asset, currentLanguage, primaryLanguage)
  }, [asset, currentLanguage, primaryLanguage])

  const levelName = useMemo(() => {
    if (!asset || !factoryConfig) return asset?.levelType || ''
    const level = factoryConfig.hierarchyLevels.find((l) => l.key === asset.levelType)
    if (level) {
      return getTranslatedHierarchyLevelName(level, currentLanguage, factoryConfig.primaryLanguage)
    }
    return asset.levelType
  }, [asset, factoryConfig, currentLanguage])

  const statusReasonDisplay = useMemo(() => {
    if (!asset?.statusReason || !factoryConfig || !asset.status) return null
    const reasons = factoryConfig.statusReasonOptions[asset.status] || []
    const reason = reasons.find((r) => r.id === asset.statusReason)
    if (reason) {
      return getTranslatedStatusReason(reason, currentLanguage, factoryConfig.primaryLanguage)
    }
    return asset.statusReason
  }, [asset, factoryConfig, currentLanguage])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !asset) {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/assets">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1 flex-wrap">
                <Link to="/assets" className="hover:underline">
                  {t('title')}
                </Link>
                {ancestors.map((ancestor) => (
                  <span key={ancestor.id} className="flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" />
                    <Link to={`/assets/${ancestor.id}`} className="hover:underline">
                      {getAssetTranslatedName(ancestor, currentLanguage, primaryLanguage)}
                    </Link>
                  </span>
                ))}
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground">{assetName}</span>
              </div>

              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-3xl font-bold tracking-tight">{assetName}</h2>
                {asset.status && <StatusBadge status={asset.status} />}
              </div>
              <p className="text-muted-foreground flex items-center gap-2 flex-wrap">
                <Badge variant="outline">{levelName}</Badge>
                {asset.code && <span>{asset.code}</span>}
                {statusReasonDisplay && (
                  <>
                    <span>-</span>
                    <span>{statusReasonDisplay}</span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link to={`/work-orders/new?asset=${asset.id}`}>
              <Wrench className="mr-2 h-4 w-4" />
              {t('actions.createWorkOrder')}
            </Link>
          </Button>
          {isAdmin && (
            <>
              <Button variant="outline" asChild>
                <Link to={`/assets/new?parentId=${asset.id}`}>
                  <Plus className="mr-2 h-4 w-4" />
                  {t('actions.addChild')}
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link to={`/assets/${asset.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  {t('actions.edit')}
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overview Card */}
        <Card className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="text-lg">{t('detail.overview')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">{t('detail.code')}</span>
              <span className="font-medium text-right">{asset.code || t('detail.notAvailable')}</span>

              <span className="text-muted-foreground">{t('detail.level')}</span>
              <span className="font-medium text-right">{levelName}</span>

              <span className="text-muted-foreground">{t('detail.status')}</span>
              <span className="font-medium text-right">
                {asset.status ? (
                  <StatusBadge status={asset.status} />
                ) : (
                  t('detail.notAvailable')
                )}
              </span>

              {statusReasonDisplay && (
                <>
                  <span className="text-muted-foreground">{t('detail.statusReason')}</span>
                  <span className="font-medium text-right">{statusReasonDisplay}</span>
                </>
              )}

              <span className="text-muted-foreground">{t('detail.criticality')}</span>
              <span className="font-medium text-right">
                {asset.criticality ? (
                  <Badge
                    variant={
                      asset.criticality === 'CRITICAL'
                        ? 'destructive'
                        : asset.criticality === 'HIGH'
                        ? 'warning'
                        : 'secondary'
                    }
                  >
                    {t(`criticality.${asset.criticality.toLowerCase()}`)}
                  </Badge>
                ) : (
                  t('detail.notAvailable')
                )}
              </span>

              <span className="text-muted-foreground">{t('detail.commissioned')}</span>
              <span className="font-medium text-right">
                {asset.commissionedAt
                  ? new Date(asset.commissionedAt).toLocaleDateString()
                  : t('detail.notAvailable')}
              </span>

              <span className="text-muted-foreground">{t('detail.updated')}</span>
              <span className="font-medium text-right">
                {new Date(asset.updatedAt).toLocaleDateString()}
              </span>
            </div>

            {/* Path */}
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">{t('detail.path')}</h4>
              <p className="text-sm text-muted-foreground">
                {getAssetTranslatedPath(asset, currentLanguage, primaryLanguage)}
              </p>
            </div>

            {/* Arabic name if available and language is EN */}
            {currentLanguage !== 'ar' && asset.nameTranslations?.ar && (
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">{t('form.nameAr')}</h4>
                <p className="text-sm text-muted-foreground" dir="rtl">
                  {asset.nameTranslations.ar}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right column */}
        <div className="md:col-span-2 space-y-6">
          {/* Children / Sub-assets */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{t('detail.children')}</CardTitle>
              {isAdmin && (
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/assets/new?parentId=${asset.id}`}>
                    <Plus className="mr-2 h-4 w-4" />
                    {t('addChild')}
                  </Link>
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {asset.children && asset.children.length > 0 ? (
                <div className="space-y-1">
                  {asset.children.map((child) => (
                    <Link
                      key={child.id}
                      to={`/assets/${child.id}`}
                      className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {child.status && (
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              child.status === 'RUNNING' ? 'bg-emerald-500' : 'bg-red-500'
                            }`}
                          />
                        )}
                        <span className="font-medium">
                          {getAssetTranslatedName(child, currentLanguage, primaryLanguage)}
                        </span>
                        {child.code && (
                          <span className="text-xs text-muted-foreground">({child.code})</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {child.status && <StatusBadge status={child.status} />}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-muted-foreground">{t('detail.noChildren')}</p>
                  {isAdmin && (
                    <Button variant="outline" size="sm" className="mt-3" asChild>
                      <Link to={`/assets/new?parentId=${asset.id}`}>
                        <Plus className="mr-2 h-4 w-4" />
                        {t('actions.addChild')}
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{t('detail.documents')}</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to={`/documents?asset=${asset.id}`}>
                  <FileText className="mr-2 h-4 w-4" />
                  {t('actions.viewDocuments')}
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {asset.documents && asset.documents.length > 0 ? (
                <div className="space-y-1">
                  {asset.documents.map((docLink) => (
                    <div
                      key={docLink.id}
                      className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{docLink.document.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {docLink.document.type}
                        </Badge>
                      </div>
                      {docLink.isPrimary && (
                        <Badge variant="secondary" className="text-xs">
                          Primary
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">{t('detail.noDocuments')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
