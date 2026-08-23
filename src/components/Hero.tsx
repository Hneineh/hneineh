import type { StatItem } from '../content/types'
import { heroFrames, heroFramesMobile, heroStats, heroText } from '../content/hero'
import { useAppReady } from '../hooks/useAppReady'
import { useCountUp } from '../hooks/useCountUp'
import { useIsMobile } from '../hooks/useIsMobile'
import { usePick } from '../i18n/languageContext'
import { buildFrameUrls } from '../lib/frames'
import Bdi from './ui/Bdi'
import Reveal from './ui/Reveal'
import HeroFrameSequence from './HeroFrameSequence'

const desktopFrames = buildFrameUrls(heroFrames)
const mobileFrames = buildFrameUrls(heroFramesMobile)

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
  const frames = isMobile ? mobileFrames : desktopFrames

  return (
    <section id="top" aria-label={text.headline}>
      <HeroFrameSequence
        frames={frames}
        placeholderFrameCount={heroFrames.count}
        overlay={
          <div className="flex h-full flex-col items-center justify-center gap-10 px-6 text-center">
            <Reveal>
              <h1 className="font-display max-w-3xl text-3xl leading-snug text-greige drop-shadow-md sm:text-5xl">
                {text.headline}
              </h1>
            </Reveal>

            <Reveal delayMs={150}>
              <dl className="flex w-full max-w-3xl flex-col items-center gap-y-6 sm:grid sm:grid-cols-5 sm:gap-x-4">
                <div className="flex justify-center gap-x-4 sm:contents">
                  {stats.slice(0, 3).map((stat) => (
                    <Stat key={stat.id} stat={stat} shouldStart={appReady} />
                  ))}
                </div>
                <div className="flex justify-center gap-x-4 sm:contents">
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
        }
      />
    </section>
  )
}
