import { useCallback, useSyncExternalStore } from 'react'

export type LandingVersion = 'v1' | 'v2' | 'v3'

export const LANDING_KEY = 'radical-landing-version'
export const LANDING_EVENT = 'radical-landing-change'

export function readLandingVersion(): LandingVersion {
  return 'v3'
}

export function writeLandingVersion(next: LandingVersion) {
  try {
    sessionStorage.setItem(LANDING_KEY, next)
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(LANDING_EVENT))
}

function subscribe(onChange: () => void) {
  window.addEventListener(LANDING_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(LANDING_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

export function useLandingVersion() {
  const version = useSyncExternalStore(
    subscribe,
    readLandingVersion,
    () => 'v3' as LandingVersion
  )

  const setVersion = useCallback((next: LandingVersion) => {
    writeLandingVersion(next)
  }, [])

  return [version, setVersion] as const
}
