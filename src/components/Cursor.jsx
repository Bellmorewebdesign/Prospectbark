import { useEffect, useRef } from 'react'

// Custom cursor: an instant gold paw print that stands in for the pointer.
// Desktop / fine-pointer only, and never under prefers-reduced-motion.
export default function Cursor() {
  const pawRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduce.matches) return

    const paw = pawRef.current
    if (!paw) return

    document.body.classList.add('has-custom-cursor')

    const pos = { x: innerWidth / 2, y: innerHeight / 2 }
    let raf
    let visible = false

    const render = () => {
      paw.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      raf = requestAnimationFrame(render)
    }

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (!visible) {
        visible = true
        paw.style.opacity = '1'
      }
    }
    const onLeave = () => {
      visible = false
      paw.style.opacity = '0'
    }
    const onDown = () => paw.classList.add('is-down')
    const onUp = () => paw.classList.remove('is-down')

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(render)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden="true">
      <div className="cursor__paw" ref={pawRef} style={{ opacity: 0 }}>
        <svg viewBox="0 0 24 24" role="presentation" focusable="false">
          <ellipse cx="12" cy="16.6" rx="5.5" ry="4.5" />
          <ellipse cx="5.2" cy="10.6" rx="2.4" ry="3" transform="rotate(-20 5.2 10.6)" />
          <ellipse cx="9.6" cy="6.6" rx="2.3" ry="3.1" transform="rotate(-8 9.6 6.6)" />
          <ellipse cx="14.4" cy="6.6" rx="2.3" ry="3.1" transform="rotate(8 14.4 6.6)" />
          <ellipse cx="18.8" cy="10.6" rx="2.4" ry="3" transform="rotate(20 18.8 10.6)" />
        </svg>
      </div>
    </div>
  )
}
