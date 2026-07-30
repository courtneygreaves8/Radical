import { useEffect, useId, useRef, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

import { MorphMark } from '@/components/marketing/MorphMark'
import { Button } from '@/components/ui/button'
import {
  isSiteBaby,
  triggerAmenFlash,
  triggerSiteGlitch,
} from '@/lib/siteGlitch'
import { cn } from '@/lib/utils'

type DontPushButtonProps = {
  className?: string
  markClassName?: string
}

function isModifierClick(event: MouseEvent | globalThis.MouseEvent) {
  return event.altKey || event.shiftKey || event.metaKey
}

/**
 * Hero morph easter egg —
 * click: glitch → baby blue + disobedience dialog
 * alt / later click: Jesus confession → Amen flash → main blue
 */
export function DontPushButton({
  className,
  markClassName = 'size-64 text-ink xl:size-80',
}: DontPushButtonProps) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [confession, setConfession] = useState(false)
  const [flashing, setFlashing] = useState(false)
  const modifierDown = useRef(false)
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

  function handleMouseDown(event: MouseEvent<HTMLButtonElement>) {
    if (isModifierClick(event)) {
      event.preventDefault()
      modifierDown.current = true
    } else {
      modifierDown.current = false
    }
  }

  function runAmen() {
    setBusy(true)
    setConfession(false)
    setOpen(false)
    setFlashing(true)
    const ms = triggerAmenFlash()
    window.setTimeout(() => {
      setFlashing(false)
      setBusy(false)
    }, ms)
  }

  function handlePush(event: MouseEvent<HTMLButtonElement>) {
    if (busy) return
    event.preventDefault()
    event.stopPropagation()

    const modifier = isModifierClick(event) || modifierDown.current
    modifierDown.current = false

    if (confession) {
      runAmen()
      return
    }

    // Already baby blue — confession path (or modifier anytime)
    if (modifier || isSiteBaby()) {
      setOpen(false)
      setConfession(true)
      return
    }

    // First click: glitch → baby blue + disobedience popup
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
        onMouseDown={handleMouseDown}
        onClick={handlePush}
        onContextMenu={(event) => {
          event.preventDefault()
          if (busy) return
          if (confession) runAmen()
          else {
            setOpen(false)
            setConfession(true)
          }
        }}
        disabled={busy}
        className={cn(
          'group relative hidden cursor-pointer justify-self-end border-0 bg-transparent p-0 text-left disabled:cursor-wait lg:block',
          className
        )}
        aria-label={
          confession
            ? 'Amen — click again'
            : "Don't push the button"
        }
      >
        <MorphMark
          className={cn(
            'pointer-events-none transition duration-300 group-hover:scale-[1.04] group-active:scale-95 group-disabled:opacity-80',
            markClassName
          )}
        />

        <span
          className={cn(
            'pointer-events-none absolute top-[18%] left-1/2 z-10 w-[11.5rem] -translate-x-1/2 xl:top-[20%] xl:w-[13rem]',
            'opacity-0 transition-opacity duration-200',
            !confession &&
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

        {confession ? (
          <span
            role="status"
            className="pointer-events-none absolute top-[8%] left-1/2 z-20 w-[15.5rem] -translate-x-1/2 xl:top-[10%] xl:w-[17rem]"
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
              <span className="relative z-10 block text-center font-mono text-[10px] font-bold uppercase tracking-[0.14em] leading-snug">
                Jesus Christ is my Lord
                <br />
                &amp; Saviour
                <span className="mt-2 block text-[11px] font-medium normal-case leading-snug tracking-normal opacity-80">
                  Click again for an Amen!
                </span>
              </span>
            </span>
          </span>
        ) : null}
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
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
