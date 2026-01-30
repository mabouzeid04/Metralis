import { useTranslation } from 'react-i18next'
import { Loader2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  useFactoryConfig,
  getTranslatedDiscipline,
} from '@/lib/hooks/useFactoryConfig'

interface DisciplineSelectorProps {
  value: string[]
  onChange: (disciplines: string[]) => void
  label?: string
  disabled?: boolean
  error?: string
  className?: string
}

export function DisciplineSelector({
  value = [],
  onChange,
  label,
  disabled = false,
  error,
  className = '',
}: DisciplineSelectorProps) {
  const { i18n, t } = useTranslation('workOrders')
  const currentLanguage = i18n.language

  const { data: configResponse, isLoading } = useFactoryConfig()
  const config = configResponse?.data
  const disciplines = config?.maintenanceDisciplines || []

  const handleToggle = (disciplineId: string) => {
    if (value.includes(disciplineId)) {
      onChange(value.filter((id) => id !== disciplineId))
    } else {
      onChange([...value, disciplineId])
    }
  }

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

  if (disciplines.length === 0) {
    return (
      <div className={className}>
        {label && <Label className="mb-2 block">{label}</Label>}
        <p className="text-sm text-muted-foreground">
          {t('noDisciplinesConfigured', 'No disciplines configured')}
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      {label && <Label className="mb-3 block">{label}</Label>}
      <div className="space-y-2">
        {disciplines.map((discipline) => {
          const translatedName = getTranslatedDiscipline(
            discipline,
            currentLanguage,
            config?.primaryLanguage || 'en'
          )
          const isChecked = value.includes(discipline.id)

          return (
            <div key={discipline.id} className="flex items-center space-x-2">
              <Checkbox
                id={`discipline-${discipline.id}`}
                checked={isChecked}
                onCheckedChange={() => handleToggle(discipline.id)}
                disabled={disabled}
              />
              <label
                htmlFor={`discipline-${discipline.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
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

export default DisciplineSelector
