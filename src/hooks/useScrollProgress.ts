import { useEffect, useRef, useState, type RefObject } from 'react'

/**
 * Tracks scroll progress (0–1) of a tall wrapper element as it passes under
 * the viewport — 0 when its top reaches the top of the viewport, 1 once
 * its bottom has scrolled past by one viewport height.
 */
export function useScrollProgress<T extends HTMLElement>(): {
  ref: RefObject<T | null>
  progress: number
} {
  const ref = useRef<T | null>(null)
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const compute = () => {
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const scrollable = node.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const next = scrollable <= 0 ? 0 : Math.min(1, Math.max(0, scrolled / scrollable))
      setProgress(next)
    }

    const onScrollOrResize = () => {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        compute()
      })
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    compute()

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { ref, progress }
}
