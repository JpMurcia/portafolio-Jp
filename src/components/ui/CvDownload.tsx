import { ChevronDown, Download } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { useContent } from '../../context/useContent'
import { useLanguage } from '../../context/useLanguage'
import { cvHref, type CvFormat } from '../../utils/cv'

const buttonStyles = {
  primary:
    'bg-poster px-5 py-3 text-[13px] text-white shadow-[0_10px_28px_-10px] shadow-accent/70 hover:-translate-y-px hover:bg-accent-600 hover:text-white',
  light: 'bg-white px-4 py-3 text-xs leading-none text-poster hover:-translate-y-px hover:text-poster',
}

/**
 * Botón "Descargar CV" con las dos versiones (Harvard y ATS) en el idioma
 * activo. Menú propio y mínimo: cierra con clic fuera o Escape.
 */
export function CvDownload({
  variant = 'primary',
  placement = 'bottom',
  alignEndOnDesktop = false,
}: {
  variant?: keyof typeof buttonStyles
  placement?: 'bottom' | 'top'
  /** Con el botón pegado al borde derecho (Footer en escritorio), el menú se alinea a ese borde. */
  alignEndOnDesktop?: boolean
}) {
  const { uiHero } = useContent()
  const { language } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const options: { format: CvFormat; name: string; hint: string }[] = [
    { format: 'harvard', name: uiHero.cvHarvardName, hint: uiHero.cvHarvardHint },
    { format: 'ats', name: uiHero.cvAtsName, hint: uiHero.cvAtsHint },
  ]

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border-0 font-semibold transition-all ${buttonStyles[variant]}`}
      >
        <Download size={15} strokeWidth={2} />
        {uiHero.downloadCv}
        <ChevronDown size={14} strokeWidth={2} className={`transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={uiHero.cvMenuLabel}
          className={`absolute z-30 w-[min(20rem,calc(100vw-5rem))] rounded-xl border border-divider bg-surface p-1.5 text-text shadow-[var(--shadow-pop)] ${
            placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          } ${alignEndOnDesktop ? 'left-0 lg:right-0 lg:left-auto' : 'left-0'}`}
        >
          {options.map((option) => (
            <a
              key={option.format}
              role="menuitem"
              href={cvHref(option.format, language)}
              download
              onClick={() => setOpen(false)}
              className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5 text-text hover:bg-text/6 hover:text-text"
            >
              <span className="flex items-center gap-2 text-[13px] font-semibold">
                <Download size={13} strokeWidth={2} aria-hidden />
                {option.name} · PDF
              </span>
              <span className="text-xs leading-[1.5] text-mute-700">{option.hint}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
