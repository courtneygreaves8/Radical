const INVERT_CLASS = 'site-inverted'

export function toggleSiteInvert() {
  document.documentElement.classList.toggle(INVERT_CLASS)
}

export function isSiteInverted() {
  return document.documentElement.classList.contains(INVERT_CLASS)
}
