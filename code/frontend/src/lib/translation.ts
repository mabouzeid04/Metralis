import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { api } from '@/lib/api'
import { DEFAULT_LANGUAGE } from '@/lib/i18n'

type TranslateOptions = {
  sourceLanguage?: string
  cache?: boolean
}

const translationCache = new Map<string, string>()

const cacheKey = (text: string, targetLanguage: string, sourceLanguage?: string) =>
  `${targetLanguage}:${sourceLanguage ?? 'auto'}:${text}`

export async function translateText(
  text: string,
  targetLanguage: string,
  options?: TranslateOptions,
): Promise<string> {
  const trimmed = text?.trim()
  if (!trimmed) return text
  if (targetLanguage === DEFAULT_LANGUAGE) return text

  const key = cacheKey(trimmed, targetLanguage, options?.sourceLanguage)
  if (options?.cache !== false && translationCache.has(key)) {
    return translationCache.get(key) as string
  }

  try {
    const response = await api.post('/translations', {
      text: trimmed,
      targetLanguage,
      sourceLanguage: options?.sourceLanguage,
    })
    const translated = (response.data?.data?.translatedText as string | undefined)?.trim()
    if (translated) {
      translationCache.set(key, translated)
      return translated
    }
  } catch {
    // Swallow translation failures and fall back to the original text
  }

  translationCache.set(key, text)
  return text
}

export function useTranslatedText(text?: string | null) {
  const { i18n } = useTranslation()
  const [translated, setTranslated] = useState(text ?? '')

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      const next = await translateText(text ?? '', i18n.language, { cache: true })
      if (!cancelled) {
        setTranslated(next)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [i18n.language, text])

  return translated
}




