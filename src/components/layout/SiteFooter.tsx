import { ArrowUpRight } from 'lucide-react'

import { GeoIcon } from '@/components/marketing/geo/GeoIcons'
import { SiteLink } from '@/components/shared/SiteLink'
import { footerNav, siteMeta } from '@/lib/nav'
import { cn } from '@/lib/utils'

const legalLinks = [
  { label: 'Cookies', href: '/cookies' },
  { label: 'Email us', href: `mailto:${siteMeta.email}` },
] as const

const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(siteMeta.visit.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <div className="relative z-0 bg-[var(--v3-below,#f6efe9)] px-3 pt-1 pb-3 sm:px-8 sm:pt-6 sm:pb-8 lg:px-10 lg:pb-10">
      <div className="relative mx-auto mt-16 max-w-7xl sm:mt-28 lg:mt-36">
        <MapInvite />
        <FooterMap />

        <footer className="relative isolate z-[1] overflow-hidden rounded-[1.25rem] bg-[var(--v3-ink)] text-[var(--v3-cream)] sm:rounded-[2rem] lg:rounded-[2.25rem]">
          <div
            className={cn(
              'relative z-10 px-4 pb-6 sm:px-8 sm:pb-10 lg:px-10',
              /* Map clearance: modest on mobile, roomy on desktop */
              'pt-24 sm:pt-40 lg:pt-14 lg:pr-[min(24rem,42%)]'
            )}
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-14">
              <div className="max-w-xs shrink-0">
                <GeoIcon
                  name="asterisk6"
                  className="size-7 text-[var(--v3-terra)] sm:size-8"
                />
                <p className="mt-4 text-sm leading-relaxed text-[var(--v3-cream)]/60 sm:text-[15px]">
                  Norwich&apos;s Fearless Church — gritty, real, shaping the
                  city. Soft hearts for the broken, hard discipleship for the
                  hungry.
                </p>
                <SiteLink
                  to="/visit"
                  className="mt-5 inline-flex w-full max-w-xs items-center justify-between gap-3 rounded-full bg-[var(--v3-cream)] py-2 pr-1.5 pl-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--v3-ink)] transition hover:bg-white sm:mt-6 sm:w-auto sm:min-w-[14rem]"
                >
                  <span className="min-w-0 truncate">
                    This Sunday · {siteMeta.visit.time}
                  </span>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--v3-ink)] text-[var(--v3-cream)]">
                    <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
                  </span>
                </SiteLink>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--v3-cream)]/35">
                  {siteMeta.visit.venue}
                </p>
              </div>

              <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10 lg:max-w-xl lg:gap-12">
                <FooterCol title="Church" links={footerNav.church} />
                <FooterCol title="Action" links={footerNav.action} />
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--v3-cream)]/35">
                    More
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    <li>
                      <SiteLink
                        to="/podcasts"
                        className="text-sm text-[var(--v3-cream)]/70 transition hover:text-[var(--v3-terra)]"
                      >
                        Radical Media
                      </SiteLink>
                    </li>
                    {legalLinks.map((item) => (
                      <li key={item.href}>
                        {item.href.startsWith('mailto:') ? (
                          <a
                            href={item.href}
                            className="text-sm text-[var(--v3-cream)]/70 transition hover:text-[var(--v3-terra)]"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <SiteLink
                            to={item.href}
                            className="text-sm text-[var(--v3-cream)]/70 transition hover:text-[var(--v3-terra)]"
                          >
                            {item.label}
                          </SiteLink>
                        )}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--v3-cream)]/28">
                    Charity {siteMeta.charityNumber}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-[var(--v3-cream)]/10 pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--v3-cream)]/30">
                {year} · Radical Church Norwich · Built by{' '}
                <a
                  href="https://beblessed.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--v3-cream)]/50 transition hover:text-[var(--v3-terra)]"
                >
                  Babe
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

function MapInvite() {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute z-30 text-[var(--v3-terra)]',
        /* Sit just above / left of the tilted map card */
        'top-[-32px] right-[min(78%,15.5rem)] -translate-y-[108%] sm:right-[21rem] sm:-translate-y-[118%] lg:right-[23rem] lg:-translate-y-[125%]'
      )}
    >
      <div className="relative -rotate-[8deg] sm:-rotate-[10deg]">
        <p className="font-hand max-w-[10.5rem] text-[1.05rem] leading-snug tracking-tight sm:max-w-[13rem] sm:text-[1.25rem] lg:text-[1.35rem]">
          Join us Sunday @ {siteMeta.visit.time}
        </p>
        {/* 90° curve — runs right then down into the map */}
        <svg
          viewBox="0 0 88 78"
          className="absolute top-[72%] left-[78%] h-[3.25rem] w-[3.75rem] sm:left-[82%] sm:h-[4.25rem] sm:w-[4.75rem] lg:h-[4.75rem] lg:w-[5.25rem]"
          fill="none"
        >
          <path
            d="M8 10 C 58 10, 74 18, 74 62"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M64 52 L74 64 L84 52"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

function FooterMap() {
  return (
    <div className="absolute top-0 right-3 z-20 w-[min(72%,13.5rem)] -translate-y-[42%] rotate-[3deg] sm:right-0 sm:w-[19.5rem] sm:-translate-y-1/2 sm:rotate-[7deg] lg:w-[21rem]">
      <a
        href={siteMeta.visit.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col overflow-hidden rounded-[1.25rem] bg-white p-2.5 shadow-[0_12px_36px_rgba(30,21,18,0.08)] ring-1 ring-[var(--v3-ink)]/8 transition hover:shadow-[0_18px_44px_rgba(30,21,18,0.14)] sm:rounded-[1.6rem] sm:p-3.5 lg:rounded-[1.75rem] lg:p-4"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.95rem] bg-[var(--v3-ink)]/[0.04] sm:aspect-[16/9] sm:rounded-[1.2rem]">
          <iframe
            title={`Map to ${siteMeta.visit.venue}`}
            className="pointer-events-none absolute inset-0 size-full scale-[1.02] border-0 contrast-[1.04] saturate-[0.9]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapEmbedSrc}
            tabIndex={-1}
          />
        </div>
        <div className="flex items-center justify-between gap-3 pt-2.5 sm:pt-3.5">
          <p className="min-w-0 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--v3-ink)] sm:text-xs">
            Find us
          </p>
          <span
            aria-hidden
            className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--v3-ink)] text-[var(--v3-cream)] transition-[width,height,background-color] duration-300 ease-out group-hover:size-11 group-hover:bg-[var(--v3-terra)] sm:size-9 sm:group-hover:size-12"
          >
            <ArrowUpRight className="size-3.5 sm:size-4" strokeWidth={2.5} />
          </span>
        </div>
      </a>
    </div>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: readonly { label: string; href: string }[]
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--v3-cream)]/35">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((item) => (
          <li key={item.href}>
            <SiteLink
              to={item.href}
              className="text-sm text-[var(--v3-cream)]/70 transition hover:text-[var(--v3-terra)]"
            >
              {item.label}
            </SiteLink>
          </li>
        ))}
      </ul>
    </div>
  )
}