// Pure-CSS marquee. Content is duplicated so the -50% translate loops
// seamlessly. Pauses on hover and freezes under prefers-reduced-motion.
export default function Marquee({ children, duration = 32, reverse = false, gap = '3rem', className = '', ariaLabel }) {
  return (
    <div
      className={`marquee ${reverse ? 'marquee--reverse' : ''} ${className}`}
      style={{ '--marquee-dur': `${duration}s`, '--marquee-gap': gap }}
      role={ariaLabel ? 'group' : undefined}
      aria-label={ariaLabel}
    >
      <div className="marquee__track" aria-hidden={false}>
        {children}
      </div>
      <div className="marquee__track" aria-hidden="true">
        {children}
      </div>
    </div>
  )
}
