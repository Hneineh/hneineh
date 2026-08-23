import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { navContactCta, navLinks } from '../content/nav'
import { scrollToSection } from '../lib/scrollToHash'
import { site, siteText } from '../content/site'
import { useLanguage, usePick } from '../i18n/languageContext'
import ContactPopup from './ContactPopup'

const menuAriaLabel = { ar: 'القائمة', en: 'Menu' }
const translateAction = {
  ar: { label: 'EN', aria: 'Switch to English' },
  en: { label: 'AR', aria: 'التبديل إلى العربية' },
}

function TranslateToggle({ className }: { className?: string }) {
  const { lang, toggleLang } = useLanguage()
  const action = translateAction[lang]

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={action.aria}
      className={`font-body flex h-8 items-center justify-center rounded-full border border-brown/25 px-3 text-[11px] font-semibold tracking-wide text-brown transition hover:border-olive hover:bg-olive hover:text-greige ${className ?? ''}`}
    >
      {action.label}
    </button>
  )
}

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const { lang } = useLanguage()
  const links = usePick(navLinks)
  const cta = usePick(navContactCta)
  const text = usePick(siteText)
  const navTextSize = lang === 'ar' ? 'text-sm' : 'text-[12px]'
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Nav links are in-page anchors ("#process") — that only works while
  // already on "/". From another route (e.g. a gallery page), route to
  // "/" with the same hash instead of just rewriting the URL fragment.
  // On "/" itself, scroll manually so short sections (reviews/contact/faq)
  // can center in the viewport instead of the browser's default top-align.
  const handleAnchorClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (pathname === '/') {
      scrollToSection(href.slice(1))
    } else {
      navigate(`/${href}`)
    }
  }

  // Close the mobile menu on outside click/tap, Escape, or if the viewport
  // grows past the lg breakpoint (e.g. rotating a tablet) — otherwise the
  // menu can get stuck open with no way to dismiss it.
  useEffect(() => {
    if (!isMenuOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (menuRef.current?.contains(target) || menuButtonRef.current?.contains(target)) return
      setIsMenuOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-greige/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        {/* Logo sits at the logical start of the row — flex order follows the
            document's dir, so this renders on the visual right in Arabic and
            the visual left in English without hardcoding a side. Horizontal
            lockup on tablet/desktop, compact icon mark on mobile where the
            wordmark would crowd the header. */}
        <a href="#top" onClick={handleAnchorClick('#top')} className="shrink-0">
          <img src={site.logos.horizontal} alt={text.logoAlt} className="hidden h-8 w-auto sm:block" />
          <img src={site.logos.primaryIcon} alt={text.logoAlt} className="h-9 w-auto sm:hidden" />
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={handleAnchorClick(link.href)}
              className={`font-body ${navTextSize} font-bold text-ink/70 transition hover:text-brown`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <TranslateToggle />
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className={`rounded-md bg-olive ps-5 pe-5 py-2 font-body ${navTextSize} text-greige transition hover:scale-[1.03] hover:opacity-90`}
          >
            {cta.label}
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <TranslateToggle />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={menuAriaLabel[lang]}
            className="flex h-9 w-9 items-center justify-center rounded-md ring-1 ring-ink/10"
          >
            <span className="relative flex h-4 w-5 flex-col justify-between">
              <span
                className={`block h-0.5 w-full rounded-full bg-ink transition-transform duration-300 ${
                  isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full rounded-full bg-ink transition-opacity duration-200 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block h-0.5 w-full rounded-full bg-ink transition-transform duration-300 ${
                  isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div ref={menuRef} className="border-t border-ink/10 bg-greige/90 px-6 py-4 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(event) => {
                  setIsMenuOpen(false)
                  handleAnchorClick(link.href)(event)
                }}
                className={`font-body ${navTextSize} font-bold text-ink/80`}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false)
                setIsContactOpen(true)
              }}
              className={`w-fit rounded-md bg-olive ps-5 pe-5 py-2 font-body ${navTextSize} text-greige`}
            >
              {cta.label}
            </button>
          </nav>
        </div>
      )}

      <ContactPopup open={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </header>
  )
}
