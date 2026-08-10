import { ArrowRight } from 'lucide-react'
import groupImg from '../assets/group_of-dogs.webp'
import teamImg from '../assets/authentic/daycare-team.webp'
import storefront from '../assets/authentic/storefront.webp'
import { SITE } from '../data/site.js'

export default function AboutPage({ onGetStarted }) {
  return (
    <main id="main" className="about-page">
      <section className="about-hero section" data-cursor-dark>
        <div className="shell about-hero__grid">
          <div><p className="kicker kicker--light">Our story</p><h1>Brooklyn<br />pets have<br />known us<br /><em>a while.</em></h1></div>
          <div className="about-hero__image"><img src={groupImg} alt="A group of ProspectBArk daycare dogs" /><span>ProspectBArk regulars</span></div>
          <p className="about-hero__intro">ProspectBArk opened in 2010 and has cared for Brooklyn pets ever since. The job is simple to describe: show up, pay attention and treat every animal like an individual.</p>
        </div>
      </section>

      <section className="about-time section" aria-labelledby="about-time-title">
        <div className="shell about-time__head"><p className="kicker">2010 to today</p><h2 id="about-time-title">Since 2010.<br />Still showing up.</h2></div>
        <div className="shell about-time__line">
          <article><span>2010</span><div><h3>ProspectBArk begins.</h3><p>Brooklyn pet care with a name people remember.</p></div></article>
          <i aria-hidden="true" />
          <article><span>Today</span><div><h3>Still local. Still personal.</h3><p>Daycare, walking and pet sitting, with an active community of pet parents and a storefront on Fifth Avenue.</p></div></article>
        </div>
      </section>

      <section className="about-people section">
        <div className="shell about-people__grid">
          <img src={teamImg} alt="ProspectBArk team members inside the daycare" loading="lazy" />
          <div><p className="kicker">The people behind the care</p><h2>Pet care is<br />a profession.</h2><p>Current ProspectBArk caregiver roles include paid training, paid industry certifications, field support and benefits. The company also publicly lists bonding, insurance and pet first aid certification.</p><p>Those details matter when someone is caring for your pet or entering your home.</p><div className="about-people__attrs">{SITE.attributes.map((attribute) => <span key={attribute}>{attribute}</span>)}</div></div>
        </div>
      </section>

      <section className="about-place section" data-cursor-dark>
        <div className="shell about-place__grid"><div><p className="kicker kicker--light">The place</p><h2>Fifth Avenue.<br />Dogs in the window.<br />Brooklyn outside.</h2><p>{SITE.address.full}</p><button className="button button--gold" onClick={onGetStarted}>Tell us about your pet <ArrowRight size={18} /></button></div><img src={storefront} alt="The ProspectBArk storefront on Fifth Avenue" loading="lazy" /></div>
      </section>
    </main>
  )
}
