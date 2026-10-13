import { useSkillsHighlight } from '../context/useSkillsHighlight'
import { useContent } from '../context/useContent'
import { SectionHeader } from './ui/SectionHeader'

export function Skills() {
  // El chip solo dispara el estado — quien se atenúa es CaseStudyCard en
  // Projects (ver specs/03-component-architecture.md), no los chips entre sí.
  const { setHoveredSkill } = useSkillsHighlight()
  const { skillCategories, uiSkills } = useContent()

  return (
    <section id="skills" className="mx-auto max-w-[1200px] px-5 py-12 sm:px-10 sm:py-16">
      <SectionHeader eyebrow={uiSkills.eyebrow} heading={uiSkills.heading} aside={uiSkills.hint} />

      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4"
        onMouseLeave={() => setHoveredSkill(null)}
      >
        {skillCategories.map((category) => (
          <div key={category.title} className="card p-5">
            <div className="mb-4 font-mono text-[11px] tracking-[.08em] text-mute-700 uppercase">
              {category.title}
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill.id}
                  onMouseOver={() => setHoveredSkill(skill.id)}
                  className="chip cursor-default transition-colors hover:border-accent/60 hover:bg-accent/10 hover:text-text"
                >
                  {skill.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
