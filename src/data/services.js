import daycareImg from '../assets/group_of-dogs.webp'
import walkingImg from '../assets/happy_dawg.webp'
import sittingImg from '../assets/kittycat.webp'

// Service copy is descriptive of the service categories the client offers.
// No prices, guarantees, or unverified specifics are stated as fact.
export const SERVICES = [
  {
    id: 'daycare',
    index: '01',
    name: 'Dog Daycare',
    kicker: 'The clubhouse',
    blurb:
      'A supervised, social day in the neighborhood — playgroups matched by size and temperament, rest built into the rhythm, and a happily tired pup at pickup.',
    points: ['Matched playgroups', 'Nap & downtime', 'Photo updates'],
    image: daycareImg,
    alt: 'A group of five happy dogs looking up together at ProspectBArk! daycare',
    accent: 'var(--gold-500)',
  },
  {
    id: 'walking',
    index: '02',
    name: 'Dog Walking',
    kicker: 'On the leash',
    blurb:
      'Reliable walks that keep tails wagging and routines intact — around the block or all the way to the park, with a walker your dog is genuinely glad to see.',
    points: ['Solo & small group', 'Consistent walkers', 'Park adventures'],
    image: walkingImg,
    alt: 'A smiling black Labrador on a walk across a Brooklyn footbridge',
    accent: 'var(--clay-500)',
  },
  {
    id: 'sitting',
    index: '03',
    name: 'Pet Sitting',
    kicker: 'Home comforts',
    blurb:
      'Dogs, cats, and the occasional small friend — cared for on their own turf while you travel. Same food, same couch, same schedule, minus the stress.',
    points: ['In-home visits', 'Cats welcome', 'Travel-friendly'],
    image: sittingImg,
    alt: 'A calm tortoiseshell cat with green eyes resting at home',
    accent: 'var(--pine-600)',
  },
]
