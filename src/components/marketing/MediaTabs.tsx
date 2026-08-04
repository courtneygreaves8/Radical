import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { AppImage } from '@/components/shared/AppImage'
import { OffsetBlock } from '@/components/shared/OffsetBlock'
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
  /** Dwell time per tab (ms). Default ~20s — slow enough to read twice. */
  intervalMs?: number
  className?: string
}

/** Media left + large-type selector right — photo + copy, auto-advances. */
export function MediaTabs({
  index,
  label,
  eyebrow = 'How we gather',
  tabs,
  tone = 'paper',
  intervalMs = 20000,
  className,
}: MediaTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? '')
  const [paused, setPaused] = useState(false)
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0]
  const ink = tone === 'ink'
  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.id === activeId)
  )

  useEffect(() => {
    if (tabs.length < 2 || paused || intervalMs <= 0) return
    const id = window.setInterval(() => {
      setActiveId((current) => {
        const i = tabs.findIndex((t) => t.id === current)
        const next = (i + 1) % tabs.length
        return tabs[next]?.id ?? tabs[0].id
      })
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [tabs, paused, intervalMs, activeId])

  if (!active) return null

  return (
    <section
      className={cn(
        'border-b-2 border-ink',
        ink ? 'bg-ink text-paper' : 'bg-mute text-ink',
        className
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
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

        <OffsetBlock offset={ink ? 'lime' : 'ink'} className="mt-8">
          <div
            className={cn(
              'grid overflow-hidden border-2 border-ink lg:grid-cols-[0.9fr_1.1fr]',
              ink ? 'bg-ink' : 'bg-paper'
            )}
          >
            <div className="flex flex-col justify-between border-b-2 border-ink p-6 sm:p-8 lg:border-b-0 lg:border-r-2 lg:p-10">
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

            <div className="photo-grain relative min-h-[280px] lg:min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 size-full"
                >
                  <AppImage
                    src={active.image}
                    alt=""
                    className="absolute inset-0 size-full"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-ink/15" />

              {/* Progress ticks */}
              <div className="absolute inset-x-0 bottom-0 z-10 flex gap-1.5 p-3 sm:p-4">
                {tabs.map((tab, i) => (
                  <span
                    key={tab.id}
                    className={cn(
                      'h-0.5 flex-1 transition-colors',
                      i === activeIndex
                        ? 'bg-lime'
                        : ink
                          ? 'bg-paper/25'
                          : 'bg-paper/40'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </OffsetBlock>
      </div>
    </section>
  )
}
