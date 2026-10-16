import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import siteMeta from './scripts/site-meta.js'

// Where this build is served. Link-preview crawlers need absolute URLs for
// og:image and og:url. Defaults to the GitHub Pages address; for a launch on
// the real domain build with `SITE_URL=https://prospectbark.com/ npm run build`.
const SITE_URL = process.env.SITE_URL || 'https://bellmorewebdesign.github.io/Prospectbark/'

// Relative base keeps the build portable on GitHub Pages regardless of the
// repository name / sub-path. Combined with hash routing this means the site
// works when served from https://<user>.github.io/<repo>/ with no 404s on
// refresh and no hardcoded absolute paths.
export default defineConfig({
  base: './',
  plugins: [react(), siteMeta({ siteUrl: SITE_URL })],
  build: {
    // Output into /docs so GitHub Pages "Deploy from a branch → /docs" serves
    // the built site directly (no Actions step required).
    outDir: 'docs',
    emptyOutDir: true,
    target: 'es2019',
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
  },
})
