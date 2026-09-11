import { useContent } from '../context/useContent'

export function OtherProjectsList() {
  const { otherProjects, uiOtherProjects } = useContent()

  return (
    <div className="mt-12">
      <div className="mb-[18px] font-heading text-[11px] font-extrabold tracking-[.09em] uppercase">
        {uiOtherProjects.heading}
      </div>
      <div className="border-t-2 border-divider">
        {otherProjects.map((project, i) => (
          <div
            key={project.title}
            className={`grid grid-cols-[minmax(0,4fr)_minmax(0,6fr)_minmax(0,2fr)] items-baseline gap-5 py-[18px] ${
              i < otherProjects.length - 1 ? 'border-b border-divider' : ''
            }`}
          >
            <div className="font-heading text-[15px] leading-[1.3] font-extrabold">
              {project.title}
              <div className="mt-[3px] font-body text-xs font-normal text-mute-700">{project.subtitle}</div>
            </div>
            <div className="text-[13px] leading-[1.6] text-mute-800">{project.description}</div>
            <div className="font-heading text-xs font-extrabold">
              {project.link ? (
                <a href={project.link.href} target="_blank" rel="noopener">
                  {project.link.label}
                </a>
              ) : (
                <span className="border-0 text-mute-700">{project.status}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
