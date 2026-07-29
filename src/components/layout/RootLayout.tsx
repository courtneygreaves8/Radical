import { Outlet, ScrollRestoration } from 'react-router-dom'

import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { MadeByBabe } from '@/components/shared/MadeByBabe'

export function RootLayout() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip bg-paper">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <MadeByBabe />
      <ScrollRestoration getKey={(location) => location.key} />
    </div>
  )
}
