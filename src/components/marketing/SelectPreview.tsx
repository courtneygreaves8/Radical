import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

import { OffsetBlock } from '@/components/shared/OffsetBlock'
import { cn } from '@/lib/utils'

export type PreviewItem = {
  id: string
  meta: string
  title: string
  detailTitle: string
  detailBody: string
  image: string
  href?: string
}

type SelectPreviewProps = {
  index: string
  label: string
  headline: ReactNode
  items: PreviewItem[]
  tone?: 'ink' | 'paper'
  className?: string
}

/** Composition Awards — interactive list left, grainy preview right. */
export function SelectPreview({
  index,
  label,
  headline,
  items,
  tone = 'ink',
  className,
}: SelectPreviewProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const active = items.find((i) => i.id === activeId) ?? items[0]

  const dark = tone === 'ink'

  return (
    <section
      className={cn(
        'border-b-2 border-ink',
        dark ? 'bg-ink text-paper' : 'bg-paper text-ink',
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <p
            className={cn(
              'font-mono text-xs uppercase tracking-[0.2em]',
              dark ? 'text-paper/45' : 'text-ink/45'
            )}
          >
            ({index}) {label}
          </p>
          <h2 className="max-w-2xl text-2xl font-medium leading-snug tracking-tight text-balance sm:text-3xl lg:text-4xl lg:text-right">
            {headline}
          </h2>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <ul className="divide-y-2 divide-ink/20 border-y-2 border-ink/20">
            {items.map((item) => {
              const selected = item.id === active?.id
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    className={cn(
                      'flex w-full items-center gap-4 px-3 py-5 text-left transition sm:gap-6 sm:px-4',
                      selected
                        ? dark
                          ? 'bg-lime text-ink'
                          : 'bg-ink text-lime'
                        : dark
                          ? 'text-paper/55 hover:bg-paper/5 hover:text-paper'
                          : 'text-ink/50 hover:bg-mute hover:text-ink'
                    )}
                  >
                    <span className="w-14 shrink-0 font-mono text-sm font-bold tabular-nums sm:w-16">
                      {item.meta}
                    </span>
                    <span className="flex-1 text-sm font-bold sm:text-base">
                      {item.title}
                    </span>
                    <span
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center border-2 transition',
                        selected
                          ? dark
                            ? 'border-ink bg-ink text-lime'
                            : 'border-lime bg-lime text-ink'
                          : dark
                            ? 'border-paper/25'
                            : 'border-ink/25'
                      )}
                    >
                      <ArrowUpRight className="size-4" strokeWidth={2.25} />
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="min-w-0">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                >
                  <OffsetBlock offset={dark ? 'lime' : 'ink'} className="mb-1">
                    <div className="photo-grain relative aspect-[16/10] overflow-hidden border-2 border-ink bg-ink">
                      <img
                        src={active.image}
                        alt=""
                        className="photo-bw absolute inset-0 size-full object-cover"
                      />
                    </div>
                  </OffsetBlock>
                  <h3 className="mt-5 text-xl font-bold tracking-tight sm:text-2xl">
                    {active.detailTitle}
                  </h3>
                  <p
                    className={cn(
                      'mt-3 max-w-xl text-sm leading-relaxed',
                      dark ? 'text-paper/60' : 'text-ink/65'
                    )}
                  >
                    {active.detailBody}
                  </p>
                  {active.href ? (
                    <Link
                      to={active.href}
                      className={cn(
                        'mt-5 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider',
                        dark ? 'text-lime hover:underline' : 'text-ink hover:underline'
                      )}
                    >
                      Explore
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  ) : null}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
