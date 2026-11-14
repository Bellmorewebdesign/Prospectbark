// Layered opening-logo assets.
//
// design/extract-logo-layers.py cuts the client's 17 Years opening logo
// (design/source-photos/17yrs_back_transparent.png) into three kinds of piece and recorded every position as a
// percentage of the lockup's bounding box:
//
//   logo-mark.webp     the 17 Years + pets + PROSPECT BARK lockup (stars removed)
//   star-NN.webp       each star on its own, so they can twinkle individually
//   logo-tagline.webp  DOG WALKS - DAYCARE - BATHS - PET SITS
//   plate              not an image: the rectangle of the PROSPECT plate, so
//                      the loader can put a light backing behind it
//
// Because every piece is placed with percentages inside one aspect-ratio box,
// the whole lockup scales to any screen and stays pixel-accurate to the source.
import manifest from '../assets/brand/manifest.json'
import taglineUrl from '../assets/brand/logo-tagline.webp'

// The mark lives in public/ rather than src/assets/ so index.html can preload
// it by a stable, un-hashed path. It is the one piece worth racing against the
// JS bundle; the stars and tagline appear later in the sequence, so they can go
// through the normal hashed-asset pipeline.
const markUrl = `${import.meta.env.BASE_URL}brand/logo-mark.webp`

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
export const LOGO_PLATE = manifest.plate

export const LOGO_STARS = manifest.stars.map((star, index) => ({
  ...star,
  id: index,
  url: starUrlByName[star.src],
}))
