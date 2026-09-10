import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/useTheme'

const NAV_LINKS = [
  { href: '#sobre', label: 'Perfil' },
  { href: '#skills', label: 'Stack' },
  { href: '#casos', label: 'Casos' },
  { href: '#trayectoria', label: 'Trayectoria' },
  { href: '#formacion', label: 'Formación' },
  { href: '#contacto', label: 'Contacto' },
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-divider bg-bg">
      <div className="mx-auto flex min-h-16 max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-10 py-[11px]">
        <a
          href="#top"
          className="flex-none border-0 font-heading text-sm leading-none font-extrabold tracking-[-0.01em] text-text"
        >
          JUAN PABLO MURCIA<span className="text-accent">.</span>
        </a>

        <div className="flex min-w-0 flex-wrap items-center justify-end gap-[22px]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-0 font-heading text-[11px] leading-none font-extrabold tracking-[.08em] text-mute-700 uppercase"
            >
              {link.label}
            </a>
          ))}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            title="Cambiar tema"
            className="flex h-[34px] w-[34px] flex-none items-center justify-center border border-divider bg-transparent text-text transition-colors hover:bg-text/8"
          >
            {theme === 'dark' ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
          </button>
        </div>
      </div>
    </nav>
  )
}
