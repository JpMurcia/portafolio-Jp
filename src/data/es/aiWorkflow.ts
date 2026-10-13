import type { AiWorkflowStep } from '../../types'

// Cada paso apunta a evidencia real de este repositorio: no se describe nada
// que el historial de git o las carpetas del proyecto no respalden.
export const aiWorkflowSteps: AiWorkflowStep[] = [
  {
    number: '01',
    title: 'Especificar',
    body: 'Antes de escribir código dejo por escrito qué se construye y por qué: visión, sistema de diseño, arquitectura de componentes y hoja de ruta. La IA trabaja contra un documento, no contra una idea suelta.',
    artifacts: ['specs/01–05'],
  },
  {
    number: '02',
    title: 'Planificar',
    body: 'Cada especificación se convierte en un plan de tareas pequeñas, ordenadas y verificables. Así cada cambio se puede revisar, y revertir, por separado.',
    artifacts: ['docs/…/plans/'],
  },
  {
    number: '03',
    title: 'Implementar',
    body: 'Claude Code ejecuta el plan tarea por tarea, con un commit por cambio: por ejemplo, la traducción de un componente por commit. Yo dirijo, reviso y corrijo el rumbo.',
    artifacts: ['commits atómicos'],
  },
  {
    number: '04',
    title: 'Verificar',
    body: 'Nada se da por terminado sin comprobarlo: tsc, lint y build limpios, y revisión manual en ES/EN. Los hallazgos de la revisión final se aplican antes de publicar.',
    artifacts: ['tsc', 'oxlint', 'build'],
  },
]

export const aiWorkflowTools = ['Claude Code', 'Desarrollo guiado por especificaciones', 'Skills y agentes', 'CLAUDE.md']
