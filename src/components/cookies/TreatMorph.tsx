import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Pt = [number, number]

const VERTS = 48

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

function expandCorners(pts: Pt[], target: number): Pt[] {
  const n = pts.length
  if (n === target) return pts.map((p) => [p[0], p[1]] as Pt)
  if (n > target) {
    const out: Pt[] = []
    for (let i = 0; i < target; i++) {
      out.push([...pts[Math.floor((i * n) / target)]])
    }
    return out
  }

  const base = Math.floor(target / n)
  let rem = target - base * n
  const perEdge = Array.from({ length: n }, () => base)
  for (let k = 0; k < rem; k++) perEdge[k % n]++

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

/** Scalloped cookie — chip-edge circle */
function makeCookie(): Pt[] {
  const pts: Pt[] = []
  const lobes = 12
  for (let i = 0; i < lobes; i++) {
    const a0 = (i / lobes) * Math.PI * 2 - Math.PI / 2
    const a1 = ((i + 0.5) / lobes) * Math.PI * 2 - Math.PI / 2
    pts.push([100 + Math.cos(a0) * 78, 100 + Math.sin(a0) * 78])
    pts.push([100 + Math.cos(a1) * 92, 100 + Math.sin(a1) * 92])
  }
  return expandCorners(pts, VERTS)
}

/** Layer cake silhouette */
function makeCake(): Pt[] {
  return expandCorners(
    [
      [48, 168],
      [152, 168],
      [152, 128],
      [138, 128],
      [138, 92],
      [124, 92],
      [124, 58],
      [112, 58],
      [100, 32],
      [88, 58],
      [76, 58],
      [76, 92],
      [62, 92],
      [62, 128],
      [48, 128],
    ],
    VERTS
  )
}

/** Rectangular biscuit with soft corners */
function makeBiscuit(): Pt[] {
  return expandCorners(
    [
      [42, 58],
      [70, 42],
      [130, 42],
      [158, 58],
      [158, 142],
      [130, 158],
      [70, 158],
      [42, 142],
    ],
    VERTS
  )
}

/** Ring doughnut (solid outer silhouette) */
function makeDonut(): Pt[] {
  const pts: Pt[] = []
  const n = 24
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2
    const r = 88 + (i % 2 === 0 ? 6 : 0)
    pts.push([100 + Math.cos(a) * r, 100 + Math.sin(a) * r])
  }
  return expandCorners(pts, VERTS)
}

const TREATS = [
  pathFrom(makeCookie()),
  pathFrom(makeCake()),
  pathFrom(makeBiscuit()),
  pathFrom(makeDonut()),
]

/** Cookie → cake → biscuit → doughnut morph for the consent card. */
export function TreatMorph({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % TREATS.length)
    }, 2400)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden
      animate={reduceMotion ? undefined : { rotate: [0, -4, 4, 0] }}
      transition={
        reduceMotion
          ? undefined
          : { duration: 2.4, ease: 'easeInOut', repeat: Infinity }
      }
    >
      <motion.path
        d={TREATS[0]}
        fill="currentColor"
        initial={false}
        animate={{ d: TREATS[index] }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.9, ease: [0.4, 0, 0.2, 1] }
        }
      />
    </motion.svg>
  )
}
