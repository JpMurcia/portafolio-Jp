import { Fragment } from 'react'
import { experience } from '../data/experience'

export function Experience() {
  return (
    <section id="trayectoria" className="mx-auto max-w-[1200px] px-10 py-16">
      <div className="mb-9">
        <div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-accent uppercase">
          04 — Trayectoria
        </div>
        <h2 className="text-[34px] leading-[1.06] tracking-[-0.025em]">Experiencia laboral</h2>
      </div>

      <div className="border-t-2 border-divider">
        {experience.map((entry, i) => (
          <div
            key={entry.period}
            className={`grid grid-cols-[minmax(0,2fr)_minmax(0,10fr)] gap-8 py-[30px] ${
              i < experience.length - 1 ? 'border-b border-divider' : ''
            }`}
          >
            <div className="font-heading text-[13px] leading-[1.5] font-extrabold">
              {entry.period.split(' — ').map((part, i) => (
                <Fragment key={part}>
                  {i > 0 && <br />}
                  {i === 0 ? `${part} —` : part}
                </Fragment>
              ))}
              {entry.current && (
                <div className="mt-2 inline-block bg-poster px-[6px] py-1 font-heading text-[9px] leading-none font-extrabold tracking-[.08em] text-white uppercase">
                  Actual
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="mb-[10px] flex flex-wrap items-baseline gap-3">
                <h3 className="text-[23px] tracking-[-0.015em]">{entry.role}</h3>
                <span className="font-heading text-[13px] font-extrabold text-accent-700">{entry.company}</span>
              </div>
              {entry.bullets.length > 0 && (
                <ul className="mb-[14px] max-w-[74ch] list-disc pl-[17px] text-sm leading-[1.7] text-mute-800">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-[6px]">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-divider px-2 py-[6px] font-body text-[11px] leading-none font-semibold text-mute-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
