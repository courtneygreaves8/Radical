import { cn } from '@/lib/utils'

type PageHeroProps = {
  eyebrow: string
  title: string
  description?: string
  tone?: 'lime' | 'ink' | 'paper'
}

export function PageHero({
  eyebrow,
  title,
  description,
  tone = 'lime',
}: PageHeroProps) {
  const tones = {
    lime: 'bg-lime text-ink',
    ink: 'bg-ink text-paper',
    paper: 'bg-paper text-ink border-b-2 border-ink',
  }

  return (
    <section className={cn('relative overflow-hidden', tones[tone])}>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] opacity-70">
          {eyebrow}
        </p>
        <h1 className="type-display mt-4 max-w-5xl text-4xl text-balance sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/2 hidden size-56 -translate-y-1/2 sm:block"
      >
        <svg viewBox="0 0 100 100" className="size-full opacity-30">
          <path
            d="M50 5 L58 42 L95 50 L58 58 L50 95 L42 58 L5 50 L42 42 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}
