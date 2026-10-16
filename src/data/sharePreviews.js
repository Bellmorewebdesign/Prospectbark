// Link-preview variants for comparing share thumbnails (text message, social).
//
// Each entry becomes its own static page at <site>/share/<id>/ with its own
// Open Graph tags, built by scripts/site-meta.js. Link previews are cached per
// URL by Messages, WhatsApp, Facebook and the rest, so every variant needs a
// distinct URL. Changing a React component or adding a ?query does not reliably
// change what a phone shows.
//
// To add a client thumbnail:
//   1. Put the file in public/share/ (1200x630 PNG or JPEG, ideally under 300 KB).
//   2. Add an entry below with a new id. Never reuse an id or overwrite a file
//      that has already been shared: phones will keep showing the old image.
//   3. npm run build, push, then text yourself <site>/share/<id>/.
// Entries whose image is not in public/ yet are skipped with a build warning, so
// a missing file can never publish a broken preview.
//
// Optional per entry: title, description (default to SHARE_DEFAULTS).

// The homepage's own share title and description. The review figures are
// appended at build time from SITE.rating so they always match the page.
export const SHARE_DEFAULTS = {
  title: 'ProspectBArk! | NYC Premium Pet Care Since 2010',
  description: 'Dog daycare, dog walking, pet sitting and vacation care across NYC since 2010.',
}

export const SHARE_PREVIEWS = [
  {
    id: 'current',
    image: 'og-image.jpg',
    alt: 'A husky looking up at the camera on an autumn path',
    label: 'The original husky image',
  },
  {
    id: '17-years',
    image: 'share-17-years.jpg',
    alt: 'ProspectBArk! 17 Years logo with a beagle and an orange cat',
    label: 'The first 17 Years image (more teal around the logo)',
  },
  {
    id: '17-years-zoom',
    image: 'share-17-years-zoom.jpg',
    alt: 'ProspectBArk! 17 Years logo with a beagle and an orange cat',
    label: 'The zoomed-in 17 Years image on solid teal',
  },
  {
    id: '17-years-blue',
    image: 'share-17-years-blue.jpg',
    alt: 'ProspectBArk! 17 Years logo with a beagle and an orange cat',
    label: 'The 17 Years image on a blue gradient',
  },
  {
    id: '17-years-white',
    image: 'share-17-years-white.jpg',
    alt: 'ProspectBArk! 17 Years logo with a beagle and an orange cat',
    label: 'The 17 Years image on white',
  },
  {
    id: '17-years-gradient',
    image: 'share-17-years-gradient.jpg',
    alt: 'ProspectBArk! 17 Years logo with a beagle and an orange cat',
    label: 'The 17 Years image on a blue gradient (v2)',
  },
  {
    id: '17-years-purple',
    image: 'share-17-years-purple.jpg',
    alt: 'ProspectBArk! 17 Years logo with a beagle and an orange cat',
    label: 'The 17 Years image on a blue-to-purple gradient',
  },
  {
    id: '17-years-teal',
    image: 'share-17-years-teal.jpg',
    alt: 'ProspectBArk! 17 Years logo with a beagle and an orange cat',
    label: 'The 17 Years image on dark teal the site uses today',
  },
  // { id: 'a', image: 'share/option-a.png', alt: '…', label: 'Client option A' },
]
