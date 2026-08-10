import { motion, useReducedMotion } from 'framer-motion'

// Scroll-triggered reveal. Uses transform + opacity only (GPU friendly).
export default function Reveal({
  children,
  as = 'div',
  y = 26,
  x = 0,
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.35,
  className,
  style,
  ...rest
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  const hidden = reduce ? { opacity: 0 } : { opacity: 0, y, x }
  const shown = { opacity: 1, y: 0, x: 0 }

  return (
    <MotionTag
      className={className}
      style={style}
      initial={hidden}
      whileInView={shown}
      viewport={{ once, amount }}
      transition={{ duration: reduce ? 0.3 : duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
