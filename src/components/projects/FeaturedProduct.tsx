import { ArrowUpRight } from 'lucide-react'
import { useContent } from '../../context/useContent'
import { Eyebrow } from '../ui/SectionHeader'

/**
 * Tarjeta de producto destacado (SyTix). Todo lo opcional (rol, stack,
 * highlights, enlace) se omite mientras no tenga contenido: se completa en
 * data/{es,en}/featuredProduct.ts.
 */
export function FeaturedProduct() {
  const { featuredProduct: product, uiFeaturedProduct: ui } = useContent()
  const hasDetails = Boolean(product.role || product.stack?.length || product.highlights?.length)

  return (
    <article id={product.id} className="card relative mb-8 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 -right-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-glow/10 blur-3xl"
      />

      <div className="relative px-5 py-7 sm:px-8 sm:py-9">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-poster px-2.5 py-1.5 font-mono text-[10px] leading-none font-medium tracking-[.08em] text-white uppercase">
            {ui.eyebrow}
          </span>
          <span className="chip">{product.company}</span>
          <span className="chip gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-glow" aria-hidden />
            {product.status}
          </span>
        </div>

        <h3 className="mb-2 text-[clamp(44px,7vw,72px)] leading-none font-semibold tracking-[-0.045em]">
          <span className="bg-linear-to-r from-text via-accent to-glow bg-clip-text text-transparent">
            {product.name}
          </span>
        </h3>
        <p className="mb-5 font-mono text-[13px] text-mute-700">{product.tagline}</p>
        <p className="max-w-[64ch] text-base leading-[1.65] text-mute-800">{product.summary}</p>

        {hasDetails && (
          <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {product.role && (
              <div className="tile p-4">
                <Eyebrow className="mb-2">{ui.roleLabel}</Eyebrow>
                <p className="text-sm leading-[1.6] text-mute-800">{product.role}</p>
              </div>
            )}
            {product.stack && product.stack.length > 0 && (
              <div className="tile p-4">
                <Eyebrow className="mb-3">{ui.stackLabel}</Eyebrow>
                <div className="flex flex-wrap gap-2">
                  {product.stack.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {product.highlights && product.highlights.length > 0 && (
              <div className="tile p-4">
                <Eyebrow className="mb-2">{ui.highlightsLabel}</Eyebrow>
                <ul className="list-disc space-y-1 pl-[17px] text-sm leading-[1.6] text-mute-800 marker:text-accent">
                  {product.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {product.link && (
          <a
            href={product.link.href}
            target="_blank"
            rel="noopener"
            className="mt-7 inline-flex items-center gap-1.5 rounded-lg border border-divider px-3.5 py-2.5 text-[13px] font-semibold hover:border-accent/50"
          >
            {product.link.label}
            <ArrowUpRight size={14} strokeWidth={2} />
          </a>
        )}
      </div>
    </article>
  )
}
