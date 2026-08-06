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
  /** tooltip = tip below; morph = label becomes a Coming soon pill on hover */
  soonVariant?: 'tooltip' | 'morph'
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
  soonVariant = 'tooltip',
  onClick,
}: SiteLinkProps) {
  if (isLiveHref(to)) {
    return (
      <Link to={to} className={className} style={style} onClick={onClick}>
        {children}
      </Link>
    )
  }

  if (soonVariant === 'morph') {
    return (
      <span
        role="link"
        aria-disabled="true"
        aria-label={`${typeof children === 'string' ? children : 'Link'} — ${soonLabel}`}
        tabIndex={0}
        style={style}
        className={cn(
          'group/soon relative inline-flex cursor-default items-center justify-center',
          className
        )}
        onClick={(e) => {
          e.preventDefault()
          onClick?.(e)
        }}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') e.preventDefault()
        }}
      >
        <span
          className={cn(
            'inline-flex items-center transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
            'group-hover/soon:scale-90 group-hover/soon:opacity-0 group-hover/soon:blur-[2px]',
            'group-focus-visible/soon:scale-90 group-focus-visible/soon:opacity-0 group-focus-visible/soon:blur-[2px]'
          )}
        >
          {children}
        </span>
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2',
            'inline-flex items-center justify-center whitespace-nowrap rounded-full',
            'bg-[var(--v3-terra,#d86637)] px-3 py-1.5',
            'text-[10px] font-bold uppercase tracking-[0.14em] text-white',
            'scale-75 opacity-0 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
            'group-hover/soon:scale-100 group-hover/soon:opacity-100',
            'group-focus-visible/soon:scale-100 group-focus-visible/soon:opacity-100'
          )}
        >
          {soonLabel}
        </span>
      </span>
    )
  }

  return (
    <span
      role="link"
      aria-disabled="true"
      tabIndex={0}
      title={soonLabel}
      style={style}
      className={cn('group/soon relative cursor-default', className)}
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
