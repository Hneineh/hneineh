import { useEffect, useState } from 'react'

// Matches a run of either Western (0-9) or Arabic-Indic (٠-٩) digits.
const numberPattern = /[\d٠-٩]+/

const ARABIC_INDIC_DIGITS = '٠١٢٣٤٥٦٧٨٩'

function toWesternDigits(digits: string): string {
  return digits.replace(/[٠-٩]/g, (d) => String(ARABIC_INDIC_DIGITS.indexOf(d)))
}

function toArabicIndicDigits(n: string): string {
  return n.replace(/\d/g, (d) => ARABIC_INDIC_DIGITS[Number(d)])
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

/**
 * Animates the leading number inside a stat string (e.g. "46+", "٤٦+") from
 * 0 up to its target once `shouldStart` becomes true, keeping any prefix/
 * suffix text (K, +, ...) intact around the animated digits, and rendering
 * the count in whichever digit style (Western or Arabic-Indic) it started in.
 */
export function useCountUp(value: string, shouldStart: boolean, durationMs = 1200): string {
  const match = value.match(numberPattern)
  const target = match ? Number(toWesternDigits(match[0])) : null
  const isArabicIndic = match ? /[٠-٩]/.test(match[0]) : false
  const [display, setDisplay] = useState(target === null ? value : value.replace(numberPattern, isArabicIndic ? '٠' : '0'))

  useEffect(() => {
    // No animatable digits — just show the value as-is instead of leaving
    // the previous language's number.
    if (target === null) {
      setDisplay(value)
      return
    }
    if (!shouldStart) return

    let raf: number
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(1, elapsed / durationMs)
      const current = Math.round(easeOutCubic(progress) * target)
      const currentText = isArabicIndic ? toArabicIndicDigits(String(current)) : String(current)
      setDisplay(value.replace(numberPattern, currentText))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [shouldStart, target, value, durationMs, isArabicIndic])

  return display
}
