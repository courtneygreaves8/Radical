import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type OffsetBlockProps = {
  children: ReactNode
  className?: string
  slabClassName?: string
  offset?: 'ink' | 'lime' | 'paper'
}

/** Image/button frame with a solid offset slab behind for 3D brutal feel. */
export function OffsetBlock({
  children,
  className,
  slabClassName,
  offset = 'ink',
}: OffsetBlockProps) {
  const slab =
    offset === 'lime'
      ? 'bg-lime'
      : offset === 'paper'
        ? 'bg-paper'
        : 'bg-ink'

  return (
    <div className={cn('relative', className)}>
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3',
          slab,
          slabClassName
        )}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
