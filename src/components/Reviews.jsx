import { Quote, ArrowUpRight } from 'lucide-react'
import { SITE } from '../data/site.js'
import Reveal from './ui/Reveal.jsx'
import Stars from './ui/Stars.jsx'
import MagneticButton from './ui/MagneticButton.jsx'

// No fabricated customer quotes. These are clearly-labeled preview slots that
// show how real Google reviews would present in the production site.
const PREVIEWS = [
  'This is where a real five-star Google review shines, in your customer’s own words.',
  'Your happiest pet parents, front and centre, pulled straight from your Google profile.',
  'Room for the reviews that make new neighbours tap “book,” live-synced in production.',
]

export default function Reviews() {
  return (
    <section className="section reviews" id="reviews" aria-labelledby="reviews-h">
      <div className="container">
        <div className="reviews__top">
          <div className="reviews__intro">
            <Reveal>
              <p className="eyebrow">Reviews</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="reviews-h" className="reviews__title display">
                Loved by Brooklyn <span className="italic text-gold">pet parents.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="reviews__summary">
                <span className="reviews__score">{SITE.rating.stars}</span>
                <span className="reviews__score-meta">
                  <Stars value={SITE.rating.stars} size={20} />
                  <span className="text-muted">Based on {SITE.rating.reviews} Google reviews</span>
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <MagneticButton className="btn" href={SITE.rating.href} target="_blank" rel="noreferrer" strength={0.25}>
                <span>Read Google Reviews</span>
                <ArrowUpRight className="btn-arrow" size={18} />
              </MagneticButton>
            </Reveal>
          </div>

          <Reveal className="reviews__note" delay={0.1}>
            <p>
              We didn’t write a single word below. Your real Google reviews drop right
              into these slots when the site goes live.
            </p>
          </Reveal>
        </div>

        <div className="reviews__grid">
          {PREVIEWS.map((text, i) => (
            <Reveal className="rcard" key={i} delay={0.06 * i} amount={0.3}>
              <span className="rcard__tag">Review preview</span>
              <Quote className="rcard__quote" size={30} aria-hidden="true" />
              <Stars value={5} size={16} />
              <p className="rcard__text">{text}</p>
              <div className="rcard__foot">
                <span className="rcard__avatar" aria-hidden="true">★</span>
                <span>
                  <strong>Your customer</strong>
                  <span className="text-muted"> · via Google</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
