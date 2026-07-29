/**
 * Sanity schema stubs for Phase 1.
 * Run `npm create sanity@latest` in /studio when ready to connect a project,
 * then copy these document types into the studio schema folder.
 */

export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'mission', type: 'string', title: 'Mission statement' },
    { name: 'email', type: 'string', title: 'Email' },
    { name: 'charityNumber', type: 'string', title: 'Charity number' },
    {
      name: 'visit',
      type: 'object',
      fields: [
        { name: 'day', type: 'string' },
        { name: 'time', type: 'string' },
        { name: 'venue', type: 'string' },
        { name: 'address', type: 'string' },
        { name: 'mapsUrl', type: 'url' },
      ],
    },
  ],
}

export const homeCarouselSlide = {
  name: 'homeCarouselSlide',
  title: 'Carousel Slide',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'caption', type: 'text' },
    { name: 'image', type: 'image' },
    { name: 'ctaLabel', type: 'string' },
    { name: 'ctaHref', type: 'string' },
    { name: 'order', type: 'number' },
  ],
}

export const belief = {
  name: 'belief',
  title: 'Belief',
  type: 'document',
  fields: [
    { name: 'group', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'body', type: 'text' },
    { name: 'order', type: 'number' },
  ],
}

export const event = {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'date', type: 'string' },
    { name: 'place', type: 'string' },
    { name: 'blurb', type: 'text' },
    { name: 'public', type: 'boolean' },
  ],
}

export const missionStory = {
  name: 'missionStory',
  title: 'Mission Story',
  type: 'document',
  fields: [
    {
      name: 'region',
      type: 'string',
      options: { list: ['uk', 'world'] },
    },
    { name: 'number', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'body', type: 'text' },
    { name: 'image', type: 'image' },
  ],
}

export const giveOption = {
  name: 'giveOption',
  title: 'Give Option',
  type: 'document',
  fields: [
    {
      name: 'type',
      type: 'string',
      options: { list: ['sms', 'bank', 'sponsor'] },
    },
    { name: 'title', type: 'string' },
    { name: 'detail', type: 'text' },
    { name: 'hint', type: 'string' },
  ],
}
