import Hero from '../components/Hero.jsx'
import TrustStrip from '../components/TrustStrip.jsx'
import Services from '../components/Services.jsx'
import BrandStory from '../components/BrandStory.jsx'
import WhyProspectBark from '../components/WhyProspectBark.jsx'
import PhotoExperience from '../components/PhotoExperience.jsx'
import Reviews from '../components/Reviews.jsx'
import InstagramCarousel from '../components/InstagramCarousel.jsx'
import About from '../components/About.jsx'
import ContactCTA from '../components/ContactCTA.jsx'
import FAQ from '../components/FAQ.jsx'

export default function Home({ onExplore, onContact, onGetStarted }) {
  return (
    <main id="main">
      <Hero onExplore={onExplore} onContact={onContact} />
      <TrustStrip />
      <Services />
      <BrandStory />
      <WhyProspectBark onContact={onContact} />
      <PhotoExperience />
      <Reviews />
      <InstagramCarousel />
      <About onContact={onContact} />
      <FAQ onContact={onContact} />
      <ContactCTA onContact={onContact} />
    </main>
  )
}
