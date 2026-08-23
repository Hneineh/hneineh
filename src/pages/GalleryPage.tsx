import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageWithLoader from '../components/ui/ImageWithLoader'
import Lightbox from '../components/ui/Lightbox'
import Reveal from '../components/ui/Reveal'
import { galleryLinks, galleryPageText, galleryPlaceholderImages } from '../content/gallery'
import { usePick } from '../i18n/languageContext'

type GalleryPageProps = {
  galleryId: keyof (typeof galleryPlaceholderImages)['ar']
}

export default function GalleryPage({ galleryId }: GalleryPageProps) {
  const navigate = useNavigate()
  const links = usePick(galleryLinks)
  const images = usePick(galleryPlaceholderImages)[galleryId]
  const pageText = usePick(galleryPageText)
  const link = links.find((item) => item.id === galleryId)
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <main className="min-h-screen bg-greige px-6 py-16 text-ink">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="font-body inline-flex items-center gap-1 text-sm text-ink/60 transition hover:text-brown"
        >
          <span aria-hidden="true" className="rtl:rotate-180">
            ←
          </span>
          {pageText.backToHome}
        </button>

        <h1 className="font-body mt-4 text-3xl font-semibold text-brown sm:text-4xl">{link?.title}</h1>
        {link && <p className="font-body mt-2 max-w-xl text-ink/70">{link.pageDescription}</p>}

        {link?.imageSrc && (
          <div className="mt-8">
            <ImageWithLoader
              src={link.imageSrc}
              alt={link.imageAlt}
              className="aspect-video max-h-[480px] w-full rounded-lg object-cover"
            />
          </div>
        )}

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, i) => (
            <Reveal key={image.id} delayMs={(i % 3) * 80}>
              <button
                type="button"
                onClick={() => setActiveImage({ src: image.imageSrc, alt: image.label })}
                className="block w-full cursor-zoom-in overflow-hidden rounded-lg transition hover:-translate-y-1 hover:shadow-lg"
              >
                <ImageWithLoader
                  src={image.imageSrc}
                  alt={image.label}
                  className="aspect-square w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </button>
            </Reveal>
          ))}
        </section>
      </div>

      {activeImage && (
        <Lightbox src={activeImage.src} alt={activeImage.alt} onClose={() => setActiveImage(null)} />
      )}
    </main>
  )
}
