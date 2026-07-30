import { Link } from 'react-router-dom'

import { BrandGlyph } from '@/components/marketing/MorphMark'
import { OffsetBlock } from '@/components/shared/OffsetBlock'
import { cn } from '@/lib/utils'

export type StatTrioProps = {
  index: string
  label: string
  headline: string
  image: string
  imageHref?: string
  paper: { value: string; caption: string; body: string; href?: string }
  lime: { value: string; caption: string; body: string; href?: string }
  className?: string
}

function StarMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <path
        d="M100 8 L118 82 L192 100 L118 118 L100 192 L82 118 L8 100 L82 82 Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Photo + paper stat + lime stat — three-up performance strip. */
export function StatTrio({
  index,
  label,
  headline,
  image,
  imageHref,
  paper,
  lime,
  className,
}: StatTrioProps) {
  const photo = (
    <OffsetBlock offset="lime">
      <div className="photo-grain relative min-h-[260px] overflow-hidden border-2 border-ink bg-ink sm:min-h-[320px]">
        <img
          src={image}
          alt=""
          className="photo-bw absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/25" />
        <StarMark className="absolute bottom-5 left-5 size-12 text-lime sm:size-14" />
      </div>
    </OffsetBlock>
  )

  return (
    <section className={cn('border-b-2 border-ink bg-paper', className)}>
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">
          ({index}) {label}
        </p>
        <h2 className="type-display mt-4 max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
          {headline}
        </h2>

        <div className="mt-10 grid gap-3 lg:grid-cols-3 lg:gap-4">
          {imageHref ? (
            <Link to={imageHref} className="block">
              {photo}
            </Link>
          ) : (
            photo
          )}

          <StatBlock
            tone="ink"
            value={paper.value}
            caption={paper.caption}
            body={paper.body}
            href={paper.href}
          />
          <StatBlock
            tone="lime"
            value={lime.value}
            caption={lime.caption}
            body={lime.body}
            href={lime.href}
          />
        </div>
      </div>
    </section>
  )
}

function StatBlock({
  tone,
  value,
  caption,
  body,
  href,
}: {
  tone: 'ink' | 'lime'
  value: string
  caption: string
  body: string
  href?: string
}) {
  const node = (
    <div
      className={cn(
        'group relative flex min-h-[260px] flex-col justify-between overflow-hidden border-2 border-ink p-6 transition-colors duration-200 sm:min-h-[320px] sm:p-8',
        tone === 'lime' ? 'bg-lime text-lime-foreground' : 'bg-ink text-paper',
        'hover:bg-[#111] hover:text-paper'
      )}
    >
      <BrandGlyph
        shape={tone === 'lime' ? 'asterisk6' : 'gear'}
        className={cn(
          'pointer-events-none absolute bottom-5 right-5 size-12 sm:size-14',
          tone === 'lime' ? 'text-ink/90' : 'text-lime',
          'transition-colors duration-200 group-hover:text-lime'
        )}
      />
      <div className="relative z-10">
        <p
          className={cn(
            'type-display text-6xl transition-colors duration-200 sm:text-7xl',
            tone === 'lime' ? 'text-ink group-hover:text-lime' : 'text-lime'
          )}
        >
          {value}
        </p>
        <p className="mt-3 text-sm font-bold tracking-tight transition-colors duration-200 group-hover:text-paper">
          {caption}
        </p>
      </div>
      <p
        className={cn(
          'relative z-10 mt-8 max-w-[85%] text-sm leading-relaxed transition-colors duration-200',
          tone === 'lime'
            ? 'text-ink/70 group-hover:text-paper/65'
            : 'text-paper/65'
        )}
      >
        {body}
      </p>
    </div>
  )

  return href ? (
    <Link to={href} className="block">
      {node}
    </Link>
  ) : (
    node
  )
}
