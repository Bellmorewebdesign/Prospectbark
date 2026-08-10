// ------------------------------------------------------------------
// Verified ProspectBArk! business information.
// Only facts supplied by the client live here — nothing is invented.
// ------------------------------------------------------------------

export const SITE = {
  name: 'ProspectBArk!',
  tagline: 'Brooklyn pet care since 2010',
  established: 2010,
  phone: '(646) 377-1575',
  phoneHref: 'tel:+16463771575',
  email: 'frontdesk@prospectbark.com',
  emailHref: 'mailto:frontdesk@prospectbark.com',
  website: 'prospectbark.com',
  websiteHref: 'https://prospectbark.com',
  address: {
    street: '578 5th Ave',
    city: 'Brooklyn',
    region: 'NY',
    zip: '11215',
    full: '578 5th Ave, Brooklyn, NY 11215',
  },
  // Directions link is generic Google Maps search — no API key required.
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=ProspectBArk%21%20578%205th%20Ave%20Brooklyn%20NY%2011215',
  rating: {
    stars: 4.8,
    reviews: 129,
    // Public Google search link — safe fallback when no verified review URL exists.
    href:
      'https://www.google.com/search?q=ProspectBArk%21+578+5th+Ave+Brooklyn+NY+reviews',
  },
  hours: 'Open today · closes 7 PM',
  social: {
    instagram: { handle: '@prospectbark', href: 'https://www.instagram.com/prospectbark/' },
    facebook: { handle: 'ProspectBArk!', href: 'https://www.facebook.com/prospectbark' },
  },
  attributes: ['Women-Owned', 'Asian-Owned', 'LGBTQ+ Friendly'],
}

export const NAV_LINKS = [
  { label: 'Services', target: 'services' },
  { label: 'Why ProspectBArk!', target: 'why' },
  { label: 'About', target: 'about' },
  { label: 'Reviews', target: 'reviews' },
  { label: 'Contact', route: '/contact' },
]
