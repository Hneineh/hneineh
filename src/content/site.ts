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
    name: 'حنينة',
    tagline: 'تصميم ونجارة — منذ ١٩٨٠',
    email: 'info@hneineh.com',
    logoAlt: 'شعار حنينة للنجارة والتصميم',
  },
  en: {
    name: 'Hneineh',
    tagline: 'Interiors & Carpentry — Since 1980',
    email: 'info@hneineh.com',
    logoAlt: 'Hneineh carpentry & design logo',
  },
}

export const socialLinks: Localized<SocialLink[]> = {
  ar: [
    { id: 'facebook', label: 'فيسبوك', url: 'https://www.facebook.com/share/19R2DseXxq/' },
    { id: 'instagram', label: 'انستغرام', url: 'https://www.instagram.com/hneinehinteriorscarpentry/' },
    { id: 'tiktok', label: 'تيك توك', url: 'https://www.tiktok.com/@hneinehinteriorcarpentry' },
    { id: 'pinterest', label: 'بينتيريست', url: 'https://de.pinterest.com/hneinehlb/' },
  ],
  en: [
    { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/share/19R2DseXxq/' },
    { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/hneinehinteriorscarpentry/' },
    { id: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@hneinehinteriorcarpentry' },
    { id: 'pinterest', label: 'Pinterest', url: 'https://de.pinterest.com/hneinehlb/' },
  ],
}
