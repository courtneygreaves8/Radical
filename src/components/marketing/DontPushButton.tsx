import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

import { MorphMark } from '@/components/marketing/MorphMark'
import { Button } from '@/components/ui/button'
import {
  isSiteDeep,
  triggerAmenFlash,
  triggerSiteGlitch,
} from '@/lib/siteGlitch'
import { cn } from '@/lib/utils'

type DontPushButtonProps = {
  className?: string
  markClassName?: string
}

/**
 * Hero morph loop —
 * 1) click → glitch → dark blue + disobedience popup
 * 2) after popup closed, hover: restore message; click → Amen → baby blue
 * 3) repeat
 */
export function DontPushButton({
  className,
  markClassName = 'size-64 text-ink xl:size-80',
}: DontPushButtonProps) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  /** Popup closed while still on dark blue — next click Amen */
  const [awaitingAmen, setAwaitingAmen] = useState(false)
  const [flashing, setFlashing] = useState(false)
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    // Session already deep (reload) — treat as post-popup restore state
    if (isSiteDeep()) setAwaitingAmen(true)
  }, [])

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') closePopup()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  function closePopup() {
    setOpen(false)
    setAwaitingAmen(true)
  }

  function runAmen() {
    setBusy(true)
    setAwaitingAmen(false)
    setOpen(false)
    setFlashing(true)
    const ms = triggerAmenFlash()
    window.setTimeout(() => {
      setFlashing(false)
      setBusy(false)
    }, ms)
  }

  function handlePush() {
    if (busy) return

    // Dark blue, popup already read → Amen back to baby blue
    if (awaitingAmen || (isSiteDeep() && !open)) {
      runAmen()
      return
    }

    // First click (baby blue): glitch → dark blue + popup
    setBusy(true)
    setAwaitingAmen(false)
    const ms = triggerSiteGlitch()
    window.setTimeout(() => {
      setOpen(true)
      setBusy(false)
    }, ms)
  }

  const showRestoreHover = awaitingAmen && !open && !busy

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
        aria-label={
          showRestoreHover
            ? 'Amen — restore what was lost'
            : "Don't push the button"
        }
      >
        <MorphMark
          className={cn(
            'pointer-events-none transition duration-300 group-hover:scale-[1.04] group-active:scale-95 group-disabled:opacity-80',
            markClassName
          )}
        />

        {/* Default hover — don't push */}
        <span
          className={cn(
            'pointer-events-none absolute top-[18%] left-1/2 z-10 w-[11.5rem] -translate-x-1/2 xl:top-[20%] xl:w-[13rem]',
            'opacity-0 transition-opacity duration-200',
            !showRestoreHover &&
              'group-hover:opacity-100 group-focus-visible:opacity-100'
          )}
        >
          <span
            aria-hidden
            className="absolute inset-0 translate-x-2 translate-y-2 bg-ink"
          />
          <span className="relative block border-2 border-ink bg-lime px-3 py-2.5 text-lime-foreground">
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

        {/* After popup — restore message on hover */}
        <span
          className={cn(
            'pointer-events-none absolute top-[8%] left-1/2 z-20 w-[16.5rem] -translate-x-1/2 xl:top-[10%] xl:w-[18rem]',
            'opacity-0 transition-opacity duration-200',
            showRestoreHover &&
              'group-hover:opacity-100 group-focus-visible:opacity-100'
          )}
        >
          <span
            aria-hidden
            className="absolute inset-0 translate-x-2 translate-y-2 bg-ink"
          />
          <span className="relative block border-2 border-ink bg-lime px-3.5 py-3 text-lime-foreground">
            <span
              aria-hidden
              className="absolute -bottom-2 left-1/2 size-3 -translate-x-1/2 rotate-45 border-r-2 border-b-2 border-ink bg-lime"
            />
            <span className="relative z-10 block text-center font-mono text-[10px] font-bold uppercase tracking-[0.12em] leading-snug">
              Only Jesus can restore
              <br />
              what was lost
              <span className="mt-2 block text-[11px] font-medium normal-case leading-snug tracking-normal opacity-80">
                Click again for an Amen!
              </span>
            </span>
          </span>
        </span>
      </button>

      {flashing
        ? createPortal(
            <div aria-hidden className="amen-flash-overlay" />,
            document.body
          )
        : null}

      {open ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-5 sm:p-8"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/75"
            aria-label="Close"
            onClick={closePopup}
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
              onClick={closePopup}
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
              <Button type="button" variant="ghost" onClick={closePopup}>
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
