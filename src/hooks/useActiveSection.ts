import { useEffect, useState } from 'react'

/**
 * Devuelve el id de la sección que cruza una franja bajo la navbar mientras se
 * hace scroll. `ids` debe ser estable entre renders (se compara por contenido).
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join('|')

  useEffect(() => {
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      // Franja delgada a ~35% del alto del viewport: una sola sección a la vez.
      { rootMargin: '-30% 0px -65% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])

  return active
}
