import type { ReactNode } from 'react'
import type { CaseStudy, CaseStudyCriterion, CaseStudyDecision } from '../../types'
import { CodeBlock } from '../CodeBlock'
import { useSkillsHighlight } from '../../context/useSkillsHighlight'

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-[6px] font-heading text-[11px] leading-none font-extrabold tracking-[.09em] text-accent uppercase">
      {children}
    </div>
  )
}

function DecisionsTable({ rows }: { rows: CaseStudyDecision[] }) {
  return (
    <div className="border border-divider">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-b border-divider font-heading text-[10px] font-extrabold tracking-[.08em] text-mute-700 uppercase">
        <div className="border-r border-divider px-4 py-[11px]">Decisión</div>
        <div className="border-r border-divider px-4 py-[11px]">Alternativa descartada</div>
        <div className="px-4 py-[11px]">Por qué</div>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.decision}
          className={`grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] ${i < rows.length - 1 ? 'border-b border-divider' : ''}`}
        >
          <div className="border-r border-divider px-4 py-[15px] text-[13px] leading-[1.55]">
            <strong>{row.decision}</strong>
          </div>
          <div className="border-r border-divider px-4 py-[15px] text-[13px] leading-[1.55] text-mute-700">
            {row.discarded}
          </div>
          <div className="px-4 py-[15px] text-[13px] leading-[1.55] text-mute-800">{row.why}</div>
        </div>
      ))}
    </div>
  )
}

function CriteriaGrid({ items }: { items: CaseStudyCriterion[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] border border-divider">
      {items.map((item, i) => (
        <div
          key={item.title}
          className={`px-5 py-[18px] ${i < items.length - 1 ? 'border-r border-divider' : ''}`}
        >
          <div className="mb-[7px] font-heading text-sm font-extrabold">{item.title}</div>
          <div className="text-[13px] leading-[1.6] text-mute-800">{item.body}</div>
        </div>
      ))}
    </div>
  )
}

function CriteriaList({ items }: { items: CaseStudyCriterion[] }) {
  return (
    <ul className="list-disc space-y-0 pl-[17px] text-sm leading-[1.7] text-mute-800">
      {items.map((item) => (
        <li key={item.title}>
          <strong className="text-text">{item.title}</strong>, {item.body}
        </li>
      ))}
    </ul>
  )
}

