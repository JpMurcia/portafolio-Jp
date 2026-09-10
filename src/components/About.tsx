import { about } from '../data/about'

export function About() {
  return (
    <section id="sobre" className="mx-auto max-w-[1200px] px-10 py-16">
      <div className="grid grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-[48px]">
        <div className="min-w-0">
          <div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-accent uppercase">
            01 — Perfil
          </div>
          <h2 className="text-[34px] leading-[1.06] tracking-[-0.025em]">Qué hago y cómo trabajo</h2>
        </div>

        <div className="min-w-0">
          <div className="space-y-4">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-[62ch] text-[17px] leading-[1.6]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-t-2 border-divider">
            {about.principles.map((principle, i) => (
              <div
                key={principle.title}
                className={`pt-[22px] ${i < about.principles.length - 1 ? 'border-r border-divider pr-6' : ''} ${i > 0 ? 'pl-6' : ''}`}
              >
                <div className="mb-[7px] font-heading text-[15px] leading-[1.25] font-extrabold">
                  {principle.title}
                </div>
                <div className="text-[13px] leading-[1.6] text-mute-800">{principle.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
