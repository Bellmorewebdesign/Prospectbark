import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Camera, GraduationCap } from 'lucide-react'

const SCENARIOS = [
  {
    question: 'Your pet needs someone experienced.',
    answer: 'A trained team.',
    body: 'Current ProspectBArk roles include paid training and paid industry certifications. The company also lists pet first aid certification.',
    source: 'Current public careers page and official Instagram',
    icon: GraduationCap,
  },
  {
    question: 'You hand over your keys.',
    answer: 'Bonded and insured.',
    body: 'ProspectBArk publicly identifies the company as bonded and insured, so there is a business standing behind each visit.',
    source: 'Current official ProspectBArk materials',
    icon: BadgeCheck,
  },
  {
    question: 'You are away from home.',
    answer: 'Updates you can count on.',
    body: 'Public reviews repeatedly mention receiving photos and videos during daycare. You can stay connected while your pet is with the team.',
    source: 'Themes found in public reviews',
    icon: Camera,
  },
  {
    question: 'Care needs a steady hand.',
    answer: 'Support behind every visit.',
    body: 'ProspectBArk hires for full-time caregiver roles with field support and benefits. Caregivers have a team behind them.',
    source: 'Current public careers page',
    icon: BriefcaseBusiness,
  },
]

export default function PeaceOfMind({ onGetStarted }) {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const scenario = SCENARIOS[active]
  const Icon = scenario.icon

  return (
    <section className="peace section" aria-labelledby="peace-title">
      <div className="shell peace__head">
        <p className="kicker">Why pet parents choose us</p>
        <h2 id="peace-title">You're busy.<br /><em>They're covered.</em></h2>
        <p>Loving dogs is the start. Knowing whom to trust with yours is the bigger question.</p>
      </div>

      <div className="shell peace__machine">
        <div className="peace__questions" role="tablist" aria-label="Trust scenarios">
          {SCENARIOS.map((item, index) => (
            <button key={item.question} className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} role="tab" aria-selected={index === active}>
              <span>0{index + 1}</span>
              <strong>{item.question}</strong>
              <i>+</i>
            </button>
          ))}
        </div>
        <div className="peace__answer" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div key={scenario.answer} initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Icon size={44} strokeWidth={1.3} />
              <p>ProspectBArk's answer</p>
              <h3>{scenario.answer}</h3>
              <span>{scenario.body}</span>
              <small>{scenario.source}</small>
            </motion.div>
          </AnimatePresence>
          <button className="button button--gold" onClick={onGetStarted}>Let's talk <ArrowRight size={17} /></button>
        </div>
      </div>
    </section>
  )
}
