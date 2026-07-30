import { useRef, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'

import { MorphMark } from '@/components/marketing/MorphMark'
import {
  isSiteBlue,
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
 * click: glitch → blue + Jesus speech bubble
 * click again: Amen flash → green
 */
export function DontPushButton({
  className,
  markClassName = 'size-64 text-ink xl:size-80',
}: DontPushButtonProps) {
  const [busy, setBusy] = useState(false)
  const [confession, setConfession] = useState(false)
  const [flashing, setFlashing] = useState(false)
  const modifierDown = useRef(false)

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
    modifierDown.current = false

    if (confession) {
      runAmen()
      return
    }

    // Already blue (e.g. after glitch) — show / keep Jesus bubble path
    if (isSiteBlue()) {
      setConfession(true)
      return
    }

    // Glitch → blue → Jesus confession bubble
    setBusy(true)
    const ms = triggerSiteGlitch()
    window.setTimeout(() => {
      setConfession(true)
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
          else setConfession(true)
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

        {/* Hover hint — hidden once Jesus bubble is up */}
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

        {/* Post-glitch / confession bubble */}
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
    </>
  )
}
