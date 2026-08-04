import { Link } from 'react-router-dom'

import { GeoIcon } from '@/components/marketing/geo/GeoIcons'
import { footerNav, siteMeta } from '@/lib/nav'

const legalLinks = [
  { label: 'Cookies', href: '/cookies' },
  { label: 'Email us', href: `mailto:${siteMeta.email}` },
] as const

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <div className="bg-[var(--v3-below,#f6efe9)] px-5 pt-4 pb-5 sm:px-8 sm:pt-6 sm:pb-8 lg:px-10 lg:pb-10">
      <footer className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] bg-[var(--v3-ink)] text-[var(--v3-cream)] sm:rounded-[2rem] lg:rounded-[2.25rem]">
        {/* Wordmark — kept low so it doesn’t fight the link columns */}
        <p
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-6 z-0 flex justify-center font-sans text-[clamp(4.5rem,14vw,11rem)] font-bold leading-none tracking-tight text-[var(--v3-cream)]/[0.05] select-none"
        >
          RADICAL
        </p>

        <div className="relative z-10 px-6 pt-10 pb-8 sm:px-8 sm:pt-12 sm:pb-10 lg:px-10 lg:pt-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-14">
            <div className="max-w-xs shrink-0">
              <GeoIcon
                name="asterisk6"
                className="size-7 text-[var(--v3-terra)] sm:size-8"
              />
              <p className="mt-4 text-sm leading-relaxed text-[var(--v3-cream)]/60 sm:text-[15px]">
                Helping shape Norwich — for Jesus. Soft hearts, hard
                discipleship, and a city that needs Him.
              </p>
              <Link
                to="/visit"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--v3-cream)] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--v3-ink)] transition hover:bg-white"
              >
                This Sunday · {siteMeta.visit.time}
              </Link>
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
                    <Link
                      to="/podcasts"
                      className="text-sm text-[var(--v3-cream)]/70 transition hover:text-[var(--v3-terra)]"
                    >
                      Radical Media
                    </Link>
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
                        <Link
                          to={item.href}
                          className="text-sm text-[var(--v3-cream)]/70 transition hover:text-[var(--v3-terra)]"
                        >
                          {item.label}
                        </Link>
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
            <Link
              to={item.href}
              className="text-sm text-[var(--v3-cream)]/70 transition hover:text-[var(--v3-terra)]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
