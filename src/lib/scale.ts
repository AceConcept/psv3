/**
 * Document rem scaler — waypoint / Endfield contain style.
 * Design artboard: 1920×897 (120 × 56.0625 rem @ 16px).
 * Below FLUID_BREAKPOINT_PX: disable contain-scale and use fluid reflow.
 */

export const DESIGN_ROOT_PX = 16
export const DESIGN_REM_W = 120
export const DESIGN_REM_H = 56.0625
export const CANVAS_W = DESIGN_REM_W * DESIGN_ROOT_PX // 1920
export const CANVAS_H = DESIGN_REM_H * DESIGN_ROOT_PX // 897

/** Match CSS: fluid layout at max-width 1279px */
export const FLUID_BREAKPOINT_PX = 1280

const SCALE_ATTR = 'data-luna-scale'
const SCALED_CLASS = 'luna-document-scaled'
const FLUID_CLASS = 'luna-fluid'

export function getViewportSize() {
  // clientWidth tracks the CSS layout viewport (stays in sync with media queries)
  const width = document.documentElement.clientWidth || window.innerWidth
  const height = document.documentElement.clientHeight || window.innerHeight
  return { width, height }
}

/** Fit full artboard inside viewport (letterbox allowed). */
export function getContainScale(width: number, height: number) {
  return Math.min(width / CANVAS_W, height / CANVAS_H)
}

export function applyDocumentScale(
  scale: number,
  viewport = getViewportSize(),
) {
  const rootPx = DESIGN_ROOT_PX * scale
  const html = document.documentElement
  html.style.fontSize = `${rootPx}px`
  html.style.scrollbarGutter = 'stable'
  html.setAttribute(SCALE_ATTR, String(scale))
  html.classList.add(SCALED_CLASS)
  html.classList.remove(FLUID_CLASS)

  const body = document.body
  body.style.width = `${viewport.width}px`
  body.style.minWidth = `${viewport.width}px`
  body.style.height = `${viewport.height}px`
  body.style.minHeight = `${viewport.height}px`
  body.style.margin = '0'
  body.style.overflow = 'hidden'
}

export function applyFluidDocument(viewport = getViewportSize()) {
  const html = document.documentElement
  html.style.fontSize = `${DESIGN_ROOT_PX}px`
  html.style.scrollbarGutter = ''
  html.removeAttribute(SCALE_ATTR)
  html.classList.remove(SCALED_CLASS)
  html.classList.add(FLUID_CLASS)

  const body = document.body
  body.style.width = `${viewport.width}px`
  body.style.minWidth = `${viewport.width}px`
  body.style.height = `${viewport.height}px`
  body.style.minHeight = `${viewport.height}px`
  body.style.margin = '0'
  body.style.overflow = 'hidden'
}

export function resetDocumentScale() {
  const html = document.documentElement
  html.style.fontSize = ''
  html.style.scrollbarGutter = ''
  html.removeAttribute(SCALE_ATTR)
  html.classList.remove(SCALED_CLASS)
  html.classList.remove(FLUID_CLASS)

  const body = document.body
  body.style.width = ''
  body.style.minWidth = ''
  body.style.height = ''
  body.style.minHeight = ''
  body.style.margin = ''
  body.style.overflow = ''
}

/** Prefer CSS media width so fluid gate stays in sync under mobile emulation. */
export function isFluidViewport() {
  return window.matchMedia(`(max-width: ${FLUID_BREAKPOINT_PX - 1}px)`).matches
}

export function bindDocumentScale() {
  const fluidQuery = window.matchMedia(
    `(max-width: ${FLUID_BREAKPOINT_PX - 1}px)`,
  )

  const update = () => {
    const viewport = getViewportSize()
    if (viewport.width <= 0 || viewport.height <= 0) return
    if (fluidQuery.matches) {
      applyFluidDocument(viewport)
      return
    }
    applyDocumentScale(getContainScale(viewport.width, viewport.height), viewport)
  }

  update()
  let frame = 0
  const onResize = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(update)
  }
  window.addEventListener('resize', onResize)
  // matchMedia can diverge from innerWidth under device emulation
  if (typeof fluidQuery.addEventListener === 'function') {
    fluidQuery.addEventListener('change', onResize)
  } else {
    fluidQuery.addListener(onResize)
  }
  return () => {
    window.removeEventListener('resize', onResize)
    if (typeof fluidQuery.removeEventListener === 'function') {
      fluidQuery.removeEventListener('change', onResize)
    } else {
      fluidQuery.removeListener(onResize)
    }
    cancelAnimationFrame(frame)
    resetDocumentScale()
  }
}
