import { Link, Navigate, useParams } from 'react-router-dom'

import { CommentsSection } from '@/components/media/CommentsSection'
import { comingSoonKindFromCategory } from '@/components/media/ComingSoonThumb'
import { EpisodePlayer } from '@/components/media/EpisodePlayer'
import { MediaCard } from '@/components/media/MediaCard'
import { ReactionBar } from '@/components/media/ReactionBar'
import { useEpisodeSocial } from '@/hooks/useEpisodeSocial'
import { episodesForShow, getEpisode } from '@/lib/podcasts'

export function PodcastEpisodePage() {
  const { showSlug = '', episodeSlug = '' } = useParams()
  const data = getEpisode(showSlug, episodeSlug)
  if (!data) return <Navigate to="/podcasts" replace />

  const { show, episode } = data
  const social = useEpisodeSocial(episode.id)
  const more = episodesForShow(show.id).filter((e) => e.id !== episode.id)

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-8 sm:py-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime">
        <Link to={`/podcasts/${show.slug}`} className="hover:underline">
          {show.title}
        </Link>
        <span className="text-white/30"> / Episode</span>
      </p>

      <h1 className="type-display mt-3 text-3xl text-white sm:text-5xl">
        {episode.title}
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
        {episode.synopsis}
      </p>
      <div className="mt-3 flex flex-wrap gap-3 font-mono text-xs text-white/40">
        <span>{episode.duration}</span>
        <span>·</span>
        <span>{episode.publishedAt}</span>
        {episode.tags?.map((t) => (
          <span
            key={t}
            className="border border-white/15 px-2 py-0.5 text-white/55"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-8">
        <EpisodePlayer
          title={episode.title}
          cover={episode.cover}
          duration={episode.duration}
          kind={comingSoonKindFromCategory(show.category)}
        />
      </div>

      <div className="mt-8">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
          React
        </p>
        <ReactionBar
          reactions={social.reactions}
          myReactions={social.myReactions}
          onToggle={social.toggleReaction}
        />
      </div>

      <div className="mt-12">
        <CommentsSection
          comments={social.comments}
          onAdd={social.addComment}
          onLike={social.likeComment}
        />
      </div>

      {more.length > 0 ? (
        <section className="mt-16 border-t border-white/10 pt-10">
          <h2 className="type-display text-xl text-white">More in this series</h2>
          <div className="media-row-scroll mt-6 flex gap-4 overflow-x-auto pb-2">
            {more.map((ep) => (
              <MediaCard key={ep.id} episode={ep} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
