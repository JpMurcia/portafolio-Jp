import type { AboutContent } from '../../types'

export const about: AboutContent = {
  paragraphs: [
    'Identifico procesos que aún funcionan de forma manual y sistemas que no exponen la información necesaria para integrarlos. Levanto el requerimiento con quien opera el proceso, diseño la capa de integración y acompaño el desarrollo hasta que el flujo corre de forma autónoma y es auditable.',
    'He trabajado los dos extremos del stack: interfaces en React e Ionic, backends en NestJS y .NET, y la parte que menos se ve pero más sostiene — procedimientos, funciones y tipos en Oracle, modelos SQL para Oracle Analytics y contratos de servicio hacia un ERP corporativo.',
    'Antes de estudiar Ingeniería de Sistemas me formé en contabilización de operaciones comerciales y financieras en el SENA. Eso explica por qué me muevo con soltura en integraciones contables: entiendo el proceso que estoy automatizando, no solo el endpoint.',
  ],
  principles: [
    {
      title: 'Trazabilidad antes que velocidad',
      body: 'Una integración sin bitácora ni reproceso no está terminada, por rápido que corra.',
    },
    {
      title: 'El proceso manda sobre el stack',
      body: 'Levanto el requerimiento con quien lo opera antes de elegir la herramienta.',
    },
    {
      title: 'Documentar es parte del trabajo',
      body: 'Historias de usuario, modelado de proceso y API documentada con Swagger.',
    },
  ],
}
