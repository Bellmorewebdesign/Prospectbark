// The business name is set in the brand face everywhere it appears as text
// (see --font-brand in index.css). Copy that lives in data files is plain
// strings, so this splits the name out of a sentence and wraps just that part,
// leaving the rest of the sentence in the body font.
const NAME = /(ProspectBArk)/g

export default function brandName(text) {
  if (!text) return text
  return String(text)
    .split(NAME)
    .map((part, index) => (part === 'ProspectBArk' ? <span className="brand" key={index}>{part}</span> : part))
}
