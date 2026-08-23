import { useEffect, useRef, useState, type ReactNode } from 'react'

type CarouselProps<T> = {
  items: T[]
  renderItem: (item: T, isActive: boolean) => ReactNode
  getKey: (item: T) => string
  autoPlayMs?: number
  slideLabel: (index: number) => string
  prevLabel: string
  nextLabel: string
}

function ArrowButton({
  direction,
  label,
  onClick,
}: {
  direction: 'prev' | 'next'
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center text-brown/60 transition hover:text-brown"
    >
      {/*
        Reading-direction aware: "prev" is a start-pointing chevron and
        "next" is an end-pointing one, each mirrored in RTL via rtl:rotate-180
        so the glyph always points toward the actual backward/forward
        direction regardless of language, while DOM order (prev before next)
        lets `dir` place them at the correct physical side automatically.
      */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={`h-5 w-5 rtl:rotate-180`}
      >
        {direction === 'prev' ? (
          <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  )
}

/**
 * Single-slide crossfade carousel that auto-advances on an interval and
 * pauses for as long as the user is hovering, focused inside, or touching it.
 */
export default function Carousel<T>({
  items,
  renderItem,
  getKey,
  autoPlayMs = 5000,
  slideLabel,
  prevLabel,
  nextLabel,
}: CarouselProps<T>) {
  const [index, setIndex] = useState(0)
  const isPausedRef = useRef(false)

  const goPrev = () => setIndex((current) => (current - 1 + items.length) % items.length)
  const goNext = () => setIndex((current) => (current + 1) % items.length)

  useEffect(() => {
    if (items.length <= 1) return
    const id = setInterval(() => {
      if (!isPausedRef.current) {
        setIndex((current) => (current + 1) % items.length)
      }
    }, autoPlayMs)
    return () => clearInterval(id)
    // Restarting on `index` means any navigation — manual or automatic —
    // gives a full fresh interval, instead of the timer firing again right
    // after a manual click and causing a rapid double-advance.
  }, [items.length, autoPlayMs, index])

  const pause = () => {
    isPausedRef.current = true
  }
  const resume = () => {
    isPausedRef.current = false
  }

  return (
    <div
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      <div className="relative h-80 overflow-hidden sm:h-72">
        {items.map((item, i) => (
          <div
            key={getKey(item)}
            aria-hidden={i !== index}
            className={`h-full transition-all duration-700 ease-out ${
              i === index
                ? 'relative z-10 opacity-100'
                : 'pointer-events-none absolute inset-0 opacity-0'
            }`}
          >
            {renderItem(item, i === index)}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <ArrowButton direction="prev" label={prevLabel} onClick={goPrev} />

          <div className="flex flex-wrap items-center justify-center gap-2">
            {items.map((item, i) => (
              <button
                key={getKey(item)}
                type="button"
                aria-label={slideLabel(i)}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-olive' : 'w-2 bg-ink/20 hover:bg-ink/40'
                }`}
              />
            ))}
          </div>

          <ArrowButton direction="next" label={nextLabel} onClick={goNext} />
        </div>
      )}
    </div>
  )
}
