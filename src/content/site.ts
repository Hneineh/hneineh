import type { Localized, SocialLink } from './types'

/**
 * Site-wide brand data — shared between the nav and footer today, and the
 * single record a future admin panel would edit for global brand settings.
 * Only `logos` and `id` are language-agnostic; everything else is bilingual.
 */
export const site = {
  id: 'hneineh',
  logos: {
    /** Wordmark + icon lockup — nav bar on tablet/desktop */
    horizontal: '/logos/hneineh-horizontal-logo.svg',
    /** Compact icon mark — nav bar on mobile, and the primary brand mark */
    primaryIcon: '/logos/hneineh-primary-icon.svg',
    /** Secondary icon mark — used as the loading/spinner glyph */
    secondaryIcon: '/logos/hneineh-secondary-icon.svg',
    /** Beige stacked lockup — footer, over the dark background */
    verticalBeige: '/logos/hneineh-vertical-logo-beige.svg',
  },
} as const

export const siteText: Localized<{
  name: string
  tagline: string
  email: string
  logoAlt: string
}> = {
  ar: {
    name: 'حنينه',
    tagline: 'تصميم ونجارة — منذ ١٩٨٠',
    email: 'info@hneineh.com',
    logoAlt: 'شعار حنينه للنجارة والتصميم',
  },
  en: {
    name: 'Hneineh',
    tagline: 'Interiors & Carpentry, Since 1980',
    email: 'info@hneineh.com',
    logoAlt: 'Hneineh carpentry & design logo',
  },
}

export const socialLinks: Localized<SocialLink[]> = {
  ar: [
    { id: 'facebook', label: 'فيسبوك', url: 'https://www.facebook.com/share/1D51uw7DPR/' },
    { id: 'instagram', label: 'انستغرام', url: 'https://www.instagram.com/hneinehinteriors' },
    { id: 'tiktok', label: 'تيك توك', url: 'https://www.tiktok.com/@hneinehinteriors' },
    { id: 'pinterest', label: 'بينتيريست', url: 'https://pin.it/5CgGgQiS6' },
  ],
  en: [
    { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/share/1D51uw7DPR/' },
    { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/hneinehinteriors' },
    { id: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@hneinehinteriors' },
    { id: 'pinterest', label: 'Pinterest', url: 'https://pin.it/5CgGgQiS6' },
  ],
}
