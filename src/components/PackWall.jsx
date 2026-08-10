import { Instagram } from 'lucide-react'
import birthday from '../assets/birthday_dogo.webp'
import group from '../assets/group_of-dogs.webp'
import husky from '../assets/husky.webp'
import dog from '../assets/happy_dawg.webp'
import cat from '../assets/kittycat.webp'
import play from '../assets/authentic/daycare-play.webp'
import team from '../assets/authentic/daycare-team.webp'
import { SITE } from '../data/site.js'

const PHOTOS = [
  { src: birthday, alt: 'A birthday dog at ProspectBArk daycare', label: 'BEST DAY EVER' },
  { src: group, alt: 'ProspectBArk daycare dogs looking up together', label: 'THE REGULARS' },
  { src: husky, alt: 'A husky out on a walk', label: 'WALKING CLUB' },
  { src: play, alt: 'Dogs playing inside ProspectBArk daycare', label: 'FRIEND ZONE' },
  { src: cat, alt: 'A cat relaxing at home', label: 'HOME TEAM' },
  { src: dog, alt: 'A happy dog outside', label: 'BROOKLYN KID' },
  { src: team, alt: 'ProspectBArk team members inside the daycare', label: 'GOOD PEOPLE' },
]

export default function PackWall() {
  return (
    <section className="pack-wall section" aria-labelledby="pack-title" data-cursor-dark>
      <div className="shell pack-wall__head">
        <div>
          <p className="kicker kicker--light">The ProspectBArk pack</p>
          <h2 id="pack-title">Who's a<br />ProspectBArk<br /><em>kid?</em></h2>
        </div>
        <a href={SITE.social.daycare.href} target="_blank" rel="noreferrer"><Instagram size={18} /> Follow the daycare</a>
      </div>
      <div className="pack-wall__rail">
        {PHOTOS.map((photo, index) => (
          <figure className={`pack-photo pack-photo--${(index % 4) + 1}`} key={`${photo.label}-${index}`}>
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            <figcaption>{photo.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
