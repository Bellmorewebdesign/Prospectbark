import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import MockupModal from '../components/MockupModal.jsx'

const MockupContext = createContext(null)

const PRESETS = {
  booking: {
    icon: 'calendar',
    tag: 'Concept preview',
    title: 'Booking starts here',
    body: 'The finished website can connect this moment to ProspectBArk’s booking system. Nothing is sent from this design concept.',
  },
  generic: {
    icon: 'paw',
    tag: 'Concept preview',
    title: 'Part of the redesign concept',
    body: 'This interaction is not connected to a live business system in the design concept.',
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
  return <MockupContext.Provider value={value}>{children}<MockupModal payload={payload} onClose={close} /></MockupContext.Provider>
}

export function useMockup() {
  const value = useContext(MockupContext)
  if (!value) throw new Error('useMockup must be used within MockupProvider')
  return value
}
