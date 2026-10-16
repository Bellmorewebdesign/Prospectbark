// Turns on the Topaz Shaded wordmark only when the real font is available.
//
// The @font-face in index.css has local() sources only until the web licence is
// confirmed, so on most machines the font simply is not there. Rather than let
// the wordmark fall back mid-rule, `has-wordmark-font` goes on <html> once the
// face has actually loaded, and the Topaz rules hang off that class.
export function detectWordmarkFont() {
  if (typeof document === 'undefined' || !document.fonts?.load) return
  document.fonts
    .load('1em "Topaz Shaded"')
    .then((faces) => {
      if (faces.some((face) => face.status === 'loaded')) {
        document.documentElement.classList.add('has-wordmark-font')
      }
    })
    .catch(() => {})
}
