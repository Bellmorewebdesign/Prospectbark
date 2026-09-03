import { motion, useReducedMotion } from 'framer-motion'

export default function MotionOrnament({ tone = 'teal' }) {
  const reduce = useReducedMotion()

  return (
    <motion.svg
      className={`motion-ornament motion-ornament--${tone}`}
      viewBox="0 0 320 34"
      role="presentation"
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.path
        d="M8 17 H139 M181 17 H312"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 9"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
      />
      <motion.path
        d="M160 5 L172 17 L160 29 L148 17 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={reduce ? false : { pathLength: 0, scale: 0.6, rotate: -45 }}
        whileInView={{ pathLength: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '160px 17px' }}
      />
      <circle cx="160" cy="17" r="3" fill="currentColor" />
    </motion.svg>
  )
}
