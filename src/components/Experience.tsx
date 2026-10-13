import { useContent } from '../context/useContent'
import { SectionHeader } from './ui/SectionHeader'

export function Experience() {
  const { experience, uiExperience } = useContent()
  return (
    <section id="trayectoria" className="mx-auto max-w-[1200px] px-5 py-12 sm:px-10 sm:py-16">
      <SectionHeader eyebrow={uiExperience.eyebrow} heading={uiExperience.heading} />

      {/* Línea de tiempo: riel vertical + un punto por entrada (relleno si es la actual). */}
      <div className="relative pl-7 sm:pl-10">
        <div aria-hidden className="absolute top-3 bottom-3 left-[7px] w-px bg-divider sm:left-[9px]" />

        <div className="space-y-5">
          {experience.map((entry) => (
            <div key={entry.period} className="relative">
              <span
                aria-hidden
                className={`absolute top-7 -left-7 h-[15px] w-[15px] rounded-full border-2 sm:-left-10 sm:h-[19px] sm:w-[19px] ${
                  entry.current
                    ? 'border-accent bg-accent shadow-[0_0_0_4px] shadow-accent/20'
                    : 'border-mute-500 bg-bg'
                }`}
              />

              <div className="card p-5 sm:p-7">
                <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="font-mono text-[12px] text-mute-700">{entry.period}</span>
                  {entry.current && (
                    <span className="rounded-md bg-poster px-2 py-1 font-mono text-[10px] leading-none font-medium tracking-[.08em] text-white uppercase">
                      {uiExperience.currentBadge}
                    </span>
                  )}
                </div>

                <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-[22px] leading-[1.2] tracking-[-0.02em]">{entry.role}</h3>
                  <span className="text-[13px] font-semibold text-accent-700">{entry.company}</span>
                </div>

                {entry.bullets.length > 0 && (
                  <ul
                    className={`${entry.tags.length > 0 ? 'mb-4' : ''} max-w-[76ch] list-disc space-y-1 pl-[17px] text-sm leading-[1.7] text-mute-800 marker:text-accent`}
                  >
                    {entry.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
