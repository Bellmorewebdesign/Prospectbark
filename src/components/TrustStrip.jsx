import { Star } from 'lucide-react'
import Marquee from './ui/Marquee.jsx'

const ITEMS = [
  { text: '4.8 Google Rating', star: true },
  { text: '129 Reviews' },
  { text: 'Serving Brooklyn & Manhattan Since 2010' },
  { text: 'Women-Owned' },
  { text: 'Dog Daycare · Walking · Sitting' },
  { text: 'Asian-Owned' },
  { text: 'LGBTQ+ Friendly' },
]

export default function TrustStrip() {
  return (
    <section className="trust" aria-label="Trust signals">
      <Marquee duration={38} gap="0" ariaLabel="ProspectBArk! highlights">
        {ITEMS.map((it, i) => (
          <span className="trust__item" key={i}>
            {it.star && <Star size={15} className="trust__star" aria-hidden="true" />}
            <span className="trust__text">{it.text}</span>
            <span className="trust__sep" aria-hidden="true">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  )
}
