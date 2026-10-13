import type { ReactNode } from 'react'
import { useContent } from '../context/useContent'
import { OtherProjectsList } from './OtherProjectsList'
import { DiagramEmbed } from './projects/DiagramEmbed'
import { CaseStudyCard } from './projects/CaseStudyCard'
import { FeaturedProduct } from './projects/FeaturedProduct'
import { SectionHeader } from './ui/SectionHeader'

function StackedDiagrams({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>
}

function DiagramLabel({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-[10px] tracking-[.08em] text-mute-700 uppercase">
      {children}
    </div>
  )
}

/** Antepone el base path del build (p. ej. `/portafolio-Jp/` en GitHub Pages) a los diagramas de `public/diagrams/`. */
function diagramSrc(file: string) {
  return `${import.meta.env.BASE_URL}diagrams/${file}`
}

export function Projects() {
  const { caseStudies, uiProjects } = useContent()

  const diagramsById: Record<string, { useCase: ReactNode; architecture: ReactNode }> = {
    'jp-caso-1': {
      useCase: (
        <DiagramEmbed
          src={diagramSrc('caso1-casos-de-uso.html')}
          title={uiProjects.diagramTitles['jp-caso-1'].useCase}
        />
      ),
      architecture: (
        <StackedDiagrams>
          <DiagramEmbed
            src={diagramSrc('caso1-arquitectura.html')}
            title={uiProjects.diagramTitles['jp-caso-1'].architecture}
          />
          <DiagramLabel>{uiProjects.dataFlowLabel}</DiagramLabel>
          <DiagramEmbed
            src={diagramSrc('caso1-flujo-datos.html')}
            title={uiProjects.diagramTitles['jp-caso-1'].dataFlow}
          />
        </StackedDiagrams>
      ),
    },
    'jp-caso-2': {
      useCase: (
        <DiagramEmbed
          src={diagramSrc('caso2-casos-de-uso.html')}
          title={uiProjects.diagramTitles['jp-caso-2'].useCase}
        />
      ),
      architecture: (
        <DiagramEmbed
          src={diagramSrc('caso2-flujo-trabajo.html')}
          title={uiProjects.diagramTitles['jp-caso-2'].architecture}
        />
      ),
    },
    'jp-caso-3': {
      useCase: (
        <DiagramEmbed
          src={diagramSrc('caso3-casos-de-uso.html')}
          title={uiProjects.diagramTitles['jp-caso-3'].useCase}
        />
      ),
      architecture: (
        <StackedDiagrams>
          <DiagramEmbed
            src={diagramSrc('caso3-arquitectura.html')}
            title={uiProjects.diagramTitles['jp-caso-3'].architecture}
          />
          <DiagramLabel>{uiProjects.dataFlowLabel}</DiagramLabel>
          <DiagramEmbed
            src={diagramSrc('caso3-flujo-datos.html')}
            title={uiProjects.diagramTitles['jp-caso-3'].dataFlow}
          />
        </StackedDiagrams>
      ),
    },
  }

  return (
    <section id="casos" className="mx-auto max-w-[1200px] px-5 pt-6 pb-16 sm:px-10 sm:pb-20">
      <SectionHeader eyebrow={uiProjects.eyebrow} heading={uiProjects.heading}>
        {uiProjects.intro}
      </SectionHeader>

      <FeaturedProduct />

      <div className="space-y-8">
        {caseStudies.map((study) => (
          <CaseStudyCard
            key={study.id}
            study={study}
            useCaseDiagram={diagramsById[study.id]?.useCase ?? null}
            architectureDiagram={diagramsById[study.id]?.architecture ?? null}
          />
        ))}
      </div>

      <OtherProjectsList />
    </section>
  )
}
