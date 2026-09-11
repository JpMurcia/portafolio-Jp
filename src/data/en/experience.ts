import type { TimelineEntry } from '../../types'

export const experience: TimelineEntry[] = [
  {
    period: '2021-07 — Present',
    current: true,
    role: 'Development Engineer',
    company: 'Synergy Work',
    bullets: [
      'Built the InfoMetal web application with JavaScript and React.',
      'Integrated InfoMetal with the Oracle Applications Cloud ERP.',
      'Connected to hardware via COM serial port, with socket communication and Express relaying data to the web application.',
      'Built Oracle APEX integration applications: connections to BI, SOAP services, and REST APIs.',
      'Created BI reports with SQL models in Oracle Analytics.',
      'Mobile applications with Ionic: QR code scanning and ticket printing on Zebra devices.',
    ],
    tags: ['React', 'Oracle APEX', 'REST · SOAP', 'Oracle Analytics', 'Express · Socket', 'Ionic'],
  },
  {
    period: '2021-06 — 2022-06',
    role: 'Administrative Technician',
    company: 'Universidad de la Amazonia',
    bullets: [
      'Gathered requirements with the user departments.',
      'Supported the "Chaira" system, including the procurement modules.',
      'Maintained, cleaned up, and refactored code in C# and Ext.NET, along with procedures, functions, and types in the Oracle database.',
      'Developed new features with .NET.',
      'Generated reports and templates within the system.',
    ],
    tags: ['C# · .NET', 'Ext.NET', 'Oracle · PL/SQL'],
  },
  {
    period: '2020-10 — 2020-12',
    role: 'Software Developer',
    company: 'Universidad de la Amazonia',
    bullets: [
      'Developed an APK with C# and SQLite in Unity for the "Rainforest Community Manager" project, including the graphical interface design.',
      'Designed and built the mobile and web databases; PostgreSQL for the web platform.',
      'Backend web services with NestJS and TypeORM, documented with Swagger.',
      'Deployed the backend on an Ubuntu server and provided web server support.',
    ],
    tags: ['NestJS · TypeORM', 'PostgreSQL', 'Unity · C#', 'Swagger'],
  },
  {
    period: '2019-08 — 2019-11',
    role: 'Developer',
    company: 'Compuelectrónica',
    bullets: ['Database design.', 'Mobile development.'],
    tags: [],
  },
  {
    period: '2018-01 — 2018-04',
    role: '3D Video Game Development and Modeling',
    company: 'Universidad de la Amazonia',
    bullets: [
      'Modeled and textured 3D assets, environments, and characters; created textures and object mapping.',
      'Development in Unity with a SQLite database.',
      'Documentation: user stories and process modeling.',
    ],
    tags: [],
  },
]
