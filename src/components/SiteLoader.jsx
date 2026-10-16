import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { LOGO_MARK, LOGO_PLATE, LOGO_RATIO, LOGO_STARS, LOGO_TAGLINE } from '../data/brandLogo.js'

// Opening sequence, in seconds from the moment the artwork has loaded. Every
// CSS delay and duration below is set inline from these, and the exit timers
// are derived from the same numbers, so the screen can never leave while a
// layer is still mid-animation. Retune the pacing here only.
const T = {
  markIn: 0.1, // the lockup fades and settles into place...
  markTime: 1.15, // ...over this long
  shine: 0.75, // a gold sweep travels across the lockup
  shineTime: 1.25,
  firstStar: 0.4, // stars start popping in, biggest first
  starStep: 0.05, // gap between each star
  starTime: 0.85,
  tagline: 1.0, // tagline starts revealing about a second in...
  taglineTime: 2.0, // ...with a slow, feathered left-to-right wipe
  linger: 1.3, // the finished lockup holds still for a beat
  fade: 0.6, // then the lockup eases away...
  curtain: 0.25, // ...and once it has mostly gone (this far into the fade)...
  swipe: 0.9, // ...the whole screen swipes up
}

const LAST_STAR = T.firstStar + (LOGO_STARS.length - 1) * T.starStep
const SETTLED = Math.max(
  T.markIn + T.markTime,
  T.shine + T.shineTime,
  LAST_STAR + T.starTime,
  T.tagline + T.taglineTime,
)
const LEAVE_AT = SETTLED + T.linger
// Total on screen once loaded: LEAVE_AT + curtain + swipe, about 5.45s.

const SAFETY_MS = 2500
const STATIC_HOLD_MS = 800

const box = (piece) => ({
  left: `${piece.left}%`,
  top: `${piece.top}%`,
  width: `${piece.width}%`,
})

export default function SiteLoader() {
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)
  // The sequence is held until the lockup image has actually decoded, so a slow
  // connection gets the full reveal instead of a blank screen and a half-played
  // animation. SAFETY_MS stops a failed image from holding the site hostage.
  const [ready, setReady] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), SAFETY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  // The CSS animations start the moment `is-ready` lands, which is the same
  // render that starts these timers.
  useEffect(() => {
    if (!ready) return undefined
    if (reduce) {
      const timer = window.setTimeout(() => setVisible(false), STATIC_HOLD_MS)
      return () => window.clearTimeout(timer)
    }
    const leave = window.setTimeout(() => setLeaving(true), LEAVE_AT * 1000)
    const close = window.setTimeout(() => setVisible(false), (LEAVE_AT + T.curtain) * 1000)
    return () => {
      window.clearTimeout(leave)
      window.clearTimeout(close)
    }
  }, [ready, reduce])

  const state = `${ready ? ' is-ready' : ''}${leaving ? ' is-leaving' : ''}${reduce ? ' is-static' : ''}`

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
            className={`site-loader__logo${state}`}
            style={{ aspectRatio: LOGO_RATIO, '--leave-time': `${T.fade}s` }}
          >
            <span className="site-loader__glow" />

            {/* The lockup itself: 16 + pets + PROSPECT BArk, settling in as one
                piece with the light backing that sits behind its plate */}
            <div
              className="site-loader__lockup"
              style={{ animationDelay: `${T.markIn}s`, animationDuration: `${T.markTime}s` }}
            >
              {/* The PROSPECT plate fades to transparent, so on the dark screen
                  its lower half went dark and the black lettering sank into it.
                  This backing gives the plate the light ground the artwork was
                  drawn for. The logo pixels themselves are untouched. */}
              <span className="site-loader__plate" style={{ ...box(LOGO_PLATE), height: `${LOGO_PLATE.height}%` }} />
              <img
                className="site-loader__mark"
                src={LOGO_MARK.url}
                alt=""
                fetchPriority="high"
                onLoad={() => setReady(true)}
                onError={() => setReady(true)}
                style={box(LOGO_MARK)}
              />
            </div>

            {/* Gold sweep, clipped to the shape of the lockup */}
            <span
              className="site-loader__shine"
              style={{
                ...box(LOGO_MARK),
                height: `${LOGO_MARK.height}%`,
                maskImage: `url(${LOGO_MARK.url})`,
                WebkitMaskImage: `url(${LOGO_MARK.url})`,
                animationDelay: `${T.shine}s`,
                animationDuration: `${T.shineTime}s`,
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
                  ...box(star),
                  '--pop-delay': `${T.firstStar + index * T.starStep}s`,
                  '--pop-time': `${T.starTime}s`,
                  '--twinkle-delay': `${LAST_STAR + T.starTime + (index % 5) * 0.42}s`,
                  '--twinkle-time': `${2.4 + (index % 4) * 0.55}s`,
                }}
              />
            ))}

            {/* DOG WALKS - DAYCARE - BATHS - PET SITS, revealed left to right */}
            <span
              className="site-loader__tagline"
              style={{
                ...box(LOGO_TAGLINE),
                animationDelay: `${T.tagline}s`,
                animationDuration: `${T.taglineTime}s`,
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
