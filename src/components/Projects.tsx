import type { ReactNode } from 'react'
import { caseStudies } from '../data/caseStudies'
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

const diagramsById: Record<string, { useCase: ReactNode; architecture: ReactNode }> = {
  'jp-caso-1': {
    useCase: <DiagramEmbed src="/diagrams/caso1-casos-de-uso.html" title="InfoMetal — Casos de uso" />,
    architecture: (
      <StackedDiagrams>
        <DiagramEmbed src="/diagrams/caso1-arquitectura.html" title="InfoMetal — Arquitectura" />
        <DiagramLabel>Flujo de datos</DiagramLabel>
        <DiagramEmbed src="/diagrams/caso1-flujo-datos.html" title="InfoMetal — Flujo de datos" />
      </StackedDiagrams>
    ),
  },
  'jp-caso-2': {
    useCase: <DiagramEmbed src="/diagrams/caso2-casos-de-uso.html" title="Chaira — Casos de uso de contratación" />,
    architecture: (
      <DiagramEmbed src="/diagrams/caso2-flujo-trabajo.html" title="Chaira — Flujo de trabajo del cambio" />
    ),
  },
  'jp-caso-3': {
    useCase: (
      <DiagramEmbed src="/diagrams/caso3-casos-de-uso.html" title="Gestor comunitario de selva — Casos de uso" />
    ),
    architecture: (
      <StackedDiagrams>
        <DiagramEmbed src="/diagrams/caso3-arquitectura.html" title="Gestor comunitario de selva — Arquitectura" />
        <DiagramLabel>Flujo de datos</DiagramLabel>
        <DiagramEmbed src="/diagrams/caso3-flujo-datos.html" title="Gestor comunitario de selva — Flujo de datos" />
      </StackedDiagrams>
    ),
  },
}

export function Projects() {
  return (
    <section id="casos" className="mx-auto max-w-[1200px] px-10 pt-6 pb-16">
      <div className="mb-9">
        <div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-accent uppercase">
          03 — Casos de estudio
        </div>
        <h2 className="mb-3 text-[34px] leading-[1.06] tracking-[-0.025em]">Tres sistemas, contados por dentro</h2>
        <p className="max-w-[70ch] text-[15px] leading-[1.6] text-mute-800">
          Arquitectura, protocolos y decisiones de diseño. Los diagramas son reconstrucciones conceptuales y los
          fragmentos de código usan datos ficticios: no hay información operativa de ningún cliente en esta
          página.
        </p>
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
