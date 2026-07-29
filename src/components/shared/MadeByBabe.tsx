import { useEffect, useId, useState } from 'react'
import { ArrowUpRight, Heart, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
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
      <aside className="pointer-events-none fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 sm:block">
        <div className="pointer-events-auto origin-center translate-x-[calc(50%-0.85rem)] -rotate-90">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 border-2 border-ink bg-lime px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-ink transition hover:bg-ink hover:text-lime"
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
            className="absolute inset-0 bg-ink/70"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className={cn(
              'relative z-10 w-full max-w-md border-2 border-ink bg-paper p-6 offset-shadow-lime sm:p-8'
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center text-ink/50 transition hover:bg-lime hover:text-ink"
              aria-label="Close dialog"
            >
              <X className="size-4" strokeWidth={2} />
            </button>

            <span className="inline-flex size-11 items-center justify-center bg-lime text-ink">
              <Heart className="size-5" strokeWidth={1.75} fill="currentColor" />
            </span>
            <h2
              id={titleId}
              className="mt-4 text-3xl font-bold tracking-tight text-ink"
            >
              Made by Babe
            </h2>
            <p
              id={descId}
              className="mt-3 text-sm leading-relaxed text-ink/80 sm:text-base"
            >
              This website was designed and built <strong>for free</strong> by{' '}
              <strong>Babe</strong> at beblessed.io — craft offered in faith so
              Radical Church can reach a new generation.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button variant="lime" offset asChild>
                <a href={BABE_URL} target="_blank" rel="noopener noreferrer">
                  Visit beblessed.io
                  <ArrowUpRight className="size-4" strokeWidth={2} />
                </a>
              </Button>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
