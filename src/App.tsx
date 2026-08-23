import { useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Nav from './components/Nav'
import SocialSection from './components/SocialSection'
import { trackPageView } from './lib/analytics'
import { skipHeroReadinessGate } from './lib/heroReadiness'
import { scrollToSection } from './lib/scrollToHash'

function App() {
  const { pathname, hash } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Only "/" renders the hero — every other route needs to tell the app
    // preloader not to wait for a first-frame signal that'll never come.
    if (pathname !== '/') skipHeroReadinessGate()
  }, [pathname])

  useEffect(() => {
    // gtag's own 'config' call already reports a page_view for the initial
    // load — only report subsequent SPA route changes here to avoid a
    // duplicate pageview for the first path.
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    trackPageView(pathname)
  }, [pathname])

  useEffect(() => {
    // Nav links land here as "/#section" — after switching routes, the
    // target section only exists once Home's children have mounted, so
    // scroll to it on the next frame instead of relying on the browser's
    // native (pre-render) fragment scroll.
    if (!hash) return
    const raf = requestAnimationFrame(() => scrollToSection(hash.slice(1)))
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])

  return (
    <div className="min-h-screen bg-greige text-ink">
      <Nav />
      <Outlet />
      <SocialSection />
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

export default App
