import Marquee from './ui/Marquee.jsx'

const ITEMS = [
  'DOG DAYCARE',
  'DOG WALKING',
  'PET SITTING',
  'BROOKLYN SINCE 2010',
  '4.8 GOOGLE RATING',
  '129 REVIEWS',
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
