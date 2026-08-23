declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/** Reports a GA4 page_view for an in-app route change (SPA navigations don't trigger gtag's automatic one). */
export function trackPageView(path: string) {
  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}
