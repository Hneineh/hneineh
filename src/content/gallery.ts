import type { GalleryLink, Localized } from './types'

export const gallerySection: Localized<{ title: string }> = {
  ar: { title: 'خلينا نوسع افقك' },
  en: { title: 'Portfolio' },
}

export const galleryPageText: Localized<{ backToHome: string }> = {
  ar: { backToHome: 'الرئيسية' },
  en: { backToHome: 'Home' },
}

export const galleryLinkCta: Localized<{ viewMore: string }> = {
  ar: { viewMore: 'شوف أكتر' },
  en: { viewMore: 'View More' },
}

export const lightboxText: Localized<{ closeLabel: string; zoomInLabel: string; zoomOutLabel: string }> = {
  ar: { closeLabel: 'إغلاق', zoomInLabel: 'تكبير', zoomOutLabel: 'تصغير' },
  en: { closeLabel: 'Close', zoomInLabel: 'Zoom in', zoomOutLabel: 'Zoom out' },
}

export const galleryLinks: Localized<GalleryLink[]> = {
  ar: [
    {
      id: 'carpentry',
      title: 'نجارتنا',
      description: 'حرفة مميزة، بأيادِ عمرها اكثر من خمسين سنة .',
      pageDescription: 'حرفة مميزة، بأيادِ عمرها اكثر من خمسين سنة.',
      href: '/gallery/carpentry',
      imageAlt: 'صورة من أعمال النجارة',
      imageSrc: '/process_images/hneineh-Our-Carpentry-1920x1080.webp',
    },
    {
      id: 'design',
      title: 'مهندسينا',
      description: 'الاحلام والافكار ، بخبرة مهندسنا بتصير واقع.',
      pageDescription: 'الاحلام والافكار، بخبرة مهندسنا بتصير واقع.',
      href: '/gallery/design',
      imageAlt: 'صورة من أعمال التصميم',
      imageSrc: '/process_images/hneineh-Our-Engineers-1920x1080.webp',
    },
  ],
  en: [
    {
      id: 'carpentry',
      title: 'Our Carpentry',
      description: 'Take a look at our carpentry — every piece handcrafted with real attention to detail.',
      pageDescription: 'Exceptional Craftsmanship, Shaped by Over 50 Years of Expertise.',
      href: '/gallery/carpentry',
      imageAlt: 'Photo of carpentry work',
      imageSrc: '/process_images/hneineh-Our-Carpentry-1920x1080.webp',
    },
    {
      id: 'design',
      title: 'Our Design',
      description: 'Step into our interior design projects — where ideas become reality.',
      pageDescription: 'Where dreams and ideas take shape through the expertise of our designers.',
      href: '/gallery/design',
      imageAlt: 'Photo of design work',
      imageSrc: '/process_images/hneineh-Our-Engineers-1920x1080.webp',
    },
  ],
}

// Filenames on disk under public/gallary aren't consistently zero-padded
// (renamed/reordered by hand), so the display order is hardcoded here rather
// than generated — this list IS the source of truth for gallery order.
// Note: despite the folder names, Int-WEBP holds the carpentry photos and
// Carp-WEBP holds the interior/design photos — mapped here by actual content.
const CARPENTRY_FILES = [
  'carpentry1.webp',
  'carpentry2.webp',
  'carpentry3.webp',
  'carpentry03.webp',
  'carpentry0003.webp',
  'carpentry00003.webp',
  'carpentry04.webp',
  'carpentry05.webp',
  'carpentry06.webp',
  'carpentry07.webp',
  'carpentry08.webp',
  'carpentry09.webp',
  'carpentry10.webp',
  'carpentry11.webp',
  'carpentry12.webp',
  'carpentry13.webp',
  'carpentry14.webp',
  'carpentry15.webp',
]

const INTERIOR_FILES = [
  'interior01.webp',
  'interior02.webp',
  'interior03.webp',
  'interior04.webp',
  'interior05.webp',
  'interior06.webp',
  'interior07.webp',
  'interior08.webp',
  'interior09.webp',
  'interior10.webp',
  'interior11.webp',
  'interior12.webp',
  'interior13.webp',
  'interior14.webp',
  'interior15.webp',
  'interior16.webp',
  'interior17.webp',
  'interior18.webp',
  'interior19.webp',
  'interior20.webp',
  'interior21.webp',
]

export const galleryPlaceholderImages: Localized<{
  carpentry: { id: string; label: string; imageSrc: string }[]
  design: { id: string; label: string; imageSrc: string }[]
}> = {
  ar: {
    carpentry: CARPENTRY_FILES.map((file, i) => ({
      id: `carpentry-${i + 1}`,
      label: `صورة مشروع نجارة ${i + 1}`,
      imageSrc: `/gallary/Int-WEBP/${file}`,
    })),
    design: INTERIOR_FILES.map((file, i) => ({
      id: `design-${i + 1}`,
      label: `صورة مشروع تصميم ${i + 1}`,
      imageSrc: `/gallary/Carp-WEBP/${file}`,
    })),
  },
  en: {
    carpentry: CARPENTRY_FILES.map((file, i) => ({
      id: `carpentry-${i + 1}`,
      label: `Carpentry project photo ${i + 1}`,
      imageSrc: `/gallary/Int-WEBP/${file}`,
    })),
    design: INTERIOR_FILES.map((file, i) => ({
      id: `design-${i + 1}`,
      label: `Design project photo ${i + 1}`,
      imageSrc: `/gallary/Carp-WEBP/${file}`,
    })),
  },
}
