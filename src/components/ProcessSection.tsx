import { processSection, processSteps } from '../content/process'
import { usePick } from '../i18n/languageContext'
import ImagePlaceholder from './ui/ImagePlaceholder'
import ImageWithLoader from './ui/ImageWithLoader'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function ProcessSection() {
  const section = usePick(processSection)
  const steps = usePick(processSteps)

  return (
    <section id="process" className="bg-greige px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title={section.title} />

        <div className="mt-16 flex flex-col gap-16 md:gap-24">
          {steps.map((step, index) => {
            const imageFirst = index % 2 === 0
            return (
              <Reveal key={step.id} delayMs={100}>
                <article
                  className={`flex flex-col items-center gap-8 md:flex-row md:gap-12 ${
                    imageFirst ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="w-full overflow-hidden rounded-xl shadow-sm md:w-1/2">
                    {step.imageSrc ? (
                      <ImageWithLoader
                        src={step.imageSrc}
                        alt={step.imageAlt}
                        className="aspect-square w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                      />
                    ) : (
                      <ImagePlaceholder label={step.imageAlt} ratio="square" className="rounded-none" />
                    )}
                  </div>

                  <div className="relative w-full text-center md:w-1/2 md:text-start">
                    <span
                      aria-hidden="true"
                      className="font-display pointer-events-none block text-7xl text-brown/10 sm:text-8xl"
                    >
                      {step.numeral}
                    </span>
                    <h3 className="font-body -mt-6 text-xl font-semibold text-brown sm:-mt-8 sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="font-body mx-auto mt-3 max-w-md text-base leading-relaxed text-ink/80 md:mx-0">
                      {step.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
