import { motion, useReducedMotion } from 'framer-motion'
import { Instagram, Facebook, Phone, Mail, MapPin, ArrowUp, Clock } from 'lucide-react'
import { SITE, NAV_LINKS } from '../data/site.js'

const YEAR = new Date().getFullYear()

export default function Footer({ onNav }) {
  const reduce = useReducedMotion()
  const wordVar = {
    hidden: reduce ? { opacity: 0 } : { y: '110%' },
    show: { y: '0%', opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <footer className="footer" data-cursor-dark>
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__mark display">ProspectBArk!</span>
            <p className="footer__statement">
              Brooklyn pet care built on knowing your animal by name. Daycare, walks,
              and sitting — the good life, on repeat.
            </p>
            <div className="footer__social">
              <a href={SITE.social.instagram.href} target="_blank" rel="noreferrer" aria-label="ProspectBArk! on Instagram" data-cursor>
                <Instagram size={19} />
              </a>
              <a href={SITE.social.facebook.href} target="_blank" rel="noreferrer" aria-label="ProspectBArk! on Facebook" data-cursor>
                <Facebook size={19} />
              </a>
            </div>
            <div className="footer__attrs">
              {SITE.attributes.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
          </div>

          <nav className="footer__col" aria-label="Explore">
            <h4 className="footer__h">Explore</h4>
            <button onClick={() => onNav({ route: '/' })}>Home</button>
            {NAV_LINKS.map((l) => (
              <button key={l.label} onClick={() => onNav(l)}>{l.label}</button>
            ))}
          </nav>

          <nav className="footer__col" aria-label="Services">
            <h4 className="footer__h">Services</h4>
            <button onClick={() => onNav({ target: 'services' })}>Dog Daycare</button>
            <button onClick={() => onNav({ target: 'services' })}>Dog Walking</button>
            <button onClick={() => onNav({ target: 'services' })}>Pet Sitting</button>
          </nav>

          <div className="footer__col footer__visit">
            <h4 className="footer__h">Visit</h4>
            <a href={SITE.mapsHref} target="_blank" rel="noreferrer" data-cursor>
              <MapPin size={16} /> <span>{SITE.address.street}<br />{SITE.address.city}, {SITE.address.region} {SITE.address.zip}</span>
            </a>
            <a href={SITE.phoneHref} data-cursor><Phone size={16} /> {SITE.phone}</a>
            <a href={SITE.emailHref} data-cursor><Mail size={16} /> {SITE.email}</a>
            <span className="footer__hours"><Clock size={16} /> {SITE.hours}</span>
          </div>
        </div>

        <motion.div
          className="footer__word"
          aria-hidden="true"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="footer__word-mask">
            <motion.span className="footer__word-line" variants={wordVar}>
              PROSPECT
            </motion.span>
          </span>
          <span className="footer__word-mask">
            <motion.span className="footer__word-line footer__word-line--gold" variants={wordVar}>
              BARK!
            </motion.span>
          </span>
        </motion.div>

        <div className="footer__bar">
          <p>© {SITE.established}–{YEAR} {SITE.name} · <a href={SITE.websiteHref} data-cursor>{SITE.website}</a></p>
          <p className="footer__concept">Website redesign concept</p>
          <button className="footer__top-btn" onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })} data-cursor>
            Back to top <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  )
}
