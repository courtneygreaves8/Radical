import { heroImages } from '@/lib/images'

export type BlogPost = {
  id: string
  dateLabel: string
  title: string
  excerpt: string
  href: string
  image: string
}

/** Home journal list — keep to three featured posts. */
export const homeBlogPosts: BlogPost[] = [
  {
    id: 'streets',
    dateLabel: '14 Jun',
    title: 'Why we take Jesus to the streets of Norwich',
    excerpt: 'Soft hearts for the broken. Hard discipleship for anyone hungry enough to come.',
    href: '/about',
    image: '/blog/streets-top.png',
  },
  {
    id: 'revival',
    dateLabel: '02 May',
    title: 'God wants revival in this county — and we refuse to sit it out',
    excerpt: 'Fearlessly shaping Norwich for Jesus’ Return, one street at a time.',
    href: '/missions',
    image: heroImages.worship,
  },
  {
    id: 'visit',
    dateLabel: '18 Apr',
    title: 'We dare you to visit — this is not a comfortable church',
    excerpt: 'Come hungry. Full Gospel. Whole Bible. A people who will not stay quiet.',
    href: '/visit',
    image: heroImages.look,
  },
]
