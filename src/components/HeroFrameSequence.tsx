import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { markHeroFramesReady } from '../lib/heroReadiness'

type HeroFrameSequenceProps = {
  /** Ordered array of frame image URLs, first to last. */
  frames: string[]
  /** How many viewport-heights the scroll animation plays over */
  scrollLengthVh?: number
  /** Frame count to display in the placeholder box when `frames` is empty */
  placeholderFrameCount?: number
  /** Content layered on top of the video (headline, stats, etc.) */
  overlay?: ReactNode
}

/**
 * Scroll-scrubbed frame-sequence player. Renders a full-viewport sticky
 * canvas inside a tall wrapper; scroll position within that wrapper maps to
 * the current frame. Falls back to a labeled placeholder box when no frames
 * have been supplied yet.
 *
 * Loading is progressive past the first frame: the app-wide pre-launch
 * splash (see lib/preloader.ts) is what actually keeps the page hidden
 * until that first frame is ready, so there's no separate loading state
 * here. Every other frame keeps downloading in the background after that,
 * and the canvas draws the nearest already-loaded frame while the exact
 * one for the current scroll position is still on the way in.
 */
export default function HeroFrameSequence({
  frames,
  scrollLengthVh = 400,
  placeholderFrameCount = 0,
  overlay,
}: HeroFrameSequenceProps) {
  const { ref: wrapperRef, progress } = useScrollProgress<HTMLDivElement>()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const frameCount = frames.length

  const [loadedCount, setLoadedCount] = useState(0)
  const [isFirstFrameReady, setIsFirstFrameReady] = useState(frameCount === 0)

  useEffect(() => {
    if (isFirstFrameReady) markHeroFramesReady()
  }, [isFirstFrameReady])

  useEffect(() => {
    if (frameCount === 0) return
    let cancelled = false
    const images: HTMLImageElement[] = new Array(frameCount)
    imagesRef.current = images

    let loaded = 0
    const onOneLoaded = (index: number) => {
      loaded += 1
      if (cancelled) return
      setLoadedCount(loaded)
      if (index === 0) setIsFirstFrameReady(true)
    }

    frames.forEach((src, i) => {
      const img = new Image()
      img.decoding = 'async'
      // Only the frame the user sees immediately needs to jump the queue.
      img.fetchPriority = i === 0 ? 'high' : 'low'
      img.src = src
      img.onload = () => onOneLoaded(i)
      img.onerror = () => onOneLoaded(i)
      images[i] = img
    })

    return () => {
      cancelled = true
    }
  }, [frames, frameCount])

  useEffect(() => {
    if (frameCount === 0) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const targetIndex = Math.min(frameCount - 1, Math.round(progress * (frameCount - 1)))
    const isLoaded = (i: number) => {
      const candidate = imagesRef.current[i]
      return Boolean(candidate?.complete && candidate.naturalWidth > 0)
    }

    // Draw the exact frame if it's ready; otherwise fall back to the
    // nearest already-loaded frame so the picture never just freezes or
    // goes blank while the rest of the sequence is still downloading.
    let frameIndex = targetIndex
    if (!isLoaded(frameIndex)) {
      let offset = 1
      while (offset < frameCount) {
        if (isLoaded(targetIndex - offset)) {
          frameIndex = targetIndex - offset
          break
        }
        if (isLoaded(targetIndex + offset)) {
          frameIndex = targetIndex + offset
          break
        }
        offset += 1
      }
    }

    const img = imagesRef.current[frameIndex]
    if (!img || !img.complete || img.naturalWidth === 0) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const canvasWidth = canvas.clientWidth
    const canvasHeight = canvas.clientHeight
    if (canvas.width !== canvasWidth * dpr || canvas.height !== canvasHeight * dpr) {
      canvas.width = canvasWidth * dpr
      canvas.height = canvasHeight * dpr
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const imgAspect = img.naturalWidth / img.naturalHeight
    const canvasAspect = canvasWidth / canvasHeight

    let drawWidth: number
    let drawHeight: number
    if (imgAspect > canvasAspect) {
      drawHeight = canvasHeight
      drawWidth = drawHeight * imgAspect
    } else {
      drawWidth = canvasWidth
      drawHeight = drawWidth / imgAspect
    }
    const offsetX = (canvasWidth - drawWidth) / 2
    const offsetY = (canvasHeight - drawHeight) / 2

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
  }, [progress, frameCount, loadedCount])

  return (
    <div ref={wrapperRef} style={{ height: `${scrollLengthVh}vh` }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        {frameCount > 0 ? (
          <canvas ref={canvasRef} className="h-full w-full" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-ink/90 text-greige/60">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-10 w-10">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m9 9 6 3-6 3z" fill="currentColor" stroke="none" />
            </svg>
            <p className="font-body text-sm">
              فيديو تسلسل اللقطات ({placeholderFrameCount} إطار) — قيد الإضافة
            </p>
          </div>
        )}

        {overlay && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="pointer-events-none absolute inset-0">{overlay}</div>
          </>
        )}
      </div>
    </div>
  )
}
