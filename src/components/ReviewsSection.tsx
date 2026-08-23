import { reviewsSection, testimonials } from '../content/testimonials'
import { usePick } from '../i18n/languageContext'
import Carousel from './ui/Carousel'
import SectionHeading from './ui/SectionHeading'

function VerifiedBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-olive/10 px-2.5 py-1 font-body text-xs text-olive">
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
        <path
          fillRule="evenodd"
          d="M10 1.5 12.2 3l2.8-.4.7 2.7 2.3 1.5-1.1 2.6 1.1 2.6-2.3 1.5-.7 2.7-2.8-.4L10 18.5 7.8 17l-2.8.4-.7-2.7-2.3-1.5 1.1-2.6-1.1-2.6 2.3-1.5.7-2.7 2.8.4z"
          clipRule="evenodd"
        />
        <path d="m7.5 10 1.8 1.8 3.2-3.6" stroke="#fff" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </span>
  )
}

export default function ReviewsSection() {
  const section = usePick(reviewsSection)
  const items = usePick(testimonials)

  return (
    <section id="reviews" className="bg-greige px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <SectionHeading title={section.title} />

        <div className="mt-12">
          <Carousel
            items={items}
            getKey={(testimonial) => testimonial.id}
            slideLabel={section.slideLabel}
            prevLabel={section.prevLabel}
            nextLabel={section.nextLabel}
            renderItem={(testimonial) => (
              <article className="flex h-full flex-col items-center justify-center gap-5 rounded-lg bg-white/50 p-6 text-center ring-1 ring-ink/10 sm:p-8">
                <p className="font-body line-clamp-5 text-sm leading-relaxed text-ink/80 sm:text-base">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="font-body font-semibold text-brown">{testimonial.name}</span>
                  {testimonial.verified && <VerifiedBadge label={testimonial.badgeLabel} />}
                </div>
              </article>
            )}
          />
        </div>
      </div>
    </section>
  )
}
