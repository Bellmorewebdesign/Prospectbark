# Topaz Shaded (PROSPECT wordmark)

Status: **waiting on licence confirmation.** The font file is deliberately not in
this repository, which is public.

## What is in place

- `src/index.css` declares `@font-face { font-family: 'Topaz Shaded' }` with
  `local()` sources only, so a computer with the client's `Topaz Shaded.otf`
  installed renders it and nothing is downloaded.
- `src/brandFont.js` adds `has-wordmark-font` to `<html>` only once that face has
  actually loaded. The Topaz rules (`.has-wordmark-font .wordmark`) hang off that
  class, so everyone without the font sees the current Outfit lettering with its
  current spacing.
- Applied only to the word PROSPECT where it is display lettering: the footer
  wordmark and the outlined brand type behind the homepage hero (`.wordmark`).
  Inline mentions of the business name in body copy stay in Outfit, and BARK
  stays in Outfit because the logo sets it in a different, wide-tracked sans.
- `.gitignore` blocks `*.otf` and `public/fonts/` so the file cannot be
  committed by accident.

## Preview it locally

1. Install `Topaz Shaded.otf` on your computer (double-click it, then Install).
2. `npm run dev`, open the site, and look at the footer and the hero.

## Once web embedding is licensed

1. Convert the OTF to WOFF2 (e.g. `pip install fonttools brotli`, then
   `fonttools ttLib.woff2 compress "Topaz Shaded.otf" -o public/fonts/topaz-shaded.woff2`).
2. Remove the `public/fonts/` line from `.gitignore` (keep `*.otf`).
3. Append `url('/fonts/topaz-shaded.woff2') format('woff2')` to the `src:` list in
   `src/index.css`.
4. Check the tracking in `.has-wordmark-font .wordmark` (`letter-spacing: 0.02em`
   is a placeholder) against the logo artwork, then `npm run build`.

## Not usable: `topaz_new.zip`

The zip at the repo root contains **Topaz New** (`Topaznew.ttf`, Alan Tinsley,
1997), not Topaz Shaded. It is a monospaced recreation of the Amiga system font,
and its readme limits use to home users and non-profits, non-commercial only.
It is not the wordmark face and must not be used on this site.
