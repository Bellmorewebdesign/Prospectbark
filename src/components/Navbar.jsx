import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu } from 'lucide-react'
import logo from '../assets/logo.png'
import { NAV_LINKS, SITE } from '../data/site.js'
import MagneticButton from './ui/MagneticButton.jsx'
import MobileMenu from './MobileMenu.jsx'

export default function Navbar({ path, onNav, onGetStarted }) {
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const update = () => setSolid(window.scrollY > 22)
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  const go = (link) => {
    setMenuOpen(false)
    onNav(link)
  }

  return (
    <>
      <header className={`nav ${solid ? 'is-solid' : ''} ${path !== '/' ? 'is-page' : ''}`}>
        <div className="nav__inner shell">
          <a
            href="#/"
            className="nav__brand"
            onClick={(event) => {
              event.preventDefault()
              go({ route: '/' })
            }}
            aria-label={`${SITE.name} home`}
          >
            <img src={logo} alt={SITE.name} className="nav__logo" width="160" height="78" />
          </a>

          <nav className="nav__links" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                className="nav__link"
                onClick={() => go(link)}
                aria-current={link.route && path === link.route ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <MagneticButton className="nav__cta" onClick={onGetStarted}>
            <span>Get started</span>
            <ArrowUpRight size={16} />
          </MagneticButton>

          <button
            className="nav__burger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={23} />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onNav={go} onGetStarted={onGetStarted} />
    </>
  )
}
