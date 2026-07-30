import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type OffsetBlockProps = {
  children: ReactNode
  className?: string
  slabClassName?: string
  /** Solid fill behind the frame */
  offset?: 'ink' | 'lime' | 'paper' | 'crimson' | 'navy' | 'flame'
  /** Hide slab until hover / focus-within */
  revealOnHover?: boolean
}

const slabs = {
  ink: 'bg-ink',
  lime: 'bg-lime',
  paper: 'border-2 border-ink bg-paper',
  crimson: 'bg-crimson',
  navy: 'bg-navy',
  flame: 'bg-flame',
} as const

/** Image/button frame with a solid offset slab behind for 3D brutal feel. */
export function OffsetBlock({
  children,
  className,
  slabClassName,
  offset = 'lime',
  revealOnHover = false,
}: OffsetBlockProps) {
  return (
    <div className={cn('group/offset relative', className)}>
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 translate-x-2.5 translate-y-2.5 transition duration-200 sm:translate-x-3 sm:translate-y-3',
          slabs[offset],
          revealOnHover &&
            'opacity-0 group-hover/offset:opacity-100 group-focus-within/offset:opacity-100',
          slabClassName
        )}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
