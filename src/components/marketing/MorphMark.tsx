import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/utils'

type Pt = [number, number]

const CX = 100
const CY = 100
/**
 * Shared vertex budget — divisible by 8 / 12 / 24 so radial marks stay even.
 */
const VERTS = 72

function pathFrom(pts: Pt[]) {
  return (
    pts
      .map(
        (p, i) =>
          `${i === 0 ? 'M' : 'L'}${p[0].toFixed(2)} ${p[1].toFixed(2)}`
      )
      .join(' ') + ' Z'
  )
}

/**
 * Keep every original corner; insert points on edges until `target`.
 * Even distribution around the ring so opposite arms stay mirrored.
 */
function expandCorners(pts: Pt[], target: number): Pt[] {
  const n = pts.length
  if (n === target) return pts.map((p) => [p[0], p[1]] as Pt)
  if (n > target) {
    const out: Pt[] = []
    for (let i = 0; i < target; i++) {
      const src = pts[Math.floor((i * n) / target)]
      out.push([src[0], src[1]])
    }
    return out
  }

  const base = Math.floor(target / n)
  let rem = target - base * n
  const perEdge = Array.from({ length: n }, () => base)
  for (let k = 0; k < rem; k++) {
    perEdge[k % n]++
  }

  const out: Pt[] = []
  for (let i = 0; i < n; i++) {
    const a = pts[i]
    const b = pts[(i + 1) % n]
    const steps = perEdge[i]
    for (let s = 0; s < steps; s++) {
      const t = s / steps
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t])
    }
  }
  return out
}

function lineIntersect(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number
): Pt {
  const d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
  if (Math.abs(d) < 1e-6) return [(x1 + x3) / 2, (y1 + y3) / 2]
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d
  return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)]
}

/** Exact tip / valley star — every tip identical. */
function makePointStar(points: number, rOut: number, rIn: number): Pt[] {
  const pts: Pt[] = []
  for (let i = 0; i < points * 2; i++) {
    const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2
    const r = i % 2 === 0 ? rOut : rIn
    pts.push([CX + Math.cos(a) * r, CY + Math.sin(a) * r])
  }
  return expandCorners(pts, VERTS)
}

/** Blunt rectangular gear — hard corners, mirrored teeth. */
function makeGear(teeth: number, rOut: number, rIn: number, halfW: number): Pt[] {
  const pts: Pt[] = []
  for (let i = 0; i < teeth; i++) {
    const a = -Math.PI / 2 + (i / teeth) * Math.PI * 2
    const ux = Math.cos(a)
    const uy = Math.sin(a)
    const px = -uy
    const py = ux
    pts.push([CX + ux * rIn - px * halfW, CY + uy * rIn - py * halfW])
    pts.push([CX + ux * rOut - px * halfW, CY + uy * rOut - py * halfW])
    pts.push([CX + ux * rOut + px * halfW, CY + uy * rOut + py * halfW])
    pts.push([CX + ux * rIn + px * halfW, CY + uy * rIn + py * halfW])
  }
  return expandCorners(pts, VERTS)
}

/**
 * Flat multi-arm asterisk — every tip is a square flat, every valley mirrored.
 */
function makeAsterisk(tips: number, rOut: number, halfW: number): Pt[] {
  const pts: Pt[] = []
  for (let i = 0; i < tips; i++) {
    const a = -Math.PI / 2 + (i / tips) * Math.PI * 2
    const aN = -Math.PI / 2 + ((i + 1) / tips) * Math.PI * 2
    const dx = Math.cos(a)
    const dy = Math.sin(a)
    const nx = -dy
    const ny = dx
    const dxN = Math.cos(aN)
    const dyN = Math.sin(aN)
    const nxN = -dyN
    const nyN = dxN

    // Tip flat: −perp then +perp (CCW), matching gear tips
    pts.push([CX + dx * rOut - nx * halfW, CY + dy * rOut - ny * halfW])
    pts.push([CX + dx * rOut + nx * halfW, CY + dy * rOut + ny * halfW])

    // Valley: +perp edge of this arm × −perp edge of next
    const ax1 = CX + nx * halfW
    const ay1 = CY + ny * halfW
    const bx1 = CX - nxN * halfW
    const by1 = CY - nyN * halfW
    pts.push(
      lineIntersect(
        ax1,
        ay1,
        ax1 + dx * rOut,
        ay1 + dy * rOut,
        bx1,
        by1,
        bx1 + dxN * rOut,
        by1 + dyN * rOut
      )
    )
  }
  return expandCorners(pts, VERTS)
}

