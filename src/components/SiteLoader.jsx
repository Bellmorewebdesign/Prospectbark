import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import logo from '../assets/logo.png'

export default function SiteLoader() {
  const [visible, setVisible] = useState(true)
  const reduce = useReducedMotion()

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), reduce ? 250 : 1450)
    return () => window.clearTimeout(timer)
  }, [reduce])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="site-loader"
          initial={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: reduce ? 0.2 : 0.68, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <motion.div
            className="site-loader__mark"
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={logo} alt="" width="160" height="78" />
            <svg className="site-loader__line" viewBox="0 0 300 30" role="presentation">
              <motion.path
                d="M8 15 H132 M168 15 H292"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="1 9"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.18, ease: 'easeInOut' }}
              />
              <motion.path
                d="M150 5 L160 15 L150 25 L140 15 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                initial={reduce ? false : { pathLength: 0, rotate: -45 }}
                animate={{ pathLength: 1, rotate: 0 }}
                transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: '150px 15px' }}
              />
            </svg>
            <span>Brooklyn &amp; Manhattan pet care</span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
