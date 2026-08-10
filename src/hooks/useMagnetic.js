import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// Magnetic hover: element eases toward the pointer. Desktop / fine-pointer only.
export function useMagnetic(strength = 0.32) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduce) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return

    let raf
    const state = { x: 0, y: 0, tx: 0, ty: 0 }
    const render = () => {
      state.x += (state.tx - state.x) * 0.18
      state.y += (state.ty - state.y) * 0.18
      el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`
      if (Math.abs(state.tx - state.x) > 0.1 || Math.abs(state.ty - state.y) > 0.1) {
        raf = requestAnimationFrame(render)
      } else {
        el.style.transform = `translate3d(${state.tx}px, ${state.ty}px, 0)`
        raf = null
      }
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render)
    }
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      state.tx = (e.clientX - (r.left + r.width / 2)) * strength
      state.ty = (e.clientY - (r.top + r.height / 2)) * strength
      kick()
    }
    const onLeave = () => {
      state.tx = 0
      state.ty = 0
      kick()
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
      el.style.transform = ''
    }
  }, [strength, reduce])

  return ref
}
