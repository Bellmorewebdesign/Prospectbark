import { Phone } from 'lucide-react'
import { SITE } from '../data/site.js'
import { useScrolled } from '../hooks/useScrolled.js'

export default function StickyActions({ onGetStarted }) {
  const visible = useScrolled(620)
  return (
    <>
      <button className={`desktop-sticky ${visible ? 'is-visible' : ''}`} onClick={onGetStarted}>
        Find care <span>↗</span>
      </button>
      <div className="mobile-actions" aria-label="Quick actions">
        <a href={SITE.phoneHref}><Phone size={17} /> Call</a>
        <button onClick={onGetStarted}>Get started <span>↗</span></button>
      </div>
    </>
  )
}
