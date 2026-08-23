import { useEffect, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { contactConfig, contactPopup } from '../content/contact'
import { usePick } from '../i18n/languageContext'
import { scrollToSection } from '../lib/scrollToHash'
import Bdi from './ui/Bdi'

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M3.5 6.5h17v11h-17z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M6.5 3.5c1 0 2.2 2 2.2 3 0 1-1.3 1.6-1.3 2.5 0 1.8 3.1 4.9 4.9 4.9.9 0 1.5-1.3 2.5-1.3 1 0 3 1.2 3 2.2 0 1.6-1.5 3.2-3 3.2-3 0-9.3-6.3-9.3-9.3 0-1.5 1.6-5.2 1-5.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ContactPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const text = usePick(contactPopup)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleEmailClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onClose()
    if (pathname === '/') {
      scrollToSection('contact')
    } else {
      navigate('/#contact')
    }
  }

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label={text.title}
    >
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="animate-popup-in relative w-full max-w-sm overflow-hidden rounded-2xl bg-greige shadow-2xl ring-1 ring-ink/10">
        <div className="relative bg-olive px-6 pb-8 pt-6 text-center">
          <button
            type="button"
            onClick={onClose}
            aria-label={text.closeLabel}
            className="absolute end-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-greige/90 transition hover:bg-greige/15"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <h2 className="font-display text-2xl text-greige">{text.title}</h2>
          <p className="font-body mt-2 text-sm text-greige/80">{text.subtitle}</p>
        </div>

        <div className="flex flex-col gap-3 px-6 py-6">
          <a
            href="#contact"
            onClick={handleEmailClick}
            className="group flex items-center gap-4 rounded-xl bg-white/60 px-4 py-4 ring-1 ring-ink/10 transition hover:bg-white hover:ring-olive"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-olive/10 text-olive transition group-hover:bg-olive group-hover:text-greige">
              <MailIcon />
            </span>
            <span className="flex flex-col items-start text-start">
              <span className="font-body text-xs text-ink/60">{text.emailLabel}</span>
              <Bdi className="font-body text-sm font-semibold text-ink">{contactConfig.recipientEmail}</Bdi>
            </span>
          </a>

          <a
            href={contactConfig.whatsappUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex items-center gap-4 rounded-xl bg-white/60 px-4 py-4 ring-1 ring-ink/10 transition hover:bg-white hover:ring-olive"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-olive/10 text-olive transition group-hover:bg-olive group-hover:text-greige">
              <PhoneIcon />
            </span>
            <span className="flex flex-col items-start text-start">
              <span className="font-body text-xs text-ink/60">{text.phoneLabel}</span>
              <Bdi className="font-body text-sm font-semibold text-ink">{contactConfig.phoneNumber}</Bdi>
            </span>
          </a>
        </div>
      </div>
    </div>,
    document.body,
  )
}
