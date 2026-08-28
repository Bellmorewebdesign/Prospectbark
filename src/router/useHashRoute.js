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

// Smoothly scroll to an in-page section, accounting for the fixed navbar.
export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const top = el.getBoundingClientRect().top + window.scrollY - 90
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
}
