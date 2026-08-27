import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import dawgImg from '../assets/happy_dawg.webp'
import Reveal from './ui/Reveal.jsx'

const BEATS = [
  {
    k: '01',
    t: 'It starts with knowing your dog.',
    d: 'Names, quirks, the exact spot behind the ear. We get to know your pet long before we ever pick up the leash.',
  },
  {
    k: '02',
    t: 'Good days become a routine.',
    d: 'Familiar faces, a steady rhythm, a schedule your pet can count on, day after day, block after block.',
  },
  {
    k: '03',
    t: 'Routine becomes real trust.',
    d: 'The kind where you stop checking your phone mid-vacation, because you already know they’re having a great day.',
  },
]

export default function BrandStory() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1])
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const idx = Math.min(BEATS.length - 1, Math.max(0, Math.floor(p * BEATS.length)))
    setActive(idx)
  })

  return (
    <section className="story" ref={ref} aria-labelledby="story-h">
      <div className="story__sticky">
        <div className="container story__grid">
          <div className="story__media-col">
            <div className="story__frame">
              <motion.img
                src={dawgImg}
                alt="A joyful black Labrador mid-walk on a Brooklyn footbridge"
                style={reduce ? undefined : { scale, y }}
                loading="lazy"
                width="1142"
                height="1193"
              />
              <div className="story__tag">
                <span className="story__tag-dot" aria-hidden="true" />
                Brooklyn · since 2010
              </div>
              <div className="story__progress" aria-hidden="true">
                {BEATS.map((b, i) => (
                  <span key={b.k} className={`story__pip ${i <= active ? 'is-on' : ''}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="story__copy">
            <Reveal>
              <p className="eyebrow">Good days, on purpose</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="story-h" className="story__title display">
                Care is a <span className="italic text-gold">relationship</span>, not a drop-off.
              </h2>
            </Reveal>

            <ol className="story__beats">
              {BEATS.map((b, i) => (
                <li key={b.k} className={`story__beat ${i === active ? 'is-active' : ''}`}>
                  <span className="story__beat-k">{b.k}</span>
                  <div>
                    <h3 className="story__beat-t">{b.t}</h3>
                    <p className="story__beat-d text-muted">{b.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
