import { Phone, Mail, MapPin, ArrowUpRight, CalendarCheck } from 'lucide-react'
import { SITE } from '../data/site.js'
import { useMockup } from '../context/MockupContext.jsx'
import Reveal from './ui/Reveal.jsx'
import ContactForm from '../pages/ContactForm.jsx'

const BOOKINGS = ['Book Daycare', 'Schedule a Walk', 'Request Pet Sitting', 'Plan Vacation Care']

export default function ContactCTA({ onContact }) {
  const { showMockup } = useMockup()
  return (
    <section className="section contact-cta" id="contact" data-cursor-dark aria-labelledby="cta-h">
      <div className="container contact-cta__grid">
        <div className="contact-cta__copy">
          <Reveal>
            <p className="eyebrow eyebrow--on-dark">Get started</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="cta-h" className="contact-cta__title display">
              Ready when <span className="italic text-gold">your pet is.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="contact-cta__lead">
              Tell us a little about your dog or cat and what you need, and we’ll take it
              from there. A real human, not a phone tree, serving Brooklyn and Manhattan.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="contact-cta__bookings">
              {BOOKINGS.map((b) => (
                <button key={b} className="bookpill" onClick={() => showMockup('booking')}>
                  <CalendarCheck size={16} aria-hidden="true" />
                  {b}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="contact-cta__details">
              <li>
                <a href={SITE.phoneHref} data-cursor><Phone size={17} /> {SITE.phone}</a>
              </li>
              <li>
                <a href={SITE.emailHref} data-cursor><Mail size={17} /> {SITE.email}</a>
              </li>
              <li>
                <a href={SITE.mapsHref} target="_blank" rel="noreferrer" data-cursor>
                  <MapPin size={17} /> {SITE.address.full}
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.25}>
            <button className="link-underline contact-cta__more" onClick={onContact} data-cursor>
              Or open the full contact page <ArrowUpRight size={17} />
            </button>
          </Reveal>
        </div>

        <Reveal className="contact-cta__card" delay={0.1} amount={0.15} y={40}>
          <div className="contact-cta__card-head">
            <h3 className="display">Send a note</h3>
            <p className="text-muted">We usually reply the same day.</p>
          </div>
          <ContactForm id="home-contact" />
        </Reveal>
      </div>
    </section>
  )
}
