import type { CvContent } from '../../types'

// Content exclusive to the PDF CV (scripts/build-cv.mjs). Everything about Claude
// Code and spec-driven development comes from this same repository (specs/,
// CLAUDE.md, commit history): nothing is claimed that it doesn't back up.
export const cv: CvContent = {
  headline: 'Software Developer · Systems Engineer',
  summary:
    'Systems Engineer with experience since 2019 in web and mobile applications, integration with corporate ERPs (Oracle Applications Cloud) through Oracle APEX, REST APIs and SOAP, and reporting in Oracle Analytics. I work both ends of the stack: React and Ionic interfaces, NestJS and .NET backends, and the data layer in Oracle (PL/SQL) and PostgreSQL. I use Claude Code in my development workflow, with up-front specifications, verifiable task plans and human review of every change.',
  currentRoleExtra: [
    "Administrator of SyTix, the company's internal ticketing system with SLAs, and ticket resolver when needed.",
    'AI-assisted development with Claude Code: specifications, task plans and verification (tsc, lint and build) before publishing.',
  ],
  aiTitle: 'AI-assisted development',
  aiBullets: [
    'Claude Code as a development assistant: I specify, plan, steer and review; the AI implements task by task, one commit per change.',
    'Spec-driven development: vision, design system, architecture and roadmap in writing before coding.',
    'Project rules in CLAUDE.md, plus skills and agents, to keep things consistent (i18n, paths, confidentiality).',
    'Interactive architecture and flow diagrams generated with the archify skill.',
  ],
  extraSkillGroups: [
    {
      title: 'AI-assisted development',
      items: ['Claude Code', 'Spec-driven development', 'CLAUDE.md', 'Skills & agents', 'Archify (diagrams)'],
    },
  ],
  projects: [
    {
      name: 'Professional portfolio',
      detail:
        'Bilingual (ES/EN) site with light/dark theme in React 19, TypeScript, Vite and Tailwind CSS; built with Claude Code and specifications. Deployed on GitHub Pages.',
      url: 'jpmurcia.github.io/portafolio-Jp',
    },
    {
      name: 'Cacao Adventure',
      detail: 'Educational video game in Unity, C# and SQLite: 3D modeling, development and documentation. Published on Google Play.',
    },
  ],
  labels: {
    summary: 'Professional summary',
    experience: 'Work experience',
    education: 'Education',
    skills: 'Technical skills',
    ai: 'AI-assisted development',
    certifications: 'Certifications & courses',
    projects: 'Projects',
    present: 'Present',
    portfolio: 'Portfolio',
  },
}
