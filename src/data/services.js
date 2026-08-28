import daycareImg from '../assets/group_of-dogs.webp'
import walkingImg from '../assets/happy_dawg.webp'
import sittingImg from '../assets/kittycat.webp'
import birthdayImg from '../assets/birthday_dogo.webp'
import huskyImg from '../assets/husky.webp'
import facilityImg from '../assets/authentic/daycare-play.webp'

export const SERVICES = [
  {
    id: 'daycare',
    route: '/daycare',
    number: '01',
    short: 'Daycare',
    name: 'Dog Daycare',
    headline: 'Big day. Big nap later.',
    intro: 'A full day of play, rest and familiar faces, with a team keeping an eye on the details.',
    image: daycareImg,
    secondaryImage: facilityImg,
    alt: 'A group of dogs looking up together at ProspectBArk daycare',
    tone: 'gold',
  },
  {
    id: 'walking',
    route: '/walking',
    number: '02',
    short: 'Walking',
    name: 'Dog Walking',
    headline: 'Brooklyn blocks. Better days.',
    intro: 'A dependable break in the day from trained caregivers who know the neighborhood.',
    image: walkingImg,
    secondaryImage: huskyImg,
    alt: 'A happy dog on a walk in Brooklyn',
    tone: 'clay',
  },
  {
    id: 'sitting',
    route: '/pet-sitting',
    number: '03',
    short: 'Pet Sitting',
    name: 'Pet Sitting',
    headline: 'Their routine. Their home. Real care.',
    intro: 'For dogs and cats who are happiest at home while their people are away.',
    image: sittingImg,
    secondaryImage: birthdayImg,
    alt: 'A calm cat resting at home',
    tone: 'teal',
  },
]

export const SERVICE_BY_ROUTE = Object.fromEntries(SERVICES.map((service) => [service.route, service]))
