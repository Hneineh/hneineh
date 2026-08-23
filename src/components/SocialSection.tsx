import { useRef } from 'react'
import { socialLinks } from '../content/site'
import { socialSection } from '../content/social'
import { useInView } from '../hooks/useInView'
import { usePick } from '../i18n/languageContext'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { socialIconPaths } from './ui/socialIconPaths'

export default function SocialSection() {
  const { ref, isInView } = useInView<HTMLDivElement>(0.2, false)
  const gridRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const section = usePick(socialSection)
  const links = usePick(socialLinks)

  // Imperative (no re-render) so the glow tracks the cursor at full frame rate.
  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = gridRef.current?.getBoundingClientRect()
    if (!rect || !glowRef.current) return
    glowRef.current.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    glowRef.current.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  return (
    <section className="bg-greige px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading title={section.title} />
          <p className="font-body mx-auto mt-3 max-w-md text-center text-sm text-ink/60">{section.subtitle}</p>
        </Reveal>

        <div
          ref={(node) => {
            ref.current = node
            gridRef.current = node
          }}
          onMouseMove={handlePointerMove}
          onMouseEnter={() => glowRef.current?.style.setProperty('--glow-opacity', '1')}
          onMouseLeave={() => glowRef.current?.style.setProperty('--glow-opacity', '0')}
          className="relative mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          <div
            ref={glowRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
            style={{
              opacity: 'var(--glow-opacity, 0)',
              background:
                'radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(111,125,82,0.35), transparent 70%)',
            }}
          />
          {links.map((link, index) => {
            const Icon = socialIconPaths[link.id]
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className={`group relative z-10 flex flex-col items-center gap-3 rounded-lg bg-white/50 p-6 text-center ring-1 ring-ink/10 transition duration-300 hover:-translate-y-1.5 hover:rotate-1 hover:bg-white/80 hover:shadow-md active:scale-90 ${
                  isInView ? 'animate-bounce-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span
                  className="animate-icon-float flex h-12 w-12 items-center justify-center rounded-full bg-ink/5 text-brown transition-all duration-300 group-hover:scale-125 group-hover:-rotate-12 group-hover:bg-olive group-hover:text-greige"
                  style={{ animationDelay: `${index * 220}ms` }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-body text-sm text-ink/80">{link.label}</span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
