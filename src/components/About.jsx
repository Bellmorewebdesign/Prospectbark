import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import aboutImg from '../assets/group_of-dogs.webp'
import { SITE } from '../data/site.js'
import Reveal from './ui/Reveal.jsx'
import MagneticButton from './ui/MagneticButton.jsx'

export default function About({ onContact }) {
  const reduce = useReducedMotion()
  return (
    <section className="section about" id="about" aria-labelledby="about-h">
      <div className="container about__grid">
        <div className="about__media">
          <motion.div
            className="frame frame--arch frame--ruled about__frame"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            whileInView={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={aboutImg}
              alt="A happy group of daycare dogs gathered together, looking up"
              loading="lazy"
              width="1214"
              height="908"
            />
          </motion.div>
          <div className="about__est" aria-hidden="true">
            <span className="about__est-since">Est.</span>
            <span className="about__est-year">2010</span>
          </div>
        </div>

        <div className="about__copy">
          <Reveal>
            <p className="eyebrow">Our story</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="about-h" className="about__title display">
              Good days start with <span className="italic text-gold">good care.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="about__lead">
              ProspectBArk! started in 2010 with a simple idea: the animals in this
              neighborhood deserve to be <em>known</em>, not just watched. A decade-plus
              later, that hasn’t changed one bit.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-muted about__body">
              We’re a small Brooklyn team — women-owned, Asian-owned, and LGBTQ+ friendly —
              that treats your dog like a regular and your cat like royalty, now caring
              for pets across Brooklyn and Manhattan. Some of our pups have been coming
              since they were puppies. A few of their humans have become our closest friends.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="about__attrs">
              {SITE.attributes.map((a) => (
                <span className="about__attr" key={a}>{a}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="about__foot">
              <span className="about__sign display">— The ProspectBArk! family</span>
              <MagneticButton className="btn" onClick={onContact} strength={0.25}>
                <span>Come say hi</span>
                <ArrowRight className="btn-arrow" size={18} />
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
