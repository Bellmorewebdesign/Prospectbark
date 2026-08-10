import { PartyPopper } from 'lucide-react'
import birthday from '../assets/birthday_dogo.webp'
import group from '../assets/group_of-dogs.webp'
import husky from '../assets/husky.webp'
import dawg from '../assets/happy_dawg.webp'
import cat from '../assets/kittycat.webp'
import Reveal from './ui/Reveal.jsx'
import Marquee from './ui/Marquee.jsx'

const ROW_A = [
  { src: group, cap: 'Playgroup, assembled', alt: 'A group of dogs at daycare looking up at the camera' },
  { src: husky, cap: 'Park regular', alt: 'A husky on an autumn walk by the water' },
  { src: dawg, cap: 'Best walk ever', alt: 'A black Labrador smiling on a Brooklyn footbridge' },
]
const ROW_B = [
  { src: cat, cap: 'Whiskers included', alt: 'A tortoiseshell cat resting at home' },
  { src: birthday, cap: 'Birthday club', alt: 'A tan dog wearing a birthday bandana on the daycare turf' },
  { src: group, cap: 'The regulars', alt: 'A group of daycare dogs together' },
]

function Tile({ src, cap, alt }) {
  return (
    <figure className="ptile">
      <div className="ptile__img">
        <img src={src} alt={alt} loading="lazy" />
      </div>
      <figcaption className="ptile__cap">{cap}</figcaption>
    </figure>
  )
}

export default function PhotoExperience() {
  return (
    <section className="section photos" aria-labelledby="photos-h">
      <div className="container photos__head">
        <div className="photos__copy">
          <Reveal>
            <p className="eyebrow">Life at ProspectBArk!</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="photos-h" className="photos__title display">
              Proof of a <span className="italic text-gold">good day.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted photos__intro">
              Tired paws, happy faces, the occasional birthday bandana. This is what
              the day actually looks like around here.
            </p>
          </Reveal>
        </div>

        <Reveal className="photos__feature" delay={0.1} amount={0.2}>
          <div className="frame frame--arch frame--ruled photos__feature-frame">
            <img
              src={birthday}
              alt="A grinning tan dog in a birthday bandana sitting on the daycare turf"
              loading="lazy"
              width="1500"
              height="1088"
            />
          </div>
          <div className="photos__feature-chip">
            <PartyPopper size={16} aria-hidden="true" />
            It’s my birthday, other puppers
          </div>
        </Reveal>
      </div>

      <div className="photos__marquees" aria-hidden="false">
        <Marquee duration={44} gap="1.4rem" ariaLabel="Photos from daycare and walks">
          {ROW_A.map((t, i) => (
            <Tile key={`a${i}`} {...t} />
          ))}
        </Marquee>
        <Marquee duration={50} gap="1.4rem" reverse ariaLabel="More photos from ProspectBArk!">
          {ROW_B.map((t, i) => (
            <Tile key={`b${i}`} {...t} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
