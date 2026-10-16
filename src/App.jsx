import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MockupProvider } from './context/MockupContext.jsx'
import { useHashRoute, scrollToSection } from './router/useHashRoute.js'
import { SERVICE_BY_ROUTE } from './data/services.js'
import Cursor from './components/Cursor.jsx'
import SiteLoader from './components/SiteLoader.jsx'
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
  // A section to scroll to once the homepage has mounted (Reviews clicked from
  // another page). Home takes it in a layout effect: with AnimatePresence in
  // "wait" mode the homepage only mounts after the old page has faded out, so
  // nothing outside Home can know when its sections exist.
  const pending = useRef(null)
  const takePendingTarget = useCallback(() => {
    const target = pending.current
    pending.current = null
    return target
  }, [])

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
    <Home onNav={handleNav} onGetStarted={() => navigate('/contact')} takePendingTarget={takePendingTarget} />
  )

  return (
    <MockupProvider>
      <SiteLoader />
      <Cursor />
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar path={path} onNav={handleNav} onGetStarted={() => navigate('/contact')} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={SERVICE_BY_ROUTE[path]?.id || path}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.16 : 0.52, ease: 'easeInOut' }}
        >
          {page}
        </motion.div>
      </AnimatePresence>
      <StickyActions onGetStarted={() => navigate('/contact')} />
      <Footer onNav={handleNav} />
    </MockupProvider>
  )
}
