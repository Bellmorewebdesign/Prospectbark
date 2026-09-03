import { ArrowUpRight, Clock3, MapPin } from 'lucide-react'
import storefront from '../assets/authentic/storefront.webp'
import { SITE } from '../data/site.js'
import MotionOrnament from './ui/MotionOrnament.jsx'

export default function BrooklynRoots() {
  return (
    <section className="roots section" id="brooklyn-roots" aria-labelledby="roots-title">
      <MotionOrnament tone="ink" />
      <div className="shell roots__grid">
        <div className="roots__copy">
          <p className="kicker">Brooklyn roots</p>
          <h2 id="roots-title">Born by<br />Prospect Park.<br /><em>Since 2010.</em></h2>
          <div className="roots__address">
            <MapPin size={20} />
            <p><strong>{SITE.address.street}</strong><span>{SITE.address.city}, {SITE.address.region} {SITE.address.zip}</span></p>
          </div>
          <div className="roots__links">
            <a className="button button--ink" href={SITE.mapsHref} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={17} /></a>
            <a className="text-link" href={SITE.mapsHref} target="_blank" rel="noreferrer"><Clock3 size={16} /> View current hours</a>
          </div>
          <div className="roots__attributes">{SITE.attributes.map((attribute) => <span key={attribute}>{attribute}</span>)}</div>
        </div>

        <div className="roots__visual">
          <svg className="brooklyn-map" viewBox="0 0 720 620" role="img" aria-label="Decorative map showing ProspectBArk near Prospect Park">
            <path className="brooklyn-map__park" d="M77 89 C160 43 267 58 306 128 C348 202 314 306 247 356 C177 409 74 374 45 287 C18 208 26 120 77 89Z" />
            <g className="brooklyn-map__streets">
              <path d="M20 468 C172 424 313 417 690 430" />
              <path d="M43 523 C213 478 404 484 696 518" />
              <path d="M91 579 C277 533 462 552 694 585" />
              <path d="M354 18 C361 160 385 309 424 616" />
              <path d="M456 7 C442 145 467 297 511 615" />
              <path d="M556 24 C529 171 550 330 611 606" />
              <path d="M650 55 C614 191 633 354 696 549" />
            </g>
            <path className="brooklyn-map__route" d="M122 508 C227 474 322 478 392 449 C447 426 466 381 482 330" />
            <circle className="brooklyn-map__pulse" cx="482" cy="330" r="26" />
            <circle className="brooklyn-map__pin" cx="482" cy="330" r="9" />
            <text x="505" y="327">578 5TH AVE</text>
            <text className="brooklyn-map__park-label" x="105" y="228">PROSPECT PARK</text>
          </svg>
          <figure className="roots__storefront">
            <img src={storefront} alt="The ProspectBArk storefront window on Fifth Avenue in Brooklyn" loading="lazy" />
            <figcaption>Look for the dogs in the window.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
