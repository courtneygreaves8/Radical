import { useCallback, useEffect, useState } from 'react'

export type ReactionKey = 'amen' | 'fire' | 'heart' | 'pray'

export type EpisodeComment = {
  id: string
  author: string
  body: string
  createdAt: string
  likes: number
}

type SocialState = {
  reactions: Record<ReactionKey, number>
  myReactions: ReactionKey[]
  comments: EpisodeComment[]
}

const REACTION_DEFAULTS: Record<ReactionKey, number> = {
  amen: 24,
  fire: 18,
  heart: 41,
  pray: 12,
}

const SEED_COMMENTS: EpisodeComment[] = [
  {
    id: 'c1',
    author: 'Sarah M.',
    body: 'This wrecked me in the best way. Jesus is so good.',
    createdAt: '2026-07-21T10:00:00Z',
    likes: 8,
  },
  {
    id: 'c2',
    author: 'James T.',
    body: 'Playing this on the way to outreach. Fire.',
    createdAt: '2026-07-21T14:30:00Z',
    likes: 5,
  },
]

function storageKey(episodeId: string) {
  return `radical-podcast-social:${episodeId}`
}

function load(episodeId: string): SocialState {
  try {
    const raw = localStorage.getItem(storageKey(episodeId))
    if (raw) return JSON.parse(raw) as SocialState
  } catch {
    /* ignore */
  }
  return {
    reactions: { ...REACTION_DEFAULTS },
    myReactions: [],
    comments: SEED_COMMENTS.map((c) => ({ ...c, id: `${episodeId}-${c.id}` })),
  }
}

function save(episodeId: string, state: SocialState) {
  try {
    localStorage.setItem(storageKey(episodeId), JSON.stringify(state))
  } catch {
    /* ignore */
  }
}

export function useEpisodeSocial(episodeId: string) {
  const [state, setState] = useState<SocialState>(() => load(episodeId))

  useEffect(() => {
    setState(load(episodeId))
  }, [episodeId])

  useEffect(() => {
    // Preferences cookies only — skip persist until consented
    try {
      const raw = localStorage.getItem('radical-cookie-consent')
      if (!raw) return
      const parsed = JSON.parse(raw) as { preferences?: boolean }
      if (!parsed.preferences) return
    } catch {
      return
    }
    save(episodeId, state)
  }, [episodeId, state])

  const toggleReaction = useCallback((key: ReactionKey) => {
    setState((prev) => {
      const active = prev.myReactions.includes(key)
      const myReactions = active
        ? prev.myReactions.filter((k) => k !== key)
        : [...prev.myReactions, key]
      return {
        ...prev,
        myReactions,
        reactions: {
          ...prev.reactions,
          [key]: Math.max(0, prev.reactions[key] + (active ? -1 : 1)),
        },
      }
    })
  }, [])

  const addComment = useCallback((author: string, body: string) => {
    const trimmed = body.trim()
    if (!trimmed) return
    setState((prev) => ({
      ...prev,
      comments: [
        {
          id: `${Date.now()}`,
          author: author.trim() || 'Anonymous',
          body: trimmed,
          createdAt: new Date().toISOString(),
          likes: 0,
        },
        ...prev.comments,
      ],
    }))
  }, [])

  const likeComment = useCallback((commentId: string) => {
    setState((prev) => ({
      ...prev,
      comments: prev.comments.map((c) =>
        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
      ),
    }))
  }, [])

  return { ...state, toggleReaction, addComment, likeComment }
}
