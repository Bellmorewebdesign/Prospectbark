// Layered opening-logo assets.
//
// The three PNGs the studio supplied (full lockup / stars / tagline) share one
// 6912x3456 canvas, so the layers are perfectly registered. A build-time script
// split them into three kinds of piece and recorded every position as a
// percentage of the lockup's bounding box:
//
//   logo-mark.webp     the 16 + pets + PROSPECT BARK lockup (stars removed)
//   star-NN.webp       each star on its own, so they can twinkle individually
//   logo-tagline.webp  DOG WALKS - DAYCARE - BATHS - PET SITS
//
// Because every piece is placed with percentages inside one aspect-ratio box,
// the whole lockup scales to any screen and stays pixel-accurate to the source.
import manifest from '../assets/brand/manifest.json'
import markUrl from '../assets/brand/logo-mark.webp'
import taglineUrl from '../assets/brand/logo-tagline.webp'

const starModules = import.meta.glob('../assets/brand/star-*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const starUrlByName = Object.fromEntries(
  Object.entries(starModules).map(([path, url]) => [path.split('/').pop(), url]),
)

export const LOGO_RATIO = `${manifest.box.w} / ${manifest.box.h}`

export const LOGO_MARK = { url: markUrl, ...manifest.mark }
export const LOGO_TAGLINE = { url: taglineUrl, ...manifest.tagline }

export const LOGO_STARS = manifest.stars.map((star, index) => ({
  ...star,
  id: index,
  url: starUrlByName[star.src],
}))
