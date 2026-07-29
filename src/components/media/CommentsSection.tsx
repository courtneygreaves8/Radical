import { useState, type FormEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import type { EpisodeComment } from '@/hooks/useEpisodeSocial'

type CommentsSectionProps = {
  comments: EpisodeComment[]
  onAdd: (author: string, body: string) => void
  onLike: (id: string) => void
}

export function CommentsSection({
  comments,
  onAdd,
  onLike,
}: CommentsSectionProps) {
  const { user } = useAuth()
  const location = useLocation()
  const [body, setBody] = useState('')
  const next = `${location.pathname}${location.search}`

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!user) return
    onAdd(user.name, body)
    setBody('')
  }

  return (
    <section className="border-t border-white/10 pt-10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="type-display text-xl text-white sm:text-2xl">
          Comments
        </h2>
        <p className="font-mono text-xs text-white/40">
          {comments.length} notes
        </p>
      </div>

      {user ? (
        <form
          onSubmit={submit}
          className="mt-6 space-y-3 border border-white/15 bg-white/5 p-4 sm:p-5"
        >
          <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">
            Posting as <span className="text-lime">{user.name}</span>
          </p>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={3}
            placeholder="Share what God is saying… amen, questions, testimonies."
            className="w-full border border-white/15 bg-black/40 px-3 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-lime"
          />
          <Button type="submit" variant="lime" offset disabled={!body.trim()}>
            Post
            <Send className="size-4" />
          </Button>
        </form>
      ) : (
        <div className="mt-6 border border-lime/40 bg-lime/10 p-5 sm:p-6">
          <p className="type-display text-lg text-white">Join the conversation</p>
          <p className="mt-2 text-sm text-white/70">
            Create a free account to comment and react on episodes.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="lime" offset asChild>
              <Link to={`/sign-up?next=${encodeURIComponent(next)}`}>
                Create account
              </Link>
            </Button>
            <Button
              variant="paper"
              className="border border-white/20 bg-white/10 text-white hover:bg-white hover:text-ink"
              asChild
            >
              <Link to={`/sign-in?next=${encodeURIComponent(next)}`}>
                Sign in
              </Link>
            </Button>
          </div>
        </div>
      )}

      <ul className="mt-8 space-y-4">
        {comments.map((c) => (
          <li
            key={c.id}
            className="border border-white/10 bg-white/[0.03] p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold text-white">{c.author}</p>
              <time className="font-mono text-[10px] uppercase tracking-wider text-white/35">
                {new Date(c.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </time>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white/75">{c.body}</p>
            <button
              type="button"
              onClick={() => onLike(c.id)}
              className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/45 transition hover:text-lime"
            >
              <Heart className="size-3.5" />
              {c.likes}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
