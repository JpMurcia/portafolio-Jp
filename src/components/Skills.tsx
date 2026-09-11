import { useSkillsHighlight } from '../context/useSkillsHighlight'
import { useContent } from '../context/useContent'

export function Skills() {
  // El chip solo dispara el estado — quien se atenúa es CaseStudyCard en
  // Projects (ver specs/03-component-architecture.md), no los chips entre sí.
  const { setHoveredSkill } = useSkillsHighlight()
  const { skillCategories, uiSkills } = useContent()

  return (
    <section id="skills" className="mx-auto max-w-[1200px] px-10 py-16">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-6">
        <div>
          <div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-accent uppercase">
            {uiSkills.eyebrow}
          </div>
          <h2 className="text-[34px] leading-[1.06] tracking-[-0.025em]">{uiSkills.heading}</h2>
        </div>
        <div className="max-w-[38ch] text-[13px] text-mute-700">{uiSkills.hint}</div>
      </div>

      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] border-t-2 border-b-2 border-divider"
        onMouseLeave={() => setHoveredSkill(null)}
      >
        {skillCategories.map((category, i) => (
          <div
            key={category.title}
            className={`py-6 ${i < skillCategories.length - 1 ? 'border-r border-divider pr-6' : ''} ${i > 0 ? 'pl-6' : ''}`}
          >
            <div className="mb-4 font-heading text-[11px] leading-none font-extrabold tracking-[.09em] uppercase">
              {category.title}
            </div>
            <div className="flex flex-wrap gap-[7px]">
              {category.skills.map((skill) => (
                <span
                  key={skill.id}
                  onMouseOver={() => setHoveredSkill(skill.id)}
                  className="cursor-default border border-divider px-[9px] py-[7px] font-body text-xs font-semibold"
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
