const GLITCH_CLASS = 'site-glitch'
const DEEP_CLASS = 'site-deep'
const AMEN_FLASH_CLASS = 'site-amen-flash'
const GLITCH_MS = 1100
const AMEN_FLASH_MS = 1100
const DEEP_STORAGE_KEY = 'radical-site-deep'

/** Inline props the glitch easter egg may set — cleared for primary so globals.css wins */
const BRAND_PROPS = [
  '--v3-terra',
  '--lime',
  '--lime-foreground',
  '--accent',
  '--accent-foreground',
  '--primary-foreground',
  '--ring',
  '--crimson',
  '--flame',
  '--destructive',
] as const

/** After morph click — dark electric blue (easter egg only) */
const DEEP = {
  lime: '#0066ff',
  limeForeground: '#ffffff',
} as const

let glitchTimer: number | null = null
let amenTimer: number | null = null

function applyBrand(tone: 'primary' | 'deep') {
  const root = document.documentElement

  if (tone === 'primary') {
    /* Clear inline overrides — editorial cream/terra lives in globals.css :root */
    for (const prop of BRAND_PROPS) {
      root.style.removeProperty(prop)
    }
    root.classList.remove('site-baby', DEEP_CLASS)
    root.dataset.brand = 'editorial'
    return
  }

  const c = DEEP
  root.style.setProperty('--v3-terra', c.lime)
  root.style.setProperty('--lime', c.lime)
  root.style.setProperty('--lime-foreground', c.limeForeground)
  root.style.setProperty('--accent', c.lime)
  root.style.setProperty('--accent-foreground', c.limeForeground)
  root.style.setProperty('--primary-foreground', c.lime)
  root.style.setProperty('--ring', c.lime)
  root.style.setProperty('--crimson', c.lime)
  root.style.setProperty('--flame', c.lime)
  root.style.setProperty('--destructive', '#0033aa')

  root.classList.remove('site-baby')
  root.classList.add(DEEP_CLASS)
  root.dataset.brand = 'deep'
}

export function isSiteDeep(): boolean {
  try {
    return (
      sessionStorage.getItem(DEEP_STORAGE_KEY) === '1' ||
      document.documentElement.classList.contains(DEEP_CLASS)
    )
  } catch {
    return document.documentElement.classList.contains(DEEP_CLASS)
  }
}

/** @deprecated use isSiteDeep */
export function isSiteBaby(): boolean {
  return isSiteDeep()
}

/** @deprecated use isSiteDeep */
export function isSiteBlue(): boolean {
  return isSiteDeep()
}

/** Restore deep-blue shift if unlocked this session; else editorial brand from CSS. */
export function restoreSiteBlueIfNeeded() {
  if (typeof document === 'undefined') return
  try {
    sessionStorage.removeItem('radical-site-blue')
    sessionStorage.removeItem('radical-site-baby')
  } catch {
    /* ignore */
  }
  if (isSiteDeep()) applyBrand('deep')
  else applyBrand('primary')
}

function unlockSiteDeep() {
  applyBrand('deep')
  try {
    sessionStorage.setItem(DEEP_STORAGE_KEY, '1')
  } catch {
    /* ignore */
  }
}

export function restoreSiteMain() {
  applyBrand('primary')
  try {
    sessionStorage.removeItem(DEEP_STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

/** @deprecated use restoreSiteMain */
export function restoreSiteGreen() {
  restoreSiteMain()
}

/** Brief full-site glitch — then brand flips to dark blue. */
export function triggerSiteGlitch(durationMs = GLITCH_MS) {
  const root = document.documentElement
  root.classList.remove(AMEN_FLASH_CLASS)
  root.classList.add(GLITCH_CLASS)
  if (glitchTimer != null) window.clearTimeout(glitchTimer)
  glitchTimer = window.setTimeout(() => {
    root.classList.remove(GLITCH_CLASS)
    unlockSiteDeep()
    glitchTimer = null
  }, durationMs)
  return durationMs
}

/** Heavenly flash — then brand returns to editorial primary. */
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
