import type { HeroContent } from '../../types'

// La fila "Enlaces" (LinkedIn / GitHub) de la tabla de stats del prototipo se
// arma en el componente Hero a partir de `contact.ts`, no se duplica aquí.
export const hero: HeroContent = {
  location: 'Florencia, Caquetá · Colombia',
  headline: ['Software', 'Developer'],
  lead: 'I build the bridge between systems that were never meant to talk to each other: web applications, corporate ERPs, and plant-floor hardware.',
  subcopy:
    'Systems Engineer from Universidad de la Amazonia. Since 2021 at Synergy Work, integrating in-house applications with Oracle Applications Cloud through APEX, REST, and SOAP, and modeling the reporting layer in Oracle Analytics.',
  stats: [
    {
      label: 'Current role',
      value: 'Development Engineer',
      detail: 'Synergy Work · 2021 — present',
    },
    { label: 'Experience', value: 'Since 2019' },
    { label: 'Core stack', value: ['Oracle APEX · PL/SQL', 'React · NestJS · .NET'] },
    { label: 'Integration', value: ['REST · SOAP · Socket', 'COM serial port'] },
    {
      label: 'Education',
      value: 'Systems Engineering',
      detail: 'Universidad de la Amazonia',
    },
  ],
}
