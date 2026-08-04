import { Link, Outlet, ScrollRestoration } from 'react-router-dom'

import { MadeByBabe } from '@/components/shared/MadeByBabe'
import { siteMeta } from '@/lib/nav'

export function AuthLayout() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip bg-[var(--v3-below,#f6efe9)] text-ink">
      <header className="border-b border-ink/10 bg-[var(--v3-cream,#faf4f0)]">
        <div className="mx-auto flex h-16 max-w-lg items-center justify-between px-5">
          <Link
            to="/"
            className="font-sans text-sm font-bold tracking-tight text-ink"
          >
            {siteMeta.name}
          </Link>
          <Link
            to="/podcasts"
            className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/45 transition hover:text-lime"
          >
            Media
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-5 py-12">
        <Outlet />
      </main>
      <MadeByBabe />
      <ScrollRestoration />
    </div>
  )
}
