import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/** Kinetic stand-ins — then settle on Radical. */
export const heroRotationWords = [
  'Fired Up',
  'All In',
  'Shaped',
  'Unashamed',
  'Built Up',
  'Spirit-Led',
  'Formed',
  'Radical',
] as const

type RotatingHeroWordProps = {
  words?: readonly string[]
  /** Hold each word (ms). Radical holds longer before looping. */
  intervalMs?: number
  radicalHoldMs?: number
  className?: string
}

/**
 * Cycles faith / fire phrases into the display slot that ends on Radical.
 */
export function RotatingHeroWord({
  words = heroRotationWords,
  intervalMs = 1600,
  radicalHoldMs = 3200,
  className,
}: RotatingHeroWordProps) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const word = words[index] ?? 'Radical'
  const isRadical = word.toLowerCase() === 'radical'

  useEffect(() => {
    if (reduceMotion || words.length < 2) return
    const delay = isRadical ? radicalHoldMs : intervalMs
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % words.length)
    }, delay)
    return () => window.clearTimeout(id)
  }, [index, isRadical, intervalMs, radicalHoldMs, reduceMotion, words.length])

  if (reduceMotion) {
    return <span className={className}>Radical</span>
  }

  return (
    <span className={className} aria-live="polite" aria-atomic="true">
      <span className="relative inline-grid justify-items-start">
        {/* Reserve width so the line doesn’t jump on longer phrases */}
        <span className="invisible col-start-1 row-start-1" aria-hidden>
          Unashamed
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={word}
            className="col-start-1 row-start-1 inline-block"
            initial={{ y: '0.55em', opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: '-0.45em', opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}
