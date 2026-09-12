import { Menu, Moon, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../context/useTheme'
import { useLanguage } from '../context/useLanguage'
import { useContent } from '../context/useContent'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const { uiNav } = useContent()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-divider bg-bg">
      <div className="mx-auto flex min-h-16 max-w-[1200px] items-center justify-between gap-x-6 px-10 py-[11px]">
        <a
          href="#top"
          className="flex-none border-0 font-heading text-sm leading-none font-extrabold tracking-[-0.01em] text-text"
        >
          JUAN PABLO MURCIA<span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-[22px]">
          <div className="hidden items-center gap-[22px] md:flex">
            {uiNav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-0 font-heading text-[11px] leading-none font-extrabold tracking-[.08em] text-mute-700 uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={uiNav.themeToggleLabel}
            title={uiNav.themeToggleLabel}
            className="flex h-[34px] w-[34px] flex-none items-center justify-center border border-divider bg-transparent text-text transition-colors hover:bg-text/8"
          >
            {theme === 'dark' ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={uiNav.languageToggleLabel}
            title={uiNav.languageToggleLabel}
            className="flex h-[34px] w-auto min-w-[34px] flex-none items-center justify-center border border-divider bg-transparent px-2 font-heading text-[11px] font-extrabold text-text transition-colors hover:bg-text/8"
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={uiNav.menuToggleLabel}
            title={uiNav.menuToggleLabel}
            aria-expanded={isMenuOpen}
            className="flex h-[34px] w-[34px] flex-none items-center justify-center border border-divider bg-transparent text-text transition-colors hover:bg-text/8 md:hidden"
          >
            {isMenuOpen ? <X size={17} strokeWidth={2} /> : <Menu size={17} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="flex flex-col gap-4 border-t-2 border-divider px-10 py-5 md:hidden">
          {uiNav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="border-0 font-heading text-[11px] leading-none font-extrabold tracking-[.08em] text-mute-700 uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
