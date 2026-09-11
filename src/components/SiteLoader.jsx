import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { LOGO_MARK, LOGO_RATIO, LOGO_STARS, LOGO_TAGLINE } from '../data/brandLogo.js'

// Opening sequence, in seconds. Everything below reads from these so the
// pacing can be retuned in one place.
const T = {
  markIn: 0.15, // the lockup fades and settles into place
  shine: 1.0, // a gold sweep travels across the lockup
  firstStar: 0.45, // stars start popping in, biggest first
  starStep: 0.065, // gap between each star
  tagline: 1.45, // tagline wipes in left to right
  hold: 2.8, // full lockup sits still for a beat
  swipe: 0.8, // then the whole screen swipes up
}

const LAST_STAR = T.firstStar + LOGO_STARS.length * T.starStep
const SAFETY_MS = 2500

export default function SiteLoader() {
  const [visible, setVisible] = useState(true)
  // The sequence is held until the lockup image has actually decoded, so a slow
  // connection gets the full reveal instead of a blank screen and a half-played
  // animation. SAFETY_MS stops a failed image from holding the site hostage.
  const [ready, setReady] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), SAFETY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!ready) return undefined
    const ms = reduce ? 320 : T.hold * 1000
    const timer = window.setTimeout(() => setVisible(false), ms)
    return () => window.clearTimeout(timer)
  }, [ready, reduce])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="site-loader"
          initial={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: reduce ? 0.25 : T.swipe, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div
            className={`site-loader__logo${ready ? ' is-ready' : ''}${reduce ? ' is-static' : ''}`}
            style={{ aspectRatio: LOGO_RATIO }}
          >
            <span className="site-loader__glow" />

            {/* The lockup itself: 16 + pets + PROSPECT BArk */}
            <img
              className="site-loader__mark"
              src={LOGO_MARK.url}
              alt=""
              fetchPriority="high"
              onLoad={() => setReady(true)}
              onError={() => setReady(true)}
              style={{
                left: `${LOGO_MARK.left}%`,
                top: `${LOGO_MARK.top}%`,
                width: `${LOGO_MARK.width}%`,
                animationDelay: `${T.markIn}s`,
              }}
            />

            {/* Gold sweep, clipped to the shape of the lockup */}
            <span
              className="site-loader__shine"
              style={{
                left: `${LOGO_MARK.left}%`,
                top: `${LOGO_MARK.top}%`,
                width: `${LOGO_MARK.width}%`,
                height: `${LOGO_MARK.height}%`,
                maskImage: `url(${LOGO_MARK.url})`,
                WebkitMaskImage: `url(${LOGO_MARK.url})`,
                animationDelay: `${T.shine}s`,
              }}
            />

            {/* Each star pops into its exact spot, then keeps twinkling */}
            {LOGO_STARS.map((star, index) => (
              <img
                key={star.id}
                className="site-loader__star"
                src={star.url}
                alt=""
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: `${star.width}%`,
                  '--pop-delay': `${T.firstStar + index * T.starStep}s`,
                  '--twinkle-delay': `${LAST_STAR + (index % 5) * 0.42}s`,
                  '--twinkle-time': `${2.4 + (index % 4) * 0.55}s`,
                }}
              />
            ))}

            {/* DOG WALKS - DAYCARE - BATHS - PET SITS, revealed left to right */}
            <span
              className="site-loader__tagline"
              style={{
                left: `${LOGO_TAGLINE.left}%`,
                top: `${LOGO_TAGLINE.top}%`,
                width: `${LOGO_TAGLINE.width}%`,
                animationDelay: `${T.tagline}s`,
              }}
            >
              <img src={LOGO_TAGLINE.url} alt="" />
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
