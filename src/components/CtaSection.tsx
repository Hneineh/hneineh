import { ctaSection } from '../content/cta'
import { contactConfig } from '../content/contact'
import { usePick } from '../i18n/languageContext'
import Reveal from './ui/Reveal'

export default function CtaSection() {
  const cta = usePick(ctaSection)

  return (
    <section className="relative overflow-hidden bg-olive px-6 py-16 text-center">
      <div
        aria-hidden="true"
        className="drift absolute -top-16 start-[8%] h-56 w-56 rounded-full bg-greige/10 blur-3xl"
        style={{ animation: 'drift 9s ease-in-out infinite' }}
      />
      <div
        aria-hidden="true"
        className="drift absolute -bottom-20 end-[10%] h-64 w-64 rounded-full bg-greige/10 blur-3xl"
        style={{ animation: 'drift 11s ease-in-out infinite reverse' }}
      />

      <Reveal className="relative">
        <h2 className="font-body mx-auto max-w-2xl text-2xl text-greige sm:text-3xl">{cta.heading}</h2>
        <a
          href={contactConfig.whatsappUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="font-body mt-6 inline-block rounded-md bg-greige ps-8 pe-8 py-3 text-brown transition hover:scale-[1.03] hover:shadow-lg"
        >
          {cta.buttonLabel}
        </a>
      </Reveal>
    </section>
  )
}
