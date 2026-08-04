import { Outlet, ScrollRestoration } from 'react-router-dom'

import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { PodcastVideoFrame } from '@/components/marketing/PodcastVideoFrame'
import { WeAreRadicalBand } from '@/components/marketing/WeAreRadicalBand'
import { MadeByBabe } from '@/components/shared/MadeByBabe'

export function RootLayout() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip bg-[var(--v3-below,#f6efe9)]">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <PodcastVideoFrame />
      <WeAreRadicalBand />
      <SiteFooter />
      <MadeByBabe />
      <ScrollRestoration getKey={(location) => location.key} />
    </div>
  )
}
