import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, MapPin } from 'lucide-react'
import groupImg from '../assets/group_of-dogs.webp'
import birthdayImg from '../assets/birthday_dogo.webp'
import catImg from '../assets/kittycat.webp'
import facilityImg from '../assets/authentic/daycare-play.webp'
import teamImg from '../assets/authentic/daycare-team.webp'
import { SITE } from '../data/site.js'

const PAGE_COPY = {
  daycare: {
    eyebrow: 'ProspectBArk daycare',
    title: ['DAYCARE', "THEY'LL", 'ACTUALLY', 'LOVE.'],
    deck: 'A Brooklyn clubhouse for dogs who are ready to have a day of their own.',
    facts: ['Photos from ProspectBArk daycare', 'A dedicated pet care team', 'Photo and video updates mentioned in public reviews'],
  },
  walking: {
    eyebrow: 'Dog walking in Brooklyn',
    title: ['A BETTER', 'PART OF', 'THEIR DAY.'],
    deck: 'A familiar face, a good route and a proper break in the middle of the day.',
    facts: ['Paid caregiver training', 'Paid industry certifications', 'Field support for current caregiver roles'],
  },
  sitting: {
    eyebrow: 'Pet sitting',
    title: ['AWAY FROM', 'HOME.', 'NOT AWAY', 'FROM CARE.'],
    deck: 'Dogs and cats get to keep the place, the smells and the routine they already know.',
    facts: ['Care in their own home', 'Dogs and cats welcome', 'Bonded and insured company'],
  },
}

export default function ServicePage({ service, onGetStarted, onFindCare }) {
  const copy = PAGE_COPY[service.id]
  return (
    <main id="main" className={`service-page service-page--${service.id}`}>
      <section className="service-hero" data-cursor-dark>
        <img className="service-hero__image" src={service.image} alt={service.alt} />
        <div className="service-hero__shade" />
        <div className="shell service-hero__inner">
          <p className="kicker kicker--light">{copy.eyebrow}</p>
          <h1>{copy.title.map((line, index) => <span className={index === copy.title.length - 1 ? 'is-accent' : ''} key={line}>{line}</span>)}</h1>
          <div className="service-hero__bottom">
            <p>{copy.deck}</p>
            <button className="button button--gold" onClick={onGetStarted}>Start an inquiry <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>

      <div className="service-facts" aria-label={`${service.name} highlights`}>
        <div className="shell">{copy.facts.map((fact) => <span key={fact}><Check size={16} /> {fact}</span>)}</div>
      </div>

      {service.id === 'daycare' ? <DaycareExperience onFindCare={onFindCare} /> : null}
      {service.id === 'walking' ? <WalkingExperience /> : null}
      {service.id === 'sitting' ? <SittingExperience /> : null}

      <section className="service-values section">
        <div className="shell service-values__grid">
          <div>
            <p className="kicker">What pet parents care about</p>
            <h2>What you should<br /><em>know up front.</em></h2>
          </div>
          <div className="service-values__list">
            <article><span>01</span><h3>Real people</h3><p>ProspectBArk has served Brooklyn pets since 2010. Current caregiver roles include paid training, industry certifications and field support.</p></article>
            <article><span>02</span><h3>Real accountability</h3><p>The company publicly identifies itself as bonded and insured, with pet first aid certification listed on its official profile.</p></article>
            <article><span>03</span><h3>Real communication</h3><p>Public daycare reviews often mention photos, videos and staff who pay attention. Those details matter when your pet is with someone else.</p></article>
          </div>
        </div>
      </section>

      <section className="service-close" data-cursor-dark>
        <img src={service.secondaryImage} alt="A ProspectBArk pet care moment" loading="lazy" />
        <div className="service-close__shade" />
        <div className="shell service-close__copy">
          <p>{service.name}</p>
          <h2>Think this could<br />be their thing?</h2>
          <div><button className="button button--gold" onClick={onGetStarted}>Let's talk <ArrowRight size={18} /></button><button className="text-link text-link--light" onClick={onFindCare}>Try the care finder</button></div>
        </div>
      </section>
    </main>
  )
}

