import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MockupProvider } from './context/MockupContext.jsx'
import { useHashRoute, scrollToSection } from './router/useHashRoute.js'
import { SERVICE_BY_ROUTE } from './data/services.js'
import Cursor from './components/Cursor.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import StickyActions from './components/StickyActions.jsx'
import Home from './pages/Home.jsx'
import ServicePage from './pages/ServicePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  const { path, navigate } = useHashRoute()
  const reduce = useReducedMotion()
  const pending = useRef(null)

  const handleNav = useCallback(
    (link) => {
      if (!link) return
      if (link.route) {
        navigate(link.route)
        return
      }
      if (link.target) {
        if (path === '/') scrollToSection(link.target)
        else {
          pending.current = link.target
          navigate('/')
        }
      }
    },
    [navigate, path]
  )

  useEffect(() => {
    if (pending.current && path === '/') {
      const target = pending.current
      pending.current = null
      const id = window.setTimeout(() => scrollToSection(target), 90)
      return () => window.clearTimeout(id)
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [path])

  const page = SERVICE_BY_ROUTE[path] ? (
    <ServicePage
      service={SERVICE_BY_ROUTE[path]}
      onGetStarted={() => navigate('/contact')}
      onFindCare={() => handleNav({ target: 'care-finder' })}
    />
  ) : path === '/about' ? (
    <AboutPage onGetStarted={() => navigate('/contact')} />
  ) : path === '/contact' ? (
    <Contact />
  ) : (
    <Home onNav={handleNav} onGetStarted={() => navigate('/contact')} />
  )

  return (
    <MockupProvider>
      <Cursor />
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar path={path} onNav={handleNav} onGetStarted={() => navigate('/contact')} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={SERVICE_BY_ROUTE[path]?.id || path}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          {page}
        </motion.div>
      </AnimatePresence>
      <StickyActions onGetStarted={() => navigate('/contact')} />
      <Footer onNav={handleNav} />
    </MockupProvider>
  )
}
