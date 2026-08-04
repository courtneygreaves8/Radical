import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

import { GeoIcon, type GeoIconName } from '@/components/marketing/geo/GeoIcons'
import { AppImage } from '@/components/shared/AppImage'
import { cn } from '@/lib/utils'

type SplitPanel = {
  eyebrow: string
  value: string
  detail: string
  cta: { label: string; href: string; external?: boolean }
  mark: GeoIconName
  markTone?: 'lime' | 'paper'
}

type SplitProofProps = {
  left: SplitPanel
  right: SplitPanel & { image: string }
  className?: string
}

const pad = 'px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12'
const display =
  'type-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.88] tracking-tight'

function CtaLink({
  cta,
}: {
  cta: SplitPanel['cta']
}) {
  const className =
    'inline-flex w-fit items-center gap-2 border-b-2 border-lime pb-1 text-sm font-bold uppercase tracking-wider text-lime transition hover:text-paper'

  if (cta.external) {
    return (
      <a
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {cta.label}
        <ArrowUpRight className="size-3.5" />
      </a>
    )
  }

  return (
    <Link to={cta.href} className={className}>
      {cta.label}
      <ArrowUpRight className="size-3.5" />
    </Link>
  )
}

/**
 * Twin proof panels — Visit GatherProof grid language, reusable.
 */
export function SplitProof({ left, right, className }: SplitProofProps) {
  return (
    <section className={cn('border-b border-ink/10 bg-ink text-paper', className)}>
      <div className="grid lg:grid-cols-2 lg:min-h-[520px]">
        <div className="relative overflow-hidden border-b border-ink/10 lg:border-b-0 lg:border-r-2">
          <GeoIcon
            name="sunburst"
            className="pointer-events-none absolute -bottom-16 -left-16 size-64 text-paper/[0.07] sm:size-72 lg:size-80"
          />
          <GeoIcon
            name={left.mark}
            className={cn(
              'pointer-events-none absolute right-5 bottom-5 size-20 sm:right-6 sm:bottom-6 sm:size-24 lg:size-28',
              left.markTone === 'paper' ? 'text-paper/80' : 'text-lime'
            )}
          />

          <div
            className={cn(
              'relative z-10 grid min-h-[380px] grid-rows-[auto_1fr_auto] gap-10 sm:min-h-[420px] lg:min-h-[520px] lg:gap-12',
              pad
            )}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45">
              {left.eyebrow}
            </p>
            <div className="flex flex-col justify-end">
              <p className={cn(display, 'text-paper')}>{left.value}</p>
              <p className="mt-3 max-w-sm text-sm font-medium text-paper/65 sm:text-base">
                {left.detail}
              </p>
            </div>
            <CtaLink cta={left.cta} />
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="photo-grain absolute inset-0">
            <AppImage
              src={right.image}
              alt=""
              className="absolute inset-0 size-full opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/35" />
          </div>

          <GeoIcon
            name={right.mark}
            className={cn(
              'pointer-events-none absolute right-5 top-5 size-20 sm:right-6 sm:top-6 sm:size-24 lg:size-28',
              right.markTone === 'paper' ? 'text-paper/80' : 'text-lime'
            )}
          />

          <div
            className={cn(
              'relative z-10 grid min-h-[380px] grid-rows-[auto_1fr_auto] gap-10 sm:min-h-[420px] lg:min-h-[520px] lg:gap-12',
              pad
            )}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45">
              {right.eyebrow}
            </p>
            <div className="flex flex-col justify-end">
              <p className={cn(display, 'text-paper')}>{right.value}</p>
              <p className="mt-3 max-w-sm text-sm text-paper/65 sm:text-base">
                {right.detail}
              </p>
            </div>
            <CtaLink cta={right.cta} />
          </div>
        </div>
      </div>
    </section>
  )
}
