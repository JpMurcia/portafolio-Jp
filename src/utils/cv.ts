import type { Language } from '../context/language-context'

export type CvFormat = 'harvard' | 'ats'

/** Ruta del PDF generado por `npm run cv` (scripts/build-cv.mjs), según formato e idioma. */
export function cvHref(format: CvFormat, language: Language) {
  return `${import.meta.env.BASE_URL}assets/cv/CV-Juan-Pablo-Murcia-${format}-${language}.pdf`
}
