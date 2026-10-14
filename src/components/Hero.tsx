import { ArrowUpRight } from 'lucide-react'
import { Fragment, type CSSProperties, type ReactNode } from 'react'
import { useContent } from '../context/useContent'
import { CvDownload } from './ui/CvDownload'

/** Retardo escalonado de la animación de entrada (ver .animate-fade-up en index.css). */
const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

function StatRow({
  label,
  value,
  detail,
}: {
  label: string
  /** string[] renderiza cada línea con el mismo estilo, separadas por <br>. */
  value: ReactNode | string[]
  detail?: string
}) {
  return (
    <div className="grid grid-cols-[minmax(0,auto)_minmax(0,1fr)] items-baseline gap-x-5 px-5 py-3.5">
      <dt className="font-mono text-[11px] leading-[1.4] tracking-[.06em] text-mute-600 uppercase">{label}</dt>
      <dd className="text-right text-[13px] leading-[1.35] font-semibold">
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
            <span className="text-xs font-normal text-mute-700">{detail}</span>
          </>
        )}
      </dd>
    </div>
  )
}

export function Hero() {
  const { hero, contact, uiHero } = useContent()
  return (
    <header id="top" className="mx-auto max-w-[1200px] px-5 pt-12 pb-6 sm:px-10 sm:pt-20">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
        <div className="min-w-0">
          <div
            className="animate-fade-up mb-7 inline-flex items-center gap-2.5 rounded-full border border-divider bg-surface/70 py-1.5 pr-3.5 pl-3 backdrop-blur"
            style={delay(0)}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[11px] leading-none tracking-[.04em] text-mute-700">{hero.location}</span>
          </div>

          <h1
            className="animate-fade-up mb-7 text-[clamp(44px,7.2vw,88px)] leading-[0.98] font-semibold tracking-[-0.045em]"
            style={delay(80)}
          >
            {hero.headline.map((line, i) => (
              <Fragment key={line}>
                {i > 0 && <br />}
                {i === hero.headline.length - 1 ? (
                  <span className="bg-linear-to-r from-accent via-glow to-accent bg-clip-text text-transparent">
                    {line}
                  </span>
                ) : (
                  line
                )}
              </Fragment>
            ))}
          </h1>

          <p
            className="animate-fade-up mb-4 max-w-[52ch] text-[clamp(17px,2vw,20px)] leading-[1.5] text-text"
            style={delay(160)}
          >
            {hero.lead}
          </p>
          <p
            className="animate-fade-up mb-9 max-w-[58ch] text-[15px] leading-[1.65] text-mute-700"
            style={delay(220)}
          >
            {hero.subcopy}
          </p>

          <div className="animate-fade-up relative z-20 flex flex-wrap gap-3" style={delay(280)}>
            <CvDownload />
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-xl border border-divider bg-surface/60 px-5 py-3 text-[13px] font-semibold text-text backdrop-blur transition-colors hover:border-accent/50 hover:bg-text/6 hover:text-text"
            >
              {uiHero.contactMe}
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>
          </div>
        </div>

        <div className="animate-fade-up min-w-0" style={delay(200)}>
          <div className="card overflow-hidden shadow-[var(--shadow-pop)]">
            <div className="flex items-center gap-2 border-b border-divider bg-surface-2/70 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
              <span className="ml-2 font-mono text-[11px] text-mute-600">perfil.ts</span>
            </div>
            <dl className="divide-y divide-divider">
              {hero.stats.map((stat) => (
                <StatRow key={stat.label} {...stat} />
              ))}
              <StatRow
                label={uiHero.linksLabel}
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
            </dl>
          </div>
        </div>
      </div>
    </header>
  )
}