function DaycareExperience({ onFindCare }) {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const spots = [
    { label: 'Play space', note: 'Room for the day to get moving.', x: '29%', y: '62%' },
    { label: 'Friends', note: 'The social part is easy to see.', x: '55%', y: '42%' },
    { label: 'Team view', note: 'A space made to be watched and cared for.', x: '78%', y: '69%' },
    { label: 'Reset', note: 'Not every good moment needs to be loud.', x: '68%', y: '25%' },
  ]
  return (
    <>
      <section className="daycare-space section" aria-labelledby="daycare-space-title">
        <div className="shell daycare-space__head"><p className="kicker">See inside</p><h2 id="daycare-space-title">A place with<br /><em>a pulse.</em></h2><p>This visual explorer points out what owners naturally look for. It does not represent a fixed floor plan.</p></div>
        <div className="shell daycare-explorer">
          <img src={facilityImg} alt="Dogs playing inside the ProspectBArk daycare" loading="lazy" />
          {spots.map((spot, index) => <button key={spot.label} style={{ left: spot.x, top: spot.y }} className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`Show ${spot.label}`}><span>{index + 1}</span></button>)}
          <div className="daycare-explorer__note">
            <AnimatePresence mode="wait"><motion.div key={spots[active].label} initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><small>0{active + 1}</small><h3>{spots[active].label}</h3><p>{spots[active].note}</p></motion.div></AnimatePresence>
          </div>
        </div>
      </section>
      <section className="daycare-people section">
        <div className="shell daycare-people__grid"><img src={teamImg} alt="ProspectBArk team members inside the daycare" loading="lazy" /><div><p className="kicker">The people</p><h2>Dogs know<br />who shows up.</h2><p>Good daycare is more than a room. It is the people paying attention inside it.</p><button className="button button--outline" onClick={onFindCare}>Is daycare right for my dog? <ArrowRight size={17} /></button></div></div>
      </section>
    </>
  )
}

function WalkingExperience() {
  return (
    <section className="walking-route section" aria-labelledby="walking-route-title">
      <div className="shell walking-route__grid">
        <div><p className="kicker">The route</p><h2 id="walking-route-title">Out the door.<br />Into Brooklyn.</h2><p>This decorative route follows the blocks around Prospect Park.</p></div>
        <div className="walking-map">
          <svg viewBox="0 0 720 620" role="img" aria-label="Abstract Brooklyn walking route">
            <g><path d="M65 60V570" /><path d="M160 36V585" /><path d="M255 54V568" /><path d="M350 30V590" /><path d="M445 48V574" /><path d="M540 32V592" /><path d="M635 58V568" /><path d="M24 118H690" /><path d="M20 224H698" /><path d="M28 330H690" /><path d="M18 436H700" /><path d="M30 542H688" /></g>
            <path className="walking-map__route" d="M71 542 C124 512 134 451 164 435 C220 406 304 463 354 431 C413 394 412 332 451 306 C504 270 579 309 630 224 C659 176 625 137 591 118" />
            <circle cx="71" cy="542" r="9" /><circle cx="591" cy="118" r="12" /><text x="89" y="550">START</text><text x="527" y="94">GOOD WALK</text>
          </svg>
          <div className="walking-map__note"><MapPin size={18} /><span>Brooklyn blocks<br /><strong>Happy dog</strong></span></div>
        </div>
      </div>
    </section>
  )
}

function SittingExperience() {
  const beats = ['Home', 'Routine', 'Care', 'Updates', 'Peace of mind']
  return (
    <section className="sitting-story section" aria-labelledby="sitting-story-title">
      <div className="shell sitting-story__grid">
        <div className="sitting-story__image"><img src={catImg} alt="A cat relaxing at home" loading="lazy" /><span>Home stays home.</span></div>
        <div><p className="kicker">While you're away</p><h2 id="sitting-story-title">Keep the parts<br />they already<br /><em>love.</em></h2><p>Pet sitting keeps their usual routine in place while you are away.</p><ol>{beats.map((beat, index) => <li key={beat}><span>0{index + 1}</span><strong>{beat}</strong></li>)}</ol></div>
      </div>
    </section>
  )
}
