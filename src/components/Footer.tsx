import { Download } from 'lucide-react'
import type { ReactNode } from 'react'
import { contact } from '../data/es/contact'

function FooterCell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="bg-poster px-[22px] py-5">
      <div className="mb-2 font-heading text-[10px] leading-none font-extrabold tracking-[.09em] text-white/75 uppercase">
        {label}
      </div>
      {children}
    </div>
  )
}

export function Footer() {
  return (
    <footer id="contacto" className="bg-poster text-white">
      <div className="mx-auto max-w-[1200px] px-10 pt-[76px] pb-11">
        <h2 className="mb-6 max-w-[22ch] text-[clamp(36px,5.4vw,68px)] leading-[1.02] tracking-[-0.035em] text-white">
          ¿Tiene un sistema que no se habla con otro? Hablemos.
        </h2>
        <p className="mb-11 max-w-[52ch] text-[17px] leading-[1.5] text-white/92">
          Busco un equipo donde la integración entre sistemas sea parte del producto y no un parche. Respondo por
          correo o LinkedIn.
        </p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[2px] border-2 border-white/30 bg-white/30">
          <FooterCell label="Correo">
            <a
              href={`mailto:${contact.email}`}
              className="border-0 font-heading text-sm leading-[1.4] font-extrabold break-all text-white"
            >
              {contact.email}
            </a>
          </FooterCell>
          <FooterCell label="Teléfono">
            <a href={`tel:${contact.phone}`} className="border-0 font-heading text-sm leading-[1.4] font-extrabold text-white">
              {contact.phoneDisplay}
            </a>
          </FooterCell>
          <FooterCell label="LinkedIn">
            <a
              href={contact.linkedinUrl}
              target="_blank"
              rel="noopener"
              className="border-0 font-heading text-sm leading-[1.4] font-extrabold text-white"
            >
              {contact.linkedinLabel}
            </a>
          </FooterCell>
          <FooterCell label="GitHub">
            <a
              href={contact.githubUrl}
              target="_blank"
              rel="noopener"
              className="border-0 font-heading text-sm leading-[1.4] font-extrabold text-white"
            >
              {contact.githubLabel}
            </a>
          </FooterCell>
          <FooterCell label="Ubicación">
            <div className="font-heading text-sm leading-[1.4] font-extrabold text-white">
              {contact.location}
              <br />
              <span className="font-body text-xs font-normal text-white/80">{contact.locationNote}</span>
            </div>
          </FooterCell>
          <div className="flex items-end bg-poster px-[22px] py-5">
            <a
              href="assets/CV-Juan-Pablo-Murcia-Cortes.pdf"
              download
              className="inline-flex items-center gap-2 border-0 bg-white px-4 py-3 font-heading text-xs leading-none font-extrabold text-poster"
            >
              <Download size={14} strokeWidth={2} />
              Descargar CV
            </a>
          </div>
        </div>

        <div className="mt-11 flex flex-wrap justify-between gap-5 border-t-2 border-white/30 pt-5 font-heading text-[11px] tracking-[.06em] text-white/75 uppercase">
          <span>Juan Pablo Murcia Cortés · Desarrollador de Software</span>
          <span>Diagramas y fragmentos de código con datos ficticios</span>
        </div>
      </div>
    </footer>
  )
}
