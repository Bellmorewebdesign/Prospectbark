import { ShieldCheck, HeartHandshake, PawPrint, Cat, ArrowRight } from 'lucide-react'
import { SITE } from '../data/site.js'
import Reveal from './ui/Reveal.jsx'
import Stat from './ui/Stat.jsx'
import Stars from './ui/Stars.jsx'
import MagneticButton from './ui/MagneticButton.jsx'

const REASONS = [
  {
    icon: ShieldCheck,
    t: 'Trusted since 2010',
    d: "More than a decade looking after Brooklyn's animals, and still on a first-name basis with every one.",
  },
  {
    icon: HeartHandshake,
    t: 'Real relationships',
    d: 'Familiar, consistent people your pet is genuinely happy to see at the door.',
  },
  {
    icon: PawPrint,
    t: 'Matched playgroups',
    d: 'Daycare grouped by size and temperament, with real rest built into the day.',
  },
  {
    icon: Cat,
    t: 'Cats welcome too',
    d: 'Sitting for the whole household: whiskers, floof, and everyone in between.',
  },
]

export default function WhyProspectBark({ onContact }) {
  return (
    <section className="section why" id="why" aria-labelledby="why-h">
      <div className="container">
        <div className="why__head">
          <Reveal>
            <p className="eyebrow">Why ProspectBArk!</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="why-h" className="why__title display">
              Reasons to hand over <span className="italic text-gold">the leash.</span>
            </h2>
          </Reveal>
        </div>

        <div className="why__grid">
          {/* Feature tile — dark pine, statement + attributes */}
          <Reveal className="why__feature" amount={0.2}>
            <div>
              <PawPrint className="why__feature-mark" size={30} aria-hidden="true" />
              <p className="why__feature-quote display">
                The neighborhood's pets have trusted us with their best days for
                <span className="text-gold"> over a decade.</span>
              </p>
            </div>
            <div className="why__attrs">
              {SITE.attributes.map((a) => (
                <span className="why__attr" key={a}>{a}</span>
              ))}
            </div>
          </Reveal>

          {/* Stats tile */}
          <Reveal className="why__stats" delay={0.08} amount={0.2}>
            <div className="why__stat">
              <Stat value={SITE.established} group={false} label="Established" />
            </div>
            <div className="why__stat why__stat--rating">
              <Stat value={SITE.rating.stars} decimals={1} label="Google rating" />
              <Stars value={SITE.rating.stars} size={15} />
            </div>
            <div className="why__stat">
              <Stat value={SITE.rating.reviews} suffix="" label="Google reviews" />
            </div>
          </Reveal>

          {/* Reason tiles */}
          {REASONS.map((r, i) => (
            <Reveal className="why__reason" key={r.t} delay={0.05 * i} amount={0.3}>
              <span className="why__reason-icon" aria-hidden="true">
                <r.icon size={22} strokeWidth={1.8} />
              </span>
              <h3 className="why__reason-t">{r.t}</h3>
              <p className="why__reason-d text-muted">{r.d}</p>
            </Reveal>
          ))}

          {/* CTA tile */}
          <Reveal className="why__cta" delay={0.1} amount={0.3}>
            <p className="why__cta-text display">Sound like your kind of care?</p>
            <MagneticButton className="btn btn--gold" onClick={onContact} strength={0.25}>
              <span>Say hello</span>
              <ArrowRight className="btn-arrow" size={18} />
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
