import { cn } from '@/lib/utils'

type RadiatingBurstProps = {
  className?: string
  /** Number of rays */
  rays?: number
  /** Stroke width in viewBox units */
  strokeWidth?: number
}

/**
 * Straight-line sunburst like the Design-to-Web reference —
 * thick rays from a shared origin (not a filled star glyph).
 */
export function RadiatingBurst({
  className,
  rays = 16,
  strokeWidth = 5.5,
}: RadiatingBurstProps) {
  const cx = 100
  const cy = 100
  const r = 92

  return (
    <svg
      viewBox="0 0 200 200"
      className={cn('overflow-visible', className)}
      aria-hidden
    >
      {Array.from({ length: rays }, (_, i) => {
        const a = (i / rays) * Math.PI * 2 - Math.PI / 2
        const x2 = cx + Math.cos(a) * r
        const y2 = cy + Math.sin(a) * r
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
          />
        )
      })}
    </svg>
  )
}
