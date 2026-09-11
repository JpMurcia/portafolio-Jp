import type { Certification } from '../../types'

// TODO(specs/04-task-roadmap.md Fase 0): todos los `credentialUrl` son
// placeholders (`href="#"` en el prototipo). Reemplazar por las URLs reales
// de verificación de LinkedIn Learning / Platzi / AWS / SCRUMstudy / UBA
// IALAB antes de dar la sección de Certifications por terminada.
export const certifications: Certification[] = [
  {
    issuerInitials: 'AWS',
    title: 'AWS Cloud Practitioner Essentials (Second Edition)',
    issuer: 'Amazon Web Services',
    date: 'Enero 2022',
    credentialUrl: null,
    featured: true,
  },
  {
    issuerInitials: 'SCR',
    title: 'Scrum Fundamentals Certified',
    issuer: 'SCRUMstudy',
    date: 'Enero 2022',
    credentialUrl: null,
    featured: true,
  },
  {
    issuerInitials: 'UBA',
    title: 'Módulo Gobernanza de Datos',
    issuer: 'UBA IALAB',
    date: 'Marzo 2022',
    credentialUrl: null,
  },
  {
    issuerInitials: 'PLZ',
    title: 'NestJS: Persistencia de Datos con TypeORM',
    issuer: 'Platzi',
    date: 'Junio 2022',
    credentialUrl: null,
  },
  {
    issuerInitials: 'PLZ',
    title: 'Curso Profesional de Git y GitHub',
    issuer: 'Platzi',
    date: 'Mayo 2022',
    credentialUrl: null,
  },
  {
    issuerInitials: 'PLZ',
    title: 'Fundamentos de Ingeniería de Software',
    issuer: 'Platzi',
    date: 'Mayo 2022',
    credentialUrl: null,
  },
  {
    issuerInitials: 'IN',
    title: 'Power BI avanzado',
    issuer: 'LinkedIn Learning',
    date: 'Marzo 2021',
    credentialUrl: null,
  },
  {
    issuerInitials: 'IN',
    title: 'Data scientist: Minería de datos esencial',
    issuer: 'LinkedIn Learning',
    date: 'Abril 2021',
    credentialUrl: null,
  },
  {
    issuerInitials: 'IN',
    title: 'Fundamentos de programación: Diseño orientado a objetos',
    issuer: 'LinkedIn Learning',
    date: 'Mayo 2021',
    credentialUrl: null,
  },
]

// Lista colapsable "Otros cursos completados" (MoreCoursesToggle) — visible
// por defecto en el prototipo (showAllCourses: true), con opción de ocultarla.
export const moreCourses: string[] = [
  'Data scientist: Azure ML y Power BI para minería de datos · LinkedIn · abr 2021',
  'Fundamentos esenciales de la programación · LinkedIn · may 2021',
  'Power BI para principiantes: Análisis de datos · LinkedIn · nov 2020',
  'Introducción a la Nube con Azure · Platzi · dic 2021',
  'Curso Básico de Python · Platzi · oct 2021',
  'Introducción a la Terminal y Línea de Comandos · Platzi · abr 2022',
  'Bitcoin y Blockchain · Platzi · mar 2022',
  'Inglés Básico A1 · Platzi · abr 2022',
]
