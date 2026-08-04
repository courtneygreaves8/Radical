import { useEffect } from 'react'

import { HomeLandingV3 } from '@/components/marketing/HomeLandingV3'
import { writeLandingVersion } from '@/lib/landingVersion'

export function HomePage() {
  useEffect(() => {
    writeLandingVersion('v3')
    document.documentElement.classList.remove('landing-v1-coral')
  }, [])

  return <HomeLandingV3 />
}
