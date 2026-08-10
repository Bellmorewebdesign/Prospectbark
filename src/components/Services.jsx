import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { SERVICES } from '../data/services.js'
import { useMockup } from '../context/MockupContext.jsx'
import Reveal from './ui/Reveal.jsx'

const BOOK_LABEL = {
  daycare: 'Book Daycare',
  walking: 'Schedule a Walk',
  sitting: 'Request Sitting',
}

export default function Services() {
  const { showMockup } = useMockup()
  const reduce = useReducedMotion()

  return (
    <section className="section services" id="services" aria-labelledby="services-h">
      <div className="container">
        <div className="services__head">
          <Reveal>
            <p className="eyebrow">Our services</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="services-h" className="services__title display">
              Three ways to make <span className="italic text-gold">their day.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="services__intro text-muted">
              Daycare, walks, and sitting — each one shaped around your pet's routine,
              not the other way around.
            </p>
          </Reveal>
        </div>

        <div className="services__list">
          {SERVICES.map((s, i) => (
            <article
              className={`svc ${i % 2 === 1 ? 'svc--flip' : ''}`}
              key={s.id}
              style={{ '--accent': s.accent }}
            >
              <div className="svc__media-col">
                <motion.div
                  className="svc__media"
                  initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)', opacity: 1 }}
                  whileInView={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="frame frame--arch svc__frame">
                    <img src={s.image} alt={s.alt} loading="lazy" />
                  </div>
                  <span className="svc__index" aria-hidden="true">{s.index}</span>
                </motion.div>
              </div>

              <div className="svc__body">
                <Reveal className="svc__kicker" as="p">
                  <span className="svc__dot" aria-hidden="true" />
                  {s.kicker}
                </Reveal>
                <Reveal delay={0.05}>
                  <h3 className="svc__name display">{s.name}</h3>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="svc__blurb text-muted">{s.blurb}</p>
                </Reveal>
                <Reveal delay={0.15}>
                  <ul className="svc__points">
                    {s.points.map((p) => (
                      <li key={p}>
                        <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="svc__actions">
                    <button className="link-underline" onClick={() => showMockup('service')} data-cursor>
                      Learn More <ArrowUpRight size={17} />
                    </button>
                    <button className="btn btn--sm btn--ghost" onClick={() => showMockup('booking')}>
                      <span>{BOOK_LABEL[s.id]}</span>
                    </button>
                  </div>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
