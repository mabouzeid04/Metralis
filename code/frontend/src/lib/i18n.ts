import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import enCommon from '../../public/locales/en/common.json'
import enNav from '../../public/locales/en/nav.json'
import enAuth from '../../public/locales/en/auth.json'
import enDashboard from '../../public/locales/en/dashboard.json'
import enSettings from '../../public/locales/en/settings.json'
import enParts from '../../public/locales/en/parts.json'
import enMachines from '../../public/locales/en/machines.json'
import enWorkOrders from '../../public/locales/en/workOrders.json'
import enDocuments from '../../public/locales/en/documents.json'
import enUsers from '../../public/locales/en/users.json'
import enAi from '../../public/locales/en/ai.json'
import enAnalytics from '../../public/locales/en/analytics.json'
import enNotFound from '../../public/locales/en/notFound.json'
import arCommon from '../../public/locales/ar/common.json'
import arNav from '../../public/locales/ar/nav.json'
import arAuth from '../../public/locales/ar/auth.json'
import arDashboard from '../../public/locales/ar/dashboard.json'
import arSettings from '../../public/locales/ar/settings.json'
import arParts from '../../public/locales/ar/parts.json'
import arMachines from '../../public/locales/ar/machines.json'
import arWorkOrders from '../../public/locales/ar/workOrders.json'
import arDocuments from '../../public/locales/ar/documents.json'
import arUsers from '../../public/locales/ar/users.json'
import arAi from '../../public/locales/ar/ai.json'
import arAnalytics from '../../public/locales/ar/analytics.json'
import arNotFound from '../../public/locales/ar/notFound.json'

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
] as const

export const DEFAULT_LANGUAGE = 'en'
const rtlLanguages = new Set<string>(
  SUPPORTED_LANGUAGES.filter((lng) => lng.dir === 'rtl').map((lng) => lng.code),
)

const applyDirection = (lng?: string) => {
  const direction = lng && rtlLanguages.has(lng) ? 'rtl' : 'ltr'
  document.documentElement.dir = direction
  if (lng) {
    document.documentElement.lang = lng
  }
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        nav: enNav,
        auth: enAuth,
        dashboard: enDashboard,
        settings: enSettings,
        parts: enParts,
        machines: enMachines,
        workOrders: enWorkOrders,
        documents: enDocuments,
        users: enUsers,
        ai: enAi,
        analytics: enAnalytics,
        notFound: enNotFound,
      },
      ar: {
        common: arCommon,
        nav: arNav,
        auth: arAuth,
        dashboard: arDashboard,
        settings: arSettings,
        parts: arParts,
        machines: arMachines,
        workOrders: arWorkOrders,
        documents: arDocuments,
        users: arUsers,
        ai: arAi,
        analytics: arAnalytics,
        notFound: arNotFound,
      },
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES.map((lng) => lng.code),
    nonExplicitSupportedLngs: true,
    defaultNS: 'common',
    ns: [
      'common',
      'nav',
      'auth',
      'dashboard',
      'machines',
      'workOrders',
      'parts',
      'documents',
      'settings',
      'users',
      'ai',
      'analytics',
      'notFound',
    ],
    load: 'languageOnly',
    returnEmptyString: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    parseMissingKeyHandler: (key) => key,
  })

applyDirection(i18n.resolvedLanguage)
i18n.on('languageChanged', (lng) => {
  applyDirection(lng)
  localStorage.setItem('i18nextLng', lng)
})

export const getDirection = (lng?: string) => (lng && rtlLanguages.has(lng) ? 'rtl' : 'ltr')

export default i18n
