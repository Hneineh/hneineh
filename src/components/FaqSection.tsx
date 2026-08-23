import { faqItems, faqSection } from '../content/faq'
import { services } from '../content/services'
import { usePick } from '../i18n/languageContext'
import Accordion from './ui/Accordion'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function FaqSection() {
  const section = usePick(faqSection)
  const items = usePick(faqItems)
  const serviceList = usePick(services)

  return (
    <section id="faq" className="bg-greige px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title={section.title} />

        <Reveal className="mt-12" delayMs={100}>
          <Accordion
            defaultOpenId={items[0]?.id}
            items={items.map((item) => ({
              id: item.id,
              question: item.question,
              content: (
                <>
                  <p>{item.answer}</p>
                  {item.showServicesList && (
                    <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                      {serviceList.map((service) => (
                        <li key={service.id} className="flex items-center gap-2 text-sm">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-olive" />
                          {service.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ),
            }))}
          />
        </Reveal>
      </div>
    </section>
  )
}
