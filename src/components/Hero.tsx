import { Download } from 'lucide-react'
import { Fragment, type ReactNode } from 'react'
import { contact } from '../data/contact'
import { hero } from '../data/hero'

function HeroStatRow({
  label,
  value,
  detail,
  withDivider = true,
}: {
  label: string
  /** string[] renderiza cada línea con el mismo estilo, separadas por <br>. */
  value: ReactNode | string[]
  detail?: string
  withDivider?: boolean
}) {
  return (
    <div
      className={`flex justify-between gap-4 py-[13px] ${withDivider ? 'border-b border-divider' : ''}`}
    >
      <span className="font-heading text-[10px] leading-[1.4] font-extrabold tracking-[.09em] text-mute-700 uppercase">
        {label}
      </span>
      <span className="font-heading text-[13px] leading-[1.3] font-extrabold text-right">
        {Array.isArray(value)
          ? value.map((line, i) => (
              <Fragment key={String(line)}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))
          : value}
        {detail && (
          <>
            <br />
            <span className="font-body text-xs font-normal text-mute-700">{detail}</span>
          </>
        )}
      </span>
    </div>
  )
}

export function Hero() {
  return (
    <header id="top" className="mx-auto max-w-[1200px] px-10 pt-[72px]">
      <div className="grid grid-cols-1 items-start gap-[48px] sm:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
        <div className="min-w-0">
          <div className="mb-6 flex flex-wrap items-center gap-[10px]">
            <span className="h-2 w-2 flex-none bg-accent" />
            <span className="font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-mute-700 uppercase">
              {hero.location}
            </span>
          </div>

          <h1 className="mb-7 text-[clamp(44px,6.2vw,82px)] leading-none tracking-[-0.035em]">
            {hero.headline.map((line, i) => (
              <Fragment key={line}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h1>

          <p className="mb-[14px] max-w-[52ch] text-xl leading-[1.45] text-text">{hero.lead}</p>
          <p className="mb-8 max-w-[56ch] text-base leading-[1.6] text-mute-800">{hero.subcopy}</p>

          <div className="flex flex-wrap gap-3">
            <a
              href="assets/CV-Juan-Pablo-Murcia-Cortes.pdf"
              download
              className="inline-flex items-center gap-[9px] border-0 bg-poster px-5 py-[14px] font-heading text-[13px] font-extrabold tracking-[.02em] text-white hover:bg-accent-600"
            >
              <Download size={15} strokeWidth={2} />
              Descargar CV
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-[9px] border border-divider px-5 py-[14px] font-heading text-[13px] font-extrabold text-text hover:bg-text/7"
            >
              Contáctame
            </a>
          </div>
        </div>

        <div className="min-w-0 border-t-2 border-divider">
          {hero.stats.map((stat) => (
            <HeroStatRow key={stat.label} {...stat} />
          ))}
          <HeroStatRow
            label="Enlaces"
            withDivider={false}
            value={
              <>
                <a href={contact.linkedinUrl} target="_blank" rel="noopener">
                  LinkedIn
                </a>{' '}
                ·{' '}
                <a href={contact.githubUrl} target="_blank" rel="noopener">
                  GitHub
                </a>
              </>
            }
          />
        </div>
      </div>

      <hr className="mt-[72px] h-[2px] border-0 bg-divider" />
    </header>
  )
}
