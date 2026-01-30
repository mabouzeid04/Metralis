import { useTranslation } from 'react-i18next'
import { Loader2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import {
  useFactoryConfig,
  getTranslatedMaintenanceType,
} from '@/lib/hooks/useFactoryConfig'

interface MaintenanceTypeSelectorProps {
  value: string | null
  onChange: (typeId: string | null) => void
  label?: string
  disabled?: boolean
  error?: string
  className?: string
}

export function MaintenanceTypeSelector({
  value,
  onChange,
  label,
  disabled = false,
  error,
  className = '',
}: MaintenanceTypeSelectorProps) {
  const { i18n, t } = useTranslation('workOrders')
  const currentLanguage = i18n.language

  const { data: configResponse, isLoading } = useFactoryConfig()
  const config = configResponse?.data
  const maintenanceTypes = config?.maintenanceTypes || []

  if (isLoading) {
    return (
      <div className={className}>
        {label && <Label className="mb-2 block">{label}</Label>}
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
          {t('loading', 'Loading...')}
        </div>
      </div>
    )
  }

  if (maintenanceTypes.length === 0) {
    return (
      <div className={className}>
        {label && <Label className="mb-2 block">{label}</Label>}
        <p className="text-sm text-muted-foreground">
          {t('noTypesConfigured', 'No maintenance types configured')}
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      {label && <Label className="mb-3 block">{label}</Label>}
      <div className="space-y-2">
        {maintenanceTypes.map((type) => {
          const translatedName = getTranslatedMaintenanceType(
            type,
            currentLanguage,
            config?.primaryLanguage || 'en'
          )
          const isSelected = value === type.id

          return (
            <div key={type.id} className="flex items-center space-x-2">
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={disabled}
                onClick={() => onChange(type.id)}
                className={cn(
                  'h-4 w-4 rounded-full border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                  isSelected
                    ? 'border-primary bg-primary'
                    : 'border-muted-foreground'
                )}
              >
                {isSelected && (
                  <span className="flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-primary-foreground" />
                  </span>
                )}
              </button>
              <label
                onClick={() => !disabled && onChange(type.id)}
                className={cn(
                  'text-sm font-medium leading-none cursor-pointer',
                  disabled && 'cursor-not-allowed opacity-70'
                )}
              >
                {translatedName}
              </label>
            </div>
          )
        })}
      </div>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  )
}

export default MaintenanceTypeSelector
