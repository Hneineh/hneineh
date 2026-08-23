import CtaSection from '../components/CtaSection'
import ContactSection from '../components/ContactSection'
import FaqSection from '../components/FaqSection'
import GalleryLinksSection from '../components/GalleryLinksSection'
import Hero from '../components/Hero'
import ProcessSection from '../components/ProcessSection'
import ReviewsSection from '../components/ReviewsSection'

export default function Home() {
  return (
    <>
      <Hero />
      <ProcessSection />
      <CtaSection />
      <ReviewsSection />
      <GalleryLinksSection />
      <FaqSection />
      <ContactSection />
    </>
  )
}
