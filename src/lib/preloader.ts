import { heroFramesReady } from './heroReadiness'

const MIN_DISPLAY_MS = 400
// Generous — this is now also waiting on the hero's first frame image to
// download, which can legitimately take a few seconds on a slow connection.
const MAX_WAIT_MS = 8000

/** Fired the moment the splash starts fading away — the page is now visible. */
export const APP_READY_EVENT = 'app:ready'

// window events aren't buffered — a listener that subscribes after this
// fires would otherwise wait forever, so late subscribers (useAppReady) can
// check this instead of relying solely on catching the event.
let appReadyFired = false
window.addEventListener(APP_READY_EVENT, () => {
  appReadyFired = true
})

export function isAppReady() {
  return appReadyFired
}

/**
 * Fades out and removes the static #app-preloader splash (see index.html)
 * once the app has actually mounted, fonts are ready, and the hero has
 * painted its first frame — with a minimum display time so it never just
 * flashes, and a hard timeout in case any of those signals never resolves.
 * Dispatches APP_READY_EVENT so on-page animations (like the hero stat
 * count-up) can wait until the splash is actually gone instead of running
 * underneath it.
 */
export function hideAppPreloader() {
  const el = document.getElementById('app-preloader')
  if (!el) {
    window.dispatchEvent(new Event(APP_READY_EVENT))
    return
  }

  const minDelay = new Promise((resolve) => setTimeout(resolve, MIN_DISPLAY_MS))
  const fontsReady = document.fonts?.ready ?? Promise.resolve()
  const ready = Promise.all([minDelay, fontsReady, heroFramesReady])
  const timeout = new Promise((resolve) => setTimeout(resolve, MAX_WAIT_MS))

  Promise.race([ready, timeout]).then(() => {
    el.style.opacity = '0'
    window.dispatchEvent(new Event(APP_READY_EVENT))
    el.addEventListener('transitionend', () => el.remove(), { once: true })
    setTimeout(() => el.remove(), 500)
  })
}
