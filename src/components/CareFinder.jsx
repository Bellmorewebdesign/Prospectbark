import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import MotionOrnament from './ui/MotionOrnament.jsx'
import { ArrowLeft, ArrowRight, Cat, Dog, RotateCcw } from 'lucide-react'

const PLANS = [
  { id: 'work', label: "I'm at work" },
  { id: 'away', label: "I'm going away" },
  { id: 'energy', label: 'They need to burn some energy' },
  { id: 'social', label: 'I want them to socialize' },
  { id: 'check', label: 'I need someone to check in' },
]

const ROUTES = {
  daycare: { route: '/daycare', label: 'See daycare' },
  walking: { route: '/walking', label: 'See dog walking' },
  sitting: { route: '/pet-sitting', label: 'See pet sitting' },
}

function recommend(pet, plan) {
  if (pet === 'cat') return 'sitting'
  if (plan === 'energy' || plan === 'social') return 'daycare'
  if (plan === 'work') return 'walking'
  return 'sitting'
}

export default function CareFinder({ onNav, onGetStarted }) {
  const [step, setStep] = useState(0)
  const [pet, setPet] = useState('')
  const [plan, setPlan] = useState('')
  const reduce = useReducedMotion()
  const result = useMemo(() => (pet && plan ? recommend(pet, plan) : ''), [pet, plan])
  const service = ROUTES[result]

  const choosePet = (value) => {
    setPet(value)
    setPlan('')
    setStep(1)
  }
  const choosePlan = (value) => {
    setPlan(value)
    setStep(2)
  }
  const reset = () => {
    setPet('')
    setPlan('')
    setStep(0)
  }

  return (
    <section className="care-finder section" id="care-finder" aria-labelledby="care-finder-title">
      <MotionOrnament />
      <div className="shell care-finder__shell">
        <div className="care-finder__intro">
          <p className="kicker">Find their perfect day</p>
          <h2 id="care-finder-title">What does<br />your pet need<br /><em>today?</em></h2>
          <p>Two quick questions will point you in the right direction.</p>
          <div className="care-finder__steps" aria-label={`Step ${Math.min(step + 1, 3)} of 3`}>
            {[0, 1, 2].map((item) => <span key={item} className={item <= step ? 'is-on' : ''} />)}
          </div>
        </div>

        <div className="care-finder__stage">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div key="pet" className="care-panel" {...panelMotion(reduce)}>
                <span className="care-panel__number">01</span>
                <p className="care-panel__prompt">Who are we caring for?</p>
                <div className="pet-choices">
                  <button onClick={() => choosePet('dog')}>
                    <Dog size={54} strokeWidth={1.35} />
                    <strong>Dog</strong>
                    <span>Daycare, walks or visits</span>
                    <ArrowRight size={20} />
                  </button>
                  <button onClick={() => choosePet('cat')}>
                    <Cat size={54} strokeWidth={1.35} />
                    <strong>Cat</strong>
                    <span>Care at home</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            ) : step === 1 ? (
              <motion.div key="plan" className="care-panel" {...panelMotion(reduce)}>
                <button className="care-panel__back" onClick={() => setStep(0)}><ArrowLeft size={16} /> Back</button>
                <span className="care-panel__number">02</span>
                <p className="care-panel__prompt">What's the plan?</p>
                <div className="plan-choices">
                  {PLANS.map((item, index) => (
                    <button key={item.id} onClick={() => choosePlan(item.id)}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{item.label}</strong>
                      <ArrowRight size={18} />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="result" className={`care-result care-result--${result}`} {...panelMotion(reduce)}>
                <span className="care-panel__number">03</span>
                <p>Our read</p>
                <h3>{result === 'daycare' ? 'Sounds like a daycare day.' : result === 'walking' ? 'A good walk could change the day.' : 'Pet sitting keeps home feeling like home.'}</h3>
                <p className="care-result__note">
                  This is a place to start. The ProspectBArk team can help you figure out what works best.
                </p>
                <div className="care-result__actions">
                  <button className="button button--cream" onClick={() => onNav({ route: service.route })}>{service.label} <ArrowRight size={17} /></button>
                  <button className="text-link text-link--light" onClick={onGetStarted}>Start an inquiry</button>
                </div>
                <button className="care-result__reset" onClick={reset}><RotateCcw size={15} /> Start again</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function panelMotion(reduce) {
  return {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: -16 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }
}
