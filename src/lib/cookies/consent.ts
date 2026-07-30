export type CookieCategory = 'necessary' | 'preferences' | 'analytics'

export type CookieConsent = {
  necessary: true
  preferences: boolean
  analytics: boolean
  /** ISO timestamp when the visitor last chose */
  updatedAt: string
  version: number
}

/** Bump when policy categories change so the notice reappears. */
export const CONSENT_VERSION = 1

export const CONSENT_STORAGE_KEY = 'radical-cookie-consent'

export const defaultConsent = (): CookieConsent => ({
  necessary: true,
  preferences: false,
  analytics: false,
  updatedAt: new Date().toISOString(),
  version: CONSENT_VERSION,
})

export function readConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CookieConsent
    if (parsed.version !== CONSENT_VERSION) return null
    return {
      necessary: true,
      preferences: Boolean(parsed.preferences),
      analytics: Boolean(parsed.analytics),
      updatedAt: parsed.updatedAt || new Date().toISOString(),
      version: CONSENT_VERSION,
    }
  } catch {
    return null
  }
}

export function writeConsent(consent: CookieConsent) {
  const next: CookieConsent = {
    ...consent,
    necessary: true,
    updatedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  }
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(
    new CustomEvent('radical:cookie-consent', { detail: next })
  )
  return next
}

export function acceptAllConsent(): CookieConsent {
  return writeConsent({
    ...defaultConsent(),
    preferences: true,
    analytics: true,
  })
}

export function rejectOptionalConsent(): CookieConsent {
  return writeConsent({
    ...defaultConsent(),
    preferences: false,
    analytics: false,
  })
}

export const cookieCategories: {
  id: CookieCategory
  label: string
  body: string
  locked?: boolean
}[] = [
  {
    id: 'necessary',
    label: 'Necessary',
    body: 'Sign-in session and this consent choice. Required for the site to work — always on.',
    locked: true,
  },
  {
    id: 'preferences',
    label: 'Preferences',
    body: 'Remembers media reactions and comments on this device so Radical Media feels personal.',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    body: 'Helps us understand visits in aggregate. Nothing loads until you allow this.',
  },
]
