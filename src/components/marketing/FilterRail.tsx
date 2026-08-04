import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

export type FilterRailItem = {
  id: string
  label: string
}

export type FilterRailGroup = {
  id: string
  label: string
}

type FilterRailProps = {
  groups?: FilterRailGroup[]
  activeGroupId?: string
  onGroupChange?: (id: string) => void
  filters: FilterRailItem[]
  activeId: string
  onChange: (id: string) => void
  hint?: string
  tone?: 'paper' | 'ink'
  className?: string
  sticky?: boolean
}

/**
 * Bottom category rail — JA8-style filters, Radical edges.
 * Horizontal scroll / drag on the chip row.
 */
export function FilterRail({
  groups,
  activeGroupId,
  onGroupChange,
  filters,
  activeId,
  onChange,
  hint = 'Scroll or drag to navigate',
  tone = 'paper',
  className,
  sticky = true,
}: FilterRailProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const ink = tone === 'ink'

  // Keep the active chip in view when selection changes
  useEffect(() => {
    const root = scrollerRef.current
    if (!root) return
    const active = root.querySelector<HTMLElement>('[data-active="true"]')
    active?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [activeId, activeGroupId])

  return (
    <div
      className={cn(
        'z-40 border-t border-b-0 border-ink/10',
        sticky && 'sticky bottom-0',
        ink ? 'bg-ink text-paper' : 'bg-paper text-ink',
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 sm:py-5">
        <div
          className={cn(
            'rounded-2xl border',
            ink ? 'border-paper/20' : 'border-ink/10'
          )}
        >
          {groups && groups.length > 0 ? (
            <div
              className={cn(
                'flex flex-wrap items-center gap-x-6 gap-y-2 px-3 py-3 sm:px-4',
                ink ? 'border-b border-paper/20' : 'border-b border-ink/20'
              )}
            >
              {groups.map((g) => {
                const on = g.id === activeGroupId
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => onGroupChange?.(g.id)}
                    className={cn(
                      'font-mono text-[10px] uppercase tracking-[0.2em] transition',
                      on
                        ? ink
                          ? 'text-lime'
                          : 'text-ink'
                        : ink
                          ? 'text-paper/40 hover:text-paper/70'
                          : 'text-ink/40 hover:text-ink/70'
                    )}
                  >
                    {g.label}
                  </button>
                )
              })}
            </div>
          ) : null}

          <div className="flex items-center gap-4 px-3 py-3 sm:px-4">
            <div
              ref={scrollerRef}
              className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {filters.map((f) => {
                const on = f.id === activeId
                return (
                  <button
                    key={f.id}
                    type="button"
                    data-active={on || undefined}
                    onClick={() => onChange(f.id)}
                    className={cn(
                      'shrink-0 whitespace-nowrap rounded-full border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] transition sm:px-4 sm:text-[11px]',
                      on
                        ? ink
                          ? 'border-lime bg-lime text-lime-foreground'
                          : 'border-ink bg-ink text-lime'
                        : ink
                          ? 'border-paper/25 text-paper/70 hover:border-lime hover:text-lime'
                          : 'border-ink/25 text-ink/70 hover:border-ink hover:text-ink'
                    )}
                  >
                    {f.label}
                  </button>
                )
              })}
            </div>

            <p
              className={cn(
                'hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] lg:block',
                ink ? 'text-paper/40' : 'text-ink/40'
              )}
            >
              {hint}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
