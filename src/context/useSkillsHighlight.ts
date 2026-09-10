import { useContext } from 'react'
import { SkillsHighlightContext, type SkillsHighlightContextValue } from './skills-highlight-context'

export function useSkillsHighlight(): SkillsHighlightContextValue {
  const ctx = useContext(SkillsHighlightContext)
  if (!ctx) throw new Error('useSkillsHighlight debe usarse dentro de <SkillsHighlightProvider>')
  return ctx
}
