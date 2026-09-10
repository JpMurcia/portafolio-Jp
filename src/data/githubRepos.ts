import type { Repo } from '../types'

// Sección oculta por defecto en el prototipo (showGithub: false) — ver
// specs/04-task-roadmap.md Fase 0. El dato se deja listo por si se decide
// publicarla.
export const githubRepos: Repo[] = [
  {
    name: 'finance-backend',
    href: 'https://github.com/JpMurcia/finance-backend',
    language: 'TypeScript',
    description:
      'Backend de una aplicación financiera. El cruce entre mi formación contable del SENA y el desarrollo de servicios.',
  },
  {
    name: 'Jp_asig_2018-S2',
    href: 'https://github.com/JpMurcia/Jp_asig_2018-S2',
    language: 'PLpgSQL',
    description:
      'SQL procedural sobre PostgreSQL. La misma disciplina que después apliqué a paquetes PL/SQL en Oracle.',
  },
  {
    name: 'proyecto_web_2018',
    href: 'https://github.com/JpMurcia/proyecto_web_2018',
    language: 'JavaScript',
    description: 'Proyecto web de formación. Punto de partida del trabajo de front que hoy hago en React.',
  },
]
