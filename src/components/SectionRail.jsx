import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'care-finder', label: 'Find care' },
  { id: 'day-story', label: 'A day here' },
  { id: 'services', label: 'Services' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'brooklyn-roots', label: 'Brooklyn roots' },
]

export default function SectionRail() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    const nodes = SECTIONS.map(({ id }) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (!visible.length) return
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const index = SECTIONS.findIndex(({ id }) => id === visible[0].target.id)
        if (index >= 0) setActive(index)
      },
      { rootMargin: '-36% 0px -46% 0px', threshold: [0, 0.25, 0.6] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <aside className="section-rail" aria-label="Homepage sections">
      <span className="section-rail__label" aria-hidden="true">{SECTIONS[active].label}</span>
      <div className="section-rail__dots">
        {SECTIONS.map((section, index) => (
          <button
            type="button"
            key={section.id}
            className={index === active ? 'is-active' : ''}
            aria-label={`Go to ${section.label}`}
            aria-current={index === active ? 'true' : undefined}
            onClick={() => goTo(section.id)}
          />
        ))}
      </div>
    </aside>
  )
}
