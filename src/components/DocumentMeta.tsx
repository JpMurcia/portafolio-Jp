import { useEffect } from 'react'
import { useContent } from '../context/useContent'

// Mantiene <title> y las meta tags de descripción/OG en sync con el idioma
// activo. Los valores iniciales en index.html (ES) cubren a los crawlers que
// no ejecutan JS (Facebook/WhatsApp); esto solo mejora la pestaña del navegador.
export function DocumentMeta() {
  const { meta } = useContent()

  useEffect(() => {
    document.title = meta.title

    const selectors = [
      'meta[name="description"]',
      'meta[property="og:title"]',
      'meta[property="og:description"]',
      'meta[name="twitter:title"]',
      'meta[name="twitter:description"]',
    ]

    for (const selector of selectors) {
      const tag = document.querySelector(selector)
      if (!tag) continue
      const isDescription = selector.includes('description')
      tag.setAttribute('content', isDescription ? meta.description : meta.title)
    }
  }, [meta])

  return null
}
