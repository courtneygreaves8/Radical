const GLITCH_CLASS = 'site-glitch'
const BLUE_CLASS = 'site-blue'
const AMEN_FLASH_CLASS = 'site-amen-flash'
const GLITCH_MS = 1100
const AMEN_FLASH_MS = 900
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
let amenTimer: number | null = null

function applyBrand(tone: 'green' | 'blue') {
  const root = document.documentElement
  const c = tone === 'blue' ? BLUE : GREEN
  root.style.setProperty('--lime', c.lime)
  root.style.setProperty('--lime-foreground', c.limeForeground)
  root.style.setProperty('--accent', c.lime)
  root.style.setProperty('--accent-foreground', c.limeForeground)
  root.style.setProperty('--primary-foreground', c.lime)
  root.style.setProperty('--ring', c.lime)
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

function restoreSiteGreen() {
  applyBrand('green')
  try {
    sessionStorage.removeItem(BLUE_STORAGE_KEY)
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

/**
 * Heavy heavenly flash / glow — then brand returns to green.
 * Returns flash duration so callers can sync UI.
 */
export function triggerAmenFlash(durationMs = AMEN_FLASH_MS) {
  const root = document.documentElement
  root.classList.add(AMEN_FLASH_CLASS)
  if (amenTimer != null) window.clearTimeout(amenTimer)
  amenTimer = window.setTimeout(() => {
    root.classList.remove(AMEN_FLASH_CLASS)
    restoreSiteGreen()
    amenTimer = null
  }, durationMs)
  return durationMs
}
