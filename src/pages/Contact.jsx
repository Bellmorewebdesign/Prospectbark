import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Cat, Dog, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { SITE } from '../data/site.js'
import { useMockup } from '../context/MockupContext.jsx'

const STEP_META = [
  { title: 'Who needs care?', field: 'petType' },
  { title: 'What can we help with?', field: 'service' },
  { title: 'Where are you?', field: 'location' },
  { title: "What's your pet's name?", field: 'petName' },
  { title: 'How can we reach you?', field: 'contact' },
  { title: 'Anything we should know?', field: 'notes' },
]

const EMPTY = { petType: '', service: '', location: '', petName: '', name: '', email: '', phone: '', notes: '' }

export default function Contact() {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState(EMPTY)
  const [error, setError] = useState('')
  const reduce = useReducedMotion()
  const formRef = useRef(null)
  const { showMockup } = useMockup()
  const progress = useMemo(() => ((step + 1) / STEP_META.length) * 100, [step])

  const update = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    setError('')
  }

  const validate = () => {
    if (step === 0 && !values.petType) return 'Choose dog or cat to continue.'
    if (step === 1 && !values.service) return 'Choose a service, or pick not sure.'
    if (step === 2 && !values.location.trim()) return 'Add your neighborhood or ZIP code.'
    if (step === 3 && !values.petName.trim()) return "Add your pet's name."
    if (step === 4) {
      if (!values.name.trim()) return 'Add your name.'
      if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) return 'Add a valid email address.'
      if (!values.phone.trim()) return 'Add a phone number.'
    }
    return ''
  }

  const next = () => {
    const message = validate()
    if (message) {
      setError(message)
      formRef.current?.querySelector('input, button')?.focus()
      return
    }
    setStep((current) => Math.min(current + 1, STEP_META.length - 1))
  }

  const submit = (event) => {
    event.preventDefault()
    showMockup({
      icon: 'success',
      tag: 'Inquiry preview',
      title: `Thanks${values.petName ? `, ${values.petName}` : ''}!`,
      body: 'This demo does not send form entries. Use the phone or email links to contact ProspectBArk.',
    })
  }

  return (
    <main id="main" className="contact-page">
      <section className="contact-intro" data-cursor-dark>
        <div className="shell"><p className="kicker kicker--light">Get started</p><h1>Let's find<br />the right care.</h1><p>Tell us a little at a time. It takes about a minute.</p></div>
      </section>

      <section className="contact-wizard section">
        <div className="shell contact-wizard__grid">
          <form ref={formRef} className="wizard" onSubmit={submit} noValidate>
            <div className="wizard__progress"><div><span>Step {step + 1} of {STEP_META.length}</span><strong>{STEP_META[step].title}</strong></div><i><b style={{ width: `${progress}%` }} /></i></div>
            <AnimatePresence mode="wait">
              <motion.div className="wizard__step" key={step} initial={reduce ? { opacity: 0 } : { opacity: 0, x: 26 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, x: -22 }} transition={{ duration: 0.35 }}>
                <StepFields step={step} values={values} update={update} />
              </motion.div>
            </AnimatePresence>
            {error ? <p className="wizard__error" role="alert">{error}</p> : null}
            <div className="wizard__controls">
              <button type="button" className="wizard__back" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}><ArrowLeft size={17} /> Back</button>
              {step < STEP_META.length - 1 ? <button type="button" className="button button--ink" onClick={next}>Next <ArrowRight size={17} /></button> : <button type="submit" className="button button--gold">Let's talk <ArrowRight size={17} /></button>}
            </div>
          </form>

          <aside className="contact-direct" aria-label="Direct contact options">
            <p className="kicker">Prefer the direct route?</p><h2>Talk to a<br />real person.</h2>
            <a href={SITE.phoneHref}><Phone size={19} /><span><small>Call</small>{SITE.phone}</span></a>
            <a href={SITE.emailHref}><Mail size={19} /><span><small>Email</small>{SITE.email}</span></a>
            <a href={SITE.mapsHref} target="_blank" rel="noreferrer"><MapPin size={19} /><span><small>Visit</small>{SITE.address.full}</span></a>
            <a href={SITE.social.instagram.href} target="_blank" rel="noreferrer"><Instagram size={19} /><span><small>Instagram</small>{SITE.social.instagram.handle}</span></a>
            <p className="contact-direct__note">This concept does not send form data. Phone, email and map links remain available.</p>
          </aside>
        </div>
      </section>
    </main>
  )
}

function StepFields({ step, values, update }) {
  if (step === 0) return <><p className="wizard__eyebrow">Step one</p><h2>Dog or cat?</h2><div className="wizard__choices wizard__choices--pet"><Choice active={values.petType === 'dog'} onClick={() => update('petType', 'dog')}><Dog size={36} /> Dog</Choice><Choice active={values.petType === 'cat'} onClick={() => update('petType', 'cat')}><Cat size={36} /> Cat</Choice></div></>
  if (step === 1) return <><p className="wizard__eyebrow">Choose the closest fit</p><h2>What sounds right?</h2><div className="wizard__choices">{['Daycare', 'Dog walking', 'Pet sitting', 'Vacation care', 'Not sure'].map((item) => <Choice key={item} active={values.service === item} onClick={() => update('service', item)}>{item}</Choice>)}</div></>
  if (step === 2) return <><p className="wizard__eyebrow">We serve Brooklyn and Manhattan</p><label className="wizard__label" htmlFor="location">Your neighborhood or ZIP</label><input id="location" value={values.location} onChange={(event) => update('location', event.target.value)} autoComplete="postal-code" placeholder="Park Slope or 11215" /></>
  if (step === 3) return <><label className="wizard__label" htmlFor="pet-name">Your pet's name</label><input id="pet-name" value={values.petName} onChange={(event) => update('petName', event.target.value)} placeholder="The name they answer to" autoFocus /></>
  if (step === 4) return <><div className="wizard__field"><label htmlFor="your-name">Your name</label><input id="your-name" value={values.name} onChange={(event) => update('name', event.target.value)} autoComplete="name" /></div><div className="wizard__field-row"><div className="wizard__field"><label htmlFor="email">Email</label><input id="email" type="email" value={values.email} onChange={(event) => update('email', event.target.value)} autoComplete="email" /></div><div className="wizard__field"><label htmlFor="phone">Phone</label><input id="phone" type="tel" value={values.phone} onChange={(event) => update('phone', event.target.value)} autoComplete="tel" /></div></div></>
  return <><label className="wizard__label" htmlFor="notes">Anything we should know?</label><textarea id="notes" rows="6" value={values.notes} onChange={(event) => update('notes', event.target.value)} placeholder="Temperament, timing, routines or questions. A short note is fine." /><p className="wizard__optional">Optional</p></>
}

function Choice({ active, onClick, children }) {
  return <button type="button" className={active ? 'is-active' : ''} onClick={onClick} aria-pressed={active}>{children}<span>{active ? 'Selected' : 'Choose'}</span></button>
}
