import { BrandGlyph } from '@/components/marketing/MorphMark'
import { cn } from '@/lib/utils'

type IconProps = {
  className?: string
  /** fill | stroke for outline marks */
  mode?: 'fill' | 'stroke'
}

/** 8-point spark / compass star */
export function GeoSpark({ className, mode = 'fill' }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path
        d="M50 4 L56 38 L88 28 L62 50 L88 72 L56 62 L50 96 L44 62 L12 72 L38 50 L12 28 L44 38 Z"
        fill={mode === 'fill' ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={mode === 'stroke' ? 2.5 : 0}
      />
    </svg>
  )
}

/** Radial network / dandelion */
export function GeoNetwork({ className }: IconProps) {
  const spokes = 16
  const lines = Array.from({ length: spokes }, (_, i) => {
    const a = (i / spokes) * Math.PI * 2 - Math.PI / 2
    const x2 = 50 + Math.cos(a) * 40
    const y2 = 50 + Math.sin(a) * 40
    const tx = 50 + Math.cos(a) * 44
    const ty = 50 + Math.sin(a) * 44
    return { x2, y2, tx, ty }
  })
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {lines.map((l, i) => (
        <g key={i}>
          <line
            x1="50"
            y1="50"
            x2={l.x2}
            y2={l.y2}
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx={l.tx} cy={l.ty} r="3.2" fill="currentColor" />
        </g>
      ))}
      <circle cx="50" cy="50" r="6" fill="currentColor" />
    </svg>
  )
}

/** Concentric rings */
export function GeoRings({ className }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {[42, 30, 18, 8].map((r) => (
        <circle
          key={r}
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      ))}
    </svg>
  )
}

/** Building-block circle grid with partial fills */
export function GeoGrid({ className }: IconProps) {
  const cells = [
    [0, 0, false],
    [1, 0, true],
    [2, 0, false],
    [3, 0, false],
    [0, 1, false],
    [1, 1, true],
    [2, 1, false],
    [3, 1, false],
    [0, 2, false],
    [1, 2, false],
    [2, 2, false],
    [3, 2, false],
  ] as const
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {cells.map(([c, r, solid], i) => (
        <circle
          key={i}
          cx={16 + c * 23}
          cy={20 + r * 28}
          r="10"
          fill={solid ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
        />
      ))}
    </svg>
  )
}

/** Impact tunnel — stacked offset circles */
export function GeoTunnel({ className }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {Array.from({ length: 8 }, (_, i) => (
        <circle
          key={i}
          cx={28 + i * 7}
          cy={28 + i * 7}
          r={38 - i * 2}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          opacity={1 - i * 0.08}
        />
      ))}
    </svg>
  )
}

/** Blunt rectangular gear */
export function GeoGear({ className }: IconProps) {
  return <BrandGlyph shape="gear" className={className} />
}

/** Sharp 12-point starburst */
export function GeoStar12({ className }: IconProps) {
  return <BrandGlyph shape="star12" className={className} />
}

/** Thick 6-arm flat asterisk */
export function GeoAsterisk6({ className }: IconProps) {
  return <BrandGlyph shape="asterisk6" className={className} />
}

/** 8-arm flat asterisk (cross + X) */
export function GeoAsterisk8({ className }: IconProps) {
  return <BrandGlyph shape="asterisk8" className={className} />
}

/** Dense flat-ray sunburst */
export function GeoSunburst({ className }: IconProps) {
  return <BrandGlyph shape="sunburst" className={className} />
}

/** Christian cross — flat arms, sharp corners */
export function GeoCross({ className, mode = 'fill' }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path
        d="M38 4 H62 V32 H96 V56 H62 V96 H38 V56 H4 V32 H38 Z"
        fill={mode === 'fill' ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={mode === 'stroke' ? 2.5 : 0}
      />
    </svg>
  )
}

export const geoIconMap = {
  spark: GeoSpark,
  network: GeoNetwork,
  rings: GeoRings,
  grid: GeoGrid,
  tunnel: GeoTunnel,
  gear: GeoGear,
  star12: GeoStar12,
  asterisk6: GeoAsterisk6,
  asterisk8: GeoAsterisk8,
  sunburst: GeoSunburst,
  cross: GeoCross,
} as const

export type GeoIconName = keyof typeof geoIconMap

export function GeoIcon({
  name,
  className,
  mode,
}: {
  name: GeoIconName
  className?: string
  mode?: 'fill' | 'stroke'
}) {
  const Comp = geoIconMap[name]
  return <Comp className={cn(className)} mode={mode} />
}
