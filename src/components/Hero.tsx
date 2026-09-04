import type { StatItem } from '../content/types'
import { heroStats, heroText } from '../content/hero'
import { useAppReady } from '../hooks/useAppReady'
import { useCountUp } from '../hooks/useCountUp'
import { useIsMobile } from '../hooks/useIsMobile'
import { usePick } from '../i18n/languageContext'
import Bdi from './ui/Bdi'
import Reveal from './ui/Reveal'

function StatValue({ stat, shouldStart }: { stat: StatItem; shouldStart: boolean }) {
  const display = useCountUp(stat.value, shouldStart)
  return (
    <Bdi className="inline-block text-center tabular-nums" style={{ minWidth: `${stat.value.length}ch` }}>
      {display}
    </Bdi>
  )
}

function Stat({ stat, shouldStart }: { stat: StatItem; shouldStart: boolean }) {
  return (
    <div className="flex w-20 shrink-0 flex-col items-center gap-1 sm:w-auto">
      <dt className="sr-only">{stat.label}</dt>
      <dd className="font-body text-3xl font-bold text-greige drop-shadow-md sm:text-4xl">
        <StatValue stat={stat} shouldStart={shouldStart} />
      </dd>
      <dd className="font-body text-xs text-greige drop-shadow sm:text-sm">{stat.label}</dd>
    </div>
  )
}

export default function Hero() {
  const appReady = useAppReady()
  const text = usePick(heroText)
  const stats = usePick(heroStats)
  const isMobile = useIsMobile()
  const heroImageSrc = isMobile ? '/hero_images/hero_image_mobile.png' : '/hero_images/hero_image_desktop.jpeg'

  return (
    <section id="top" aria-label={text.headline}>
      <div className="relative h-screen w-full overflow-hidden bg-ink">
        <img
          src={heroImageSrc}
          alt={text.headline}
          className="h-full w-full object-cover object-center"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

        <div className="pointer-events-none absolute inset-0">
          {isMobile ? (
            <div className="relative h-full pt-[30px] text-center">
              <Reveal className="absolute inset-x-0 top-[250px] px-6">
                <h1 className="font-display mx-auto max-w-3xl text-3xl leading-snug text-greige drop-shadow-md">
                  {text.headline}
                </h1>
              </Reveal>

              <div className="absolute inset-x-0 top-[60%] flex flex-col items-center gap-6 px-6 text-center">
                <Reveal delayMs={150}>
                  <dl className="flex w-full max-w-3xl flex-col items-center gap-y-6">
                    <div className="flex justify-center gap-x-4">
                      {stats.slice(0, 3).map((stat) => (
                        <Stat key={stat.id} stat={stat} shouldStart={appReady} />
                      ))}
                    </div>
                    <div className="flex justify-center gap-x-4">
                      {stats.slice(3).map((stat) => (
                        <Stat key={stat.id} stat={stat} shouldStart={appReady} />
                      ))}
                    </div>
                  </dl>
                </Reveal>

                <Reveal delayMs={300}>
                  <p className="font-body text-sm text-greige drop-shadow">{text.scrollHint}</p>
                </Reveal>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-25 px-6 text-center">
              <Reveal>
                <h1 className="font-display max-w-4xl text-3xl leading-snug text-greige drop-shadow-md sm:text-5xl">
                  {text.headline}
                </h1>
              </Reveal>

              <Reveal delayMs={150}>
                <dl className="grid w-full max-w-3xl grid-cols-5 gap-x-4">
                  {stats.map((stat) => (
                    <Stat key={stat.id} stat={stat} shouldStart={appReady} />
                  ))}
                </dl>
              </Reveal>

              <Reveal delayMs={300}>
                <p className="font-body text-sm text-greige drop-shadow">{text.scrollHint}</p>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
