import { Link } from 'react-router-dom'

import { footerNav, siteMeta } from '@/lib/nav'

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="type-display text-2xl sm:text-3xl">{siteMeta.name}</p>
          <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-paper/70">
            {siteMeta.mission}
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-wider text-lime">
            {siteMeta.visit.day} · {siteMeta.visit.time}
          </p>
          <p className="mt-1 text-sm text-paper/80">{siteMeta.visit.address}</p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime">
            Church
          </p>
          <ul className="mt-4 space-y-2">
            {footerNav.church.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-sm font-medium hover:text-lime"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime">
            Action
          </p>
          <ul className="mt-4 space-y-2">
            {footerNav.action.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-sm font-medium hover:text-lime"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 font-mono text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            Charity {siteMeta.charityNumber} ·{' '}
            <a
              href={`mailto:${siteMeta.email}`}
              className="hover:text-lime"
            >
              {siteMeta.email}
            </a>
          </p>
          <p>
            Built by{' '}
            <a
              href="https://beblessed.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime hover:underline"
            >
              Babe
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
