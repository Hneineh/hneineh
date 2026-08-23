import { useEffect, useState } from 'react'
import { APP_READY_EVENT, isAppReady } from '../lib/preloader'

/** True once the pre-launch splash has started fading away. */
export function useAppReady() {
  // Covers the case where the app-ready event already fired before this
  // hook's listener subscribed (window events aren't buffered/replayed).
  const [isReady, setIsReady] = useState(isAppReady)

  useEffect(() => {
    if (isAppReady()) {
      setIsReady(true)
      return
    }
    const onReady = () => setIsReady(true)
    window.addEventListener(APP_READY_EVENT, onReady)
    return () => window.removeEventListener(APP_READY_EVENT, onReady)
  }, [])

  return isReady
}
