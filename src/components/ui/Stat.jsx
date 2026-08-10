import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp.js'

// Animated statistic. Counts up when scrolled into view.
export default function Stat({ value, decimals = 0, prefix = '', suffix = '', label, duration = 1700, group = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const n = useCountUp(value, { active: inView, decimals, duration })
  const display = decimals
    ? n.toFixed(decimals)
    : group
      ? Math.round(n).toLocaleString()
      : String(Math.round(n))

  return (
    <div className="stat" ref={ref}>
      <div className="stat__num">
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="stat__label">{label}</div>
    </div>
  )
}
