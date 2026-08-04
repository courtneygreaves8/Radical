import { cn } from '@/lib/utils'

type SunriseMarkProps = {
  className?: string
  /** Rays across the upper semicircle */
  rays?: number
}

/**
 * Radical-style sunrise — filled half-disk + thick flat rays (upper half only).
 */
export function SunriseMark({ className, rays = 13 }: SunriseMarkProps) {
  const cx = 100
  const cy = 100
  const diskR = 38
  const rayInner = 42
  const rayOuter = 96
  const halfW = 3.2

  const rayPaths: string[] = []
  for (let i = 0; i < rays; i++) {
    /* Spread across upper semicircle, including near-horizon tips */
    const t = rays === 1 ? 0.5 : i / (rays - 1)
    const a = Math.PI - t * Math.PI
    const nx = Math.cos(a)
    const ny = Math.sin(a)
    const tx = -ny
    const ty = nx
    const x1 = cx + nx * rayInner
    const y1 = cy - ny * rayInner
    const x2 = cx + nx * rayOuter
    const y2 = cy - ny * rayOuter
    const path = [
      `M${(x1 + tx * halfW).toFixed(2)} ${(y1 + ty * halfW).toFixed(2)}`,
      `L${(x2 + tx * halfW).toFixed(2)} ${(y2 + ty * halfW).toFixed(2)}`,
      `L${(x2 - tx * halfW).toFixed(2)} ${(y2 - ty * halfW).toFixed(2)}`,
      `L${(x1 - tx * halfW).toFixed(2)} ${(y1 - ty * halfW).toFixed(2)}`,
      'Z',
    ].join(' ')
    rayPaths.push(path)
  }

  return (
    <svg
      viewBox="0 0 200 100"
      className={cn('overflow-visible', className)}
      aria-hidden
    >
      {/* Horizon disk — only the rising half */}
      <path
        d={`M${cx - diskR} ${cy} A${diskR} ${diskR} 0 0 0 ${cx + diskR} ${cy} Z`}
        fill="currentColor"
      />
      {rayPaths.map((d) => (
        <path key={d} d={d} fill="currentColor" />
      ))}
    </svg>
  )
}
