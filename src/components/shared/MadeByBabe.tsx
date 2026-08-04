import { useEffect, useId, useState } from 'react'
import { ArrowUpRight, Heart, X } from 'lucide-react'

import { cn } from '@/lib/utils'

const BABE_URL = 'https://beblessed.io'

export function MadeByBabe() {
  const [open, setOpen] = useState(false)
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <aside className="pointer-events-none fixed top-1/2 right-[7px] z-40 hidden -translate-y-1/2 sm:block">
        <div className="pointer-events-auto origin-center translate-x-[calc(50%-0.85rem)] -rotate-90">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--v3-ink,#1e1512)] px-5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--v3-cream,#faf4f0)] transition hover:bg-[#140e0c]"
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            Made with love by Babe
          </button>
        </div>
      </aside>

      {open ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-5 sm:p-8"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-[var(--v3-ink,#1e1512)]/55"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className={cn(
              'relative z-10 w-full max-w-md rounded-[1.75rem] bg-[var(--v3-cream,#faf4f0)] p-7 text-[var(--v3-ink,#1e1512)] sm:rounded-[2rem] sm:p-8'
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full text-[var(--v3-ink,#1e1512)]/40 transition hover:bg-black/5 hover:text-[var(--v3-ink,#1e1512)]"
              aria-label="Close dialog"
            >
              <X className="size-4" strokeWidth={2} />
            </button>

            <span className="inline-flex size-11 items-center justify-center rounded-full bg-[var(--v3-terra,#d86637)] text-white">
              <Heart className="size-5" strokeWidth={1.75} fill="currentColor" />
            </span>
            <h2
              id={titleId}
              className="mt-5 font-sans text-3xl font-bold tracking-tight"
            >
              Made by Babe
            </h2>
            <p
              id={descId}
              className="mt-3 text-sm leading-relaxed text-[var(--v3-ink,#1e1512)]/65 sm:text-[15px]"
            >
              This website was designed and built <strong>for free</strong> by{' '}
              <strong>Babe</strong> at beblessed.io — craft offered in faith so
              Radical Church can reach a new generation.
            </p>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <a
                href={BABE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--v3-ink,#1e1512)] py-2 pr-2 pl-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--v3-cream,#faf4f0)] transition hover:bg-[#140e0c]"
              >
                Visit beblessed.io
                <span className="flex size-8 items-center justify-center rounded-full bg-white text-[var(--v3-ink,#1e1512)]">
                  <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
                </span>
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--v3-ink,#1e1512)]/55 transition hover:text-[var(--v3-ink,#1e1512)]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
