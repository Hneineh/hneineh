import { useEffect, useState, type ReactNode } from 'react'
import type { Lang } from '../content/types'
import { LanguageContext } from './languageContext'

const STORAGE_KEY = 'hneineh-lang'

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'ar'
  return window.localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'ar'
}

/** Owns the current language, persists it, and keeps <html lang/dir> in sync. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const toggleLang = () => setLang((current) => (current === 'ar' ? 'en' : 'ar'))

  return <LanguageContext.Provider value={{ lang, toggleLang }}>{children}</LanguageContext.Provider>
}
