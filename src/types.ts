// Modelo de datos del portafolio — ver specs/03-component-architecture.md §4.

export interface HeroStat {
  label: string
  /**
   * String: una línea. string[]: varias líneas con el mismo estilo (p.ej.
   * "Núcleo técnico" en el prototipo parte la lista de tecnologías en dos
   * renglones sin distinguirlos visualmente). Combinar con `detail` solo
   * tiene sentido cuando `value` es un string simple.
   */
  value: string | string[]
  detail?: string
}

export interface HeroContent {
  location: string
  /** Cada elemento es un renglón forzado del H1 (el prototipo usa <br> entre "Desarrollador" y "de Software"). */
  headline: string[]
  lead: string
  subcopy: string
  stats: HeroStat[]
}

export interface AboutPrinciple {
  title: string
  body: string
}

export interface AboutContent {
  paragraphs: string[]
  principles: AboutPrinciple[]
}

export interface Skill {
  id: string
  label: string
}

export interface SkillCategory {
  title: string
  skills: Skill[]
}

export interface CaseStudyMetaStat {
  label: string
  value: string
}

export interface CaseStudyDecision {
  decision: string
  discarded: string
  why: string
}

export interface CaseStudyCriterion {
  title: string
  body: string
}

export interface CaseStudyImplementationDetail {
  title: string
  code: string
  note?: string
}

/**
 * Los diagramas de casos de uso y arquitectura son HTML interactivos (archify)
 * servidos desde `public/diagrams/` y embebidos vía `DiagramEmbed`, compuestos
 * por caso en `Projects.tsx` — no se modelan como datos aquí (son 3 casos
 * fijos, no un catálogo abierto; ver specs/04-task-roadmap.md Fase 0).
 */
export interface CaseStudy {
  id: string
  number: string
  tags: string[]
  title: string
  summary: string
  skills: string[]
  metaStats: CaseStudyMetaStat[]
  /** El Caso 03 no tiene bloque "El problema" en el prototipo — el resumen ya lo cubre. */
  problem?: string
  constraints?: string[]
  /** Texto de apoyo bajo el encabezado "Casos de uso" (varía por caso). */
  useCaseNote: string
  /** Encabezado real de la sección de diagrama de flujo/arquitectura (varía: "Arquitectura y flujo de datos" / "Flujo de trabajo" / "Arquitectura"). */
  architectureHeading: string
  architectureNote?: string
  /** Grilla "Falla: ..." — solo presente en el Caso 01. */
  failureModes?: CaseStudyCriterion[]
  /**
   * El prototipo usa dos formatos distintos según el caso, no uno uniforme:
   * - `decisionsTable` — tabla de 3 columnas (Decisión / Alternativa descartada / Por qué),
   *   solo presente en el Caso 01 ("Decisiones de diseño").
   * - `criteria` — pares título + explicación, sin alternativa descartada
   *   (Caso 02 "Criterios que apliqué", Caso 03 "Decisiones"). `criteriaStyle`
   *   distingue cómo se renderiza cada uno en el prototipo: Caso 02 es una
   *   grilla de 3 tarjetas con borde; Caso 03 es una lista con viñetas y
   *   arranque en negrita.
   * `decisionsHeading` guarda el título real de la sección tal como aparece en el HTML.
   *
   * `decisionsPlacement` distingue DÓNDE vive el bloque: 'section' (Caso 01 y
   * 02) es una sección propia de ancho completo antes de Implementación /
   * Resultado. 'finalGrid' (Caso 03) significa que no hay sección aparte ni
   * "Resultado": Decisiones ocupa directamente la mitad izquierda de la
   * grilla final, junto a "Qué aprendí".
   */
  decisionsHeading: string
  decisionsPlacement?: 'section' | 'finalGrid'
  decisionsTable?: CaseStudyDecision[]
  criteria?: CaseStudyCriterion[]
  criteriaStyle?: 'grid' | 'list'
  implementation: CaseStudyImplementationDetail[]
  /** El Caso 03 no tiene sección "Resultado" en el prototipo — solo Decisiones + Qué aprendí. */
  outcome?: string[]
  outcomeNote?: string
  learnings: string[]
}

export interface OtherProjectLink {
  href: string
  label: string
}

export interface OtherProject {
  title: string
  subtitle: string
  description: string
  link?: OtherProjectLink
  status?: string
}

export interface TimelineEntry {
  period: string
  current?: boolean
  role: string
  company: string
  bullets: string[]
  tags: string[]
}

export interface Degree {
  category: string
  title: string
  institution: string
  location: string
  dateRange: string
}

export interface Certification {
  issuerInitials: string
  title: string
  issuer: string
  date: string
  /** TODO(specs/04 Fase 0): reemplazar por la URL real de verificación. */
  credentialUrl: string | null
  featured?: boolean
}

export interface Repo {
  name: string
  href: string
  language: string
  description: string
}

export interface TechNote {
  category: string
  title: string
  description: string
  status: string
}

export interface SiteMeta {
  title: string
  description: string
}

export interface ContactInfo {
  email: string
  phone: string
  phoneDisplay: string
  linkedinUrl: string
  linkedinLabel: string
  githubUrl: string
  githubLabel: string
  location: string
  locationNote: string
}
