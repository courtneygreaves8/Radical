import { ArrowUpRight } from 'lucide-react'

import { SiteLink } from '@/components/shared/SiteLink'
import { homeBlogPosts } from '@/lib/blogs'

/**
 * Journal-style blog band — three featured posts under podcasts.
 */
export function BlogJournalBand() {
  const posts = homeBlogPosts.slice(0, 3)

  return (
    <section
      aria-label="Blog"
      className="relative overflow-x-clip bg-transparent py-10 sm:py-14 lg:py-16"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        <div className="lg:ml-auto lg:w-[88%]">
          <h2 className="text-right font-sans text-[clamp(2.75rem,12vw,7.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em] text-[var(--v3-ink)]">
            Blog
          </h2>

          <ul className="mt-8 border-t border-[var(--v3-ink)] sm:mt-10 lg:mt-12">
            {posts.map((post) => (
              <li key={post.id} className="border-b border-[var(--v3-ink)]">
                <SiteLink
                  to={post.href}
                  className="group grid grid-cols-1 items-center gap-4 py-5 sm:grid-cols-[4.5rem_minmax(0,1fr)_minmax(9rem,38%)] sm:gap-6 sm:py-6 lg:grid-cols-[5.5rem_minmax(0,1fr)_minmax(12rem,42%)] lg:gap-10 lg:py-7"
                >
                  <time className="text-sm font-medium text-[var(--v3-ink)] sm:pt-1 sm:text-[15px]">
                    {post.dateLabel}
                  </time>

                  <div className="min-w-0 sm:pr-4">
                    <p className="font-sans text-[clamp(1.05rem,2.4vw,1.65rem)] font-bold leading-snug tracking-tight text-[var(--v3-ink)] transition group-hover:text-[var(--v3-terra)]">
                      {post.title}
                    </p>
                    <p className="mt-1.5 line-clamp-2 text-sm text-[var(--v3-ink)]/50 sm:mt-2">
                      {post.excerpt}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--v3-terra)] opacity-0 transition group-hover:opacity-100 max-sm:opacity-100">
                      Read
                      <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.25rem] sm:aspect-[5/3] sm:rounded-[1.5rem] lg:rounded-[1.75rem]">
                    <img
                      src={post.image}
                      alt=""
                      className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      draggable={false}
                      decoding="async"
                    />
                  </div>
                </SiteLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
