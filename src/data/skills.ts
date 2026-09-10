import type { SkillCategory } from '../types'

// Agrupación real del prototipo (4 categorías) — ver specs/04-task-roadmap.md
// Fase 0 sobre la posible reagrupación a 5 categorías, aún sin decidir.
export const skillCategories: SkillCategory[] = [
  {
    title: 'Lenguajes',
    skills: [
      { id: 'plsql', label: 'PL/SQL' },
      { id: 'sql', label: 'SQL' },
      { id: 'csharp', label: 'C#' },
      { id: 'js', label: 'JavaScript' },
      { id: 'ts', label: 'TypeScript' },
      { id: 'python', label: 'Python' },
    ],
  },
  {
    title: 'Datos y BI',
    skills: [
      { id: 'oracle', label: 'Oracle DB' },
      { id: 'analytics', label: 'Oracle Analytics / BI' },
      { id: 'postgres', label: 'PostgreSQL' },
      { id: 'mysql', label: 'MySQL' },
      { id: 'sqlite', label: 'SQLite' },
      { id: 'powerbi', label: 'Power BI' },
    ],
  },
  {
    title: 'Frameworks y herramientas',
    skills: [
      { id: 'apex', label: 'Oracle APEX' },
      { id: 'react', label: 'React' },
      { id: 'nest', label: 'NestJS · TypeORM' },
      { id: 'node', label: 'Node.js · Express' },
      { id: 'dotnet', label: '.NET · Ext.NET' },
      { id: 'ionic', label: 'Ionic' },
      { id: 'unity', label: 'Unity' },
      { id: 'aws', label: 'AWS' },
    ],
  },
  {
    title: 'Integración y método',
    skills: [
      { id: 'rest', label: 'API REST' },
      { id: 'soap', label: 'SOAP' },
      { id: 'socket', label: 'Socket · Serial COM' },
      { id: 'swagger', label: 'Swagger' },
      { id: 'git', label: 'Git · TFS' },
      { id: 'scrum', label: 'Scrum' },
    ],
  },
]
