import { useEffect, useState, useCallback } from 'react'

// Minimal hash router. GitHub Pages safe, with no server rewrites or refresh 404s.
// Routes are the part after `#`, e.g. "#/", "#/contact".
// In-page section anchors are handled separately via scrollToSection().

function parse() {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  return raw.startsWith('/') ? raw : '/' + raw
}

export function useHashRoute() {
  const [path, setPath] = useState(parse)

  useEffect(() => {
    const onHash = () => setPath(parse())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = useCallback((to) => {
    const next = to.startsWith('/') ? to : '/' + to
    if (parse() === next) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    window.location.hash = '#' + next
  }, [])

  return { path, navigate }
}

// Scroll to an in-page section, landing its top just below the fixed navbar.
//
// The offset is measured from the navbar itself, so it stays right as the bar
// changes height (desktop, phone, safe-area padding). Content above the section
// can still change height after the scroll starts (a lazy image decoding, a web
// font swapping in), which would leave the browser heading for a stale
// position, so the scroll re-aims whenever the page's height moves the target.
// That stops when a smooth scroll finishes, when the reader scrolls, taps or
// types, or when the route changes.
//
// `instant` jumps without animating. Reduced-motion readers always get that.
const STOP_ON = ['wheel', 'touchstart', 'keydown', 'pointerdown', 'hashchange']
let stopTracking = null

export function scrollToSection(id, { instant = false } = {}) {
  const el = document.getElementById(id)
  if (!el) return false
  stopTracking?.()

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // 'instant' rather than 'auto': html has scroll-behavior: smooth, and 'auto'
  // defers to it.
  const behavior = instant || reduce ? 'instant' : 'smooth'
  let aimedAt = null
  const aim = () => {
    if (!el.isConnected) return stop()
    const nav = document.querySelector('.nav')?.getBoundingClientRect().height || 0
    const top = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - nav))
    if (aimedAt !== null && Math.abs(top - aimedAt) <= 1) return undefined
    aimedAt = top
    window.scrollTo({ top, behavior })
    return undefined
  }

  const resize = new ResizeObserver(aim)
  const stop = () => {
    resize.disconnect()
    STOP_ON.forEach((type) => window.removeEventListener(type, stop))
    window.removeEventListener('scrollend', stop)
    if (stopTracking === stop) stopTracking = null
  }
  stopTracking = stop

  aim()
  resize.observe(document.documentElement)
  STOP_ON.forEach((type) => window.addEventListener(type, stop, { passive: true }))
  if (behavior === 'smooth') window.addEventListener('scrollend', stop)
  return true
}
