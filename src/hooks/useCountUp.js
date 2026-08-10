import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// Animate a number from 0 → target once `active` becomes true.
export function useCountUp(target, { duration = 1600, active = false, decimals = 0 } = {}) {
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current) return
    started.current = true

    if (reduce) {
      setValue(target)
      return
    }
    let raf
    const start = performance.now()
    const ease = (t) => 1 - Math.pow(1 - t, 3) // easeOutCubic
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setValue(target * ease(p))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setValue(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration, reduce])

  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}
