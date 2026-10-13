import type { AiWorkflowStep } from '../../types'

// Each step points to real evidence in this repository: nothing is described
// that git history or the project folders don't back up.
export const aiWorkflowSteps: AiWorkflowStep[] = [
  {
    number: '01',
    title: 'Specify',
    body: "Before writing code I put in writing what gets built and why: vision, design system, component architecture and roadmap. The AI works against a document, not a loose idea.",
    artifacts: ['specs/01–05'],
  },
  {
    number: '02',
    title: 'Plan',
    body: 'Each spec becomes a plan of small, ordered, verifiable tasks. That way every change can be reviewed, and reverted, on its own.',
    artifacts: ['docs/…/plans/'],
  },
  {
    number: '03',
    title: 'Implement',
    body: 'Claude Code runs the plan task by task, one commit per change: for example, one component translated per commit. I steer, review and correct course.',
    artifacts: ['atomic commits'],
  },
  {
    number: '04',
    title: 'Verify',
    body: "Nothing is called done without checking it: clean tsc, lint and build, plus a manual pass in ES/EN. Findings from the final review are applied before publishing.",
    artifacts: ['tsc', 'oxlint', 'build'],
  },
]

export const aiWorkflowTools = ['Claude Code', 'Spec-driven development', 'Skills & agents', 'CLAUDE.md']
