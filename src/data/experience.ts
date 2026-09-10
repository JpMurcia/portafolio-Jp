import type { TimelineEntry } from '../types'

export const experience: TimelineEntry[] = [
  {
    period: '2021-07 — Actualidad',
    current: true,
    role: 'Ingeniero de Desarrollo',
    company: 'Synergy Work',
    bullets: [
      'Creación de la aplicación web InfoMetal con JavaScript y React.',
      'Integración de InfoMetal con el ERP Oracle Applications Cloud.',
      'Conexión con hardware mediante puerto serial COM, comunicación socket y Express hacia la aplicación web.',
      'Creación de aplicaciones de integración con Oracle APEX: conexiones con BI, servicios SOAP y API REST.',
      'Creación de reportes BI con modelos SQL de Oracle Analytics.',
      'Aplicaciones móviles con Ionic: lectura de QR e impresión de tiquetes en equipos Zebra.',
    ],
    tags: ['React', 'Oracle APEX', 'REST · SOAP', 'Oracle Analytics', 'Express · Socket', 'Ionic'],
  },
  {
    period: '2021-06 — 2022-06',
    role: 'Técnico administrativo',
    company: 'Universidad de la Amazonia',
    bullets: [
      'Levantamiento de requerimientos con las áreas usuarias.',
      'Soporte al sistema «Chaira», incluidos los módulos de contratación.',
      'Mantenimiento, limpieza y refactorización de código en C# y Ext.NET, y de procedimientos, funciones y tipos en la base de datos Oracle.',
      'Desarrollo de nuevas funcionalidades con .NET.',
      'Generación de reportes y plantillas dentro del sistema.',
    ],
    tags: ['C# · .NET', 'Ext.NET', 'Oracle · PL/SQL'],
  },
  {
    period: '2020-10 — 2020-12',
    role: 'Desarrollador de software',
    company: 'Universidad de la Amazonia',
    bullets: [
      'Desarrollo de una APK con C# y SQLite en Unity para el proyecto «Gestor comunitario de selva», con diseño de la interfaz gráfica.',
      'Diseño y creación de las bases de datos móvil y web; PostgreSQL para la plataforma web.',
      'Servicios web del backend con NestJS y TypeORM, documentados con Swagger.',
      'Despliegue del backend en servidor Ubuntu y soporte del servidor web.',
    ],
    tags: ['NestJS · TypeORM', 'PostgreSQL', 'Unity · C#', 'Swagger'],
  },
  {
    period: '2019-08 — 2019-11',
    role: 'Desarrollador',
    company: 'Compuelectrónica',
    bullets: ['Diseño de base de datos.', 'Desarrollo móvil.'],
    tags: [],
  },
  {
    period: '2018-01 — 2018-04',
    role: 'Desarrollo y modelado de videojuego 3D',
    company: 'Universidad de la Amazonia',
    bullets: [
      'Modelado y texturizado de assets, entornos y personajes 3D; creación de texturas y mapeado de objetos.',
      'Desarrollo en Unity y base de datos SQLite.',
      'Documentación: historias de usuario y modelado de proceso.',
    ],
    tags: [],
  },
]
