import type { FeaturedProduct } from '../../types'

// High-level description of SyTix: general processes and how it works. It
// deliberately does NOT include security (authentication, permissions,
// infrastructure), client data or internal operational details. Juan Pablo
// confirmed there is no problem with the app and the company being publicly known.
// TODO(SyTix): add `link` if a public version ever exists.
export const featuredProduct: FeaturedProduct = {
  id: 'sytix',
  name: 'SyTix',
  tagline: 'Product of Synergy Work',
  company: 'Synergy Work',
  status: 'Private access',
  summary:
    "Internal ticketing and task-management system for Synergy Work's consulting team, which I've worked on. It organizes work from the client down to the subtask, tracks response times with SLAs that respect the team's real availability, and leaves an auditable history of every case. A general overview of how it works, with no operational data.",
  role: 'System administrator and, at times, ticket Resolver.',
  flows: [
    {
      title: 'Ticket process',
      steps: ['New', 'Contact or Pre-analysis', 'In analysis', 'In execution', 'Resolved', 'Closed'],
      note: 'Every status change is triggered by a structured comment, not free text, so the history is always consistent. If information is missing, the ticket moves to "Pending user" and carries on once the user replies.',
    },
    {
      title: 'How the SLA works',
      steps: ['Limit per project and priority', 'Contact phase', 'Analysis and execution phase', 'Met or Overdue'],
      note: "The counter only runs while the assignee is available: it respects working hours, holidays and approved absences, and it pauses while the ticket waits for the user's reply.",
    },
  ],
  stack: ['Python · Flask', 'PostgreSQL', 'Celery · Redis', 'React · TypeScript', 'Ant Design', 'Docker'],
  highlights: [
    "One place for the team's work: from the client → project → ticket hierarchy to the real time spent on each case.",
    'Lifecycle driven by a state machine, with defined transitions and an auditable history of every change.',
    'SLA per project and priority that only measures the time the assignee can actually work.',
    "Assignment with suggestions based on each person's workload and availability.",
    'Built with spec-driven development: 130+ specifications validated before implementation.',
  ],
}
