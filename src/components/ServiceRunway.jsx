import { ArrowRight } from 'lucide-react'
import { SERVICES } from '../data/services.js'
import Reveal from './ui/Reveal.jsx'

export default function ServiceRunway({ onNav, onGetStarted }) {
  return (
    <section className="service-runway section" id="services" aria-labelledby="service-runway-title">
      <div className="shell service-runway__head">
        <p className="kicker">Care, four ways</p>
        <h2 id="service-runway-title">The right plan<br />for the day<br /><em>ahead.</em></h2>
      </div>
      <div className="service-runway__list">
        {SERVICES.map((service, index) => (
          <article className={`runway runway--${service.tone}`} key={service.id}>
            <div className="shell runway__inner">
              <Reveal className="runway__number" x={index % 2 ? 35 : -35}>{service.number}</Reveal>
              <Reveal className="runway__media" amount={0.2}>
                <img src={service.image} alt={service.alt} loading="lazy" />
              </Reveal>
              <div className="runway__copy">
                <Reveal><p>{service.name}</p></Reveal>
                <Reveal delay={0.05}><h3>{service.headline}</h3></Reveal>
                <Reveal delay={0.1}><span>{service.intro}</span></Reveal>
                <Reveal className="runway__actions" delay={0.15}>
                  <button className="button button--ink" onClick={() => onNav({ route: service.route })}>What it's like <ArrowRight size={17} /></button>
                  <button className="text-link" onClick={onGetStarted}>Inquire</button>
                </Reveal>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
