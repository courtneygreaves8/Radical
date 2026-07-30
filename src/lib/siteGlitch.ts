const GLITCH_CLASS = 'site-glitch'
const GLITCH_MS = 1100

let glitchTimer: number | null = null

/** Brief full-site glitch — looks broken, then clears. */
export function triggerSiteGlitch(durationMs = GLITCH_MS) {
  const root = document.documentElement
  root.classList.add(GLITCH_CLASS)
  if (glitchTimer != null) window.clearTimeout(glitchTimer)
  glitchTimer = window.setTimeout(() => {
    root.classList.remove(GLITCH_CLASS)
    glitchTimer = null
  }, durationMs)
  return durationMs
}
