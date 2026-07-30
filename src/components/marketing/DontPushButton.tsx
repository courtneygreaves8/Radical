import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

import { MorphMark } from '@/components/marketing/MorphMark'
import { Button } from '@/components/ui/button'
import { triggerSiteGlitch } from '@/lib/siteGlitch'
import { cn } from '@/lib/utils'

type DontPushButtonProps = {
  className?: string
  markClassName?: string
}

/**
 * Hero morph easter egg — hard speech bubble, site glitch, then gospel punchline.
 */
export function DontPushButton({
  className,
  markClassName = 'size-64 text-ink xl:size-80',
}: DontPushButtonProps) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
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

  function handlePush() {
    if (busy) return
    setBusy(true)
    const ms = triggerSiteGlitch()
    window.setTimeout(() => {
      setOpen(true)
      setBusy(false)
    }, ms)
  }

  return (
    <>
      <button
        type="button"
        onClick={handlePush}
        disabled={busy}
        className={cn(
          'group relative hidden cursor-pointer justify-self-end border-0 bg-transparent p-0 text-left disabled:cursor-wait lg:block',
          className
        )}
        aria-label="Don't push the button"
      >
        <MorphMark
          className={cn(
            'transition duration-300 group-hover:scale-[1.04] group-active:scale-95 group-disabled:opacity-80',
            markClassName
          )}
        />

        {/* Hard-angle speech bubble — only on hover */}
        <span
          className={cn(
            'pointer-events-none absolute top-[18%] left-1/2 z-10 w-[11.5rem] -translate-x-1/2 xl:top-[20%] xl:w-[13rem]',
            'opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100'
          )}
        >
          <span
            aria-hidden
            className="absolute inset-0 translate-x-2 translate-y-2 bg-ink"
          />
          <span className="relative block border-2 border-ink bg-lime px-3 py-2.5 text-lime-foreground">
            {/* Squared tail pointing down into the shape */}
            <span
              aria-hidden
              className="absolute -bottom-2 left-1/2 size-3 -translate-x-1/2 rotate-45 border-r-2 border-b-2 border-ink bg-lime"
            />
            <span className="relative z-10 block text-center font-mono text-[10px] font-bold uppercase tracking-[0.18em] leading-snug">
              Don&apos;t push
              <br />
              the button!
            </span>
          </span>
        </span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-5 sm:p-8"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/75"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="relative z-10 w-full max-w-md border-2 border-ink bg-paper p-6 text-ink offset-shadow-lime sm:p-8"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center text-ink/50 transition hover:bg-lime hover:text-lime-foreground"
              aria-label="Close dialog"
            >
              <X className="size-4" strokeWidth={2} />
            </button>

            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink/45">
              Romans 3 · Short version
            </p>
            <h2
              id={titleId}
              className="type-display mt-4 text-3xl leading-[0.92] sm:text-4xl"
            >
              See how easy that was?
            </h2>
            <p
              id={descId}
              className="mt-4 text-sm leading-relaxed text-ink/75 sm:text-base"
            >
              One push and the whole page broke. Now imagine picking an apple —
              one bite, and the whole human story cracked. We&apos;re all
              sinners. Soft hearts. Hard truth. Jesus is the only repair.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button variant="lime" offset asChild>
                <Link to="/beliefs">What we believe</Link>
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
