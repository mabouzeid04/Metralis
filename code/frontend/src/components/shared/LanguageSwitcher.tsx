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

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = async (lng: string) => {
    i18n.changeLanguage(lng)
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr'
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
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuItem onSelect={() => changeLanguage('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => changeLanguage('ar')}>
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
