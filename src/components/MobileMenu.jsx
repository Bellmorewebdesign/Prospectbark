import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Instagram, MapPin, Phone, X } from 'lucide-react'
import { NAV_LINKS, SITE } from '../data/site.js'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll.js'

export default function MobileMenu({ open, onClose, onNav, onGetStarted }) {
  const reduce = useReducedMotion()
  const closeRef = useRef(null)
  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="mmenu"
          initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
          exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-cursor-dark
        >
          <div className="mmenu__top shell">
            <span>Brooklyn &amp; Manhattan pet care since 2010</span>
            <button ref={closeRef} className="mmenu__close" onClick={onClose} aria-label="Close menu">
              <X size={20} /> Close
            </button>
          </div>

          <nav className="mmenu__links shell" aria-label="Mobile navigation">
            {[{ label: 'Home', route: '/' }, ...NAV_LINKS].map((link, index) => (
              <motion.button
                key={link.label}
                className="mmenu__link"
                onClick={() => onNav(link)}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.035 }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{link.label}</strong>
                <ArrowUpRight size={24} />
              </motion.button>
            ))}
          </nav>

          <div className="mmenu__bottom shell">
            <button className="button button--gold" onClick={onGetStarted}>Find the right care</button>
            <div className="mmenu__contact">
              <a href={SITE.phoneHref}><Phone size={16} /> {SITE.phone}</a>
              <a href={SITE.mapsHref} target="_blank" rel="noreferrer"><MapPin size={16} /> {SITE.address.street}</a>
              <a href={SITE.social.instagram.href} target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram</a>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
