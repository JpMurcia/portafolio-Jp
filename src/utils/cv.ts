import type { Language } from '../context/language-context'

export type CvFormat = 'harvard' | 'ats' | 'visual'

/** Ruta del PDF generado por `npm run cv` (scripts/build-cv.mjs), según formato e idioma. */
export function cvHref(format: CvFormat, language: Language) {
  return `${import.meta.env.BASE_URL}assets/cv/CV-Juan-Pablo-Murcia-${format}-${language}.pdf`
}

/** Primera versión del CV, tal como se publicó: solo en español y sin regenerar. */
export const ORIGINAL_CV_HREF = `${import.meta.env.BASE_URL}assets/CV-Juan-Pablo-Murcia-Cortes.pdf`
