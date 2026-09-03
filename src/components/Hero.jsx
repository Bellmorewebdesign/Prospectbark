import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, Phone } from 'lucide-react'
import heroImg from '../assets/group_of-dogs.webp'
import dogImg from '../assets/happy_dawg.webp'
import birthdayImg from '../assets/birthday_dogo.webp'
import { SITE } from '../data/site.js'
import MagneticButton from './ui/MagneticButton.jsx'

const TITLE = ['THEY CALL IT', 'DAYCARE.', 'YOUR DOG CALLS IT', 'THE BEST DAY EVER.']

export default function Hero({ onFindCare, onMeet }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 92])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70])
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 48])

  return (
    <section className="home-hero" id="home" ref={ref} aria-label="ProspectBArk introduction" data-cursor-dark>
      <motion.div className="home-hero__backdrop" style={{ y: imageY }}>
        <motion.img
          src={heroImg}
          alt="Dogs gathered together at ProspectBArk daycare"
          width="1214"
          height="908"
          fetchPriority="high"
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
      <div className="home-hero__shade" aria-hidden="true" />
      <div className="home-hero__brandtype" aria-hidden="true">PROSPECT BARK</div>

      <div className="shell home-hero__inner">
        <motion.div className="home-hero__meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <span>Brooklyn &amp; Manhattan pet care</span>
          <span>Since 2010</span>
        </motion.div>

        <motion.h1 className="home-hero__title" style={{ y: titleY }}>
          {TITLE.map((line, index) => (
            <span className={index === 3 ? 'is-accent' : ''} key={line}>
              <motion.i
                initial={reduce ? { opacity: 0 } : { y: '115%' }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.08 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.i>
            </span>
          ))}
        </motion.h1>

        <motion.div
          className="home-hero__portrait"
          style={{ y: portraitY }}
          initial={reduce ? { opacity: 1 } : { opacity: 0, rotate: 4, x: 36 }}
          animate={{ opacity: 1, rotate: -2, x: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={dogImg} alt="A happy ProspectBArk dog outside in Brooklyn" width="1142" height="1193" />
          <span>Good day, confirmed.</span>
        </motion.div>

        <motion.div
          className="home-hero__postcard"
          initial={reduce ? { opacity: 1 } : { opacity: 0, rotate: -8, y: 22 }}
          animate={{ opacity: 1, rotate: 4, y: 0 }}
          transition={{ duration: 0.8, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={birthdayImg} alt="A dog celebrating a birthday at daycare" width="1500" height="1088" />
          <strong>The clubhouse</strong>
        </motion.div>

        <motion.div className="home-hero__footer" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
          <div className="home-hero__actions">
            <MagneticButton className="button button--gold" onClick={onFindCare}>
              Find the right care <ArrowRight size={18} />
            </MagneticButton>
            <button className="text-link text-link--light" onClick={onMeet}>Meet ProspectBArk</button>
          </div>
          <a className="home-hero__call" href={SITE.phoneHref}><Phone size={17} /> Call {SITE.phone}</a>
          <a className="home-hero__rating" href={SITE.rating.href} target="_blank" rel="noreferrer">
            <strong>{SITE.rating.stars}</strong>
            <span>★★★★★<small>{SITE.rating.reviews} Google reviews</small></span>
          </a>
        </motion.div>
      </div>

      <button className="home-hero__scroll" onClick={onFindCare} aria-label="Scroll to find the right care">
        <ArrowDown size={17} />
      </button>
    </section>
  )
}
