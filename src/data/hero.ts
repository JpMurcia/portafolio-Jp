import type { HeroContent } from '../types'

// La fila "Enlaces" (LinkedIn / GitHub) de la tabla de stats del prototipo se
// arma en el componente Hero a partir de `contact.ts`, no se duplica aquí.
export const hero: HeroContent = {
  location: 'Florencia, Caquetá · Colombia',
  headline: ['Desarrollador', 'de Software'],
  lead: 'Construyo el puente entre sistemas que no fueron hechos para hablarse: aplicaciones web, ERP corporativos y hardware de planta.',
  subcopy:
    'Ingeniero de Sistemas de la Universidad de la Amazonia. Desde 2021 en Synergy Work integrando aplicaciones propias con Oracle Applications Cloud mediante APEX, REST y SOAP, y modelando la capa de reportes en Oracle Analytics.',
  stats: [
    {
      label: 'Rol actual',
      value: 'Ingeniero de Desarrollo',
      detail: 'Synergy Work · 2021 — hoy',
    },
    { label: 'Experiencia', value: 'Desde 2019' },
    { label: 'Núcleo técnico', value: ['Oracle APEX · PL/SQL', 'React · NestJS · .NET'] },
    { label: 'Integración', value: ['REST · SOAP · Socket', 'Puerto serial COM'] },
    {
      label: 'Formación',
      value: 'Ingeniería de Sistemas',
      detail: 'Universidad de la Amazonia',
    },
  ],
}
