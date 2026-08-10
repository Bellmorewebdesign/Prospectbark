import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CalendarCheck, Sparkles, PawPrint, Check, X } from 'lucide-react'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll.js'

const ICONS = {
  calendar: CalendarCheck,
  sparkles: Sparkles,
  paw: PawPrint,
  success: Check,
}

export default function MockupModal({ payload, onClose }) {
  const open = Boolean(payload)
  const reduce = useReducedMotion()
  const closeRef = useRef(null)
  const lastFocused = useRef(null)

  useLockBodyScroll(open)

  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement
      // focus the dialog's close control for keyboard users
      const t = setTimeout(() => closeRef.current?.focus(), 40)
      return () => clearTimeout(t)
    } else if (lastFocused.current) {
      lastFocused.current.focus?.()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const dialog = closeRef.current?.closest('[role="dialog"]')
        const focusable = dialog?.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const Icon = payload ? ICONS[payload.icon] || PawPrint : PawPrint

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mockup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            className="mockup-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mockup-title"
            aria-describedby="mockup-body"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.96 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="mockup-close"
              onClick={onClose}
              ref={closeRef}
              aria-label="Close dialog"
            >
              <X size={18} strokeWidth={2.2} />
            </button>

            <span className={`mockup-icon${payload?.icon === 'success' ? ' is-success' : ''}`}>
              <motion.span
                initial={reduce ? false : { scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 0.08 }}
                style={{ display: 'inline-flex' }}
              >
                <Icon size={26} strokeWidth={2} />
              </motion.span>
            </span>

            {payload?.tag && <span className="mockup-tag">{payload.tag}</span>}
            <h3 id="mockup-title" className="mockup-title">
              {payload?.title}
            </h3>
            <p id="mockup-body" className="mockup-body">
              {payload?.body}
            </p>

            <button className="btn btn--block" onClick={onClose}>
              <span>Got it</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
