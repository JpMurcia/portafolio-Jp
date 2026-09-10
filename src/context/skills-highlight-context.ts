import { createContext } from 'react'

export interface SkillsHighlightContextValue {
  hoveredSkill: string | null
  setHoveredSkill: (id: string | null) => void
}

export const SkillsHighlightContext = createContext<SkillsHighlightContextValue | undefined>(undefined)
