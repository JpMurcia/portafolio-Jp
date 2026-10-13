import { useContent } from '../context/useContent'
import { SectionHeader } from './ui/SectionHeader'

export function About() {
  const { about, uiAbout } = useContent()

  return (
    <section id="sobre" className="mx-auto max-w-[1200px] px-5 py-16 sm:px-10 sm:py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <SectionHeader eyebrow={uiAbout.eyebrow} heading={uiAbout.heading} />
        </div>

        <div className="min-w-0">
          <div className="space-y-5">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-[64ch] text-[17px] leading-[1.7] text-mute-800">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-4">
            {about.principles.map((principle, i) => (
              <div key={principle.title} className="card p-5">
                <div className="mb-3 font-mono text-[11px] text-accent">{String(i + 1).padStart(2, '0')}</div>
                <div className="mb-2 text-[15px] leading-[1.3] font-semibold">{principle.title}</div>
                <div className="text-[13px] leading-[1.6] text-mute-700">{principle.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
