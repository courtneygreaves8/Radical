import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout } from '@/components/layout/AuthLayout'
import { MediaLayout } from '@/components/layout/MediaLayout'
import { RootLayout } from '@/components/layout/RootLayout'
import { AboutPage } from '@/pages/AboutPage'
import { AccountPage } from '@/pages/AccountPage'
import { BeliefsPage } from '@/pages/BeliefsPage'
import { EventsPage } from '@/pages/EventsPage'
import { GivePage } from '@/pages/GivePage'
import { HomePage } from '@/pages/HomePage'
import { MissionsPage } from '@/pages/MissionsPage'
import { PodcastEpisodePage } from '@/pages/PodcastEpisodePage'
import { PodcastShowPage } from '@/pages/PodcastShowPage'
import { PodcastsPage } from '@/pages/PodcastsPage'
import { SignInPage } from '@/pages/SignInPage'
import { SignUpPage } from '@/pages/SignUpPage'
import { VisitPage } from '@/pages/VisitPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'beliefs', element: <BeliefsPage /> },
      { path: 'visit', element: <VisitPage /> },
      { path: 'events', element: <EventsPage /> },
      { path: 'missions', element: <MissionsPage /> },
      { path: 'give', element: <GivePage /> },
      { path: 'account', element: <AccountPage /> },
    ],
  },
  {
    path: '/podcasts',
    element: <MediaLayout />,
    children: [
      { index: true, element: <PodcastsPage /> },
      { path: ':showSlug', element: <PodcastShowPage /> },
      { path: ':showSlug/:episodeSlug', element: <PodcastEpisodePage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: 'sign-up', element: <SignUpPage /> },
      { path: 'sign-in', element: <SignInPage /> },
    ],
  },
])
