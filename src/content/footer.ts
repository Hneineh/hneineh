import type { Lang } from './types'

export const footerContent: Record<Lang, { copyright: (year: number) => string }> = {
  ar: { copyright: (year) => `© ${year} حنينة. جميع الحقوق محفوظة.` },
  en: { copyright: (year) => `© ${year} Hneineh. All rights reserved.` },
}
