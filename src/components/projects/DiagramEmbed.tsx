import { useCallback, useEffect, useRef } from 'react'
import { useTheme } from '../../context/useTheme'

type ArchifyWindow = Window & { Archify?: { theme?: { toggle: () => void } } }

export function DiagramEmbed({ src, title }: { src: string; title: string }) {
  const { theme } = useTheme()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  /** El diagrama archify resuelve su propio tema al cargar; esto lo alinea con el del sitio, en vivo. */
  const syncTheme = useCallback(() => {
    const frameDocument = iframeRef.current?.contentDocument
    const frameWindow = iframeRef.current?.contentWindow as ArchifyWindow | null | undefined
    if (!frameDocument || !frameWindow) return
    if (frameDocument.documentElement.getAttribute('data-theme') !== theme) {
      frameWindow.Archify?.theme?.toggle()
    }
  }, [theme])

  useEffect(() => {
    syncTheme()
  }, [syncTheme])

  return (
    <div className="border border-divider">
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        loading="lazy"
        onLoad={syncTheme}
        className="h-[520px] w-full sm:h-[680px] lg:h-[840px]"
      />
    </div>
  )
}
