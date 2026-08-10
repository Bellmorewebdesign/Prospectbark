import { ArrowRight } from 'lucide-react'
import dog from '../assets/husky.webp'

export default function FinalInvite({ onGetStarted }) {
  return (
    <section className="final-invite" aria-labelledby="final-invite-title" data-cursor-dark>
      <img src={dog} alt="A happy husky ready for a Brooklyn walk" loading="lazy" />
      <div className="final-invite__shade" />
      <div className="shell final-invite__copy">
        <p className="kicker kicker--light">Start here</p>
        <h2 id="final-invite-title">Let's find<br />the right care.</h2>
        <button className="button button--gold" onClick={onGetStarted}>Tell us about your pet <ArrowRight size={18} /></button>
      </div>
    </section>
  )
}
