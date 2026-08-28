import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { NAV_LINKS, SITE } from '../data/site.js'

export default function Footer({ onNav }) {
  return (
    <footer className="footer" data-cursor-dark>
      <div className="shell">
        <div className="footer__lead">
          <p>Brooklyn &amp; Manhattan<br />pet care. Here since 2010.</p>
          <a href={SITE.phoneHref}>{SITE.phone} <ArrowUpRight size={18} /></a>
        </div>

        <div className="footer__grid">
          <div className="footer__address">
            <strong>ProspectBArk!</strong>
            <a href={SITE.mapsHref} target="_blank" rel="noreferrer"><MapPin size={16} /> {SITE.address.full}</a>
            <a href={SITE.emailHref}><Mail size={16} /> {SITE.email}</a>
            <a href={SITE.phoneHref}><Phone size={16} /> {SITE.phone}</a>
          </div>
          <nav aria-label="Footer navigation">
            {[{ label: 'Home', route: '/' }, ...NAV_LINKS].map((link) => (
              <button key={link.label} onClick={() => onNav(link)}>{link.label}</button>
            ))}
          </nav>
          <div className="footer__social">
            <a href={SITE.social.instagram.href} target="_blank" rel="noreferrer"><Instagram size={17} /> Main Instagram</a>
            <a href={SITE.social.daycare.href} target="_blank" rel="noreferrer"><Instagram size={17} /> Daycare Instagram</a>
            <a href={SITE.rating.href} target="_blank" rel="noreferrer">Read Google reviews <ArrowUpRight size={16} /></a>
            <a href={SITE.mapsHref} target="_blank" rel="noreferrer">View current hours <ArrowUpRight size={16} /></a>
          </div>
        </div>

        <div className="footer__word" aria-hidden="true"><span>PROSPECT</span><span>BARK!</span></div>
        <div className="footer__bar">
          <span>Established 2010</span>
          <span>Women-Owned · Asian-Owned · LGBTQ+ Friendly</span>
          <span>Website redesign concept</span>
        </div>
      </div>
    </footer>
  )
}
