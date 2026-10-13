import type { FeaturedProduct } from '../../types'

// TODO(SyTix): completar `role`, `stack`, `highlights` y `link` cuando el
// caso de estudio esté redactado. Cada campo opcional aparece en la tarjeta
// solo cuando tiene contenido; no hay nada que cambiar en el componente.
// Antes de publicar, confirmar con Synergy Work qué se puede mostrar.
export const featuredProduct: FeaturedProduct = {
  id: 'sytix',
  name: 'SyTix',
  tagline: 'Producto desarrollado para Synergy Work',
  company: 'Synergy Work',
  status: 'Caso de estudio en preparación',
  summary:
    'Una de las aplicaciones que he desarrollado en Synergy Work. Estoy preparando su caso de estudio con arquitectura, decisiones de diseño y diagramas conceptuales con datos ficticios, igual que los demás casos de esta página.',
}
