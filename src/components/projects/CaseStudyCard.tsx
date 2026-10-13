import type { ReactNode } from 'react'
import type { CaseStudy, CaseStudyCriterion, CaseStudyDecision } from '../../types'
import { CodeBlock } from '../CodeBlock'
import { Eyebrow } from '../ui/SectionHeader'
import { useSkillsHighlight } from '../../context/useSkillsHighlight'
import { useContent } from '../../context/useContent'

/** Bloque interior de la tarjeta: separador fino y padding responsivo. */
const sectionClass = 'border-b border-divider px-5 py-6 sm:px-8 sm:py-7'

function DecisionsTable({
  rows,
  labels,
}: {
  rows: CaseStudyDecision[]
  labels: { decision: string; discarded: string; why: string }
}) {
  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div
          key={row.decision}
          className="tile grid grid-cols-1 gap-x-6 gap-y-4 p-4 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,6fr)] md:p-5"
        >
          <div>
            <div className="eyebrow mb-1.5 text-[10px]">{labels.decision}</div>
            <div className="text-[13px] leading-[1.55] font-semibold">{row.decision}</div>
          </div>
          <div>
            <div className="mb-1.5 font-mono text-[10px] tracking-[.08em] text-mute-600 uppercase">
              {labels.discarded}
            </div>
            <div className="text-[13px] leading-[1.55] text-mute-700">{row.discarded}</div>
          </div>
          <div>
            <div className="mb-1.5 font-mono text-[10px] tracking-[.08em] text-mute-600 uppercase">{labels.why}</div>
            <div className="text-[13px] leading-[1.55] text-mute-800">{row.why}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function CriteriaGrid({ items }: { items: CaseStudyCriterion[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3">
      {items.map((item) => (
        <div key={item.title} className="tile p-4">
          <div className="mb-2 text-sm font-semibold">{item.title}</div>
          <div className="text-[13px] leading-[1.6] text-mute-800">{item.body}</div>
        </div>
      ))}
    </div>
  )
}

function CriteriaList({ items }: { items: CaseStudyCriterion[] }) {
  return (
    <ul className="list-disc space-y-0 pl-[17px] text-sm leading-[1.7] text-mute-800 marker:text-accent">
      {items.map((item) => (
        <li key={item.title}>
          <strong className="font-semibold text-text">{item.title}</strong>, {item.body}
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
  const { uiCaseStudyCard } = useContent()
  const dimmed = hoveredSkill !== null && !study.skills.includes(hoveredSkill)

  return (
    <article
      id={study.id}
      data-skills={study.skills.join(' ')}
      className={`card overflow-hidden transition-opacity duration-200 ${dimmed ? 'opacity-[.22]' : 'opacity-100'}`}
    >
      <div className="border-b border-divider bg-linear-to-b from-accent/[0.07] to-transparent px-5 py-7 sm:px-8 sm:py-9">
        <div className="mb-5 flex flex-wrap gap-2">
          <span className="rounded-md bg-poster px-2.5 py-1.5 font-mono text-[10px] leading-none font-medium tracking-[.08em] text-white uppercase">
            {study.number}
          </span>
          {study.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mb-4 max-w-[26ch] text-[clamp(26px,3.6vw,40px)] leading-[1.06] tracking-[-0.03em]">
          {study.title}
        </h3>
        <p className="max-w-[62ch] text-base leading-[1.65] text-mute-800">{study.summary}</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3 border-b border-divider px-5 py-5 sm:px-8">
        {study.metaStats.map((stat) => (
          <div key={stat.label} className="tile px-4 py-3">
            <div className="font-mono text-[10px] tracking-[.08em] text-mute-600 uppercase">{stat.label}</div>
            <div className="mt-1.5 text-[14px] leading-[1.3] font-semibold">{stat.value}</div>
          </div>
        ))}
      </div>

      {study.problem && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-10 gap-y-6 border-b border-divider px-5 py-6 sm:px-8 sm:py-7">
          <div>
            <Eyebrow className="mb-2.5">{uiCaseStudyCard.problemLabel}</Eyebrow>
            <p className="text-sm leading-[1.7] text-mute-800">{study.problem}</p>
          </div>
          {study.constraints && (
            <div>
              <Eyebrow className="mb-2.5">{uiCaseStudyCard.constraintsLabel}</Eyebrow>
              <ul className="list-disc space-y-1 pl-[17px] text-sm leading-[1.65] text-mute-800 marker:text-accent">
                {study.constraints.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className={sectionClass}>
        <Eyebrow className="mb-2">{uiCaseStudyCard.useCasesLabel}</Eyebrow>
        <div className="mb-5 max-w-[70ch] text-xs leading-[1.6] text-mute-700">{study.useCaseNote}</div>
        {useCaseDiagram}
      </div>

      <div className={sectionClass}>
        <Eyebrow className="mb-2">{study.architectureHeading}</Eyebrow>
        {study.architectureNote && (
          <div className="mb-5 max-w-[70ch] text-xs leading-[1.6] text-mute-700">{study.architectureNote}</div>
        )}
        {architectureDiagram}
        {study.failureModes && (
          <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
            {study.failureModes.map((mode) => (
              <div key={mode.title} className="tile p-4">
                <div className="mb-1.5 font-mono text-[10px] tracking-[.06em] text-accent uppercase">{mode.title}</div>
                <div className="text-xs leading-[1.6] text-mute-800">{mode.body}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {study.decisionsPlacement !== 'finalGrid' && (
        <div className={sectionClass}>
          <Eyebrow className="mb-4">{study.decisionsHeading}</Eyebrow>
          {study.decisionsTable && (
            <DecisionsTable rows={study.decisionsTable} labels={uiCaseStudyCard.decisionsTable} />
          )}
          {study.criteria && study.criteriaStyle === 'list' ? (
            <CriteriaList items={study.criteria} />
          ) : (
            study.criteria && <CriteriaGrid items={study.criteria} />
          )}
        </div>
      )}

      {study.implementation.length > 0 && (
        <div className={sectionClass}>
          <Eyebrow className="mb-2">{uiCaseStudyCard.implementationLabel}</Eyebrow>
          <div className="mb-4 text-xs text-mute-700">{uiCaseStudyCard.implementationNote}</div>
          <div className="space-y-2">
            {study.implementation.map((impl) => (
              <details key={impl.title} className="tile overflow-hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 text-sm font-semibold marker:content-none hover:bg-text/4 [&::-webkit-details-marker]:hidden">
                  <span>{impl.title}</span>
                  <span className="jp-plus text-lg leading-none text-accent transition-transform duration-200">+</span>
                </summary>
                <div className="px-4 pb-4">
                  <CodeBlock code={impl.code} />
                  {impl.note && <p className="mt-3.5 text-sm leading-[1.65] text-mute-800">{impl.note}</p>}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-10 gap-y-8 px-5 py-6 sm:px-8 sm:py-8">
        <div>
          {study.decisionsPlacement === 'finalGrid' ? (
            <>
              <Eyebrow className="mb-3">{study.decisionsHeading}</Eyebrow>
              {study.criteria && study.criteriaStyle === 'list' ? (
                <CriteriaList items={study.criteria} />
              ) : (
                study.criteria && <CriteriaGrid items={study.criteria} />
              )}
            </>
          ) : (
            study.outcome && (
              <>
                <Eyebrow className="mb-3">{uiCaseStudyCard.resultLabel}</Eyebrow>
                <ul className="list-disc pl-[17px] text-sm leading-[1.7] text-mute-800 marker:text-accent">
                  {study.outcome.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {study.outcomeNote && (
                  <div className="mt-3.5 text-[11px] leading-[1.5] text-mute-700">{study.outcomeNote}</div>
                )}
              </>
            )
          )}
        </div>
        <div>
          <Eyebrow className="mb-3">{uiCaseStudyCard.learningsLabel}</Eyebrow>
          {study.learnings.map((paragraph, i) => (
            <p key={paragraph} className={`text-sm leading-[1.7] text-mute-800 ${i > 0 ? 'mt-3' : ''}`}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  )
}
