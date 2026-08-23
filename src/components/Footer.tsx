import { footerContent } from '../content/footer'
import { site, siteText } from '../content/site'
import { usePick } from '../i18n/languageContext'
import Bdi from './ui/Bdi'
import Reveal from './ui/Reveal'

export default function Footer() {
  const year = new Date().getFullYear()
  const text = usePick(siteText)
  const footer = usePick(footerContent)

  return (
    <footer className="bg-ink px-6 py-14 text-greige">
      <Reveal>
        <div className="mx-auto flex max-w-md flex-col items-center gap-6 text-center">
          <img src={site.logos.verticalBeige} alt={text.logoAlt} className="h-16 w-auto" />
          <p className="font-body -mt-2 text-xs text-greige/60">{text.tagline}</p>

          <div className="h-px w-12 bg-greige/15" />

          <div className="font-body flex flex-col items-center gap-1 text-xs text-greige/60">
            <Bdi>{text.email}</Bdi>
            <p>{footer.copyright(year)}</p>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}
