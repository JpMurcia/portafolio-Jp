import {
  CornerDownLeft,
  Download,
  ExternalLink,
  Hash,
  Languages,
  Mail,
  Moon,
  Search,
  Sun,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { cvHref } from '../utils/cv'
import { useContent } from '../context/useContent'
import { useLanguage } from '../context/useLanguage'
import { useTheme } from '../context/useTheme'

interface PaletteItem {
  id: string
  group: string
  label: string
  icon: LucideIcon
  run: () => void
}

/**
 * Paleta de comandos (⌘K / Ctrl+K): salta a una sección, cambia tema o idioma,
 * descarga el CV o abre un enlace. Es solo navegación del propio sitio.
 * El diálogo se monta únicamente al abrir, así consulta y selección empiezan
 * siempre vacías sin tener que reiniciarlas desde un efecto.
 */
export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  return open ? <PaletteDialog onClose={onClose} /> : null
}

function PaletteDialog({ onClose }: { onClose: () => void }) {
  const { uiNav, contact, uiHero } = useContent()
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const copy = uiNav.palette

  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const items = useMemo<PaletteItem[]>(() => {
    const go = (href: string) => () => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
    const openUrl = (url: string) => () => {
      window.open(url, '_blank', 'noopener')
    }
    return [
      ...uiNav.links.map((link) => ({
        id: link.href,
        group: copy.sections,
        label: link.label,
        icon: Hash,
        run: go(link.href),
      })),
      {
        id: 'theme',
        group: copy.actions,
        label: theme === 'dark' ? copy.lightTheme : copy.darkTheme,
        icon: theme === 'dark' ? Sun : Moon,
        run: toggleTheme,
      },
      {
        id: 'language',
        group: copy.actions,
        label: language === 'es' ? copy.switchToEnglish : copy.switchToSpanish,
        icon: Languages,
        run: toggleLanguage,
      },
      ...(['harvard', 'ats', 'visual'] as const).map((format) => ({
        id: `cv-${format}`,
        group: copy.actions,
        label: `${uiHero.downloadCv} · ${{ harvard: uiHero.cvHarvardName, ats: uiHero.cvAtsName, visual: uiHero.cvVisualName }[format]}`,
        icon: Download,
        run: () => {
          const link = document.createElement('a')
          link.href = cvHref(format, language)
          link.download = ''
          link.click()
        },
      })),
      {
        id: 'email',
        group: copy.links,
        label: contact.email,
        icon: Mail,
        run: () => {
          window.location.href = `mailto:${contact.email}`
        },
      },
      { id: 'linkedin', group: copy.links, label: 'LinkedIn', icon: ExternalLink, run: openUrl(contact.linkedinUrl) },
      { id: 'github', group: copy.links, label: 'GitHub', icon: ExternalLink, run: openUrl(contact.githubUrl) },
    ]
  }, [uiNav.links, copy, theme, toggleTheme, language, toggleLanguage, uiHero, contact])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? items.filter((item) => item.label.toLowerCase().includes(q)) : items
  }, [items, query])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  function runItem(item: PaletteItem | undefined) {
    if (!item) return
    onClose()
    item.run()
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelected((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelected((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      runItem(results[selected])
    } else if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    }
  }

  let lastGroup = ''

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={copy.title}
        onKeyDown={onKeyDown}
        className="card w-full max-w-[560px] overflow-hidden shadow-[var(--shadow-pop)]"
      >
        <div className="flex items-center gap-3 border-b border-divider px-4">
          <Search size={16} strokeWidth={2} className="flex-none text-mute-600" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setSelected(0)
            }}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[selected] ? `palette-${results[selected].id}` : undefined}
            placeholder={copy.placeholder}
            className="h-12 min-w-0 flex-1 bg-transparent text-sm text-text outline-none placeholder:text-mute-600"
          />
          <kbd className="rounded-md border border-divider px-1.5 py-0.5 font-mono text-[10px] text-mute-600">esc</kbd>
        </div>

        <div id="palette-list" ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && <div className="px-3 py-8 text-center text-sm text-mute-700">{copy.empty}</div>}
          {results.map((item, index) => {
            const showGroup = item.group !== lastGroup
            lastGroup = item.group
            const Icon = item.icon
            const isSelected = index === selected
            return (
              <div key={item.id}>
                {showGroup && (
                  <div className="px-3 pt-3 pb-1.5 font-mono text-[10px] tracking-[.08em] text-mute-600 uppercase">
                    {item.group}
                  </div>
                )}
                <div
                  id={`palette-${item.id}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseMove={() => setSelected(index)}
                  onClick={() => runItem(item)}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                    isSelected ? 'bg-accent/12 text-text' : 'text-mute-800'
                  }`}
                >
                  <Icon size={15} strokeWidth={2} className={isSelected ? 'text-accent' : 'text-mute-600'} aria-hidden />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {isSelected && <CornerDownLeft size={13} className="flex-none text-mute-600" aria-hidden />}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
