import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from '@/contexts/AuthContext'
import i18n from '@/lib/i18n'
import { LanguageProvider } from '@/components/language/LanguageProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </AuthProvider>
    </I18nextProvider>
  </React.StrictMode>,
)
