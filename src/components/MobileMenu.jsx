import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { SITE, NAV_LINKS } from '../data/site.js'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll.js'

export default function MobileMenu({ open, onClose, onNav, onGetStarted }) {
  const reduce = useReducedMotion()
  useLockBodyScroll(open)

  const panel = {
    hidden: { clipPath: 'inset(0 0 100% 0)' },
    show: {
      clipPath: 'inset(0 0 0% 0)',
      transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1], when: 'beforeChildren', staggerChildren: 0.05 },
    },
    exit: { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  }
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0 },
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mmenu"
          variants={reduce ? undefined : panel}
          initial={reduce ? { opacity: 0 } : 'hidden'}
          animate={reduce ? { opacity: 1 } : 'show'}
          exit={reduce ? { opacity: 0 } : 'exit'}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-cursor-dark
        >
          <div className="mmenu__bar container">
            <span className="mmenu__brand">ProspectBArk!</span>
            <button className="mmenu__close" onClick={onClose} aria-label="Close menu">
              <X size={22} />
              <span>Close</span>
            </button>
          </div>

          <nav className="mmenu__nav container" aria-label="Mobile">
            {[{ label: 'Home', route: '/' }, ...NAV_LINKS].map((link, i) => (
              <motion.button
                key={link.label}
                className="mmenu__link"
                variants={reduce ? undefined : item}
                onClick={() => onNav(link)}
              >
                <span className="mmenu__index">{String(i + 1).padStart(2, '0')}</span>
                <span className="mmenu__label">{link.label}</span>
                <ArrowUpRight className="mmenu__arrow" size={26} />
              </motion.button>
            ))}
          </nav>

          <motion.div className="mmenu__foot container" variants={reduce ? undefined : item}>
            <button className="btn btn--gold btn--block" onClick={onGetStarted}>
              <span>Get Started</span>
            </button>
            <div className="mmenu__contact">
              <a href={SITE.phoneHref}><Phone size={16} /> {SITE.phone}</a>
              <a href={SITE.emailHref}><Mail size={16} /> {SITE.email}</a>
              <a href={SITE.mapsHref} target="_blank" rel="noreferrer"><MapPin size={16} /> {SITE.address.full}</a>
            </div>
            <div className="mmenu__attrs">
              {SITE.attributes.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
