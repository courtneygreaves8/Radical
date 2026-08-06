import { createBrowserRouter, Navigate } from 'react-router-dom'

import { ConsentLayout } from '@/components/layout/ConsentLayout'
import { RootLayout } from '@/components/layout/RootLayout'
import { HomePage } from '@/pages/HomePage'
import { PodcastsPage } from '@/pages/PodcastsPage'

export const router = createBrowserRouter([
  {
    element: <ConsentLayout />,
    children: [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'podcasts', element: <PodcastsPage /> },
          { path: '*', element: <Navigate to="/" replace /> },
        ],
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
