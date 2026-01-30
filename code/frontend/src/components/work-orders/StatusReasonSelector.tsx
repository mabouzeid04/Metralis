import { useTranslation } from 'react-i18next'
import { Check, ChevronDown, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  useFactoryConfig,
  getTranslatedStatusReason,
} from '@/lib/hooks/useFactoryConfig'

interface StatusReasonSelectorProps {
  value: string | null
  onChange: (statusReason: string | null) => void
  status?: 'RUNNING' | 'DOWN'
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  className?: string
}

export function StatusReasonSelector({
  value,
  onChange,
  status = 'RUNNING',
  label,
  placeholder,
  disabled = false,
  error,
  className = '',
}: StatusReasonSelectorProps) {
  const { i18n, t } = useTranslation('workOrders')
  const currentLanguage = i18n.language

  const { data: configResponse, isLoading } = useFactoryConfig()
  const config = configResponse?.data
  const statusReasons = config?.statusReasonOptions?.[status] || []

  const selectedReason = statusReasons.find((r) => r.id === value)
  const selectedReasonName = selectedReason
    ? getTranslatedStatusReason(
        selectedReason,
        currentLanguage,
        config?.primaryLanguage || 'en'
      )
    : null

  if (isLoading) {
    return (
      <div className={className}>
        {label && <Label className="mb-2 block">{label}</Label>}
        <Button variant="outline" className="w-full justify-between" disabled>
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t('loading', 'Loading...')}
          </span>
        </Button>
      </div>
    )
  }

  return (
    <div className={className}>
      {label && <Label className="mb-2 block">{label}</Label>}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={`w-full justify-between font-normal ${!value && 'text-muted-foreground'}`}
            disabled={disabled}
          >
            <span className="truncate">
              {selectedReasonName ||
                placeholder ||
                t('selectStatus', 'Select status')}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[var(--radix-dropdown-menu-trigger-width)]"
          align="start"
        >
          <DropdownMenuItem onSelect={() => onChange(null)}>
            <span className="text-muted-foreground">
              {t('noSelection', 'None')}
            </span>
          </DropdownMenuItem>
          {statusReasons.map((reason) => {
            const translatedName = getTranslatedStatusReason(
              reason,
              currentLanguage,
              config?.primaryLanguage || 'en'
            )
            return (
              <DropdownMenuItem
                key={reason.id}
                onSelect={() => onChange(reason.id)}
              >
                {translatedName}
                {value === reason.id && (
                  <Check className="ml-auto h-4 w-4 opacity-50" />
                )}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  )
}

export default StatusReasonSelector
