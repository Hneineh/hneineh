import { useEffect, useRef, useState } from 'react'

/**
 * Tracks whether the element is in the viewport. Toggles both ways by
 * default, so entrance animations replay every time a section scrolls back
 * into view; pass `once: true` for a single one-time trigger instead.
 *
 * Uses threshold 0 (any pixel visible counts as "in view") so the reset to
 * hidden only ever happens once the element is fully off-screen — content
 * never fades to empty while it's still visible on screen.
 */
export function useInView<T extends HTMLElement>(threshold = 0, once = false, rootMargin = '0px') {
  const ref = useRef<T | null>(null)
  const [isInView, setIsInView] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, once, rootMargin])

  return { ref, isInView }
}
