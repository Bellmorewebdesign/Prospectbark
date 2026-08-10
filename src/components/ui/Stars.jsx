import { Star } from 'lucide-react'

// Accessible star rating. `value` supports halves via a clip overlay.
export default function Stars({ value = 5, size = 16, label }) {
  const full = Math.floor(value)
  const frac = value - full
  return (
    <span
      className="stars"
      role="img"
      aria-label={label || `${value} out of 5 stars`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        let fill = 0
        if (i < full) fill = 1
        else if (i === full) fill = frac
        return (
          <span key={i} style={{ position: 'relative', display: 'inline-flex' }} aria-hidden="true">
            <Star size={size} strokeWidth={1.5} style={{ color: 'var(--gold-500)', opacity: 0.28, fill: 'transparent' }} />
            {fill > 0 && (
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: `${fill * 100}%`,
                  overflow: 'hidden',
                  display: 'inline-flex',
                }}
              >
                <Star size={size} strokeWidth={1.5} style={{ color: 'var(--gold-500)', fill: 'var(--gold-500)' }} />
              </span>
            )}
          </span>
        )
      })}
    </span>
  )
}
