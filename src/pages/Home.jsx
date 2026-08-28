import Hero from '../components/Hero.jsx'
import TrustStrip from '../components/TrustStrip.jsx'
import CareFinder from '../components/CareFinder.jsx'
import DayStory from '../components/DayStory.jsx'
import ServiceRunway from '../components/ServiceRunway.jsx'
import PeaceOfMind from '../components/PeaceOfMind.jsx'
import Reviews from '../components/Reviews.jsx'
import PackWall from '../components/PackWall.jsx'
import BrooklynRoots from '../components/BrooklynRoots.jsx'
import InstagramCarousel from '../components/InstagramCarousel.jsx'
import FinalInvite from '../components/FinalInvite.jsx'

export default function Home({ onNav, onGetStarted }) {
  return (
    <main id="main">
      <Hero
        onFindCare={() => onNav({ target: 'care-finder' })}
        onMeet={() => onNav({ route: '/about' })}
      />
      <TrustStrip />
      <CareFinder onNav={onNav} onGetStarted={onGetStarted} />
      <DayStory />
      <ServiceRunway onNav={onNav} onGetStarted={onGetStarted} />
      <PeaceOfMind onGetStarted={onGetStarted} />
      <Reviews />
      <PackWall />
      <BrooklynRoots />
      <InstagramCarousel />
      <FinalInvite onGetStarted={onGetStarted} />
    </main>
  )
}
