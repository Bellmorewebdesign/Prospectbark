# ProspectBArk! — Website Redesign Concept

A high-end, interactive redesign concept for **ProspectBArk!**, an award-winning,
women-owned Brooklyn pet-care company (dog daycare · dog walking · pet sitting,
serving the neighborhood since 2010).

Built as a fast, fully static frontend — **React + Vite + Framer Motion** — that
runs anywhere, including GitHub Pages, with **no backend, no API keys, and no
environment variables required to view it.**

> This is a design concept. Booking and contact forms validate and confirm with a
> polished in-mockup notice; in production they would connect to ProspectBArk!'s
> existing systems. No data is sent anywhere.

## Run locally

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Deploy to GitHub Pages (deploy from a branch)

The production build is committed to the **`docs/`** folder, so GitHub Pages can
serve it straight from the branch — no Actions, no build server.

In the repo: **Settings → Pages → Build and deployment → Source → Deploy from a
branch**, then choose your branch and set the folder to **`/docs`**. Save.

It works at any repo sub-path because the app uses **relative asset paths**
(`base: './'`) and **hash routing**, so there are no 404s on refresh.

After changing any source, rebuild and commit `docs/`:

```bash
npm run build   # regenerates docs/
git add docs && git commit -m "Rebuild site" && git push
```

## Design system (derived from the logo)

| Role            | Colour                              |
| --------------- | ----------------------------------- |
| Pine (primary)  | `#1b3a2a` — from the PROSPECT outline |
| Gold (accent)   | `#cd923f` — from the logo frame       |
| Terracotta      | `#b8482a` — from the cat / brick      |
| Cream (paper)   | `#faf6ec`                            |
| Ink (text)      | `#17251c`                            |

Type: **Fraunces** (editorial display) + **Inter** (UI), loaded from Google Fonts
with system fallbacks so nothing breaks offline.

## Structure

```
index.html            SEO, Open Graph, LocalBusiness structured data, fonts
src/
  main.jsx            entry
  App.jsx             hash router + layout
  index.css           design tokens, reset, primitives
  components.css      section & component styles
  components/         Navbar, Hero, Services, BrandStory, Reviews, Footer, …
  pages/              Home, Contact, ContactForm
  context/            MockupContext + MockupModal (the "concept preview" notice)
  hooks/              count-up, magnetic buttons, scroll, scroll-lock
  data/               verified company info & content
  assets/             web-optimised photography (WebP)
design/source-photos/ original full-resolution uploads (not shipped in the build)
```

Highlights: masked hero headline reveal, arched "portal" photography, sticky
scroll-storytelling, animated count-up stats, photo marquees, magnetic buttons,
a custom desktop cursor, an animated full-screen mobile menu, and a giant
typographic footer — all respecting `prefers-reduced-motion` and keyboard
accessibility.

## Accuracy

Only client-supplied facts are stated as such (address, phone, email, 4.8★ / 129
Google reviews, established 2010, the three services, and the women-owned /
Asian-owned / LGBTQ+-friendly attributes). Testimonials are shown as clearly
labelled **preview slots** rather than invented quotes; prices, hours beyond
"closes 7 PM", and unverified claims are intentionally omitted.
