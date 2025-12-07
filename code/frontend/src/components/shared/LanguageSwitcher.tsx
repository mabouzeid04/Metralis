import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { api } from '@/lib/api'
import { SUPPORTED_LANGUAGES } from '@/lib/i18n'

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  const changeLanguage = async (lng: string) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('i18nextLng', lng)

    // Persist to backend preferences
    try {
      await api.patch('/users/me/preferences', { language: lng })
    } catch {
      // Silently fail - preference is already saved locally
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t('language.label')}>
          <Globe className="h-5 w-5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {SUPPORTED_LANGUAGES.map((lng) => (
          <DropdownMenuItem key={lng.code} onSelect={() => changeLanguage(lng.code)}>
            {lng.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
