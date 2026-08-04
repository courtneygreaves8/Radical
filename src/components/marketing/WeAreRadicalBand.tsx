import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/**
 * One “WE ARE” + one “RADICAL” — slide in from opposite sides and meet
 * when the section sits near the middle of the viewport. No scrub / mouse tracking.
 */
export function WeAreRadicalBand() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const inView = useInView(ref, {
    amount: 0.55,
    once: false,
  })

  const meet = inView || reduceMotion

  return (
    <section
      ref={ref}
      aria-label="We are Radical"
      className="relative overflow-x-clip bg-transparent py-16 sm:py-24 lg:py-28"
    >
      <h2 className="sr-only">We are Radical</h2>

      <div className="flex flex-col items-center justify-center gap-1 sm:gap-2">
        <motion.p
          aria-hidden
          initial={false}
          animate={{ x: meet ? 0 : '-70vw' }}
          transition={{
            type: 'spring',
            stiffness: 70,
            damping: 18,
            mass: 0.9,
          }}
          className="w-full text-center font-sans text-[clamp(3.5rem,16vw,11rem)] font-bold uppercase leading-none tracking-[-0.04em] text-[var(--v3-ink)]"
        >
          WE ARE
        </motion.p>
        <motion.p
          aria-hidden
          initial={false}
          animate={{ x: meet ? 0 : '70vw' }}
          transition={{
            type: 'spring',
            stiffness: 70,
            damping: 18,
            mass: 0.9,
            delay: reduceMotion ? 0 : 0.05,
          }}
          className="w-full text-center font-sans text-[clamp(3.5rem,16vw,11rem)] font-bold uppercase leading-none tracking-[-0.04em] text-[var(--v3-terra)]"
        >
          RADICAL
        </motion.p>
      </div>
    </section>
  )
}
