import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent } from 'react'
import { createPortal } from 'react-dom'
import { usePick } from '../../i18n/languageContext'
import { lightboxText } from '../../content/gallery'

const MIN_SCALE = 1
const MAX_SCALE = 3
const ZOOM_STEP = 0.6

type LightboxProps = {
  src: string
  alt: string
  onClose: () => void
}

/** Full-screen image viewer with click/scroll-to-zoom and drag-to-pan, opened from a gallery grid. */
export default function Lightbox({ src, alt, onClose }: LightboxProps) {
  const text = usePick(lightboxText)
  const [scale, setScale] = useState(MIN_SCALE)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragState = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null)

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

  const handlePointerDown = (event: ReactPointerEvent<HTMLImageElement>) => {
    if (scale === MIN_SCALE) return
    dragState.current = { startX: event.clientX, startY: event.clientY, originX: offset.x, originY: offset.y }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLImageElement>) => {
    if (!dragState.current) return
    const { startX, startY, originX, originY } = dragState.current
    setOffset({ x: originX + (event.clientX - startX), y: originY + (event.clientY - startY) })
  }

  const stopDragging = () => {
    dragState.current = null
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

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

      <div
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
      </div>
    </div>,
    document.body,
  )
}
