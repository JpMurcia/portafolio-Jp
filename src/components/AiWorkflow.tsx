import { ArrowUpRight } from 'lucide-react'
import { useContent } from '../context/useContent'
import { SectionHeader } from './ui/SectionHeader'

/**
 * Cómo se trabaja con Claude Code en este mismo repositorio: especificar →
 * planificar → implementar → verificar. Los textos viven en data/{es,en}/
 * aiWorkflow.ts y solo describen lo que el repo evidencia.
 */
export function AiWorkflow() {
  const { aiWorkflowSteps, aiWorkflowTools, uiAiWorkflow, contact } = useContent()

  return (
    <section id="ia" className="mx-auto max-w-[1200px] px-5 py-12 sm:px-10 sm:py-16">
      <SectionHeader eyebrow={uiAiWorkflow.eyebrow} heading={uiAiWorkflow.heading}>
        {uiAiWorkflow.intro}
      </SectionHeader>

      <ol className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
        {aiWorkflowSteps.map((step) => (
          <li key={step.number} className="card relative flex flex-col gap-3 overflow-hidden p-5">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-accent/10 blur-2xl"
            />
            <div className="relative flex items-center gap-3">
              <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-linear-to-br from-accent-500 to-poster font-mono text-[11px] font-medium text-white">
                {step.number}
              </span>
              <h3 className="text-[17px] leading-none font-semibold tracking-[-0.01em]">{step.title}</h3>
            </div>
            <p className="relative flex-1 text-[13px] leading-[1.65] text-mute-700">{step.body}</p>
            <div className="relative border-t border-divider pt-3">
              <div className="mb-2 font-mono text-[10px] tracking-[.08em] text-mute-600 uppercase">
                {uiAiWorkflow.evidenceLabel}
              </div>
              <div className="flex flex-wrap gap-2">
                {step.artifacts.map((artifact) => (
                  <span key={artifact} className="chip">
                    {artifact}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <div className="flex flex-wrap gap-2">
          {aiWorkflowTools.map((tool) => (
            <span key={tool} className="chip">
              {tool}
            </span>
          ))}
        </div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-mute-700">
          {uiAiWorkflow.footnote}
          <a
            href={`${contact.githubUrl}/portafolio-Jp`}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1 font-semibold"
          >
            {uiAiWorkflow.repoLink}
            <ArrowUpRight size={13} strokeWidth={2} aria-hidden />
          </a>
        </p>
      </div>
    </section>
  )
}
