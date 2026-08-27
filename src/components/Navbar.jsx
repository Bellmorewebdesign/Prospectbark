import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import logo from '../assets/logo.png'
import { SITE, NAV_LINKS } from '../data/site.js'
import MagneticButton from './ui/MagneticButton.jsx'
import MobileMenu from './MobileMenu.jsx'

export default function Navbar({ path, onNav, onGetStarted }) {
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const update = () => {
      const y = window.scrollY
      setSolid(y > 24)
      // hide when scrolling down past the hero, reveal on scroll up
      if (y > 420 && y > lastY + 6) setHidden(true)
      else if (y < lastY - 6 || y < 420) setHidden(false)
      lastY = y
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (link) => {
    setMenuOpen(false)
    onNav(link)
  }

  return (
    <>
      <header
        className={`nav ${solid ? 'is-solid' : ''} ${hidden && !menuOpen ? 'is-hidden' : ''}`}
      >
        <div className="nav__inner container">
          <a
            href="#/"
            className="nav__brand"
            onClick={(e) => {
              e.preventDefault()
              handleLink({ route: '/' })
            }}
            aria-label={`${SITE.name}, home`}
            data-cursor
          >
            <img src={logo} alt={SITE.name} className="nav__logo" width="160" height="78" />
          </a>

          <nav className="nav__links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                className="nav__link"
                onClick={() => handleLink(link)}
                aria-current={link.route && path === link.route ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="nav__cta">
            <MagneticButton className="btn btn--sm" onClick={onGetStarted}>
              <span>Get Started</span>
            </MagneticButton>
          </div>

          <button
            className="nav__burger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            data-cursor
          >
            <Menu size={24} strokeWidth={2} />
          </button>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNav={handleLink}
        onGetStarted={() => {
          setMenuOpen(false)
          onGetStarted()
        }}
      />
    </>
  )
}
