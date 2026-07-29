import { Link, Outlet, ScrollRestoration } from 'react-router-dom'

import { MadeByBabe } from '@/components/shared/MadeByBabe'
import { siteMeta } from '@/lib/nav'

export function AuthLayout() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip bg-ink text-paper">
      <header className="border-b-2 border-lime">
        <div className="mx-auto flex h-16 max-w-lg items-center justify-between px-5">
          <Link to="/" className="type-display text-sm text-lime">
            {siteMeta.name}
          </Link>
          <Link
            to="/podcasts"
            className="font-mono text-xs uppercase tracking-wider text-paper/50 hover:text-lime"
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
