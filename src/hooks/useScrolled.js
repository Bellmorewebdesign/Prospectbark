import { useEffect, useState } from 'react'

// Returns true once the page has scrolled past `threshold`px.
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(
    typeof window !== 'undefined' ? window.scrollY > threshold : false
  )
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}