/** Flat-ray sunburst — identical square tips. */
function makeSunburst(
  rays: number,
  rOut: number,
  rHub: number,
  halfW: number
): Pt[] {
  const pts: Pt[] = []
  for (let i = 0; i < rays; i++) {
    const a = -Math.PI / 2 + (i / rays) * Math.PI * 2
    const ux = Math.cos(a)
    const uy = Math.sin(a)
    const px = -uy
    const py = ux
    pts.push([CX + ux * rHub - px * halfW, CY + uy * rHub - py * halfW])
    pts.push([CX + ux * rOut - px * halfW, CY + uy * rOut - py * halfW])
    pts.push([CX + ux * rOut + px * halfW, CY + uy * rOut + py * halfW])
    pts.push([CX + ux * rHub + px * halfW, CY + uy * rHub + py * halfW])
  }
  return expandCorners(pts, VERTS)
}

const CROSS_KEY: Pt[] = [
  [84, 8],
  [116, 8],
  [116, 52],
  [170, 52],
  [170, 84],
  [116, 84],
  [116, 192],
  [84, 192],
  [84, 84],
  [30, 84],
  [30, 52],
  [84, 52],
]

const PLUS_KEY: Pt[] = [
  [84, 28],
  [116, 28],
  [116, 84],
  [172, 84],
  [172, 116],
  [116, 116],
  [116, 172],
  [84, 172],
  [84, 116],
  [28, 116],
  [28, 84],
  [84, 84],
]

export const morphShapeKeys = [
  'star',
  'cross',
  'plus',
  'burst',
  'lozenge',
  'gear',
  'star12',
  'asterisk6',
  'asterisk8',
  'sunburst',
] as const

export type MorphShapeName = (typeof morphShapeKeys)[number]

const RAW: Record<MorphShapeName, Pt[]> = {
  star: makePointStar(4, 96, 26),
  cross: expandCorners(CROSS_KEY, VERTS),
  plus: expandCorners(PLUS_KEY, VERTS),
  burst: makePointStar(8, 96, 20),
  lozenge: makePointStar(4, 94, 40),
  gear: makeGear(8, 96, 58, 15),
  star12: makePointStar(12, 96, 36),
  asterisk6: makeAsterisk(6, 96, 15),
  asterisk8: makeAsterisk(8, 96, 11),
  sunburst: makeSunburst(12, 96, 32, 6),
}

const SHAPE_PATHS: Record<MorphShapeName, string> = Object.fromEntries(
  morphShapeKeys.map((key) => [key, pathFrom(RAW[key])])
) as Record<MorphShapeName, string>

const MORPH_CYCLE: MorphShapeName[] = [
  'star',
  'asterisk6',
  'plus',
  'gear',
  'star12',
  'burst',
  'asterisk8',
  'sunburst',
  'cross',
]

type MorphMarkProps = {
  className?: string
  interval?: number
}

export function MorphMark({ className, interval = 2.8 }: MorphMarkProps) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % MORPH_CYCLE.length)
    }, interval * 1000)
    return () => window.clearInterval(id)
  }, [interval, reduceMotion])

  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      overflow="visible"
      animate={reduceMotion ? undefined : { scale: [1, 1.025, 1] }}
      transition={
        reduceMotion
          ? undefined
          : { duration: interval, ease: 'easeInOut', repeat: Infinity }
      }
    >
      <motion.path
        d={SHAPE_PATHS[MORPH_CYCLE[0]]}
        fill="currentColor"
        initial={false}
        animate={{ d: SHAPE_PATHS[MORPH_CYCLE[index]] }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 1.05, ease: [0.4, 0, 0.2, 1] }
        }
      />
    </motion.svg>
  )
}

export function BrandGlyph({
  shape,
  className,
}: {
  shape: MorphShapeName
  className?: string
}) {
  return (
    <svg viewBox="0 0 200 200" className={cn(className)} aria-hidden>
      <path d={SHAPE_PATHS[shape]} fill="currentColor" />
    </svg>
  )
}
