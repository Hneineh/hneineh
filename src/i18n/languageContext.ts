import { createContext, useContext } from 'react'
import type { Lang } from '../content/types'

export type LanguageContextValue = {
  lang: Lang
  toggleLang: () => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}

/** Pulls the current-language value out of a { ar, en } content bundle. */
export function usePick<T>(bundle: Record<Lang, T>): T {
  const { lang } = useLanguage()
  return bundle[lang]
}
