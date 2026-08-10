import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FAQS } from '../data/faqs.js'
import { SITE } from '../data/site.js'
import Reveal from './ui/Reveal.jsx'
import MagneticButton from './ui/MagneticButton.jsx'

function Item({ item, open, onToggle, id }) {
  const reduce = useReducedMotion()
  return (
    <div className={`faq__item ${open ? 'is-open' : ''}`}>
      <h3 className="faq__q">
        <button
          className="faq__trigger"
          aria-expanded={open}
          aria-controls={`faq-panel-${id}`}
          id={`faq-btn-${id}`}
          onClick={onToggle}
          data-cursor
        >
          <span>{item.q}</span>
          <span className="faq__icon" aria-hidden="true">
            <Plus size={20} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq__panel"
            id={`faq-panel-${id}`}
            role="region"
            aria-labelledby={`faq-btn-${id}`}
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="faq__a">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ({ onContact }) {
  const [open, setOpen] = useState(0)

  return (
    <section className="section faq" id="faq" aria-labelledby="faq-h">
      <div className="container faq__grid">
        <div className="faq__aside">
          <Reveal>
            <p className="eyebrow">Good questions</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="faq-h" className="faq__title display">
              The things people <span className="italic text-gold">ask us.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted faq__aside-text">
              Still curious about your pet in particular? That’s the best kind of
              question — let’s talk it through.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="faq__aside-actions">
              <MagneticButton className="btn btn--ghost" onClick={onContact} strength={0.2}>
                <span>Ask us anything</span>
              </MagneticButton>
              <a className="link-underline" href={SITE.phoneHref} data-cursor>
                or call {SITE.phone}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="faq__list">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={0.04 * i} amount={0.4}>
              <Item
                item={item}
                id={i}
                open={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
