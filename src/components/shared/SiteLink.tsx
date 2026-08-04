import type { CSSProperties, KeyboardEvent, MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { isLiveHref } from '@/lib/nav'
import { cn } from '@/lib/utils'

type SiteLinkProps = {
  to: string
  children: ReactNode
  className?: string
  style?: CSSProperties
  soonLabel?: string
  onClick?: (e: MouseEvent) => void
}

/**
 * Live routes navigate; everything else stays visible with a “Coming soon” tip.
 */
export function SiteLink({
  to,
  children,
  className,
  style,
  soonLabel = 'Coming soon',
  onClick,
}: SiteLinkProps) {
  if (isLiveHref(to)) {
    return (
      <Link to={to} className={className} style={style} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <span
      role="link"
      aria-disabled="true"
      tabIndex={0}
      title={soonLabel}
      style={style}
      className={cn('group/soon relative inline-flex cursor-default', className)}
      onClick={(e) => {
        e.preventDefault()
        onClick?.(e)
      }}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') e.preventDefault()
      }}
    >
      {children}
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2',
          'whitespace-nowrap rounded-full bg-[var(--v3-ink,#1e1512)] px-3 py-1.5',
          'text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--v3-cream,#faf4f0)]',
          'opacity-0 shadow-lg transition duration-150',
          'group-hover/soon:opacity-100 group-focus-visible/soon:opacity-100'
        )}
      >
        {soonLabel}
      </span>
    </span>
  )
}
