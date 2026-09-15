import Marquee from './ui/Marquee.jsx'
import { SITE } from '../data/site.js'

const ITEMS = [
  'DOG DAYCARE',
  'DOG WALKING',
  'PET SITTING',
  'VACATION CARE',
  'NYC PREMIUM PET CARE SINCE 2010',
  `${SITE.rating.stars} STAR RATING`,
  `${SITE.rating.reviews} REVIEWS`,
]

export default function TrustStrip() {
  return (
    <div className="trust-strip" aria-label="ProspectBArk services and highlights">
      <Marquee duration={30} gap="0">
        {ITEMS.map((item) => (
          <span className="trust-strip__item" key={item}>{item}<i>✦</i></span>
        ))}
      </Marquee>
    </div>
  )
}
