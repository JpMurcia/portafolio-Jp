import type { Repo } from '../../types'

// Section hidden by default in the prototype (showGithub: false) — see
// specs/04-task-roadmap.md Phase 0. The data is kept ready in case it's
// decided to publish it.
export const githubRepos: Repo[] = [
  {
    name: 'finance-backend',
    href: 'https://github.com/JpMurcia/finance-backend',
    language: 'TypeScript',
    description:
      'Backend for a financial application. Where my accounting training from SENA meets service development.',
  },
  {
    name: 'Jp_asig_2018-S2',
    href: 'https://github.com/JpMurcia/Jp_asig_2018-S2',
    language: 'PLpgSQL',
    description:
      'Procedural SQL on PostgreSQL. The same discipline I later applied to PL/SQL packages in Oracle.',
  },
  {
    name: 'proyecto_web_2018',
    href: 'https://github.com/JpMurcia/proyecto_web_2018',
    language: 'JavaScript',
    description: 'Training web project. Starting point of the frontend work I do in React today.',
  },
]
