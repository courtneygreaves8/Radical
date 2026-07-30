import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookie, Settings2, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useCookieConsent } from '@/contexts/CookieConsentContext'
import { cookieCategories } from '@/lib/cookies/consent'
import { cn } from '@/lib/utils'

/**
 * Bottom-right cookie notice — Radical edges, lime + ink.
 * UK PECR: accept all, essential only, or granular prefs.
 */
export function CookieNotice() {
  const {
    decided,
    consent,
    openPreferences,
    setOpenPreferences,
    acceptAll,
    rejectOptional,
    savePreferences,
  } = useCookieConsent()
  const titleId = useId()
  const descId = useId()

  const [preferences, setPreferences] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    if (!openPreferences) return
    setPreferences(consent?.preferences ?? false)
    setAnalytics(consent?.analytics ?? false)
  }, [openPreferences, consent])

  if (decided) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[55] flex justify-end p-4 sm:p-5"
      role="region"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <div
        className="pointer-events-auto w-full max-w-[22rem] border-2 border-ink bg-paper text-ink offset-shadow-lime sm:max-w-[24rem]"
      >
        <div className="flex items-start justify-between gap-3 border-b-2 border-ink bg-lime px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center border-2 border-ink bg-ink text-lime">
              <Cookie className="size-4" strokeWidth={2} />
            </span>
            <p
              id={titleId}
              className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-lime-foreground"
            >
              Cookies
            </p>
          </div>
          {openPreferences ? (
            <button
              type="button"
              onClick={() => setOpenPreferences(false)}
              className="flex size-8 items-center justify-center border-2 border-ink bg-paper text-ink transition hover:bg-ink hover:text-lime"
              aria-label="Close preferences"
            >
              <X className="size-3.5" />
            </button>
          ) : null}
        </div>

        <div className="px-4 py-4">
          <p
            id={descId}
            className="text-sm leading-relaxed text-ink/75"
          >
            We use necessary cookies to run Radical Church. Optional cookies help
            media prefs and (later) analytics — only if you allow them.
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
            <Link to="/cookies" className="underline-offset-2 hover:text-ink hover:underline">
              Cookie policy
            </Link>
          </p>

          {openPreferences ? (
            <ul className="mt-4 space-y-3 border-t-2 border-ink/15 pt-4">
              {cookieCategories.map((cat) => {
                const on =
                  cat.id === 'necessary'
                    ? true
                    : cat.id === 'preferences'
                      ? preferences
                      : analytics
                return (
                  <li key={cat.id} className="flex gap-3">
                    <button
                      type="button"
                      disabled={cat.locked}
                      aria-pressed={on}
                      onClick={() => {
                        if (cat.id === 'preferences') setPreferences((v) => !v)
                        if (cat.id === 'analytics') setAnalytics((v) => !v)
                      }}
                      className={cn(
                        'mt-0.5 flex h-5 w-9 shrink-0 items-center border-2 border-ink transition',
                        on ? 'bg-lime justify-end' : 'bg-mute justify-start',
                        cat.locked && 'cursor-not-allowed opacity-70'
                      )}
                    >
                      <span className="size-3.5 bg-ink" />
                    </button>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]">
                        {cat.label}
                        {cat.locked ? ' · Always on' : null}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ink/60">
                        {cat.body}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : null}

          <div className="mt-4 flex flex-col gap-2">
            {openPreferences ? (
              <Button
                type="button"
                variant="lime"
                size="sm"
                offset
                onClick={() => savePreferences({ preferences, analytics })}
              >
                Save choices
              </Button>
            ) : (
              <Button type="button" variant="lime" size="sm" offset onClick={acceptAll}>
                Accept all
              </Button>
            )}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="paper"
                size="sm"
                className="flex-1"
                offset
                onClick={rejectOptional}
              >
                Essential only
              </Button>
              {!openPreferences ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setOpenPreferences(true)}
                >
                  <Settings2 className="size-3.5" />
                  Manage
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