export function CaseStudyCard({
  study,
  useCaseDiagram,
  architectureDiagram,
}: {
  study: CaseStudy
  useCaseDiagram: ReactNode
  architectureDiagram: ReactNode
}) {
  const { hoveredSkill } = useSkillsHighlight()
  const dimmed = hoveredSkill !== null && !study.skills.includes(hoveredSkill)

  return (
    <article
      id={study.id}
      data-skills={study.skills.join(' ')}
      className={`border-2 border-divider transition-opacity duration-200 ${dimmed ? 'opacity-[.22]' : 'opacity-100'}`}
    >
      <div className="border-b-2 border-divider px-[34px] py-8">
        <div className="mb-[18px] flex flex-wrap gap-2">
          <span className="bg-poster px-[9px] py-[7px] font-heading text-[10px] leading-none font-extrabold tracking-[.08em] text-white uppercase">
            {study.number}
          </span>
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="border border-divider px-[9px] py-[7px] font-heading text-[10px] leading-none font-extrabold tracking-[.08em] uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mb-4 max-w-[26ch] text-[clamp(26px,3.4vw,40px)] leading-[1.04] tracking-[-0.025em]">
          {study.title}
        </h3>
        <p className="max-w-[60ch] text-base leading-[1.55] text-mute-800">{study.summary}</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] border-b-2 border-divider">
        {study.metaStats.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-[22px] py-[18px] ${i < study.metaStats.length - 1 ? 'border-r border-divider' : ''}`}
          >
            <div className="font-heading text-[10px] tracking-[.08em] text-mute-700 uppercase">{stat.label}</div>
            <div className="mt-[5px] font-heading text-[15px] font-extrabold">{stat.value}</div>
          </div>
        ))}
      </div>

      {study.problem && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] border-b-2 border-divider">
          <div className={`px-[30px] py-[26px] ${study.constraints ? 'border-r border-divider' : ''}`}>
            <Eyebrow>El problema</Eyebrow>
            <p className="text-sm leading-[1.65] text-mute-800">{study.problem}</p>
          </div>
          {study.constraints && (
            <div className="px-[30px] py-[26px]">
              <Eyebrow>Restricciones</Eyebrow>
              <ul className="list-disc pl-[17px] text-sm leading-[1.65] text-mute-800">
                {study.constraints.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="border-b-2 border-divider px-[30px] py-7">
        <Eyebrow>Casos de uso</Eyebrow>
        <div className="mb-[18px] text-xs text-mute-700">{study.useCaseNote}</div>
        {useCaseDiagram}
      </div>

      <div className="border-b-2 border-divider px-[30px] py-7">
        <Eyebrow>{study.architectureHeading}</Eyebrow>
        {study.architectureNote && <div className="mb-[22px] text-xs text-mute-700">{study.architectureNote}</div>}
        {architectureDiagram}
        {study.failureModes && (
          <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border border-divider">
            {study.failureModes.map((mode, i) => (
              <div
                key={mode.title}
                className={`px-4 py-[14px] ${i < study.failureModes!.length - 1 ? 'border-r border-divider' : ''}`}
              >
                <div className="mb-[5px] font-heading text-[10px] tracking-[.07em] text-accent uppercase">
                  {mode.title}
                </div>
                <div className="text-xs leading-[1.55] text-mute-800">{mode.body}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {study.decisionsPlacement !== 'finalGrid' && (
        <div className="border-b-2 border-divider px-[30px] py-7">
          <div className="mb-4 font-heading text-[11px] leading-none font-extrabold tracking-[.09em] text-accent uppercase">
            {study.decisionsHeading}
          </div>
          {study.decisionsTable && <DecisionsTable rows={study.decisionsTable} />}
          {study.criteria && study.criteriaStyle === 'list' ? (
            <CriteriaList items={study.criteria} />
          ) : (
            study.criteria && <CriteriaGrid items={study.criteria} />
          )}
        </div>
      )}

      {study.implementation.length > 0 && (
        <div className="border-b-2 border-divider px-[30px] py-7">
          <Eyebrow>Detalle de implementación</Eyebrow>
          <div className="mb-4 text-xs text-mute-700">Fragmentos ilustrativos con nombres y datos ficticios.</div>
          <div className="border border-divider">
            {study.implementation.map((impl, i) => (
              <details
                key={impl.title}
                className={i < study.implementation.length - 1 ? 'border-b border-divider' : ''}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[18px] py-[15px] font-heading text-sm font-extrabold marker:content-none [&::-webkit-details-marker]:hidden">
                  <span>{impl.title}</span>
                  <span className="jp-plus text-lg leading-none text-accent transition-transform duration-200">
                    +
                  </span>
                </summary>
                <div className="px-[18px] pb-[18px]">
                  <CodeBlock code={impl.code} />
                  {impl.note && <p className="mt-[14px] text-sm leading-[1.6] text-mute-800">{impl.note}</p>}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
        <div className="border-r border-divider px-[30px] py-[26px]">
          {study.decisionsPlacement === 'finalGrid' ? (
            <>
              <div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.09em] text-accent uppercase">
                {study.decisionsHeading}
              </div>
              {study.criteria && study.criteriaStyle === 'list' ? (
                <CriteriaList items={study.criteria} />
              ) : (
                study.criteria && <CriteriaGrid items={study.criteria} />
              )}
            </>
          ) : (
            study.outcome && (
              <>
                <div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.09em] text-accent uppercase">
                  Resultado
                </div>
                <ul className="list-disc pl-[17px] text-sm leading-[1.7] text-mute-800">
                  {study.outcome.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {study.outcomeNote && (
                  <div className="mt-[14px] text-[11px] leading-[1.5] text-mute-700">{study.outcomeNote}</div>
                )}
              </>
            )
          )}
        </div>
        <div className="px-[30px] py-[26px]">
          <div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.09em] text-accent uppercase">
            Qué aprendí
          </div>
          {study.learnings.map((paragraph, i) => (
            <p
              key={paragraph}
              className={`text-sm leading-[1.7] text-mute-800 ${i > 0 ? 'mt-3' : ''}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  )
}
