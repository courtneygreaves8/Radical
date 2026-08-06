import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'

import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { BlogJournalBand } from '@/components/marketing/BlogJournalBand'
import { PodcastVideoFrame } from '@/components/marketing/PodcastVideoFrame'
import { WeAreRadicalBand } from '@/components/marketing/WeAreRadicalBand'
import { MadeByBabe } from '@/components/shared/MadeByBabe'

export function RootLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip bg-[var(--v3-below,#f6efe9)]">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      {isHome ? (
        <>
          <PodcastVideoFrame />
          <BlogJournalBand />
          <WeAreRadicalBand />
        </>
      ) : null}
      <SiteFooter />
      <MadeByBabe />
      <ScrollRestoration getKey={(location) => location.key} />
    </div>
  )
}
