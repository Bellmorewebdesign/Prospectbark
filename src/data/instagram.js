import huskyImg from '../assets/husky.webp'
import groupImg from '../assets/group_of-dogs.webp'
import birthdayImg from '../assets/birthday_dogo.webp'
import catImg from '../assets/kittycat.webp'
import dawgImg from '../assets/happy_dawg.webp'
import { SITE } from './site.js'

// ---------------------------------------------------------------------------
// PLACEHOLDER Instagram content for the homepage carousel.
//
// These are sample cards built from photos already in the repo so the layout
// is ready to demo. To wire up the real feed later, replace each entry:
//   • image → the post's thumbnail (a real @prospectbark post image)
//   • href  → the post permalink, e.g. https://www.instagram.com/p/XXXXXXXX/
//   • alt   → a short factual description of the photo
// A real Instagram feed / API response can be mapped into this same shape
// without touching the carousel component itself.
//
// No captions, like counts, or other engagement metrics are included here on
// purpose — those should come from the real posts, not be invented.
// ---------------------------------------------------------------------------

export const IG_PROFILE = SITE.social.instagram // { handle: '@prospectbark', href: ... }

export const IG_POSTS = [
  { id: 'ig-1', image: huskyImg, alt: 'A husky on an autumn walk by the water', href: IG_PROFILE.href },
  { id: 'ig-2', image: groupImg, alt: 'A group of daycare dogs looking up at the camera', href: IG_PROFILE.href },
  { id: 'ig-3', image: birthdayImg, alt: 'A grinning dog in a birthday bandana on the daycare turf', href: IG_PROFILE.href },
  { id: 'ig-4', image: catImg, alt: 'A tortoiseshell cat resting comfortably at home', href: IG_PROFILE.href },
  { id: 'ig-5', image: dawgImg, alt: 'A smiling black Labrador on a Brooklyn footbridge', href: IG_PROFILE.href },
  { id: 'ig-6', image: groupImg, alt: 'Daycare regulars gathered together indoors', href: IG_PROFILE.href },
]
