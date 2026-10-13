import { useContent } from '../context/useContent'
import { SectionHeader } from './ui/SectionHeader'

export function TechNotes() {
  const { techNotes, uiTechNotes } = useContent()
  return (
    <section id="notas" className="mx-auto max-w-[1200px] px-5 pt-12 pb-16 sm:px-10">
      <SectionHeader eyebrow={uiTechNotes.eyebrow} heading={uiTechNotes.heading} aside={uiTechNotes.intro} />

      <div className="card divide-y divide-divider">
        {techNotes.map((note) => (
          <div
            key={note.title}
            className="grid grid-cols-1 gap-x-6 gap-y-2 p-5 sm:p-6 md:grid-cols-[minmax(0,2fr)_minmax(0,7fr)_minmax(0,2fr)] md:items-baseline"
          >
            <div className="font-mono text-[11px] tracking-[.08em] text-mute-700 uppercase">{note.category}</div>
            <div>
              <div className="mb-1.5 text-lg leading-[1.3] font-semibold tracking-[-0.01em]">{note.title}</div>
              <div className="text-[13px] leading-[1.65] text-mute-700">{note.description}</div>
            </div>
            <div className="md:text-right">
              <span className="chip text-mute-700">{note.status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
