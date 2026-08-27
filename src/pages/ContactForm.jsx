import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Loader2, Send } from 'lucide-react'

const SERVICES = ['Dog Walking', 'Dog Daycare', 'Pet Sitting', 'Vacation Care', 'General Question']
const PET_TYPES = ['Dog', 'Cat', 'Other']

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  petName: '',
  petType: '',
  service: '',
  message: '',
  company: '', // honeypot
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm({ id = 'contact-form' }) {
  const reduce = useReducedMotion()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done
  const formRef = useRef(null)

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!values.name.trim()) er.name = 'Please tell us your name.'
    if (!values.email.trim()) er.email = 'We’ll need an email to reply.'
    else if (!emailRe.test(values.email.trim())) er.email = 'That email doesn’t look right.'
    if (!values.petType) er.petType = 'Pick one so we know who we’re meeting.'
    if (!values.service) er.service = 'Which service are you curious about?'
    if (!values.message.trim()) er.message = 'A quick note helps us help you.'
    return er
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (values.company) return // honeypot tripped — silently ignore
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length) {
      const first = formRef.current?.querySelector('[aria-invalid="true"]')
      first?.focus()
      return
    }
    // No backend: simulate a send, then show the concept confirmation.
    setStatus('sending')
    setTimeout(() => setStatus('done'), reduce ? 200 : 950)
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setStatus('idle')
  }

  return (
    <div className="cform">
      <AnimatePresence mode="wait">
        {status === 'done' ? (
          <motion.div
            key="success"
            className="cform__success"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            aria-live="polite"
          >
            <motion.span
              className="cform__success-icon"
              initial={reduce ? false : { scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.05 }}
            >
              <Check size={30} strokeWidth={2.4} />
            </motion.span>
            <h3 className="cform__success-title display">
              Thanks{values.name ? `, ${values.name.trim().split(' ')[0]}` : ''}!
            </h3>
            <p className="cform__success-text">
              This form is part of the ProspectBArk! redesign concept. In the production
              website, your inquiry would connect straight to ProspectBArk!’s contact
              system. Nothing was sent from this preview.
            </p>
            <button className="btn btn--ghost" onClick={reset}>
              <span>Send another</span>
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            className="cform__form"
            onSubmit={onSubmit}
            noValidate
            initial={false}
            exit={{ opacity: 0 }}
            aria-label="Contact ProspectBArk!"
          >
            {/* Honeypot (hidden from users & AT) */}
            <div className="cform__hp" aria-hidden="true">
              <label htmlFor={`${id}-company`}>Company</label>
              <input
                id={`${id}-company`}
                tabIndex={-1}
                autoComplete="off"
                value={values.company}
                onChange={set('company')}
              />
            </div>

            <div className="cform__row">
              <Field id={`${id}-name`} label="Your name" required error={errors.name}>
                <input
                  id={`${id}-name`}
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={set('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${id}-name-err` : undefined}
                  placeholder="Jamie Rivera"
                />
              </Field>
              <Field id={`${id}-email`} label="Email" required error={errors.email}>
                <input
                  id={`${id}-email`}
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={set('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${id}-email-err` : undefined}
                  placeholder="you@email.com"
                />
              </Field>
            </div>

            <div className="cform__row">
              <Field id={`${id}-phone`} label="Phone" hint="Optional">
                <input
                  id={`${id}-phone`}
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={set('phone')}
                  placeholder="(646) 555-0100"
                />
              </Field>
              <Field id={`${id}-petName`} label="Pet’s name" hint="Optional">
                <input
                  id={`${id}-petName`}
                  type="text"
                  value={values.petName}
                  onChange={set('petName')}
                  placeholder="Biscuit"
                />
              </Field>
            </div>

            <div className="cform__row">
              <Field id={`${id}-petType`} label="Pet type" required error={errors.petType}>
                <div className="cform__select">
                  <select
                    id={`${id}-petType`}
                    value={values.petType}
                    onChange={set('petType')}
                    aria-invalid={Boolean(errors.petType)}
                    aria-describedby={errors.petType ? `${id}-petType-err` : undefined}
                  >
                    <option value="" disabled>Choose…</option>
                    {PET_TYPES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </Field>
              <Field id={`${id}-service`} label="Service interested in" required error={errors.service}>
                <div className="cform__select">
                  <select
                    id={`${id}-service`}
                    value={values.service}
                    onChange={set('service')}
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={errors.service ? `${id}-service-err` : undefined}
                  >
                    <option value="" disabled>Choose…</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </Field>
            </div>

            <Field id={`${id}-message`} label="Message" required error={errors.message}>
              <textarea
                id={`${id}-message`}
                rows={4}
                value={values.message}
                onChange={set('message')}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? `${id}-message-err` : undefined}
                placeholder="Tell us about your pet and what you’re looking for…"
              />
            </Field>

            <button className="btn btn--block cform__submit" type="submit" disabled={status === 'sending'}>
              <span>
                {status === 'sending' ? (
                  <>
                    <Loader2 size={18} className="spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send message <Send size={17} className="btn-arrow" />
                  </>
                )}
              </span>
            </button>
            <p className="cform__disclaimer">
              Concept preview. This form validates and confirms, but doesn’t send data anywhere.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({ id, label, required, hint, error, children }) {
  return (
    <div className={`cfield ${error ? 'has-error' : ''}`}>
      <label htmlFor={id} className="cfield__label">
        {label}
        {required ? <span className="cfield__req" aria-hidden="true"> *</span> : null}
        {hint ? <span className="cfield__hint">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p className="cfield__err" id={`${id}-err`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
