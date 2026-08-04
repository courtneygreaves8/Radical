import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

import { SunriseMark } from '@/components/marketing/SunriseMark'

const wordSpring = {
  type: 'spring' as const,
  stiffness: 70,
  damping: 18,
  mass: 0.9,
}

const sunSpring = {
  type: 'spring' as const,
  stiffness: 48,
  damping: 20,
  mass: 1.05,
}

/**
 * “WE ARE” / “RADICAL” meet in the middle, then a Radical sunrise
 * rises and settles on top of the footer (2s after the words meet).
 */
export function WeAreRadicalBand() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const inView = useInView(ref, {
    amount: 0.55,
    once: false,
  })

  const meet = inView || Boolean(reduceMotion)
  const sunDelay = reduceMotion ? 0 : meet ? 2 : 0

  return (
    <section
      ref={ref}
      aria-label="We are Radical"
      className="relative z-[1] -mb-16 overflow-x-clip bg-transparent pt-20 pb-[min(42vw,18rem)] sm:-mb-24 sm:pt-28 sm:pb-[min(36vw,20rem)] lg:pt-32"
    >
      <h2 className="sr-only">We are Radical</h2>

      <div className="relative z-10 flex flex-col items-center justify-center gap-1 sm:gap-2">
        <motion.p
          aria-hidden
          initial={false}
          animate={{ x: meet ? 0 : '-70vw' }}
          transition={wordSpring}
          className="w-full text-center font-sans text-[clamp(3.5rem,16vw,11rem)] font-bold uppercase leading-none tracking-[-0.04em] text-[var(--v3-ink)]"
        >
          WE ARE
        </motion.p>
        <motion.p
          aria-hidden
          initial={false}
          animate={{ x: meet ? 0 : '70vw' }}
          transition={{
            ...wordSpring,
            delay: reduceMotion ? 0 : 0.05,
          }}
          className="w-full text-center font-sans text-[clamp(3.5rem,16vw,11rem)] font-bold uppercase leading-none tracking-[-0.04em] text-[var(--v3-terra)]"
        >
          RADICAL
        </motion.p>
      </div>

      {/* Sunrise — delayed after words meet; rests on the footer top */}
      <motion.div
        aria-hidden
        initial={false}
        animate={
          meet
            ? { y: 0, opacity: 0.17 }
            : { y: '110%', opacity: 0 }
        }
        transition={{
          ...sunSpring,
          delay: sunDelay,
          opacity: {
            duration: reduceMotion ? 0 : 0.7,
            ease: 'easeOut',
            delay: sunDelay,
          },
        }}
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-[min(160vw,68rem)] -translate-x-1/2 text-[var(--v3-terra)] sm:w-[min(130vw,76rem)]"
      >
        <SunriseMark rays={15} className="w-full" />
      </motion.div>
    </section>
  )
}
