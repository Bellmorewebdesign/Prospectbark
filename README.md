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
index.html          Page metadata and structured data
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

The site uses the supplied 4.8 rating and 129-review count. It does not invent review quotes, pricing or opening hours. Current hours and public reviews are linked to their live listings.
