import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Plus,
  Search,
  Filter,
  Loader2,
  ServerOff,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Network,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { StatusBadge } from '@/components/shared/StatusBadge'
import {
  useRootAssets,
  useAssetChildren,
  useDeleteAsset,
  type Asset,
  getAssetTranslatedName,
} from '@/lib/hooks/useAssets'
import {
  useFactoryConfig,
  getTranslatedHierarchyLevelName,
  getTranslatedStatusReason,
} from '@/lib/hooks/useFactoryConfig'
import { useAuth } from '@/contexts/AuthContext'

interface AssetTreeNodeProps {
  asset: Asset
  isAdmin: boolean
  currentLanguage: string
  primaryLanguage: string
  config: ReturnType<typeof useFactoryConfig>['data']
  onDelete: (id: string) => void
  searchQuery: string
  statusFilter?: string
}

function AssetTreeNode({
  asset,
  isAdmin,
  currentLanguage,
  primaryLanguage,
  config,
  onDelete,
  searchQuery,
  statusFilter,
}: AssetTreeNodeProps) {
  const [expanded, setExpanded] = useState(false)
  const { t } = useTranslation(['assets', 'common'])

  // Fetch children when expanded
  const { data: childrenResponse, isLoading: childrenLoading } = useAssetChildren(
    expanded ? asset.id : undefined
  )
  const children = childrenResponse?.data || []

  // Filter children by status if filter is active
  const filteredChildren = useMemo(() => {
    if (!statusFilter) return children
    return children.filter((c) => c.status === statusFilter)
  }, [children, statusFilter])

  const assetName = getAssetTranslatedName(asset, currentLanguage, primaryLanguage)
  const factoryConfig = config?.data

  // Get level name from factory config
  const levelName = useMemo(() => {
    if (!factoryConfig) return asset.levelType
    const level = factoryConfig.hierarchyLevels.find(
      (l) => l.key === asset.levelType
    )
    if (level) {
      return getTranslatedHierarchyLevelName(level, currentLanguage, factoryConfig.primaryLanguage)
    }
    return asset.levelType
  }, [factoryConfig, asset.levelType, currentLanguage])

  // Get status reason display
  const statusReasonDisplay = useMemo(() => {
    if (!asset.statusReason || !factoryConfig || !asset.status) return null
    const reasons = factoryConfig.statusReasonOptions[asset.status] || []
    const reason = reasons.find((r) => r.id === asset.statusReason)
    if (reason) {
      return getTranslatedStatusReason(reason, currentLanguage, factoryConfig.primaryLanguage)
    }
    return asset.statusReason
  }, [asset.statusReason, asset.status, factoryConfig, currentLanguage])

  const handleDelete = () => {
    if (window.confirm(t('messages.deleteConfirm'))) {
      onDelete(asset.id)
    }
  }

  // Auto-expand if searching
  useEffect(() => {
    if (searchQuery && asset.hasChildren) {
      setExpanded(true)
    }
  }, [searchQuery, asset.hasChildren])

  return (
    <div>
      <div
        className="flex items-center gap-2 px-3 py-2.5 hover:bg-muted/50 rounded-md group transition-colors"
        style={{ paddingInlineStart: `${asset.depth * 24 + 12}px` }}
      >
        {/* Expand/collapse button */}
        <button
          type="button"
          className="shrink-0 w-6 h-6 flex items-center justify-center rounded hover:bg-muted"
          onClick={() => asset.hasChildren && setExpanded(!expanded)}
          disabled={!asset.hasChildren}
        >
          {asset.hasChildren ? (
            expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          ) : (
            <span className="w-4" />
          )}
        </button>

        {/* Status indicator */}
        {asset.status && (
          <span
            className={`shrink-0 w-2.5 h-2.5 rounded-full ${
              asset.status === 'RUNNING' ? 'bg-emerald-500' : 'bg-red-500'
            }`}
            title={statusReasonDisplay || asset.status}
          />
        )}

        {/* Asset name & info */}
        <Link
          to={`/assets/${asset.id}`}
          className="flex-1 min-w-0 flex items-center gap-2 hover:underline"
        >
          <span className="font-medium truncate">{assetName}</span>
          {asset.code && (
            <span className="text-xs text-muted-foreground shrink-0">
              ({asset.code})
            </span>
          )}
        </Link>

        {/* Level badge */}
        <Badge variant="outline" className="shrink-0 text-xs hidden sm:inline-flex">
          {levelName}
        </Badge>

        {/* Status badge */}
        {asset.status && (
          <div className="shrink-0 hidden sm:block">
            <StatusBadge status={asset.status} />
          </div>
        )}

        {/* Actions menu */}
        {isAdmin && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/assets/${asset.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  {t('actions.viewDetails')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/assets/${asset.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  {t('actions.edit')}
                </Link>
              </DropdownMenuItem>
              {asset.hasChildren !== false && (
                <DropdownMenuItem asChild>
                  <Link to={`/assets/new?parentId=${asset.id}`}>
                    <Plus className="mr-2 h-4 w-4" />
                    {t('actions.addChild')}
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onSelect={handleDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {t('actions.delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {!isAdmin && (
          <Button variant="ghost" size="sm" asChild className="shrink-0">
            <Link to={`/assets/${asset.id}`}>{t('view')}</Link>
          </Button>
        )}
      </div>

      {/* Children */}
      {expanded && (
        <div>
          {childrenLoading ? (
            <div
              className="flex items-center gap-2 px-3 py-2 text-muted-foreground text-sm"
              style={{ paddingInlineStart: `${(asset.depth + 1) * 24 + 12}px` }}
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              {t('picker.loading')}
            </div>
          ) : filteredChildren.length === 0 ? (
            <div
              className="px-3 py-2 text-muted-foreground text-sm"
              style={{ paddingInlineStart: `${(asset.depth + 1) * 24 + 12}px` }}
            >
              {t('detail.noChildren')}
            </div>
          ) : (
            filteredChildren.map((child) => (
              <AssetTreeNode
                key={child.id}
                asset={child}
                isAdmin={isAdmin}
                currentLanguage={currentLanguage}
                primaryLanguage={primaryLanguage}
                config={config}
                onDelete={onDelete}
                searchQuery={searchQuery}
                statusFilter={statusFilter}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default function AssetsList() {
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | undefined>()

  const { user } = useAuth()
  const isAdmin = user?.role === 'ADMIN'
  const { t, i18n } = useTranslation(['assets', 'common'])
  const currentLanguage = i18n.language

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  // Fetch data
  const config = useFactoryConfig()
  const primaryLanguage = config.data?.data?.primaryLanguage || 'en'

  const { data: rootResponse, isLoading: loading, error } = useRootAssets()
  const rootAssets = rootResponse?.data || []

  const deleteAsset = useDeleteAsset()

  const handleDelete = useCallback(
    (id: string) => {
      deleteAsset.mutate(id)
    },
    [deleteAsset]
  )

  // Client-side filtering for root assets
  const filteredRootAssets = useMemo(() => {
    let result = rootAssets

    if (searchInput) {
      const search = searchInput.toLowerCase()
      result = result.filter((asset) => {
        const name = getAssetTranslatedName(asset, currentLanguage, primaryLanguage).toLowerCase()
        const code = asset.code?.toLowerCase() || ''
        return name.includes(search) || code.includes(search)
      })
    }

    if (statusFilter) {
      result = result.filter((asset) => asset.status === statusFilter)
    }

    return result
  }, [rootAssets, searchInput, statusFilter, currentLanguage, primaryLanguage])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <ServerOff className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">{error.message || t('messages.createError')}</p>
        <Button onClick={() => window.location.reload()}>{t('common:actions.retry', { defaultValue: 'Retry' })}</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
        {isAdmin ? (
          <Button className="w-full sm:w-auto" asChild>
            <Link to="/assets/new">
              <Plus className="mr-2 h-4 w-4" /> {t('addRoot')}
            </Link>
          </Button>
        ) : (
          <Button className="w-full sm:w-auto" variant="outline" disabled title={t('adminsOnly')}>
            <Plus className="mr-2 h-4 w-4" /> {t('addRoot')}
          </Button>
        )}
      </div>

      {/* Tree card */}
      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchPlaceholder')}
                className="pl-9"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{t('filters.status')}</DropdownMenuLabel>
                {['RUNNING', 'DOWN'].map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilter === status}
                    onCheckedChange={(checked) => {
                      setStatusFilter(checked ? status : undefined)
                    }}
                  >
                    {t(`status.${status.toLowerCase()}`)}
                  </DropdownMenuCheckboxItem>
                ))}
                {statusFilter && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => setStatusFilter(undefined)}
                      className="justify-center text-center"
                    >
                      {t('common:filters.clear', { defaultValue: 'Clear filters' })}
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-0 pb-2">
          {filteredRootAssets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Network className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">{t('emptyTitle')}</h3>
              <p className="text-muted-foreground mb-4">
                {searchInput ? t('emptySearchHint') : t('emptyHint')}
              </p>
              {!searchInput && isAdmin && (
                <Button asChild>
                  <Link to="/assets/new">
                    <Plus className="mr-2 h-4 w-4" /> {t('addRoot')}
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="py-1">
              {filteredRootAssets.map((asset) => (
                <AssetTreeNode
                  key={asset.id}
                  asset={asset}
                  isAdmin={isAdmin}
                  currentLanguage={currentLanguage}
                  primaryLanguage={primaryLanguage}
                  config={config.data}
                  onDelete={handleDelete}
                  searchQuery={debouncedSearch}
                  statusFilter={statusFilter}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
