import { useEffect } from 'react'

// Lock body scroll (mobile menu / modal) without layout shift from the
// disappearing scrollbar.
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return
    const { body, documentElement: html } = document
    const scrollBarComp = window.innerWidth - html.clientWidth
    const prevOverflow = body.style.overflow
    const prevPad = body.style.paddingRight
    body.style.overflow = 'hidden'
    if (scrollBarComp > 0) body.style.paddingRight = `${scrollBarComp}px`
    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPad
    }
  }, [locked])
}
