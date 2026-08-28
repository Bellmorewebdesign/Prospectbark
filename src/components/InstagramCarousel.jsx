import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Instagram } from 'lucide-react'
import { IG_ACCOUNT, IG_POSTS } from '../data/instagram.js'

// Horizontal Instagram carousel.
// - Native horizontal scrolling, so touch, trackpad and mouse drag all work
// - Gentle auto-advance that pauses on hover, focus and touch, and only runs
//   while the section is on screen
// - Loops seamlessly using a duplicated (aria-hidden) set of cards
// - Arrow controls plus a focusable scroll region for keyboard users
// - Auto-advance is fully disabled under prefers-reduced-motion
// Real posts can be dropped into src/data/instagram.js without touching this.
export default function InstagramCarousel() {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const railRef = useRef(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)
  const resumeTimer = useRef(null)

  useEffect(() => {
    const rail = railRef.current
    const section = sectionRef.current
    if (!rail || reduce) return

    const SPEED = 0.35
    posRef.current = rail.scrollLeft
    let raf = null
    let running = false

    const step = () => {
      if (!running) return
      const half = rail.scrollWidth / 2
      if (!pausedRef.current && half > 0) {
        let next = posRef.current + SPEED
        if (next >= half) next -= half
        posRef.current = next
        rail.scrollLeft = next
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
    const resume = () => {
      posRef.current = rail.scrollLeft
      pausedRef.current = false
    }

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    )
    observer.observe(section)

    rail.addEventListener('pointerenter', pause)
    rail.addEventListener('pointerleave', resume)
    rail.addEventListener('focusin', pause)
    rail.addEventListener('focusout', resume)
    rail.addEventListener('pointerdown', pause)
    rail.addEventListener('touchstart', pause, { passive: true })
    rail.addEventListener('touchend', resume)
    window.addEventListener('pointerup', resume)

    return () => {
      stop()
      observer.disconnect()
      rail.removeEventListener('pointerenter', pause)
      rail.removeEventListener('pointerleave', resume)
      rail.removeEventListener('focusin', pause)
      rail.removeEventListener('focusout', resume)
      rail.removeEventListener('pointerdown', pause)
      rail.removeEventListener('touchstart', pause)
      rail.removeEventListener('touchend', resume)
      window.removeEventListener('pointerup', resume)
    }
  }, [reduce])

  const nudge = (direction) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.querySelector('.ig-card')
    const amount = card ? card.getBoundingClientRect().width + 18 : 320
    pausedRef.current = true
    rail.scrollBy({ left: direction * amount, behavior: reduce ? 'auto' : 'smooth' })
    clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => {
      posRef.current = rail.scrollLeft
      pausedRef.current = false
    }, reduce ? 60 : 700)
  }

  const cards = [...IG_POSTS, ...IG_POSTS]

  return (
    <section className="ig-strip section" aria-labelledby="ig-strip-title" ref={sectionRef}>
      <div className="shell ig-strip__head">
        <div>
          <p className="kicker">On Instagram</p>
          <h2 id="ig-strip-title">Life at<br /><em>ProspectBArk.</em></h2>
        </div>
        <div className="ig-strip__actions">
          <a className="button button--ink" href={IG_ACCOUNT.href} target="_blank" rel="noreferrer">
            <Instagram size={17} /> Follow ProspectBArk
          </a>
          <div className="ig-strip__arrows">
            <button type="button" onClick={() => nudge(-1)} aria-label="Show previous posts"><ArrowLeft size={18} /></button>
            <button type="button" onClick={() => nudge(1)} aria-label="Show next posts"><ArrowRight size={18} /></button>
          </div>
        </div>
      </div>

      <div
        className="ig-strip__rail"
        ref={railRef}
        tabIndex={0}
        role="region"
        aria-label="Instagram posts from ProspectBArk"
      >
        {cards.map((post, index) => {
          const isClone = index >= IG_POSTS.length
          return (
            <a
              className="ig-card"
              key={`${post.id}-${index}`}
              href={post.href}
              target="_blank"
              rel="noreferrer"
              aria-hidden={isClone ? 'true' : undefined}
              tabIndex={isClone ? -1 : 0}
            >
              <img src={post.image} alt={isClone ? '' : post.alt} loading="lazy" />
              <span className="ig-card__badge"><Instagram size={15} /></span>
              <span className="ig-card__foot">
                <span>{IG_ACCOUNT.handle}</span>
                <ArrowUpRight size={15} />
              </span>
            </a>
          )
        })}
      </div>
    </section>
  )
}
