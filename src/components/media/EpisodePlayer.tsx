import { useMemo, useState } from 'react'
import { Pause, Play, Volume2 } from 'lucide-react'
import { motion } from 'framer-motion'

type EpisodePlayerProps = {
  title: string
  cover: string
  duration: string
}

/** Immersive visual player — wires to real audio/YouTube when URLs land in CMS. */
export function EpisodePlayer({ title, cover, duration }: EpisodePlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(12)

  const bars = useMemo(
    () => Array.from({ length: 48 }, (_, i) => 20 + ((i * 37) % 60)),
    []
  )

  return (
    <div className="overflow-hidden border border-white/15 bg-black">
      <div className="photo-grain relative aspect-video overflow-hidden sm:aspect-[21/9]">
        <img src={cover} alt="" className="photo-bw size-full object-cover opacity-70" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/40 to-black/20" />

        <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center gap-6 p-6">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="flex size-20 items-center justify-center bg-lime text-ink transition hover:scale-105 offset-shadow-ink sm:size-24"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <Pause className="size-8 fill-current" />
            ) : (
              <Play className="size-8 fill-current" />
            )}
          </button>

          <div className="flex h-12 items-end gap-0.5 opacity-80">
            {bars.map((h, i) => (
              <motion.span
                key={i}
                className="w-1 bg-lime sm:w-1.5"
                animate={
                  playing
                    ? { height: [`${h * 0.4}%`, `${h}%`, `${h * 0.55}%`] }
                    : { height: `${h * 0.35}%` }
                }
                transition={
                  playing
                    ? {
                        duration: 0.45 + (i % 5) * 0.08,
                        repeat: Infinity,
                        repeatType: 'mirror',
                      }
                    : { duration: 0.2 }
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3 border-t border-white/10 bg-[#0f0f0f] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-sm font-bold text-white">{title}</p>
          <span className="shrink-0 font-mono text-xs text-white/40">
            {duration}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="text-lime"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <Pause className="size-5 fill-current" />
            ) : (
              <Play className="size-5 fill-current" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="h-1 flex-1 cursor-pointer appearance-none bg-white/20 accent-lime"
          />
          <Volume2 className="size-4 text-white/40" />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-wider text-white/30">
          Demo player — connect Spotify / YouTube / audio file in Sanity
        </p>
      </div>
    </div>
  )
}
