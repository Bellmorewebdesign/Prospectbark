import { ArrowUpRight } from 'lucide-react'
import { SITE } from '../data/site.js'

const THEMES = ['CARE THAT FEELS PERSONAL', 'PHOTOS AND VIDEOS', 'A CLEAN SPACE', 'HAPPY DOGS', 'YEARS OF TRUST']

export default function Reviews() {
  return (
    <section className="review-story section" id="reviews" aria-labelledby="reviews-title">
      <div className="shell review-story__grid">
        <div className="review-story__score">
          <span>{SITE.rating.stars}</span>
          <div><strong>★★★★★</strong><small>Across {SITE.rating.reviews} Google reviews</small></div>
        </div>
        <div className="review-story__copy">
          <p className="kicker">What pet parents notice</p>
          <h2 id="reviews-title">Good care<br />leaves a<br /><em>pattern.</em></h2>
          <p>We read the public feedback and kept seeing the same things come up.</p>
          <a className="button button--outline" href={SITE.rating.href} target="_blank" rel="noreferrer">Read Google reviews <ArrowUpRight size={17} /></a>
        </div>
      </div>
      <div className="review-themes" aria-label="Themes found in public reviews">
        {THEMES.map((theme, index) => <span key={theme}><i>0{index + 1}</i>{theme}</span>)}
      </div>
    </section>
  )
}
