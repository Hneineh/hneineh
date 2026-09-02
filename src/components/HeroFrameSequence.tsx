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

/** Frames to keep fetching ahead of / behind the one on screen. Forward-
 *  biased because scroll-scrub almost always moves down through the sequence;
 *  the small backward margin covers scrolling back up. */
const WINDOW_AHEAD = 20
const WINDOW_BEHIND = 10
/** Cap on concurrent frame downloads. Keeps bandwidth focused on the frames
 *  about to be shown instead of splitting it across the whole sequence, so
 *  the ones near the viewport land far sooner on a slow connection. */
const MAX_CONCURRENT_LOADS = 6

/**
 * Scroll-scrubbed frame-sequence player. Renders a full-viewport sticky
 * canvas inside a tall wrapper; scroll position within that wrapper maps to
 * the current frame. Falls back to a labeled placeholder box when no frames
 * have been supplied yet.
 *
 * Loading is windowed: the first frame loads immediately, then a moving
 * window of frames around the current scroll position keeps itself topped
 * up (see WINDOW_AHEAD / MAX_CONCURRENT_LOADS) as the user scrolls, rather
 * than queueing all ~120 frames up front. The canvas draws the nearest
 * already-loaded frame while the exact one for the current scroll position
 * is still on the way in.
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

  // Which frame the scroll position currently maps to, and a handle to the
  // active loader's "top up the window" function — both read across effects.
  const currentIndexRef = useRef(0)
  const pumpRef = useRef<(() => void) | null>(null)

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
    const state = new Uint8Array(frameCount) // 0 = idle, 1 = loading, 2 = done
    let inFlight = 0
    let loaded = 0

    const startOne = (i: number) => {
      if (cancelled || state[i] !== 0) return
      state[i] = 1
      inFlight += 1
      const img = new Image()
      img.decoding = 'async'
      // Only the frame actually on screen needs to jump the network queue.
      img.fetchPriority = i === currentIndexRef.current ? 'high' : 'low'
      const finish = () => {
        inFlight -= 1
        state[i] = 2
        loaded += 1
        if (cancelled) return
        setLoadedCount(loaded)
        if (i === 0) setIsFirstFrameReady(true)
        pump() // a slot freed up — pull in the next frame in the window
      }
      img.onload = finish
      img.onerror = finish
      img.src = frames[i]
      images[i] = img
    }

    // Frames we want in memory right now, ordered nearest-to-viewport first
    // so the concurrency cap always spends its slots on the most useful ones.
    const windowedFrames = () => {
      const c = currentIndexRef.current
      const wanted = [c, 0] // on-screen frame first, then the poster/first frame
      for (let d = 1; d <= Math.max(WINDOW_AHEAD, WINDOW_BEHIND); d += 1) {
        if (d <= WINDOW_AHEAD && c + d < frameCount) wanted.push(c + d)
        if (d <= WINDOW_BEHIND && c - d >= 0) wanted.push(c - d)
      }
      return wanted
    }

    const pump = () => {
      if (cancelled) return
      for (const i of windowedFrames()) {
        if (inFlight >= MAX_CONCURRENT_LOADS) break
        if (state[i] === 0) startOne(i)
      }
    }

    pumpRef.current = pump
    pump()

    return () => {
      cancelled = true
      pumpRef.current = null
    }
  }, [frames, frameCount])

  // As the scroll position moves the current frame, slide the load window.
  useEffect(() => {
    if (frameCount === 0) return
    const idx = Math.min(frameCount - 1, Math.round(progress * (frameCount - 1)))
    if (idx === currentIndexRef.current) return
    currentIndexRef.current = idx
    pumpRef.current?.()
  }, [progress, frameCount])

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
