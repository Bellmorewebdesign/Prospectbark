import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import groupImg from '../assets/group_of-dogs.webp'
import birthdayImg from '../assets/birthday_dogo.webp'
import playImg from '../assets/authentic/daycare-play.webp'
import careImg from '../assets/authentic/facility-care.webp'
import dogImg from '../assets/happy_dawg.webp'

const MOMENTS = [
  { label: 'Arrive', title: 'The door opens. The tail starts.', body: 'Familiar place, familiar energy, one very ready dog.', image: groupImg, position: 'center 38%' },
  { label: 'Play', title: 'Room to move.', body: 'A busy room full of dogs doing exactly what they came for.', image: playImg, position: 'center' },
  { label: 'Make friends', title: 'Find your people. Then find your dogs.', body: 'Daycare has a social life all its own.', image: birthdayImg, position: 'center 42%' },
  { label: 'Reset', title: 'Every good day has a breather.', body: 'A pause can be part of the experience too.', image: careImg, position: 'center' },
  { label: 'Home happy', title: 'Back to you, ready to nap.', body: 'A full day, a happy face and a quieter evening.', image: dogImg, position: 'center 32%' },
]

export default function DayStory() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const moment = MOMENTS[active]

  return (
    <section className="day-story section" aria-labelledby="day-story-title" data-cursor-dark>
      <div className="shell day-story__heading">
        <p className="kicker kicker--light">A day at ProspectBArk</p>
        <h2 id="day-story-title">Wish you<br />could <em>peek in?</em></h2>
        <p>We know leaving them is the hard part.</p>
      </div>

      <div className="shell day-story__layout">
        <div className="day-story__stage" id="day-story-panel" role="tabpanel" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.img
              key={moment.label}
              src={moment.image}
              alt="A real moment at ProspectBArk daycare"
              style={{ objectPosition: moment.position }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)', scale: 1.04 }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)', scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>
          <span className="day-story__counter">0{active + 1} / 0{MOMENTS.length}</span>
          <div className="day-story__caption">
            <AnimatePresence mode="wait">
              <motion.div key={moment.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h3>{moment.title}</h3>
                <p>{moment.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="day-story__moments" role="tablist" aria-label="A daycare story">
          {MOMENTS.map((item, index) => (
            <button
              key={item.label}
              className={index === active ? 'is-active' : ''}
              onClick={() => setActive(index)}
              role="tab"
              aria-selected={index === active}
              aria-controls="day-story-panel"
            >
              <span>0{index + 1}</span>
              <strong>{item.label}</strong>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
