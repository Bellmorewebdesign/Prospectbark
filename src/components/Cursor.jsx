import { useEffect, useRef } from 'react'

// Custom cursor: an instant gold dot + a lagging ring that swells over
// interactive targets. Desktop / fine-pointer only, and never under
// prefers-reduced-motion.
export default function Cursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduce.matches) return

    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    document.body.classList.add('has-custom-cursor')

    const pos = { x: innerWidth / 2, y: innerHeight / 2 }
    const ringPos = { ...pos }
    let raf
    let visible = false

    const interactiveSel = 'a, button, input, textarea, select, label, [data-cursor], summary, [role="button"]'

    const render = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18
      ringPos.y += (pos.y - ringPos.y) * 0.18
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      raf = requestAnimationFrame(render)
    }

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (!visible) {
        visible = true
        ring.style.opacity = '1'
        dot.style.opacity = '1'
      }
    }
    const onOver = (e) => {
      const t = e.target
      if (t.closest && t.closest(interactiveSel)) {
        ring.parentElement.classList.add('is-hover')
        ring.parentElement.classList.toggle('is-hover-dark', Boolean(t.closest('[data-cursor-dark]')))
      }
    }
    const onOut = (e) => {
      const t = e.target
      if (t.closest && t.closest(interactiveSel)) {
        ring.parentElement.classList.remove('is-hover')
      }
    }
    const onDown = () => ring.parentElement.classList.add('is-down')
    const onUp = () => ring.parentElement.classList.remove('is-down')
    const onLeave = () => {
      visible = false
      ring.style.opacity = '0'
      dot.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onOut)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(render)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden="true">
      <div className="cursor" ref={ringRef} style={{ opacity: 0 }}>
        <div className="cursor__ring" />
      </div>
      <div className="cursor__dot" ref={dotRef} style={{ opacity: 0 }} />
    </div>
  )
}
