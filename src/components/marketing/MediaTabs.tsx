import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

import { cn } from '@/lib/utils'

export type MediaTab = {
  id: string
  label: string
  title: string
  body: string
  image: string
}

type MediaTabsProps = {
  index: string
  label: string
  eyebrow?: string
  tabs: MediaTab[]
  tone?: 'paper' | 'ink'
  className?: string
}

/** Media left + large-type selector right — swaps preview + copy. */
export function MediaTabs({
  index,
  label,
  eyebrow = 'How we gather',
  tabs,
  tone = 'paper',
  className,
}: MediaTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? '')
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0]
  const ink = tone === 'ink'

  if (!active) return null

  return (
    <section
      className={cn(
        'border-b-2 border-ink',
        ink ? 'bg-ink text-paper' : 'bg-mute text-ink',
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <p
          className={cn(
            'font-mono text-xs uppercase tracking-[0.2em]',
            ink ? 'text-paper/45' : 'text-ink/45'
          )}
        >
          ({index}) {label}
        </p>

        <div
          className={cn(
            'mt-8 grid overflow-hidden border-2 border-ink lg:grid-cols-[1.1fr_0.9fr]',
            ink ? 'bg-ink' : 'bg-paper'
          )}
        >
          <div className="photo-grain relative min-h-[280px] border-b-2 border-ink lg:min-h-[420px] lg:border-b-0 lg:border-r-2">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={active.image}
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="photo-bw absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-ink/20" />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span
                className={cn(
                  'flex size-14 items-center justify-center border-2 backdrop-blur-sm sm:size-16',
                  ink
                    ? 'border-lime/80 bg-ink/40 text-lime'
                    : 'border-paper/80 bg-paper/25 text-paper'
                )}
              >
                <Play className="size-5 fill-current" />
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <p
              className={cn(
                'text-sm',
                ink ? 'text-paper/50' : 'text-ink/50'
              )}
            >
              {eyebrow}
            </p>

            <ul className="my-10 space-y-1">
              {tabs.map((tab) => {
                const on = tab.id === active.id
                return (
                  <li key={tab.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(tab.id)}
                      className={cn(
                        'group flex w-full items-center justify-between gap-4 border-b-2 py-3 text-left text-2xl font-bold tracking-tight transition sm:text-3xl',
                        on
                          ? ink
                            ? 'border-lime text-paper'
                            : 'border-ink text-ink'
                          : ink
                            ? 'border-transparent text-paper/30 hover:text-paper/60'
                            : 'border-transparent text-ink/30 hover:text-ink/55'
                      )}
                    >
                      <span>{tab.label}</span>
                      <ArrowRight
                        className={cn(
                          'size-5 shrink-0 transition sm:size-6',
                          on
                            ? 'translate-x-0 opacity-100'
                            : 'translate-x-0 opacity-40 group-hover:translate-x-0.5 group-hover:opacity-70'
                        )}
                        strokeWidth={2.25}
                        aria-hidden
                      />
                    </button>
                  </li>
                )
              })}
            </ul>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-lg font-bold tracking-tight sm:text-xl">
                  {active.title}
                </h3>
                <p
                  className={cn(
                    'mt-3 text-sm leading-relaxed',
                    ink ? 'text-paper/60' : 'text-ink/65'
                  )}
                >
                  {active.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
