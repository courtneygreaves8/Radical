import { useEffect } from 'react'

import { useCookieConsent } from '@/contexts/CookieConsentContext'

/**
 * Loads third-party analytics only after explicit consent.
 * Hook your script (Plausible, GA, etc.) inside the effect when ready.
 */
export function AnalyticsGate() {
  const { allows } = useCookieConsent()
  const analyticsOn = allows('analytics')

  useEffect(() => {
    if (!analyticsOn) return
    // Placeholder — add analytics bootstrap here when a provider is chosen.
    // Example: loadScript('https://…')
  }, [analyticsOn])

  return null
}
