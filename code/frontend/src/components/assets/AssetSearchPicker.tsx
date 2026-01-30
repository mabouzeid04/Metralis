import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, X, Loader2, Check, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  useSearchAssets,
  useAssetsByIds,
  type Asset,
  getAssetTranslatedName,
  getAssetTranslatedPath,
} from '@/lib/hooks/useAssets'
import { useFactoryConfig } from '@/lib/hooks/useFactoryConfig'
import { cn } from '@/lib/utils'

interface AssetSearchPickerProps {
  value: string[]
  onChange: (assetIds: string[]) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  className?: string
  maxSelections?: number
}

export function AssetSearchPicker({
  value,
  onChange,
  label,
  placeholder,
  disabled = false,
  error,
  className = '',
  maxSelections,
}: AssetSearchPickerProps) {
  const { t, i18n } = useTranslation('assets')
  const currentLanguage = i18n.language

  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Fetch factory config for primary language
  const { data: configResponse } = useFactoryConfig()
  const config = configResponse?.data
  const primaryLanguage = config?.primaryLanguage || 'en'

  // Search assets
  const { data: searchResponse, isLoading: searchLoading } = useSearchAssets(searchQuery, {
    enabled: isOpen && searchQuery.length >= 2,
  })
  const searchResults = searchResponse?.data || []

  // Fetch selected assets to display their names
  const { data: selectedAssetsResponse } = useAssetsByIds(value)
  const selectedAssets = selectedAssetsResponse?.data || []

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Get translated name for an asset
  const getAssetName = useCallback(
    (asset: Asset): string => {
      return getAssetTranslatedName(asset, currentLanguage, primaryLanguage)
    },
    [currentLanguage, primaryLanguage]
  )

  // Get translated path for an asset
  const getAssetPath = useCallback(
    (asset: Asset): string => {
      return getAssetTranslatedPath(asset, currentLanguage, primaryLanguage)
    },
    [currentLanguage, primaryLanguage]
  )

  // Toggle asset selection
  const handleToggleAsset = (asset: Asset) => {
    const isSelected = value.includes(asset.id)

    if (isSelected) {
      onChange(value.filter((id) => id !== asset.id))
    } else {
      if (maxSelections && value.length >= maxSelections) {
        return
      }
      onChange([...value, asset.id])
    }
  }

  // Remove a selected asset
  const handleRemoveAsset = (assetId: string) => {
    onChange(value.filter((id) => id !== assetId))
  }

  // Clear all selections
  const handleClearAll = () => {
    onChange([])
  }

  // Handle input focus
  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true)
    }
  }

  // Filter out already selected assets from search results
  const filteredResults = searchResults.filter((asset) => !value.includes(asset.id))

  const hasReachedMax = maxSelections !== undefined && value.length >= maxSelections

  return (
    <div className={cn('relative', className)} ref={containerRef}>
      {label && <Label className="mb-2 block">{label}</Label>}

      {/* Selected assets badges */}
      {selectedAssets.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1">
          {selectedAssets.map((asset) => (
            <Badge
              key={asset.id}
              variant="secondary"
              className="flex items-center gap-1 pe-1"
            >
              <span className="max-w-[200px] truncate" title={getAssetPath(asset)}>
                {getAssetName(asset)}
              </span>
              {!disabled && (
                <button
                  type="button"
                  onClick={() => handleRemoveAsset(asset.id)}
                  className="ms-1 rounded-full p-0.5 hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Badge>
          ))}
          {selectedAssets.length > 1 && !disabled && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={handleClearAll}
            >
              {t('picker.clearAll', 'Clear all')}
            </Button>
          )}
        </div>
      )}

      {/* Search input with dropdown trigger */}
      <div className="relative">
        <div className="relative">
          <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder || t('picker.placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleInputFocus}
            disabled={disabled || hasReachedMax}
            className="pe-10 ps-9"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute end-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
            onClick={() => {
              if (!disabled) {
                setIsOpen(!isOpen)
                if (!isOpen) {
                  inputRef.current?.focus()
                }
              }
            }}
            disabled={disabled}
          >
            <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
          </Button>
        </div>

        {/* Dropdown results */}
        {isOpen && (
          <div className="absolute z-50 mt-1 max-h-[300px] w-full overflow-auto rounded-md border bg-popover p-1 shadow-md">
            {searchQuery.length < 2 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {t('picker.search', 'Search assets...')}
              </div>
            ) : searchLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {searchResults.length > 0
                  ? t('picker.allSelected', 'All matches already selected')
                  : t('picker.noMatches')}
              </div>
            ) : (
              <ul className="space-y-1">
                {filteredResults.map((asset) => {
                  const isSelected = value.includes(asset.id)
                  return (
                    <li key={asset.id}>
                      <button
                        type="button"
                        onClick={() => handleToggleAsset(asset)}
                        disabled={hasReachedMax && !isSelected}
                        className={cn(
                          'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
                          'hover:bg-accent hover:text-accent-foreground',
                          'focus:bg-accent focus:text-accent-foreground focus:outline-none',
                          isSelected && 'bg-accent',
                          hasReachedMax && !isSelected && 'cursor-not-allowed opacity-50'
                        )}
                      >
                        <div
                          className={cn(
                            'flex h-4 w-4 shrink-0 items-center justify-center rounded border',
                            isSelected
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-muted'
                          )}
                        >
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                        <div className="flex flex-1 flex-col items-start overflow-hidden text-start">
                          <span className="truncate font-medium">
                            {getAssetName(asset)}
                            {asset.code && (
                              <span className="ms-1 font-normal text-muted-foreground">
                                ({asset.code})
                              </span>
                            )}
                          </span>
                          <span className="truncate text-xs text-muted-foreground">
                            {getAssetPath(asset)}
                          </span>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}

            {/* Max selections hint */}
            {hasReachedMax && (
              <div className="border-t p-2 text-center text-xs text-muted-foreground">
                {t('picker.maxReached', 'Maximum selections reached ({{max}})', {
                  max: maxSelections,
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}

      {/* Help text */}
      {value.length === 0 && !error && !isOpen && (
        <p className="mt-1 text-xs text-muted-foreground">
          {t('picker.hint', 'Type at least 2 characters to search')}
        </p>
      )}
    </div>
  )
}

export default AssetSearchPicker
