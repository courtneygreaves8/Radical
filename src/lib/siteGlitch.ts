const GLITCH_CLASS = 'site-glitch'
const BABY_CLASS = 'site-baby'
const AMEN_FLASH_CLASS = 'site-amen-flash'
const GLITCH_MS = 1100
const AMEN_FLASH_MS = 1100
const BABY_STORAGE_KEY = 'radical-site-baby'

/** Main brand — electric blue */
const MAIN = {
  lime: '#0066ff',
  limeForeground: '#ffffff',
} as const

/** After morph click — baby blue */
const BABY = {
  lime: '#9ec9ff',
  limeForeground: '#000000',
} as const

let glitchTimer: number | null = null
let amenTimer: number | null = null

function applyBrand(tone: 'main' | 'baby') {
  const root = document.documentElement
  const c = tone === 'baby' ? BABY : MAIN
  root.style.setProperty('--lime', c.lime)
  root.style.setProperty('--lime-foreground', c.limeForeground)
  root.style.setProperty('--accent', c.lime)
  root.style.setProperty('--accent-foreground', c.limeForeground)
  root.style.setProperty('--primary-foreground', c.lime)
  root.style.setProperty('--ring', c.lime)
  root.style.setProperty('--crimson', c.lime)
  root.style.setProperty('--flame', c.lime)
  root.style.setProperty(
    '--destructive',
    tone === 'baby' ? '#0033aa' : '#0033aa'
  )

  if (tone === 'baby') {
    root.classList.add(BABY_CLASS)
    root.dataset.brand = 'baby'
  } else {
    root.classList.remove(BABY_CLASS)
    root.dataset.brand = 'blue'
  }
}

export function isSiteBaby(): boolean {
  try {
    return (
      sessionStorage.getItem(BABY_STORAGE_KEY) === '1' ||
      document.documentElement.classList.contains(BABY_CLASS)
    )
  } catch {
    return document.documentElement.classList.contains(BABY_CLASS)
  }
}

/** @deprecated use isSiteBaby */
export function isSiteBlue(): boolean {
  return isSiteBaby()
}

/** Restore baby-blue shift if unlocked this session. */
export function restoreSiteBlueIfNeeded() {
  if (typeof document === 'undefined') return
  // Clear legacy green→blue key
  try {
    sessionStorage.removeItem('radical-site-blue')
  } catch {
    /* ignore */
  }
  if (isSiteBaby()) applyBrand('baby')
  else applyBrand('main')
}

function unlockSiteBaby() {
  applyBrand('baby')
  try {
    sessionStorage.setItem(BABY_STORAGE_KEY, '1')
  } catch {
    /* ignore */
  }
}

export function restoreSiteMain() {
  applyBrand('main')
  try {
    sessionStorage.removeItem(BABY_STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

/** @deprecated use restoreSiteMain */
export function restoreSiteGreen() {
  restoreSiteMain()
}

/** Brief full-site glitch — then brand flips to baby blue. */
export function triggerSiteGlitch(durationMs = GLITCH_MS) {
  const root = document.documentElement
  root.classList.remove(AMEN_FLASH_CLASS)
  root.classList.add(GLITCH_CLASS)
  if (glitchTimer != null) window.clearTimeout(glitchTimer)
  glitchTimer = window.setTimeout(() => {
    root.classList.remove(GLITCH_CLASS)
    unlockSiteBaby()
    glitchTimer = null
  }, durationMs)
  return durationMs
}

/** Heavenly flash — then brand returns to main blue. */
export function triggerAmenFlash(durationMs = AMEN_FLASH_MS) {
  const root = document.documentElement
  root.classList.remove(GLITCH_CLASS)
  root.classList.add(AMEN_FLASH_CLASS)
  window.setTimeout(() => {
    restoreSiteMain()
  }, Math.min(280, durationMs * 0.25))

  if (amenTimer != null) window.clearTimeout(amenTimer)
  amenTimer = window.setTimeout(() => {
    root.classList.remove(AMEN_FLASH_CLASS)
    amenTimer = null
  }, durationMs)
  return durationMs
}
