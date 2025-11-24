import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Basic translations for MVP
const resources = {
  en: {
    translation: {
      "dashboard": "Dashboard",
      "machines": "Machines",
      "work_orders": "Work Orders",
      "parts": "Parts",
      "documents": "Documents",
      "settings": "Settings",
      "login": "Login",
      "logout": "Logout",
      "search": "Search...",
      "welcome": "Welcome",
    }
  },
  ar: {
    translation: {
      "dashboard": "لوحة القيادة",
      "machines": "الآلات",
      "work_orders": "أوامر العمل",
      "parts": "قطع الغيار",
      "documents": "المستندات",
      "settings": "الإعدادات",
      "login": "تسجيل الدخول",
      "logout": "تسجيل الخروج",
      "search": "بحث...",
      "welcome": "مرحبا",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;

