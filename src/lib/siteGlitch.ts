const GLITCH_CLASS = 'site-glitch'
const BLUE_CLASS = 'site-blue'
const GLITCH_MS = 1100
const BLUE_STORAGE_KEY = 'radical-site-blue'

const GREEN = {
  lime: '#00e05a',
  limeForeground: '#000000',
} as const

const BLUE = {
  lime: '#0066ff',
  limeForeground: '#ffffff',
} as const

let glitchTimer: number | null = null

function applyBrand(tone: 'green' | 'blue') {
  const root = document.documentElement
  const c = tone === 'blue' ? BLUE : GREEN
  root.style.setProperty('--lime', c.lime)
  root.style.setProperty('--lime-foreground', c.limeForeground)
  root.style.setProperty('--accent', c.lime)
  root.style.setProperty('--accent-foreground', c.limeForeground)
  root.style.setProperty('--primary-foreground', c.lime)
  root.style.setProperty('--ring', c.lime)
  /* Green-only / blue-only — secondary tokens track primary */
  root.style.setProperty('--crimson', c.lime)
  root.style.setProperty('--flame', c.lime)
  root.style.setProperty('--destructive', tone === 'blue' ? '#0033aa' : '#000000')

  if (tone === 'blue') {
    root.classList.add(BLUE_CLASS)
    root.dataset.brand = 'blue'
  } else {
    root.classList.remove(BLUE_CLASS)
    delete root.dataset.brand
  }
}

export function isSiteBlue(): boolean {
  try {
    return sessionStorage.getItem(BLUE_STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

/** Restore blue shift if unlocked this session (call early on boot). */
export function restoreSiteBlueIfNeeded() {
  if (typeof document === 'undefined') return
  if (isSiteBlue()) applyBrand('blue')
}

function unlockSiteBlue() {
  applyBrand('blue')
  try {
    sessionStorage.setItem(BLUE_STORAGE_KEY, '1')
  } catch {
    /* ignore */
  }
}

/** Brief full-site glitch — then brand flips to blue. */
export function triggerSiteGlitch(durationMs = GLITCH_MS) {
  const root = document.documentElement
  root.classList.add(GLITCH_CLASS)
  if (glitchTimer != null) window.clearTimeout(glitchTimer)
  glitchTimer = window.setTimeout(() => {
    root.classList.remove(GLITCH_CLASS)
    unlockSiteBlue()
    glitchTimer = null
  }, durationMs)
  return durationMs
}
