# 04 — Task Roadmap

Checklist ordenado por prioridad para construir el portafolio a partir de `01`–`03`. Nada de
esta lista se ejecuta todavía — es la hoja de ruta a aprobar antes de tocar código.

## Fase 0 — Antes de escribir código (decisiones pendientes)

- [x] Analizar el prototipo (`Portafolio JPMC.dc.html`) y generar `specs/01-04`.
- [ ] Revisar y aprobar los 4 documentos de `specs/` con el usuario.
- [ ] Confirmar la familia tipográfica real de `--font-heading`/`--font-body` (o elegir
      sustitutas definitivas — ver `02-design-system.md` §2.1).
- [ ] Confirmar la paleta de tema **claro** (no está en el HTML fuente — ver
      `02-design-system.md` §1.4).
- [ ] Recolectar las URLs reales de credenciales (LinkedIn Learning, Platzi, AWS, SCRUMstudy,
      UBA IALAB) para reemplazar los `href="#"` de `CertificationCard`.
- [ ] Decidir si se publican las secciones opcionales `GithubRepos` (oculta por defecto en el
      prototipo) y `TechNotes` (visible por defecto, actualmente contenido placeholder "Borrador").
- [ ] Conseguir el PDF real del CV (`CV-Juan-Pablo-Murcia-Cortes.pdf`) para `public/`.
- [ ] Decidir si las categorías de `Skills` siguen la agrupación real del prototipo (4
      categorías) o se reagrupan a 5 como se mencionó inicialmente.
- [ ] Decidir el enfoque para los diagramas SVG de cada caso de estudio: datos estructurados +
      componente genérico, vs. SVG estático por caso (ver `03-component-architecture.md`,
      sección `CaseStudyCard`).

## Fase 1 — Fundaciones del proyecto

- [ ] Instalar y configurar Tailwind CSS sobre el scaffold Vite existente.
- [ ] Instalar `lucide-react`.
- [ ] Volcar los tokens de `02-design-system.md` (colores, tipografía, espaciado, sin radios,
      sin sombras) al `theme.extend` de Tailwind.
- [ ] Configurar el modo oscuro/claro basado en atributo (`data-theme`) para reusar
      exactamente las variables CSS del prototipo, con `dark` como valor por defecto.
- [ ] Crear la estructura de carpetas: `src/components/`, `src/sections/`, `src/data/`,
      `src/context/`, `src/types.ts`.
- [ ] Definir `src/types.ts` y poblar `src/data/*.ts` con el contenido real (skills, casos,
      experiencia, certificaciones, contacto) según el modelo propuesto en `03`.

## Fase 2 — Infraestructura y layout base

- [ ] `ThemeProvider` + `useTheme()` (persistencia en `localStorage`, default `dark`).
- [ ] `SkillsHighlightProvider` + `useSkillsHighlight()`.
- [ ] `ScrollProgressBar`.
- [ ] `Navbar` (sticky, anclas, toggle de tema, comportamiento responsivo).
- [ ] `App.tsx` con landmarks semánticos (`nav` / `header` / `main` / `footer`) y anclas
      `id` correspondientes a cada sección.

## Fase 3 — Secciones principales (en el orden del prototipo)

- [ ] `Hero` (titular, subcopy, dos CTAs, tabla de datos clave).
- [ ] `About` ("Sobre mí" — 3 párrafos + 3 principios de trabajo).
- [ ] `Skills` (grid por categoría + interacción hover con `SkillsHighlightProvider`).
- [ ] `Projects`:
  - [ ] `CaseStudyCard` genérico (header, meta stats, problema/restricciones, tabla de
        decisiones, acordeón de implementación con `CodeBlock`, resultado/aprendizajes).
  - [ ] `UseCaseDiagram` por caso (según el enfoque decidido en Fase 0).
  - [ ] `ArchitectureDiagram` por caso.
  - [ ] `OtherProjectsList`.
  - [ ] Poblar `data/caseStudies.ts` con los 3 casos completos (InfoMetal / Chaira / Gestor
        comunitario de selva).
- [ ] `Experience` (timeline de trayectoria laboral).
- [ ] `Education`:
  - [ ] `DegreeCards`.
  - [ ] `CertificationsGrid` + `CertificationCard` **con enlaces reales** (bloqueado por la
        tarea de Fase 0 de recolectar URLs).
  - [ ] `MoreCoursesToggle`.
- [ ] (Condicional a Fase 0) `GithubRepos`.
- [ ] (Condicional a Fase 0) `TechNotes`.
- [ ] `Footer` / `Contact` (CTA, grid de datos de contacto, botón de descarga de CV).

## Fase 4 — Interactividad y pulido

- [ ] Verificar el cross-highlight skills ↔ casos de estudio en los 4 grupos de skills.
- [ ] Smooth scroll + `scroll-margin-top` en todas las secciones ancladas (compensando el
      `Navbar` sticky).
- [ ] Estados `hover`/`focus-visible` consistentes en botones, enlaces, chips y el acordeón.
- [ ] Accesibilidad: `aria-label` en el toggle de tema, `role="img"` + `<title>` en los SVG de
      diagramas, orden de tabulación, foco visible en todos los interactivos.

## Fase 5 — QA y lanzamiento

- [ ] Revisión responsiva real en mobile/tablet/desktop (el diseño es fluido vía `clamp()` y
      `auto-fit`, sin breakpoints fijos — probar que se sostenga en anchos intermedios).
- [ ] Probar el toggle de tema claro/oscuro end-to-end, incluyendo contraste de texto sobre
      `--jp-poster` y sobre `--color-surface`.
- [ ] Verificar que el PDF del CV se descargue correctamente desde Hero y Footer.
- [ ] Lint (`npm run lint` vía oxlint) y type-check (`tsc -b`).
- [ ] Build de producción (`npm run build`) y revisión con `npm run preview`.
- [ ] Definir y ejecutar el despliegue (plataforma pendiente de decidir: Vercel, Netlify,
      GitHub Pages, etc.).

---

**Recordatorio de alcance para este turno:** no se instala ningún paquete ni se escribe código
de componentes hasta que el usuario apruebe `01-project-overview.md`,
`02-design-system.md`, `03-component-architecture.md` y este roadmap.
