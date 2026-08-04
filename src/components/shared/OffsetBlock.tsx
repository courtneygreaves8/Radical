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
  ink: 'rounded-[1.25rem] bg-ink',
  lime: 'rounded-[1.25rem] bg-lime',
  paper: 'rounded-[1.25rem] border border-ink/15 bg-paper',
  crimson: 'rounded-[1.25rem] bg-crimson',
  navy: 'rounded-[1.25rem] bg-navy',
  flame: 'rounded-[1.25rem] bg-flame',
} as const

/** Image/button frame with a soft offset slab behind. */
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
          'absolute inset-0 translate-x-2 translate-y-2 transition duration-200 sm:translate-x-2.5 sm:translate-y-2.5',
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
