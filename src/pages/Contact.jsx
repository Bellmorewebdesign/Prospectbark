import { motion, useReducedMotion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, CalendarCheck, Instagram, Facebook, Navigation, Star } from 'lucide-react'
import { SITE } from '../data/site.js'
import { useMockup } from '../context/MockupContext.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import ContactForm from './ContactForm.jsx'

const BOOKINGS = ['Book Daycare', 'Schedule a Walk', 'Request Pet Sitting', 'Plan Vacation Care']

export default function Contact() {
  const { showMockup } = useMockup()
  const reduce = useReducedMotion()

  return (
    <main id="main" className="contact-page">
      <section className="container contact-page__hero">
        <Reveal>
          <p className="eyebrow">Contact</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="contact-page__title display">
            Let’s talk about <span className="italic text-gold">your pet.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="contact-page__lead text-muted">
            Questions, a meet-and-greet, or ready to get on the calendar? Reach a real
            human here. We usually reply the same day.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="contact-page__chips">
            <span className="chip"><Star size={15} className="text-gold" style={{ fill: 'var(--gold-500)' }} /> {SITE.rating.stars} · {SITE.rating.reviews} reviews</span>
            <span className="chip"><MapPin size={15} /> Serving Brooklyn &amp; Manhattan</span>
            <span className="chip"><Clock size={15} /> {SITE.hours}</span>
          </div>
        </Reveal>
      </section>

      <section className="container contact-page__body">
        <Reveal className="contact-page__form-card" y={30} amount={0.1}>
          <div className="contact-cta__card-head">
            <h2 className="display">Send a note</h2>
            <p className="text-muted">Tell us who we’d be caring for and what you need.</p>
          </div>
          <ContactForm id="page-contact" />
        </Reveal>

        <div className="contact-page__aside">
          <Reveal className="infocard" amount={0.2}>
            <h2 className="infocard__h display">Say hello</h2>
            <ul className="infocard__list">
              <li>
                <span className="infocard__ico"><Phone size={18} /></span>
                <span><span className="infocard__k">Call</span><a href={SITE.phoneHref} data-cursor>{SITE.phone}</a></span>
              </li>
              <li>
                <span className="infocard__ico"><Mail size={18} /></span>
                <span><span className="infocard__k">Email</span><a href={SITE.emailHref} data-cursor>{SITE.email}</a></span>
              </li>
              <li>
                <span className="infocard__ico"><MapPin size={18} /></span>
                <span><span className="infocard__k">Visit</span><a href={SITE.mapsHref} target="_blank" rel="noreferrer" data-cursor>{SITE.address.full}</a></span>
              </li>
              <li>
                <span className="infocard__ico"><Clock size={18} /></span>
                <span><span className="infocard__k">Hours</span>{SITE.hours}</span>
              </li>
            </ul>

            <div className="infocard__social">
              <a href={SITE.social.instagram.href} target="_blank" rel="noreferrer" data-cursor>
                <Instagram size={18} /> {SITE.social.instagram.handle}
              </a>
              <a href={SITE.social.facebook.href} target="_blank" rel="noreferrer" data-cursor>
                <Facebook size={18} /> Facebook
              </a>
            </div>
          </Reveal>

          <Reveal className="bookcard" delay={0.08} amount={0.2}>
            <h2 className="bookcard__h display">Jump the line</h2>
            <p className="text-muted bookcard__sub">Booking connects to ProspectBArk!’s system in production.</p>
            <div className="bookcard__grid">
              {BOOKINGS.map((b) => (
                <button key={b} className="bookpill bookpill--light" onClick={() => showMockup('booking')}>
                  <CalendarCheck size={16} aria-hidden="true" />
                  {b}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal className="mapcard" delay={0.12} amount={0.2}>
            <div className="mapcard__canvas" role="img" aria-label={`Map area for ${SITE.address.full}`}>
              <span className="mapcard__grid" aria-hidden="true" />
              <span className="mapcard__road mapcard__road--h" aria-hidden="true" />
              <span className="mapcard__road mapcard__road--v" aria-hidden="true" />
              <motion.span
                className="mapcard__pin"
                aria-hidden="true"
                initial={reduce ? false : { y: -10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 260, damping: 16 }}
              >
                <MapPin size={22} strokeWidth={2.4} />
              </motion.span>
              <span className="mapcard__label">ProspectBArk! · {SITE.address.street}</span>
            </div>
            <a className="btn btn--sm btn--block mapcard__btn" href={SITE.mapsHref} target="_blank" rel="noreferrer">
              <span>Get directions <Navigation size={15} /></span>
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
