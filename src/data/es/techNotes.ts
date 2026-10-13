import type { TechNote } from '../../types'

// Notas en borrador (estado "Borrador"): se publican como temas en preparación.
// Cuando una se redacte, cambiar su `status` y enlazar el texto.
export const techNotes: TechNote[] = [
  {
    category: 'Integración',
    title: 'Idempotencia en integraciones con ERP SaaS',
    description: 'Por qué la clave de negocio la debe generar el origen y no el destino.',
    status: 'Borrador',
  },
  {
    category: 'Oracle APEX',
    title: 'APEX como capa de integración, no como interfaz',
    description: 'Un uso poco discutido de la herramienta y cuándo tiene sentido.',
    status: 'Borrador',
  },
  {
    category: 'Hardware',
    title: 'Del puerto serial al navegador sin mentirle al usuario',
    description: 'Estados de lectura y por qué «sin conexión» es mejor que un número viejo.',
    status: 'Borrador',
  },
]
