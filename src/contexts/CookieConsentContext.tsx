import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import {
  acceptAllConsent,
  defaultConsent,
  readConsent,
  rejectOptionalConsent,
  writeConsent,
  type CookieConsent,
} from '@/lib/cookies/consent'

type CookieConsentContextValue = {
  /** null = visitor has not chosen yet */
  consent: CookieConsent | null
  decided: boolean
  openPreferences: boolean
  setOpenPreferences: (open: boolean) => void
  acceptAll: () => void
  rejectOptional: () => void
  savePreferences: (next: Pick<CookieConsent, 'preferences' | 'analytics'>) => void
  reopen: () => void
  allows: (category: 'preferences' | 'analytics') => boolean
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null
)

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(() =>
    typeof window === 'undefined' ? null : readConsent()
  )
  const [openPreferences, setOpenPreferences] = useState(false)
  /** After reject/accept, notice hides; reopen() clears decided UI without wiping storage until save */
  const [forceShow, setForceShow] = useState(false)

  const decided = consent !== null && !forceShow

  const acceptAll = useCallback(() => {
    setConsent(acceptAllConsent())
    setForceShow(false)
    setOpenPreferences(false)
  }, [])

  const rejectOptional = useCallback(() => {
    setConsent(rejectOptionalConsent())
    setForceShow(false)
    setOpenPreferences(false)
  }, [])

  const savePreferences = useCallback(
    (next: Pick<CookieConsent, 'preferences' | 'analytics'>) => {
      setConsent(
        writeConsent({
          ...(consent ?? defaultConsent()),
          preferences: next.preferences,
          analytics: next.analytics,
        })
      )
      setForceShow(false)
      setOpenPreferences(false)
    },
    [consent]
  )

  const reopen = useCallback(() => {
    setForceShow(true)
    setOpenPreferences(true)
  }, [])

  const allows = useCallback(
    (category: 'preferences' | 'analytics') =>
      Boolean(consent?.[category]),
    [consent]
  )

  const value = useMemo(
    () => ({
      consent,
      decided,
      openPreferences,
      setOpenPreferences,
      acceptAll,
      rejectOptional,
      savePreferences,
      reopen,
      allows,
    }),
    [
      consent,
      decided,
      openPreferences,
      acceptAll,
      rejectOptional,
      savePreferences,
      reopen,
      allows,
    ]
  )

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider')
  }
  return ctx
}
