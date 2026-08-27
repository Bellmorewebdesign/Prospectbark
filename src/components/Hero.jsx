import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import huskyImg from '../assets/husky.webp'
import groupImg from '../assets/group_of-dogs.webp'
import { SITE } from '../data/site.js'
import Stars from './ui/Stars.jsx'
import MagneticButton from './ui/MagneticButton.jsx'

const LINES = [
  { text: 'Big care for', cls: '' },
  { text: "Brooklyn's", cls: '' },
  { text: 'best friends.', cls: 'hero__accent italic' },
]

export default function Hero({ onExplore, onContact }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const yImg = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70])
  const yBadge = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 48])
  const yMini = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -34])
  const yCopy = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
  }
  const lineVar = {
    hidden: reduce ? { opacity: 0 } : { y: '115%' },
    show: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
    },
  }
  const fade = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.55 + i * 0.1 },
    }),
  }

  return (
    <section className="hero" ref={ref} aria-label="Introduction">
      <div className="hero__aura" aria-hidden="true" />

      <div className="container hero__grid">
        <motion.div className="hero__copy" style={{ y: yCopy }} variants={container} initial="hidden" animate="show">
          <motion.p className="eyebrow hero__eyebrow" variants={fade} custom={0}>
            Brooklyn pet care · est. 2010
          </motion.p>

          <h1 className="hero__title display">
            {LINES.map((l, i) => (
              <span className="hero__line-mask" key={i}>
                <motion.span className={`hero__line ${l.cls}`} variants={lineVar}>
                  {l.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p className="hero__sub" variants={fade} custom={1}>
            Trusted dog daycare, walking, sitting, and vacation care across
            Brooklyn and Manhattan — caring for the city's dogs and cats since 2010.
          </motion.p>

          <motion.div className="hero__actions" variants={fade} custom={2}>
            <MagneticButton className="btn" onClick={onExplore}>
              <span>Explore Our Services</span>
              <ArrowRight className="btn-arrow" size={18} />
            </MagneticButton>
            <MagneticButton className="btn btn--ghost" onClick={onContact} strength={0.2}>
              <span>Get In Touch</span>
            </MagneticButton>
          </motion.div>

          <motion.a
            className="hero__rating"
            href={SITE.rating.href}
            target="_blank"
            rel="noreferrer"
            variants={fade}
            custom={3}
            data-cursor
          >
            <Stars value={SITE.rating.stars} size={17} label={`${SITE.rating.stars} out of 5`} />
            <span className="hero__rating-text">
              <strong>{SITE.rating.stars}</strong> Google rating
              <span className="hero__rating-sep" aria-hidden="true">·</span>
              {SITE.rating.reviews} reviews
            </span>
          </motion.a>
        </motion.div>

        <div className="hero__media">
          <motion.div
            className="hero__arch"
            style={{ y: yImg }}
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="frame frame--arch frame--ruled hero__frame">
              <img
                src={huskyImg}
                alt="A husky with one blue and one brown eye, smiling on an autumn walk by the water in Brooklyn"
                width="1217"
                height="1201"
                fetchpriority="high"
              />
            </div>
            <span className="hero__arch-outline" aria-hidden="true" />
          </motion.div>

          <motion.a
            className="hero__badge"
            href={SITE.rating.href}
            target="_blank"
            rel="noreferrer"
            style={{ y: yBadge }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1 }}
            data-cursor
            aria-label={`${SITE.rating.stars} stars from ${SITE.rating.reviews} Google reviews`}
          >
            <span className="hero__badge-num">4.8</span>
            <span className="hero__badge-meta">
              <Stars value={SITE.rating.stars} size={13} />
              <span>{SITE.rating.reviews} Google reviews</span>
            </span>
          </motion.a>

          <motion.div
            className="hero__mini"
            style={{ y: yMini }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.15 }}
            aria-hidden="true"
          >
            <img src={groupImg} alt="" width="1214" height="908" loading="lazy" />
          </motion.div>
        </div>
      </div>

      <motion.button
        className="hero__scroll"
        onClick={onExplore}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-label="Scroll to services"
        data-cursor
      >
        <span>Scroll</span>
        <ArrowDown size={16} className="hero__scroll-arrow" />
      </motion.button>
    </section>
  )
}
