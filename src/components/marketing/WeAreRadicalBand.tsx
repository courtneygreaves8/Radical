import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

/**
 * “WE ARE” slides in from the left, “RADICAL” from the right —
 * driven by scroll as the band enters the viewport, meeting in the middle.
 */
export function WeAreRadicalBand() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const xLeft = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ['0vw', '0vw'] : ['-80vw', '0vw']
  )
  const xRight = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ['0vw', '0vw'] : ['80vw', '0vw']
  )

  return (
    <section
      ref={ref}
      aria-label="We are Radical"
      className="relative z-[1] overflow-x-clip bg-transparent py-12 sm:py-28 lg:py-32"
    >
      <h2 className="sr-only">We are Radical</h2>

      <div className="relative z-10 flex flex-col items-center justify-center gap-0.5 px-4 sm:gap-2 sm:px-0">
        <motion.p
          aria-hidden
          style={{ x: xLeft }}
          className="w-full text-center font-sans text-[clamp(2.35rem,14vw,11rem)] font-bold uppercase leading-none tracking-[-0.04em] text-[var(--v3-ink)] will-change-transform"
        >
          WE ARE
        </motion.p>
        <motion.p
          aria-hidden
          style={{ x: xRight }}
          className="w-full text-center font-sans text-[clamp(2.35rem,14vw,11rem)] font-bold uppercase leading-none tracking-[-0.04em] text-[var(--v3-terra)] will-change-transform"
        >
          RADICAL
        </motion.p>
      </div>
    </section>
  )
}
