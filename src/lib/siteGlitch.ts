const GLITCH_CLASS = 'site-glitch'
const BLUE_CLASS = 'site-blue'
const AMEN_FLASH_CLASS = 'site-amen-flash'
const GLITCH_MS = 1100
const AMEN_FLASH_MS = 1100
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
    // Clear any leftover inline overrides from FOUC / prior blue
    root.style.setProperty('--lime', GREEN.lime)
    root.style.setProperty('--lime-foreground', GREEN.limeForeground)
    root.style.setProperty('--accent', GREEN.lime)
    root.style.setProperty('--accent-foreground', GREEN.limeForeground)
    root.style.setProperty('--primary-foreground', GREEN.lime)
    root.style.setProperty('--ring', GREEN.lime)
    root.style.setProperty('--crimson', GREEN.lime)
    root.style.setProperty('--flame', GREEN.lime)
    root.style.setProperty('--destructive', '#000000')
  }
}

export function isSiteBlue(): boolean {
  try {
    return (
      sessionStorage.getItem(BLUE_STORAGE_KEY) === '1' ||
      document.documentElement.classList.contains(BLUE_CLASS)
    )
  } catch {
    return document.documentElement.classList.contains(BLUE_CLASS)
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

export function restoreSiteGreen() {
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
  root.classList.remove(AMEN_FLASH_CLASS)
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
 */
export function triggerAmenFlash(durationMs = AMEN_FLASH_MS) {
  const root = document.documentElement
  root.classList.remove(GLITCH_CLASS)
  root.classList.add(AMEN_FLASH_CLASS)
  // Flip green mid-flash so the bloom lands on green
  window.setTimeout(() => {
    restoreSiteGreen()
  }, Math.min(280, durationMs * 0.25))

  if (amenTimer != null) window.clearTimeout(amenTimer)
  amenTimer = window.setTimeout(() => {
    root.classList.remove(AMEN_FLASH_CLASS)
    amenTimer = null
  }, durationMs)
  return durationMs
}
