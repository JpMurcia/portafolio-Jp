import type { FeaturedProduct } from '../../types'

// Descripción de alto nivel de SyTix: procesos generales y cómo funciona. A
// propósito NO incluye seguridad (autenticación, permisos, infraestructura),
// datos de clientes ni detalles operativos internos. Juan Pablo confirmó que no
// hay problema en que la app y la empresa sean conocidas.
// TODO(SyTix): agregar `link` si algún día existe una versión pública.
export const featuredProduct: FeaturedProduct = {
  id: 'sytix',
  name: 'SyTix',
  tagline: 'Producto de Synergy Work',
  company: 'Synergy Work',
  status: 'Acceso privado',
  summary:
    'Sistema interno de tickets y gestión de tareas del equipo de consultoría de Synergy Work, en el que he trabajado. Organiza el trabajo desde el cliente hasta la subtarea, vigila los tiempos de atención con SLA que respetan la disponibilidad real del equipo y deja un historial auditable de cada caso. Descripción general del funcionamiento, sin datos operativos.',
  role: 'Administrador del sistema y, en ocasiones, Resolutor de tickets.',
  flows: [
    {
      title: 'Proceso del ticket',
      steps: ['Nuevo', 'Contacto o Pre-análisis', 'En análisis', 'En ejecución', 'Resuelto', 'Cerrado'],
      note: 'Cada cambio de estado lo dispara un comentario estructurado, no texto libre: el historial queda siempre consistente. Si falta información, el ticket pasa a «Pendiente de usuario» y sigue su curso cuando el usuario responde.',
    },
    {
      title: 'Cómo funciona el SLA',
      steps: ['Límite por proyecto y prioridad', 'Fase de contacto', 'Fase de análisis y ejecución', 'Cumplido o Vencido'],
      note: 'El contador solo corre mientras el responsable está disponible: respeta horario laboral, festivos y ausencias aprobadas, y se pausa mientras el ticket espera respuesta del usuario.',
    },
  ],
  stack: ['Python · Flask', 'PostgreSQL', 'Celery · Redis', 'React · TypeScript', 'Ant Design', 'Docker'],
  highlights: [
    'Un solo lugar para el trabajo del equipo: de la jerarquía cliente → proyecto → ticket al tiempo real dedicado a cada caso.',
    'Ciclo de vida guiado por una máquina de estados, con transiciones definidas y un historial auditable de cada cambio.',
    'SLA por proyecto y prioridad que mide solo el tiempo en que el responsable realmente puede trabajar.',
    'Asignación con sugerencias según la carga de trabajo y la disponibilidad de cada persona.',
    'Construido con desarrollo guiado por especificaciones: más de 130 especificaciones validadas antes de implementarse.',
  ],
}
