import { useMagnetic } from '../../hooks/useMagnetic.js'

// Wraps any clickable in a magnetic-hover effect. Renders an <a> when `href`
// is provided, otherwise a <button>. Inner label gets a subtle counter-shift.
export default function MagneticButton({
  as,
  href,
  children,
  className = 'btn',
  strength = 0.3,
  dataCursor = true,
  ...rest
}) {
  const ref = useMagnetic(strength)
  const Tag = as || (href ? 'a' : 'button')
  return (
    <Tag
      ref={ref}
      href={href}
      className={className}
      data-cursor={dataCursor ? '' : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
