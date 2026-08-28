import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import MockupModal from '../components/MockupModal.jsx'

const MockupContext = createContext(null)

// Preset notices reused across the whole site so the demo feels cohesive.
const PRESETS = {
  booking: {
    icon: 'calendar',
    tag: 'Concept preview',
    title: 'Booking lives here',
    body:
      "In the production website this connects directly to ProspectBArk!’s existing booking system. It’s intentionally left unwired in this redesign concept so you can focus on the experience.",
  },
  service: {
    icon: 'sparkles',
    tag: 'Concept preview',
    title: 'A preview of the full experience',
    body:
      'Dedicated service pages and online booking are part of the complete concept. They aren’t connected in this mockup, but this is exactly where your pet’s next great day would begin.',
  },
  generic: {
    icon: 'paw',
    tag: 'Concept preview',
    title: 'Part of the redesign concept',
    body:
      'This interaction is part of the ProspectBArk! website concept and isn’t connected in the mockup. In production it would link into ProspectBArk!’s real systems.',
  },
}

export function MockupProvider({ children }) {
  const [payload, setPayload] = useState(null)

  const showMockup = useCallback((preset) => {
    if (typeof preset === 'string') setPayload(PRESETS[preset] || PRESETS.generic)
    else setPayload({ ...PRESETS.generic, ...preset })
  }, [])

  const close = useCallback(() => setPayload(null), [])

  const value = useMemo(() => ({ showMockup }), [showMockup])

  return (
    <MockupContext.Provider value={value}>
      {children}
      <MockupModal payload={payload} onClose={close} />
    </MockupContext.Provider>
  )
}

export function useMockup() {
  const ctx = useContext(MockupContext)
  if (!ctx) throw new Error('useMockup must be used within MockupProvider')
  return ctx
}
