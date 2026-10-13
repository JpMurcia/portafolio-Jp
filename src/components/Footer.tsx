import { Download } from 'lucide-react'
import type { ReactNode } from 'react'
import { useContent } from '../context/useContent'

const linkClass = 'border-0 text-sm leading-[1.4] font-semibold text-white hover:text-white hover:underline'

function FooterCell({
  label,
  children,
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-sm ${className}`}>
      <div className="mb-2 font-mono text-[10px] leading-none tracking-[.08em] text-white/75 uppercase">{label}</div>
      {children}
    </div>
  )
}

export function Footer() {
  const { contact, uiFooter, uiHero } = useContent()

  return (
    <footer id="contacto" className="mx-auto max-w-[1200px] px-5 pt-8 pb-10 sm:px-10">
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-linear-to-br from-poster to-accent-800 p-6 text-white shadow-[var(--shadow-pop)] sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-24 h-[26rem] w-[26rem] rounded-full bg-white/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-16 h-80 w-80 rounded-full bg-glow/25 blur-3xl"
        />

        <div className="relative">
          <h2 className="mb-5 max-w-[22ch] text-[clamp(32px,5vw,60px)] leading-[1.04] tracking-[-0.04em] text-white">
            {uiFooter.heading}
          </h2>
          <p className="mb-10 max-w-[54ch] text-[17px] leading-[1.55] text-white/90">{uiFooter.lead}</p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <FooterCell label={uiFooter.emailLabel} className="lg:col-span-2">
              <a href={`mailto:${contact.email}`} className={`${linkClass} [overflow-wrap:anywhere]`}>
                {contact.email}
              </a>
            </FooterCell>
            <FooterCell label={uiFooter.phoneLabel}>
              <a href={`tel:${contact.phone}`} className={linkClass}>
                {contact.phoneDisplay}
              </a>
            </FooterCell>
            <FooterCell label={uiFooter.linkedinLabel}>
              <a href={contact.linkedinUrl} target="_blank" rel="noopener" className={linkClass}>
                {contact.linkedinLabel}
              </a>
            </FooterCell>
            <FooterCell label={uiFooter.githubLabel}>
              <a href={contact.githubUrl} target="_blank" rel="noopener" className={linkClass}>
                {contact.githubLabel}
              </a>
            </FooterCell>
            <FooterCell label={uiFooter.locationLabel}>
              <div className="text-sm leading-[1.4] font-semibold text-white">
                {contact.location}
                <br />
                <span className="text-xs font-normal text-white/80">{contact.locationNote}</span>
              </div>
            </FooterCell>
            <div className="flex items-center sm:col-span-2 lg:col-span-2 lg:justify-end">
              <a
                href={`${import.meta.env.BASE_URL}assets/CV-Juan-Pablo-Murcia-Cortes.pdf`}
                download
                className="inline-flex items-center gap-2 rounded-xl border-0 bg-white px-4 py-3 text-xs leading-none font-semibold text-poster transition-transform hover:-translate-y-px hover:text-poster"
              >
                <Download size={14} strokeWidth={2} />
                {uiHero.downloadCv}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-between gap-x-6 gap-y-2 font-mono text-[11px] text-mute-600">
        <span>{uiFooter.signature}</span>
        <span>{uiFooter.disclaimer}</span>
      </div>
    </footer>
  )
}
