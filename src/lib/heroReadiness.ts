let resolveFn: (() => void) | undefined
let settled = false

/** Resolves once the hero has painted its first frame — or immediately on
 *  routes that never render a hero at all (see skipHeroReadinessGate). */
export const heroFramesReady = new Promise<void>((resolve) => {
  resolveFn = resolve
})

function settle() {
  if (settled) return
  settled = true
  resolveFn?.()
}

/** Call once the hero's first frame has actually loaded and painted. */
export function markHeroFramesReady() {
  settle()
}

/** Call on routes that don't render the hero, so the app preloader isn't
 *  left waiting on a signal that will never come. */
export function skipHeroReadinessGate() {
  settle()
}
