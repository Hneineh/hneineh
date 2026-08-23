/**
 * Shared shapes for /content data files. Each file exports plain data that a
 * future CMS/admin panel would read from (and write to) a real API — every
 * record carries a stable `id` so array order is never load-bearing.
 */

export type Lang = 'ar' | 'en'

/** A value that differs per language — the base unit every bilingual content export is built from. */
export type Localized<T> = Record<Lang, T>

export type SocialPlatform = 'facebook' | 'pinterest' | 'instagram' | 'tiktok'

export interface SocialLink {
  id: SocialPlatform
  label: string
  url: string
}

export interface NavLink {
  id: string
  label: string
  href: string
}

export interface StatItem {
  id: string
  /** Numeric/Latin value, rendered with LTR isolation (e.g. "46", "3K", "320") */
  value: string
  label: string
}

export interface ProcessStep {
  id: string
  /** Numeral display — Arabic-Indic ("١") for ar, Western ("1") for en */
  numeral: string
  title: string
  body: string
  imageAlt: string
  /** Photo path under /public — omit to fall back to the placeholder box */
  imageSrc?: string
}

export interface Testimonial {
  id: string
  name: string
  verified: boolean
  badgeLabel: string
  text: string
}

export interface ServiceItem {
  id: string
  name: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  /** When true, the current language's `services` list renders under the answer */
  showServicesList?: boolean
}

export interface GalleryLink {
  id: string
  title: string
  /** Shown on the home-page gallery card */
  description: string
  /** Shown as the intro text on the gallery's own page — independent of `description` */
  pageDescription: string
  href: string
  imageAlt: string
  /** Cover photo path under /public — omit to fall back to the placeholder box */
  imageSrc?: string
}

export interface ContactFormField {
  id: string
  name: string
  label: string
  placeholder: string
  type: 'text' | 'tel' | 'email' | 'textarea'
  required: boolean
  isLtr?: boolean
}
