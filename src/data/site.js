export const SITE = {
  name: 'ProspectBArk!',
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
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=ProspectBArk%21%20578%205th%20Ave%20Brooklyn%20NY%2011215',
  // Combined across all review platforms. Display the total only.
  // The single source for every rating on the site: the hero, trust strip,
  // reviews section, and (via scripts/site-meta.js) the share description and
  // structured data in index.html.
  //
  // NOT YET VERIFIED. 4.9 / 312 replaced the originally supplied 4.8 / 129 in
  // September as a combined cross-platform figure; which platforms and on what
  // date has not been documented. Confirm with the client, then set verified to
  // true. Until then the schema.org AggregateRating is left out of the
  // structured data (the visible figures are unchanged).
  rating: {
    stars: 4.9,
    reviews: 312,
    verified: false,
    href: 'https://www.google.com/search?q=ProspectBArk%21+578+5th+Ave+Brooklyn+NY+reviews',
  },
  social: {
    instagram: { handle: '@prospectbark', href: 'https://www.instagram.com/prospectbark/' },
    daycare: {
      handle: '@prospectbark_daycare',
      href: 'https://www.instagram.com/prospectbark_daycare/',
    },
    facebook: { handle: 'ProspectBArk!', href: 'https://www.facebook.com/prospectbark' },
  },
  attributes: ['Women-Owned', 'Asian-Owned', 'LGBTQ+ Friendly'],
}

export const NAV_LINKS = [
  { label: 'Daycare', route: '/daycare' },
  { label: 'Walking', route: '/walking' },
  { label: 'Pet Sitting', route: '/pet-sitting' },
  { label: 'Vacation Care', route: '/vacation-care' },
  { label: 'About', route: '/about' },
  { label: 'Reviews', target: 'reviews' },
  { label: 'Contact', route: '/contact' },
]
