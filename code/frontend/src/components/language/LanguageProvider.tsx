import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { api } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, getDirection } from '@/lib/i18n'

export function LanguageProvider({ children }: PropsWithChildren) {
  const { i18n } = useTranslation()
  const { user } = useAuth()

  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18nextLng')
    const resolved = storedLanguage || i18n.resolvedLanguage || DEFAULT_LANGUAGE
    if (resolved && resolved !== i18n.language) {
      void i18n.changeLanguage(resolved)
    }
    document.documentElement.dir = getDirection(resolved)
    document.documentElement.lang = resolved
  }, [i18n])

  useEffect(() => {
    if (!user) return

    let cancelled = false
    const loadPreferences = async () => {
      try {
        const { data } = await api.get('/users/me/preferences')
        const preferred = data?.data?.language as string | undefined
        const isSupported = SUPPORTED_LANGUAGES.some((lng) => lng.code === preferred)
        if (preferred && isSupported && !cancelled) {
          if (preferred !== i18n.language) {
            await i18n.changeLanguage(preferred)
          }
          document.documentElement.dir = getDirection(preferred)
          document.documentElement.lang = preferred
        }
      } catch {
        // Silently ignore preference fetch errors
      }
    }

    void loadPreferences()
    return () => {
      cancelled = true
    }
  }, [i18n, user])

  return children
}
