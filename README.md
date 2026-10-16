# ProspectBArk! Website Redesign

An interactive redesign concept for ProspectBArk!, a Brooklyn pet care company offering dog daycare, dog walking and pet sitting.

The site is built with React, Vite and Framer Motion. It is fully static, uses no API keys and can run on GitHub Pages.

The inquiry form is a demo. It validates entries and shows a confirmation, but does not send or store form data.

## Run locally

```bash
npm install
npm run dev
```

Create the production build with:

```bash
npm run build
```

The build is written to `docs/` for the repository's existing GitHub Pages setup.

## Pages

- Home
- Dog daycare
- Dog walking
- Pet sitting
- About
- Contact

The app uses hash routes so every page works on GitHub Pages without server rewrites.

## Main interactions

- Care finder with service recommendations
- Interactive daycare timeline
- Expandable trust and safety details
- Mobile navigation
- Six-step inquiry form
- Keyboard-friendly dialog with focus management
- Reduced-motion support

## Project structure

```text
index.html          Page metadata (share tags and structured data are filled at build)
scripts/site-meta.js  Build step for share tags, structured data and share previews
src/App.jsx         Routing and shared layout
src/index.css       Design tokens and global styles
src/components.css  Component and responsive styles
src/components/     Homepage and shared components
src/pages/          Service, about and contact pages
src/data/           Business details and service content
src/assets/         Optimized site photography
docs/               Production build for GitHub Pages
```

## Content notes

The site does not invent review quotes, pricing or opening hours. Current hours and public reviews are linked to their live listings.

**Review figures need verification.** Every rating on the site (hero, trust strip, reviews section, share description) reads `SITE.rating` in `src/data/site.js`, currently 4.9 stars across 312 reviews, described as a combined total across review platforms. That replaced the originally supplied 4.8 / 129 in September, and its sources and date are not documented. Until the client confirms it and `verified` is set to `true`, the schema.org `AggregateRating` is left out of the structured data.

## Share previews

Link previews (text messages, WhatsApp, Facebook) are read from static HTML, never from the React app, and phones cache them per URL. `scripts/site-meta.js` fills the homepage's Open Graph tags and structured data from `src/data` at build time, with absolute URLs, and builds one page per entry in `src/data/sharePreviews.js` at `share/<id>/`, each with its own image and URL, so thumbnail options can be compared side by side. Instructions for adding an option are at the top of that file.

The absolute URLs default to the GitHub Pages address. To build for another domain, run `SITE_URL=https://example.com/ npm run build`.

## Brand font

The Topaz Shaded wordmark face is set up but its file is not committed until web embedding is licensed. See `design/BRAND-FONT.md`.
