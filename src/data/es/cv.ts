import type { CvContent } from '../../types'

// Contenido exclusivo del CV en PDF (scripts/build-cv.mjs). Lo de Claude Code y
// el desarrollo guiado por especificaciones sale de este mismo repositorio
// (specs/, CLAUDE.md, historial de commits): no se afirma nada que no respalde.
export const cv: CvContent = {
  headline: 'Desarrollador de Software · Ingeniero de Sistemas',
  summary:
    'Ingeniero de Sistemas con experiencia desde 2019 en aplicaciones web y móviles, integración con ERP corporativos (Oracle Applications Cloud) mediante Oracle APEX, API REST y SOAP, y reportes en Oracle Analytics. Trabajo ambos extremos del stack: interfaces en React e Ionic, backends en NestJS y .NET, y la capa de datos en Oracle (PL/SQL) y PostgreSQL. Integro Claude Code en mi flujo de desarrollo con especificaciones previas, planes de tareas verificables y revisión humana de cada cambio.',
  currentRoleExtra: [
    'Administrador de SyTix, sistema interno de tickets con SLA de la empresa, y Resolutor de tickets cuando se requiere.',
    'Desarrollo asistido por IA con Claude Code: especificaciones, planes de tareas y verificación (tsc, lint y build) antes de publicar.',
  ],
  aiTitle: 'Desarrollo asistido por IA',
  aiBullets: [
    'Claude Code como asistente de desarrollo: yo especifico, planifico, dirijo y reviso; la IA implementa tarea por tarea con un commit por cambio.',
    'Desarrollo guiado por especificaciones: visión, sistema de diseño, arquitectura y hoja de ruta por escrito antes de programar.',
    'Reglas del proyecto en CLAUDE.md, más skills y agentes, para mantener consistencia (i18n, rutas, confidencialidad).',
    'Diagramas de arquitectura y flujos interactivos generados con la skill archify.',
  ],
  extraSkillGroups: [
    {
      title: 'Desarrollo asistido por IA',
      items: ['Claude Code', 'Desarrollo guiado por especificaciones', 'CLAUDE.md', 'Skills y agentes', 'Archify (diagramas)'],
    },
  ],
  projects: [
    {
      name: 'Portafolio profesional',
      detail:
        'Sitio bilingüe (ES/EN) con tema claro/oscuro en React 19, TypeScript, Vite y Tailwind CSS; desarrollado con Claude Code y especificaciones. Desplegado en GitHub Pages.',
      url: 'jpmurcia.github.io/portafolio-Jp',
    },
    {
      name: 'Cacao Adventure',
      detail: 'Videojuego didáctico en Unity, C# y SQLite: modelado 3D, desarrollo y documentación. Publicado en Google Play.',
    },
  ],
  labels: {
    summary: 'Resumen profesional',
    experience: 'Experiencia laboral',
    education: 'Educación',
    skills: 'Habilidades técnicas',
    ai: 'Desarrollo asistido por IA',
    certifications: 'Certificaciones y cursos',
    projects: 'Proyectos',
    present: 'Actualidad',
    portfolio: 'Portafolio',
    contact: 'Contacto',
  },
}
