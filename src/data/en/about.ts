import type { AboutContent } from '../../types'

export const about: AboutContent = {
  paragraphs: [
    "I identify processes that still run manually and systems that don't expose the information needed to integrate them. I gather the requirement with whoever runs the process, design the integration layer, and stay involved until the flow runs on its own and is auditable.",
    'I have worked both ends of the stack: interfaces in React and Ionic, backends in NestJS and .NET, and the part that is least visible but carries the most weight — procedures, functions, and types in Oracle, SQL models for Oracle Analytics, and service contracts toward a corporate ERP.',
    'Before studying Systems Engineering, I trained in accounting for commercial and financial operations at SENA. That explains why I move comfortably in accounting integrations: I understand the process I am automating, not just the endpoint.',
  ],
  principles: [
    {
      title: 'Traceability before speed',
      body: 'An integration without a log or reprocessing path is not finished, no matter how fast it runs.',
    },
    {
      title: 'The process rules the stack',
      body: 'I gather the requirement with whoever runs it before choosing the tool.',
    },
    {
      title: 'Documenting is part of the job',
      body: 'User stories, process modeling, and an API documented with Swagger.',
    },
  ],
}
