import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Instagram, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react'
import { IG_POSTS, IG_PROFILE } from '../data/instagram.js'
import Reveal from './ui/Reveal.jsx'

// A premium, self-contained Instagram carousel.
// - Native horizontal scroll → free touch / trackpad / mouse-drag on every device
// - Gentle auto-advance (float accumulator so it truly moves) that pauses on
//   hover, focus, and touch/drag, and only runs while the section is on-screen
// - Seamless loop via a duplicated (aria-hidden) set
// - Prev/next buttons + a focusable region for keyboard users
// - Fully disabled under prefers-reduced-motion (still manually scrollable)
// Real posts can be dropped into src/data/instagram.js without touching this.
export default function InstagramCarousel() {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const scrollerRef = useRef(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)
  const nudgeTimer = useRef(null)

  useEffect(() => {
    const el = scrollerRef.current
    const section = sectionRef.current
    if (!el || reduce) return

    const SPEED = 0.4 // px/frame — subtle
    posRef.current = el.scrollLeft
    let raf = null
    let running = false

    const step = () => {
      if (!running) return
      const half = el.scrollWidth / 2
      if (!pausedRef.current && half > 0) {
        let p = posRef.current + SPEED
        if (p >= half) p -= half
        posRef.current = p
        el.scrollLeft = p // browser rounds for display; posRef keeps the true value
      }
      raf = requestAnimationFrame(step)
    }
    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(step)
    }
    const stop = () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      raf = null
    }

    const pause = () => { pausedRef.current = true }
    const resume = () => { posRef.current = el.scrollLeft; pausedRef.current = false }

    // Only animate while the section is visible (performance).
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    )
    if (section) io.observe(section)

    el.addEventListener('pointerenter', pause)
    el.addEventListener('pointerleave', resume)
    el.addEventListener('focusin', pause)
    el.addEventListener('focusout', resume)
    el.addEventListener('pointerdown', pause)
    el.addEventListener('touchstart', pause, { passive: true })
    el.addEventListener('touchend', resume)
    window.addEventListener('pointerup', resume)

    return () => {
      stop()
      io.disconnect()
      el.removeEventListener('pointerenter', pause)
      el.removeEventListener('pointerleave', resume)
      el.removeEventListener('focusin', pause)
      el.removeEventListener('focusout', resume)
      el.removeEventListener('pointerdown', pause)
      el.removeEventListener('touchstart', pause)
      el.removeEventListener('touchend', resume)
      window.removeEventListener('pointerup', resume)
    }
  }, [reduce])

  const nudge = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector('.igc__card')
    const amount = card ? card.getBoundingClientRect().width + 16 : 300
    pausedRef.current = true // let the smooth scroll run without the loop fighting it
    el.scrollBy({ left: dir * amount, behavior: reduce ? 'auto' : 'smooth' })
    clearTimeout(nudgeTimer.current)
    nudgeTimer.current = setTimeout(() => {
      posRef.current = el.scrollLeft
      pausedRef.current = false
    }, reduce ? 60 : 700)
  }

  // Duplicate the set so the auto-scroll can loop seamlessly. The second copy
  // is hidden from assistive tech and removed from the tab order.
  const cards = [...IG_POSTS, ...IG_POSTS]

  return (
    <section className="section igc" aria-labelledby="igc-h" ref={sectionRef}>
      <div className="container igc__head">
        <div className="igc__head-copy">
          <Reveal>
            <p className="eyebrow">On Instagram</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="igc-h" className="igc__title display">
              Follow along <span className="italic text-gold">@prospectbark.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="igc__head-actions">
          <a
            className="btn btn--sm"
            href={IG_PROFILE.href}
            target="_blank"
            rel="noreferrer"
            aria-label="Follow ProspectBArk! on Instagram"
          >
            <Instagram size={17} aria-hidden="true" />
            <span>Follow ProspectBArk!</span>
          </a>
          <div className="igc__arrows">
            <button className="igc__arrow" type="button" onClick={() => nudge(-1)} aria-label="Scroll to previous posts">
              <ArrowLeft size={18} />
            </button>
            <button className="igc__arrow" type="button" onClick={() => nudge(1)} aria-label="Scroll to next posts">
              <ArrowRight size={18} />
            </button>
          </div>
        </Reveal>
      </div>

      <div
        className="igc__scroller"
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-label="Recent Instagram posts from ProspectBArk!"
      >
        <ul className="igc__track">
          {cards.map((post, i) => {
            const isClone = i >= IG_POSTS.length
            return (
              <li className="igc__card" key={`${post.id}-${i}`} aria-hidden={isClone ? 'true' : undefined}>
                <a
                  className="igc__link"
                  href={post.href}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={isClone ? -1 : 0}
                  aria-label={`${post.alt} — view on Instagram`}
                >
                  <img src={post.image} alt={isClone ? '' : post.alt} loading="lazy" />
                  <span className="igc__badge" aria-hidden="true">
                    <Instagram size={16} />
                  </span>
                  <span className="igc__overlay" aria-hidden="true">
                    <span className="igc__handle">@prospectbark</span>
                    <ArrowUpRight size={16} className="igc__go" />
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
