import { Link } from 'react-router-dom'

import { GeoIcon } from '@/components/marketing/geo/GeoIcons'
import { footerNav, siteMeta } from '@/lib/nav'

const legalLinks = [
  { label: 'Cookies', href: '/cookies' },
  { label: 'Email us', href: `mailto:${siteMeta.email}` },
] as const

const updateLinks = [
  { label: 'This Sunday', href: '/visit' },
  { label: 'Radical Media', href: '/podcasts' },
  { label: 'Give', href: '/give' },
  { label: 'Sponsorship', href: '/sponsorship' },
] as const

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative isolate overflow-hidden border-t-2 border-ink bg-ink text-paper">
      {/* Giant wordmark — absolute, clipped; does not grow footer height */}
      <p
        aria-hidden
        className="type-display pointer-events-none absolute bottom-0 left-1/2 z-0 flex w-screen max-w-none -translate-x-1/2 translate-y-[22%] justify-between px-0 text-[clamp(9rem,34vw,28rem)] leading-none text-paper/[0.07] select-none"
      >
        {Array.from('RADICAL').map((letter, i) => (
          <span key={`${letter}-${i}`}>{letter}</span>
        ))}
      </p>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-12 pb-8 sm:px-8 sm:pt-14 sm:pb-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-sm">
            <GeoIcon
              name="spark"
              className="size-8 text-lime sm:size-9"
            />
            <p className="mt-5 text-base leading-relaxed text-paper/55 sm:text-lg">
              Helping shape Norwich — for Jesus. Soft hearts, hard
              discipleship, and a city that needs Him.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-lime">
              {siteMeta.visit.day} · {siteMeta.visit.time} ·{' '}
              {siteMeta.visit.venue}
            </p>
            <Link
              to="/visit"
              className="mt-6 inline-flex border-2 border-ink bg-lime px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-lime-foreground offset-shadow-crimson transition hover:translate-x-[3px] hover:translate-y-[3px]"
            >
              This Sunday · {siteMeta.visit.time}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-12">
            <FooterCol title="Church" links={footerNav.church} />
            <FooterCol title="Action" links={footerNav.action} />
            <div className="col-span-2 sm:col-span-1">
              <FooterCol title="Updates" links={updateLinks} />
              <ul className="mt-6 space-y-2">
                {legalLinks.map((item) => (
                  <li key={item.href}>
                    {item.href.startsWith('mailto:') ? (
                      <a
                        href={item.href}
                        className="text-sm text-paper/70 transition hover:text-lime"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="text-sm text-paper/70 transition hover:text-lime"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/30">
                Charity {siteMeta.charityNumber}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/30">
          {year} · Made with love · Radical Church Norwich · Built by{' '}
          <a
            href="https://beblessed.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper/45 transition hover:text-lime"
          >
            Babe
          </a>
        </p>
      </div>
    </footer>
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
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/35">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              className="text-sm text-paper/70 transition hover:text-lime"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
