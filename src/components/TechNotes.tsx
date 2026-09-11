import { useContent } from '../context/useContent'

export function TechNotes() {
  const { techNotes, uiTechNotes } = useContent()
  return (
    <section id="notas" className="mx-auto max-w-[1200px] px-10 pb-16">
      <div className="border-t-2 border-divider pt-12">
        <div className="mb-7 flex flex-wrap items-baseline justify-between gap-6">
          <div>
            <div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-accent uppercase">
              {uiTechNotes.eyebrow}
            </div>
            <h2 className="text-[34px] leading-[1.06] tracking-[-0.025em]">{uiTechNotes.heading}</h2>
          </div>
          <div className="max-w-[34ch] text-xs text-mute-700">{uiTechNotes.intro}</div>
        </div>

        <div className="border-t-2 border-divider">
          {techNotes.map((note, i) => (
            <div
              key={note.title}
              className={`grid grid-cols-[minmax(0,2fr)_minmax(0,7fr)_minmax(0,2fr)] items-baseline gap-6 py-[22px] ${
                i < techNotes.length - 1 ? 'border-b border-divider' : ''
              }`}
            >
              <div className="font-heading text-[11px] font-extrabold tracking-[.08em] text-mute-700 uppercase">
                {note.category}
              </div>
              <div>
                <div className="mb-[5px] font-heading text-lg leading-[1.3] font-extrabold">{note.title}</div>
                <div className="text-[13px] leading-[1.6] text-mute-800">{note.description}</div>
              </div>
              <div className="font-heading text-[11px] font-extrabold tracking-[.08em] text-mute-600 uppercase">
                {note.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
