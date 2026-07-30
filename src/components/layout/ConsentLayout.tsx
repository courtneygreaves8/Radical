import { Outlet } from 'react-router-dom'

import { AnalyticsGate } from '@/components/cookies/AnalyticsGate'
import { CookieNotice } from '@/components/cookies/CookieNotice'

/** Shared shell so the cookie notice appears on every route tree. */
export function ConsentLayout() {
  return (
    <>
      <Outlet />
      <AnalyticsGate />
      <CookieNotice />
    </>
  )
}
