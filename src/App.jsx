import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MockupProvider } from './context/MockupContext.jsx'
import { useHashRoute, scrollToSection } from './router/useHashRoute.js'
import Cursor from './components/Cursor.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  const { path, navigate } = useHashRoute()
  const reduce = useReducedMotion()
  const pending = useRef(null)

  const isContact = path === '/contact'
  const routeKey = isContact ? 'contact' : 'home'

  const handleNav = useCallback(
    (link) => {
      if (!link) return
      if (link.route) {
        navigate(link.route)
        return
      }
      if (link.target) {
        if (path === '/') {
          scrollToSection(link.target)
        } else {
          pending.current = link.target
          navigate('/')
        }
      }
    },
    [navigate, path]
  )

  const onExplore = useCallback(() => handleNav({ target: 'services' }), [handleNav])
  const onContact = useCallback(() => navigate('/contact'), [navigate])
  const onGetStarted = useCallback(() => navigate('/contact'), [navigate])

  // Scroll management on route change: honor a pending section, else go to top.
  useEffect(() => {
    if (pending.current && path === '/') {
      const target = pending.current
      pending.current = null
      const id = window.setTimeout(() => scrollToSection(target), 80)
      return () => window.clearTimeout(id)
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [path])

  return (
    <MockupProvider>
      <Cursor />
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar path={path} onNav={handleNav} onGetStarted={onGetStarted} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={routeKey}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          {isContact ? (
            <Contact />
          ) : (
            <Home onExplore={onExplore} onContact={onContact} onGetStarted={onGetStarted} />
          )}
        </motion.div>
      </AnimatePresence>

      <Footer onNav={handleNav} />
    </MockupProvider>
  )
}
