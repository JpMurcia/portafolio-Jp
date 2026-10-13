import type { ReactNode } from 'react'

/**
 * Encabezado de sección compartido: eyebrow mono + título, con texto opcional
 * debajo (`children`) o a la derecha en pantallas anchas (`aside`).
 */
export function SectionHeader({
  eyebrow,
  heading,
  children,
  aside,
}: {
  eyebrow: string
  heading: string
  children?: ReactNode
  aside?: ReactNode
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-4 sm:mb-10">
      <div className="min-w-0">
        <div className="eyebrow mb-3">{eyebrow}</div>
        <h2 className="text-[clamp(28px,4vw,38px)] leading-[1.08] tracking-[-0.03em]">{heading}</h2>
        {children && <div className="mt-3 max-w-[70ch] text-[15px] leading-[1.6] text-mute-800">{children}</div>}
      </div>
      {aside && <div className="max-w-[38ch] text-[13px] leading-[1.5] text-mute-700">{aside}</div>}
    </div>
  )
}

/** Mismo estilo de eyebrow para etiquetas dentro de una tarjeta. */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`eyebrow ${className}`}>{children}</div>
}
