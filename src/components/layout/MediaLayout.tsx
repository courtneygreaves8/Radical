import { Link, Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { AuthMenu } from '@/components/auth/AuthMenu'
import { MadeByBabe } from '@/components/shared/MadeByBabe'
import '@/styles/media.css'

export function MediaLayout() {
  const location = useLocation()
  const isHub = location.pathname === '/podcasts'

  return (
    <div className="media-shell relative flex min-h-dvh flex-col overflow-x-clip">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-4 px-4 sm:h-16 sm:px-8">
          <div className="flex items-center gap-4">
            {!isHub ? (
              <Link
                to="/podcasts"
                className="flex size-9 items-center justify-center border border-white/20 text-white/80 transition hover:border-lime hover:text-lime"
                aria-label="Back to podcasts"
              >
                <ArrowLeft className="size-4" />
              </Link>
            ) : (
              <Link
                to="/"
                className="font-mono text-xs uppercase tracking-wider text-white/50 transition hover:text-lime"
              >
                ← Church
              </Link>
            )}
            <Link
              to="/podcasts"
              className="type-display text-sm text-lime sm:text-base"
            >
              Radical Media
            </Link>
          </div>
          <AuthMenu tone="dark" />
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 px-4 py-8 sm:px-8">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-2 font-mono text-xs text-white/40 sm:flex-row sm:justify-between">
          <p>Radical Media · Sermons, worship & discipleship</p>
          <p>
            <Link to="/" className="hover:text-lime">
              Back to church site
            </Link>
          </p>
        </div>
      </footer>

      <MadeByBabe />
      <ScrollRestoration getKey={(loc) => loc.key} />
    </div>
  )
}
