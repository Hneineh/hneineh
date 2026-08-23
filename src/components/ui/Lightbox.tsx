import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent } from 'react'
import { createPortal } from 'react-dom'
import { usePick } from '../../i18n/languageContext'
import { lightboxText } from '../../content/gallery'

const MIN_SCALE = 1
const MAX_SCALE = 3
const ZOOM_STEP = 0.6

type LightboxImage = {
  src: string
  alt: string
}

type LightboxProps = {
  images: LightboxImage[]
  index: number
  onClose: () => void
  onIndexChange: (index: number) => void
}

/** Full-screen image viewer with click/scroll-to-zoom, drag-to-pan, and prev/next nav, opened from a gallery grid. */
export default function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const text = usePick(lightboxText)
  const [scale, setScale] = useState(MIN_SCALE)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragState = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null)
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const pinchState = useRef<{ startDist: number; startScale: number } | null>(null)
  const { src, alt } = images[index]
  const hasMultiple = images.length > 1

  const goTo = (nextIndex: number) => {
    setScale(MIN_SCALE)
    setOffset({ x: 0, y: 0 })
    onIndexChange((nextIndex + images.length) % images.length)
  }
  const goPrev = () => goTo(index - 1)
  const goNext = () => goTo(index + 1)

  const clampScale = (value: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value))

  const setZoom = (next: number) => {
    const clamped = clampScale(next)
    setScale(clamped)
    if (clamped === MIN_SCALE) setOffset({ x: 0, y: 0 })
  }

  const toggleZoom = () => setZoom(scale > MIN_SCALE ? MIN_SCALE : MIN_SCALE + ZOOM_STEP * 2)

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault()
    setZoom(scale - event.deltaY * 0.0015)
  }

  const pinchDistance = () => {
    const [a, b] = [...pointers.current.values()]
    return Math.hypot(a.x - b.x, a.y - b.y)
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLImageElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (pointers.current.size === 2) {
      dragState.current = null
      pinchState.current = { startDist: pinchDistance(), startScale: scale }
      return
    }
    if (scale === MIN_SCALE) return
    dragState.current = { startX: event.clientX, startY: event.clientY, originX: offset.x, originY: offset.y }
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLImageElement>) => {
    if (!pointers.current.has(event.pointerId)) return
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (pointers.current.size === 2 && pinchState.current) {
      const { startDist, startScale } = pinchState.current
      setZoom(startScale * (pinchDistance() / startDist))
      return
    }
    if (!dragState.current) return
    const { startX, startY, originX, originY } = dragState.current
    setOffset({ x: originX + (event.clientX - startX), y: originY + (event.clientY - startY) })
  }

  const stopDragging = (event: ReactPointerEvent<HTMLImageElement>) => {
    pointers.current.delete(event.pointerId)
    if (pointers.current.size < 2) pinchState.current = null
    dragState.current = null
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, index])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <div className="absolute inset-0 bg-ink/90 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <button
        type="button"
        onClick={onClose}
        aria-label={text.closeLabel}
        className="absolute end-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink/40 text-greige transition hover:bg-ink/60"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label={text.prevLabel}
            className="absolute start-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink/40 text-greige transition hover:bg-ink/60 sm:start-4 sm:flex"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 rtl:rotate-180">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={text.nextLabel}
            className="absolute end-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink/40 text-greige transition hover:bg-ink/60 sm:end-4 sm:flex"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 rtl:rotate-180">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      <div
        key={index}
        className="animate-popup-in relative flex max-h-[85vh] max-w-4xl items-center justify-center overflow-hidden"
        onWheel={handleWheel}
      >
        <img
          src={src}
          alt={alt}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerLeave={stopDragging}
          onClick={toggleZoom}
          className={`max-h-[85vh] max-w-full touch-none select-none rounded-lg object-contain transition-transform duration-200 ease-out ${
            scale > MIN_SCALE ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
          }`}
          style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}
          draggable={false}
        />
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink/40 px-2 py-2">
        {hasMultiple && (
          <button
            type="button"
            onClick={goPrev}
            aria-label={text.prevLabel}
            className="flex h-9 w-9 items-center justify-center rounded-full text-greige transition hover:bg-greige/20 sm:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 rtl:rotate-180">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <button
          type="button"
          onClick={() => setZoom(scale - ZOOM_STEP)}
          disabled={scale <= MIN_SCALE}
          aria-label={text.zoomOutLabel}
          className="flex h-9 w-9 items-center justify-center rounded-full text-greige transition hover:bg-greige/20 disabled:opacity-30"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setZoom(scale + ZOOM_STEP)}
          disabled={scale >= MAX_SCALE}
          aria-label={text.zoomInLabel}
          className="flex h-9 w-9 items-center justify-center rounded-full text-greige transition hover:bg-greige/20 disabled:opacity-30"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        {hasMultiple && (
          <button
            type="button"
            onClick={goNext}
            aria-label={text.nextLabel}
            className="flex h-9 w-9 items-center justify-center rounded-full text-greige transition hover:bg-greige/20 sm:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 rtl:rotate-180">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </div>,
    document.body,
  )
}
