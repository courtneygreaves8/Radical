import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { Settings2, X } from 'lucide-react'

import { TreatMorph } from '@/components/cookies/TreatMorph'
import { useCookieConsent } from '@/contexts/CookieConsentContext'
import { cookieCategories } from '@/lib/cookies/consent'
import { cn } from '@/lib/utils'

/**
 * Bottom-right cookie notice — V3 cream / terracotta / ink.
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
      <div className="pointer-events-auto w-full max-w-[22rem] overflow-hidden rounded-[1.5rem] bg-[var(--v3-cream)] text-[var(--v3-ink)] shadow-[0_18px_50px_rgba(30,21,18,0.18)] ring-1 ring-[var(--v3-ink)]/10 sm:max-w-[24rem] sm:rounded-[1.75rem]">
        <div className="flex items-start justify-between gap-3 bg-[var(--v3-terra)] px-4 py-3.5 text-[var(--v3-cream)] sm:px-5">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--v3-cream)] text-[var(--v3-terra)] sm:size-12">
              <TreatMorph className="size-7 sm:size-8" />
            </span>
            <div className="min-w-0">
              <p
                id={titleId}
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
              >
                Cookies
              </p>
              <p className="mt-0.5 text-[11px] text-[var(--v3-cream)]/70">
                Cookie · cake · biscuit…
              </p>
            </div>
          </div>
          {openPreferences ? (
            <button
              type="button"
              onClick={() => setOpenPreferences(false)}
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--v3-cream)]/15 text-[var(--v3-cream)] transition hover:bg-[var(--v3-cream)] hover:text-[var(--v3-terra)]"
              aria-label="Close preferences"
            >
              <X className="size-3.5" />
            </button>
          ) : null}
        </div>

        <div className="px-4 py-4 sm:px-5 sm:py-5">
          <p id={descId} className="text-sm leading-relaxed text-[var(--v3-ink)]/70">
            We use necessary cookies to run Radical Church. Optional cookies help
            media prefs and (later) analytics — only if you allow them.
          </p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--v3-ink)]/40">
            <Link
              to="/cookies"
              className="underline-offset-2 transition hover:text-[var(--v3-terra)] hover:underline"
            >
              Cookie policy
            </Link>
          </p>

          {openPreferences ? (
            <ul className="mt-4 space-y-3 border-t border-[var(--v3-ink)]/10 pt-4">
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
                        'mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full transition',
                        on
                          ? 'justify-end bg-[var(--v3-terra)]'
                          : 'justify-start bg-[var(--v3-ink)]/15',
                        cat.locked && 'cursor-not-allowed opacity-70'
                      )}
                    >
                      <span className="mx-0.5 size-3.5 rounded-full bg-[var(--v3-cream)] shadow-sm" />
                    </button>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em]">
                        {cat.label}
                        {cat.locked ? ' · Always on' : null}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--v3-ink)]/55">
                        {cat.body}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : null}

          <div className="mt-5 flex flex-col gap-2">
            {openPreferences ? (
              <button
                type="button"
                onClick={() => savePreferences({ preferences, analytics })}
                className="rounded-full bg-[var(--v3-terra)] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--v3-cream)] transition hover:bg-[var(--v3-ink)]"
              >
                Save choices
              </button>
            ) : (
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-[var(--v3-terra)] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--v3-cream)] transition hover:bg-[var(--v3-ink)]"
              >
                Accept all
              </button>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={rejectOptional}
                className="flex-1 rounded-full bg-[var(--v3-ink)] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--v3-cream)] transition hover:bg-[var(--v3-ink)]/85"
              >
                Essential only
              </button>
              {!openPreferences ? (
                <button
                  type="button"
                  onClick={() => setOpenPreferences(true)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[var(--v3-ink)]/8 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--v3-ink)] transition hover:bg-[var(--v3-ink)]/12"
                >
                  <Settings2 className="size-3.5" />
                  Manage
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
