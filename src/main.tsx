import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from '@/app/router'
import { AuthProvider } from '@/contexts/AuthContext'
import { CookieConsentProvider } from '@/contexts/CookieConsentContext'
import { restoreSiteBlueIfNeeded } from '@/lib/siteGlitch'
import '@/styles/globals.css'

restoreSiteBlueIfNeeded()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookieConsentProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CookieConsentProvider>
  </StrictMode>
)
