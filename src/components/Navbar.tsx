import { Menu, Moon, Search, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../context/useTheme'
import { useLanguage } from '../context/useLanguage'
import { useContent } from '../context/useContent'
import { useActiveSection } from '../hooks/useActiveSection'

const iconButton =
  'flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-divider bg-transparent text-text transition-colors hover:bg-text/8'

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const { uiNav } = useContent()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const active = useActiveSection(uiNav.links.map((link) => link.href.slice(1)))

  return (
    <nav className="sticky top-0 z-50 border-b border-divider bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-[1200px] items-center justify-between gap-x-4 px-5 py-[11px] sm:px-10">
        <a href="#top" className="flex flex-none items-center gap-2.5 border-0 text-text">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-linear-to-br from-accent-500 to-poster font-mono text-[11px] font-semibold text-white shadow-[0_6px_18px_-6px] shadow-accent/60">
            JP
          </span>
          <span className="font-heading text-sm leading-none font-semibold tracking-[-0.01em] max-[359px]:hidden">
            Juan Pablo Murcia
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="mr-2 hidden items-center gap-1 lg:flex">
            {uiNav.links.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`rounded-md border-0 px-2.5 py-1.5 text-[13px] leading-none font-medium transition-colors hover:bg-text/6 hover:text-text ${
                    isActive ? 'bg-text/6 text-text' : 'text-mute-700'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          <button
            type="button"
            onClick={onOpenPalette}
            aria-label={uiNav.palette.openLabel}
            title={uiNav.palette.openLabel}
            className="flex h-9 flex-none items-center gap-2 rounded-lg border border-divider bg-surface/60 px-2.5 text-mute-700 transition-colors hover:bg-text/8 hover:text-text sm:px-3"
          >
            <Search size={14} strokeWidth={2} aria-hidden />
            <span className="hidden text-[13px] sm:inline">{uiNav.palette.triggerLabel}</span>
            <kbd className="hidden rounded border border-divider px-1.5 py-0.5 font-mono text-[10px] leading-none text-mute-600 sm:inline">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={uiNav.themeToggleLabel}
            title={uiNav.themeToggleLabel}
            className={iconButton}
          >
            {theme === 'dark' ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={uiNav.languageToggleLabel}
            title={uiNav.languageToggleLabel}
            className="flex h-9 min-w-9 flex-none items-center justify-center rounded-lg border border-divider bg-transparent px-2 font-mono text-[11px] font-medium text-text transition-colors hover:bg-text/8"
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={uiNav.menuToggleLabel}
            title={uiNav.menuToggleLabel}
            aria-expanded={isMenuOpen}
            className={`${iconButton} lg:hidden`}
          >
            {isMenuOpen ? <X size={17} strokeWidth={2} /> : <Menu size={17} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 border-t border-divider px-5 py-4 sm:px-10 lg:hidden">
          {uiNav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md border-0 px-2 py-2.5 text-sm font-medium text-mute-700 hover:bg-text/6 hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
