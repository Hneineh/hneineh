import type { heroFrames } from '../content/hero'

/** Expands the /content/hero.ts frame config into an ordered URL array. */
export function buildFrameUrls(config: typeof heroFrames): string[] {
  return Array.from({ length: config.count }, (_, i) => {
    const num = String(i + 1).padStart(config.padLength, '0')
    return `${config.basePath}${num}.${config.extension}`
  })
}
