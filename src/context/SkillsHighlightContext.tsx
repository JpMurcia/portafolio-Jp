import { useState, type ReactNode } from 'react'
import { SkillsHighlightContext } from './skills-highlight-context'

// Envuelve Skills + Projects (ver specs/03-component-architecture.md). Sustituye
// la manipulación directa del DOM (classList.toggle("jp-dim")) del prototipo por
// estado de React: cada CaseStudyCard calcula su propio opacity a partir de si
// hoveredSkill está en su lista de skills.
export function SkillsHighlightProvider({ children }: { children: ReactNode }) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <SkillsHighlightContext.Provider value={{ hoveredSkill, setHoveredSkill }}>
      {children}
    </SkillsHighlightContext.Provider>
  )
}
