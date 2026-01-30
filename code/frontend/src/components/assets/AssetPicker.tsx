import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ChevronRight, Search, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  useRootAssets,
  useAssetChildren,
  useAssetAncestors,
  type Asset,
  getAssetTranslatedName,
  getAssetTranslatedPath,
} from '@/lib/hooks/useAssets'
import {
  useFactoryConfig,
  getTranslatedHierarchyLevelName,
} from '@/lib/hooks/useFactoryConfig'

interface AssetPickerProps {
  value?: string | null
  onChange: (assetId: string | null, asset: Asset | null) => void
  maxDepth?: number
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  className?: string
}

interface LevelSelection {
  assetId: string | null
  asset: Asset | null
}

export function AssetPicker({
  value,
  onChange,
  maxDepth = 3,
  label,
  placeholder,
  disabled = false,
  error,
  className = '',
}: AssetPickerProps) {
  const { i18n } = useTranslation('common')
  const currentLanguage = i18n.language

  // State for each level selection
  const [selections, setSelections] = useState<LevelSelection[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [openLevel, setOpenLevel] = useState<number | null>(null)

  // Fetch factory config for hierarchy level names
  const { data: configResponse, isLoading: configLoading } = useFactoryConfig()
  const config = configResponse?.data

  // Fetch root assets (machines)
  const { data: rootAssetsResponse, isLoading: rootLoading } = useRootAssets()
  const rootAssets = rootAssetsResponse?.data || []

  // Fetch ancestors when value is provided (to restore selection state)
  const { data: ancestorsResponse } = useAssetAncestors(value || undefined)

  // Fetch children for the currently selected asset at each level
  const level0Selection = selections[0]?.assetId
  const level1Selection = selections[1]?.assetId
  const level2Selection = selections[2]?.assetId

  const { data: level1ChildrenResponse, isLoading: level1Loading } = useAssetChildren(
    level0Selection || undefined
  )
  const { data: level2ChildrenResponse, isLoading: level2Loading } = useAssetChildren(
    level1Selection || undefined
  )
  const { data: level3ChildrenResponse, isLoading: level3Loading } = useAssetChildren(
    level2Selection || undefined
  )

  const level1Children = level1ChildrenResponse?.data || []
  const level2Children = level2ChildrenResponse?.data || []
  const level3Children = level3ChildrenResponse?.data || []

  // Initialize selections from value and ancestors
  useEffect(() => {
    if (value && ancestorsResponse?.data) {
      const ancestors = ancestorsResponse.data
      const newSelections: LevelSelection[] = ancestors.map((a) => ({
        assetId: a.id,
        asset: a,
      }))
      // The value itself is the final selection
      // We need to find the asset from available data
      setSelections(newSelections)
    } else if (!value) {
      setSelections([])
    }
  }, [value, ancestorsResponse])

  // Get hierarchy level name for a depth
  const getLevelName = (depth: number): string => {
    if (!config) {
      const defaults = ['Machine', 'Group', 'Component', 'Sub-component']
      return defaults[depth] || `Level ${depth}`
    }
    const level = config.hierarchyLevels.find((l) => l.depth === depth)
    if (level) {
      return getTranslatedHierarchyLevelName(level, currentLanguage, config.primaryLanguage)
    }
    return `Level ${depth}`
  }

  // Get translated name for an asset
  const getAssetName = (asset: Asset): string => {
    return getAssetTranslatedName(asset, currentLanguage, config?.primaryLanguage || 'en')
  }

  // Handle level selection
  const handleSelectAsset = (depth: number, asset: Asset | null) => {
    const newSelections = [...selections.slice(0, depth)]
    if (asset) {
      newSelections[depth] = { assetId: asset.id, asset }
    }
    setSelections(newSelections)
    setOpenLevel(null)
    setSearchQuery('')

    // Determine the final selected asset (deepest selection)
    const finalSelection = newSelections[newSelections.length - 1]
    onChange(finalSelection?.assetId || null, finalSelection?.asset || null)
  }

  // Clear selection
  const handleClear = () => {
    setSelections([])
    onChange(null, null)
  }

  // Filter assets by search query
  const filterAssets = (assets: Asset[]): Asset[] => {
    if (!searchQuery) return assets
    const query = searchQuery.toLowerCase()
    return assets.filter((a) => {
      const name = getAssetName(a).toLowerCase()
      const code = a.code?.toLowerCase() || ''
      return name.includes(query) || code.includes(query)
    })
  }

  // Get assets for a specific level
  const getAssetsForLevel = (depth: number): Asset[] => {
    if (depth === 0) return rootAssets
    if (depth === 1) return level1Children
    if (depth === 2) return level2Children
    if (depth === 3) return level3Children
    return []
  }

  const isLevelLoading = (depth: number): boolean => {
    if (depth === 0) return rootLoading
    if (depth === 1) return level1Loading
    if (depth === 2) return level2Loading
    if (depth === 3) return level3Loading
    return false
  }

  // Display value - show the full path of the deepest selection
  const displayValue = useMemo(() => {
    if (selections.length === 0) return ''
    const deepest = selections[selections.length - 1]
    if (!deepest?.asset) return ''
    return getAssetTranslatedPath(deepest.asset, currentLanguage, config?.primaryLanguage || 'en')
  }, [selections, currentLanguage, config])

  // Calculate which levels to show
  const levelsToShow = Math.min(maxDepth, config?.defaultMaxDepth || 3)

  if (configLoading) {
    return (
      <div className={className}>
        {label && <Label>{label}</Label>}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      {label && <Label className="mb-2 block">{label}</Label>}

      {/* Selected value display */}
      {displayValue && (
        <div className="mb-2 flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm">
          <span className="flex-1 truncate">{displayValue}</span>
          {!disabled && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto p-1"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {/* Level selectors */}
      <div className="flex flex-nowrap gap-2">
        {Array.from({ length: levelsToShow }).map((_, depth) => {
          const currentSelection = selections[depth]
          const previousSelection = depth > 0 ? selections[depth - 1] : { assetId: 'root', asset: null }
          const isEnabled = depth === 0 || (previousSelection?.assetId && previousSelection.asset?.hasChildren !== false)
          const assets = filterAssets(getAssetsForLevel(depth))
          const loading = isLevelLoading(depth)

          return (
            <DropdownMenu
              key={depth}
              open={openLevel === depth}
              onOpenChange={(open) => setOpenLevel(open ? depth : null)}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={disabled || !isEnabled}
                  className="min-w-[120px] justify-between"
                >
                  <span className="truncate">
                    {currentSelection?.asset
                      ? getAssetName(currentSelection.asset)
                      : getLevelName(depth)}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[250px]" align="start">
                {/* Search input */}
                <div className="p-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={`Search ${getLevelName(depth).toLowerCase()}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>

                {/* Assets list */}
                <div className="max-h-[200px] overflow-y-auto">
                  {loading ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : assets.length === 0 ? (
                    <div className="py-4 text-center text-sm text-muted-foreground">
                      {searchQuery ? 'No matches found' : 'No items available'}
                    </div>
                  ) : (
                    assets.map((asset) => (
                      <DropdownMenuItem
                        key={asset.id}
                        onSelect={(e) => {
                          e.preventDefault() // Prevent auto-close to ensure selection registers
                          handleSelectAsset(depth, asset)
                        }}
                        className="flex items-center justify-between"
                      >
                        <span className="truncate">
                          {getAssetName(asset)}
                          {asset.code && (
                            <span className="ml-1 text-xs text-muted-foreground">
                              ({asset.code})
                            </span>
                          )}
                        </span>
                        {asset.hasChildren && (
                          <ChevronRight className="h-4 w-4 shrink-0 opacity-50" />
                        )}
                      </DropdownMenuItem>
                    ))
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        })}
      </div>

      {/* Error message */}
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}

      {/* Help text */}
      {!displayValue && !error && (
        <p className="mt-1 text-xs text-muted-foreground">
          {placeholder || `Select ${getLevelName(0).toLowerCase()} and optionally drill down`}
        </p>
      )}
    </div>
  )
}

export default AssetPicker
