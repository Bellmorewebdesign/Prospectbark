import birthday from '../assets/birthday_dogo.webp'
import group from '../assets/group_of-dogs.webp'
import husky from '../assets/husky.webp'
import dog from '../assets/happy_dawg.webp'
import cat from '../assets/kittycat.webp'
import play from '../assets/authentic/daycare-play.webp'
import team from '../assets/authentic/daycare-team.webp'
import { SITE } from './site.js'

// ---------------------------------------------------------------------------
// PLACEHOLDER Instagram posts for the homepage carousel.
//
// These use photos already in the repo so the section is ready to show. When
// the real posts are available, replace each entry:
//   image -> the post's image
//   href  -> the post permalink (https://www.instagram.com/p/XXXXXXXX/)
//   alt   -> a short factual description of the photo
//
// A real Instagram feed or API response can be mapped into this same shape
// later without changing the carousel component.
//
// Captions, like counts and comment counts are intentionally left out so
// nothing is invented. They can be added here when real data is connected.
// ---------------------------------------------------------------------------

export const IG_ACCOUNT = SITE.social.daycare

export const IG_POSTS = [
  { id: 'ig-1', image: play, alt: 'Dogs playing inside the ProspectBArk daycare', href: IG_ACCOUNT.href },
  { id: 'ig-2', image: birthday, alt: 'A dog celebrating a birthday at daycare', href: IG_ACCOUNT.href },
  { id: 'ig-3', image: husky, alt: 'A husky out on a walk', href: IG_ACCOUNT.href },
  { id: 'ig-4', image: group, alt: 'ProspectBArk daycare dogs looking up together', href: IG_ACCOUNT.href },
  { id: 'ig-5', image: cat, alt: 'A cat relaxing at home', href: IG_ACCOUNT.href },
  { id: 'ig-6', image: team, alt: 'ProspectBArk team members inside the daycare', href: IG_ACCOUNT.href },
  { id: 'ig-7', image: dog, alt: 'A happy dog outside in Brooklyn', href: IG_ACCOUNT.href },
]
