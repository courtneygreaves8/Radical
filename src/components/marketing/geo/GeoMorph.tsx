import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import {
  GeoIcon,
  type GeoIconName,
} from '@/components/marketing/geo/GeoIcons'
import { cn } from '@/lib/utils'

const CYCLE: GeoIconName[] = [
  'spark',
  'network',
  'rings',
  'venn',
  'tunnel',
  'asterisk6',
]

type GeoMorphProps = {
  className?: string
  interval?: number
  /** Icons to cycle — defaults to full set */
  icons?: GeoIconName[]
}

/** Crossfade morph between geometric marks (hero / cards). */
export function GeoMorph({
  className,
  interval = 2.8,
  icons = CYCLE,
}: GeoMorphProps) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const name = icons[index] ?? icons[0]

  useEffect(() => {
    if (reduceMotion || icons.length < 2) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % icons.length)
    }, interval * 1000)
    return () => window.clearInterval(id)
  }, [interval, reduceMotion, icons])

  return (
    <div className={cn('relative', className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={name}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.82, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 1.08, rotate: 8 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <GeoIcon name={name} className="size-full" />
        </motion.div>
      </AnimatePresence>
      {/* sizing ghost */}
      <GeoIcon name={icons[0]} className="invisible size-full" />
    </div>
  )
}
