import type { ReactNode } from 'react'
import { useContent } from '../context/useContent'
import { OtherProjectsList } from './OtherProjectsList'
import { DiagramEmbed } from './projects/DiagramEmbed'
import { CaseStudyCard } from './projects/CaseStudyCard'

function StackedDiagrams({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>
}

function DiagramLabel({ children }: { children: ReactNode }) {
  return (
    <div className="font-heading text-[10px] font-extrabold tracking-[.08em] text-mute-700 uppercase">
      {children}
    </div>
  )
}

export function Projects() {
  const { caseStudies, uiProjects } = useContent()

  const diagramsById: Record<string, { useCase: ReactNode; architecture: ReactNode }> = {
    'jp-caso-1': {
      useCase: (
        <DiagramEmbed src="/diagrams/caso1-casos-de-uso.html" title={uiProjects.diagramTitles['jp-caso-1'].useCase} />
      ),
      architecture: (
        <StackedDiagrams>
          <DiagramEmbed
            src="/diagrams/caso1-arquitectura.html"
            title={uiProjects.diagramTitles['jp-caso-1'].architecture}
          />
          <DiagramLabel>{uiProjects.dataFlowLabel}</DiagramLabel>
          <DiagramEmbed
            src="/diagrams/caso1-flujo-datos.html"
            title={uiProjects.diagramTitles['jp-caso-1'].dataFlow}
          />
        </StackedDiagrams>
      ),
    },
    'jp-caso-2': {
      useCase: (
        <DiagramEmbed src="/diagrams/caso2-casos-de-uso.html" title={uiProjects.diagramTitles['jp-caso-2'].useCase} />
      ),
      architecture: (
        <DiagramEmbed
          src="/diagrams/caso2-flujo-trabajo.html"
          title={uiProjects.diagramTitles['jp-caso-2'].architecture}
        />
      ),
    },
    'jp-caso-3': {
      useCase: (
        <DiagramEmbed src="/diagrams/caso3-casos-de-uso.html" title={uiProjects.diagramTitles['jp-caso-3'].useCase} />
      ),
      architecture: (
        <StackedDiagrams>
          <DiagramEmbed
            src="/diagrams/caso3-arquitectura.html"
            title={uiProjects.diagramTitles['jp-caso-3'].architecture}
          />
          <DiagramLabel>{uiProjects.dataFlowLabel}</DiagramLabel>
          <DiagramEmbed
            src="/diagrams/caso3-flujo-datos.html"
            title={uiProjects.diagramTitles['jp-caso-3'].dataFlow}
          />
        </StackedDiagrams>
      ),
    },
  }

  return (
    <section id="casos" className="mx-auto max-w-[1200px] px-10 pt-6 pb-16">
      <div className="mb-9">
        <div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-accent uppercase">
          {uiProjects.eyebrow}
        </div>
        <h2 className="mb-3 text-[34px] leading-[1.06] tracking-[-0.025em]">{uiProjects.heading}</h2>
        <p className="max-w-[70ch] text-[15px] leading-[1.6] text-mute-800">{uiProjects.intro}</p>
      </div>

      <div className="space-y-8">
        {caseStudies.map((study) => (
          <CaseStudyCard
            key={study.id}
            study={study}
            useCaseDiagram={diagramsById[study.id].useCase}
            architectureDiagram={diagramsById[study.id].architecture}
          />
        ))}
      </div>

      <OtherProjectsList />
    </section>
  )
}
