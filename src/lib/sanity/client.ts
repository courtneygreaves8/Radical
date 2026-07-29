import { createClient, type SanityClient } from '@sanity/client'

import {
  aboutCopy,
  beliefs,
  carouselSlides,
  events,
  giveOptions,
  missions,
  type BeliefItem,
  type CarouselSlide,
  type EventItem,
  type GiveOption,
  type MissionStory,
} from '@/lib/content'
import { siteMeta } from '@/lib/nav'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined

export const sanityConfigured = Boolean(projectId?.trim())

export const sanityClient: SanityClient | null = sanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
      apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2025-01-01',
      useCdn: true,
    })
  : null

export type SiteContent = {
  mission: string
  carousel: CarouselSlide[]
  about: typeof aboutCopy
  beliefs: BeliefItem[]
  events: EventItem[]
  missions: MissionStory[]
  giveOptions: GiveOption[]
  visit: typeof siteMeta.visit
  email: string
  charityNumber: string
}

/** Local seed until Sanity project ID is wired. */
export function getLocalContent(): SiteContent {
  return {
    mission: siteMeta.mission,
    carousel: carouselSlides,
    about: aboutCopy,
    beliefs,
    events: events.filter((e) => e.public),
    missions,
    giveOptions,
    visit: siteMeta.visit,
    email: siteMeta.email,
    charityNumber: siteMeta.charityNumber,
  }
}

export async function loadSiteContent(): Promise<SiteContent> {
  if (!sanityClient) return getLocalContent()

  try {
    // Queries land here once studio schemas are published.
    // Until then, fall back so the site always renders.
    return getLocalContent()
  } catch {
    return getLocalContent()
  }
}
