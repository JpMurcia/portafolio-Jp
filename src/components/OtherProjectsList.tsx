import { useContent } from '../context/useContent'
import { Eyebrow } from './ui/SectionHeader'

export function OtherProjectsList() {
  const { otherProjects, uiOtherProjects } = useContent()

  return (
    <div className="mt-14">
      <Eyebrow className="mb-5">{uiOtherProjects.heading}</Eyebrow>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
        {otherProjects.map((project) => (
          <div key={project.title} className="card flex flex-col gap-3 p-5">
            <div>
              <div className="text-[15px] leading-[1.3] font-semibold">{project.title}</div>
              <div className="mt-1 font-mono text-[11px] text-mute-600">{project.subtitle}</div>
            </div>
            <div className="flex-1 text-[13px] leading-[1.6] text-mute-700">{project.description}</div>
            <div className="text-xs font-semibold">
              {project.link ? (
                <a href={project.link.href} target="_blank" rel="noopener">
                  {project.link.label}
                </a>
              ) : (
                <span className="chip text-mute-700">{project.status}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
