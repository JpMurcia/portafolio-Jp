# 03 — Component Architecture

Desglose modular extraído de la estructura real del prototipo (9 secciones con `id`, en este
orden: `top` → `sobre` → `skills` → `casos` → `trayectoria` → `formacion` → `github` (opc.) →
`notas` (opc.) → `contacto`). Se respeta la lista de componentes pedida por el usuario y se
añaden los que el HTML deja en evidencia (Experience/Trayectoria, y las dos secciones
opcionales), marcados como **[adicional]**.

## 1. Árbol de componentes

```
App
├─ ThemeProvider              [adicional] — contexto de tema claro/oscuro
├─ SkillsHighlightProvider    [adicional] — estado compartido Skills ↔ Projects
├─ ScrollProgressBar          [adicional]
├─ Navbar
├─ main
│  ├─ Hero
│  ├─ About                   ("Sobre mí")
│  ├─ Skills
│  ├─ Projects                ("Casos de estudio")
│  │  ├─ CaseStudyCard × 3
│  │  │  ├─ CaseStudyHeader
│  │  │  ├─ CaseStudyMetaStats
│  │  │  ├─ ProblemConstraints
│  │  │  ├─ UseCaseDiagram        (SVG propio por caso)
│  │  │  ├─ ArchitectureDiagram   (bloques + flechas, propio por caso)
│  │  │  ├─ DecisionsTable
│  │  │  ├─ ImplementationAccordion
│  │  │  │  └─ CodeBlock
│  │  │  └─ OutcomeAndLearnings
│  │  └─ OtherProjectsList
│  ├─ Experience               [adicional] ("Trayectoria" — timeline laboral)
│  ├─ Education                ("Formación")
│  │  ├─ DegreeCards
│  │  ├─ CertificationsGrid
│  │  │  └─ CertificationCard × N
│  │  └─ MoreCoursesToggle
│  ├─ GithubRepos              [adicional, opcional — oculto por defecto]
│  └─ TechNotes                [adicional, opcional — visible por defecto]
└─ Footer                      ("Contacto")
```

## 2. Detalle por componente

### `Navbar`

- **Responsabilidad:** navegación fluida por anclas (`#sobre`, `#skills`, `#casos`,
  `#trayectoria`, `#formacion`, `#contacto`) + logo + toggle de tema. `position: sticky; top:
  0`, borde inferior `2px`.
- **Props:** ninguno (contenido estático de navegación); consume `useTheme()`.
- **Notas:** el logo (`JUAN PABLO MURCIA.`) lleva un punto en `--color-accent`. El botón de
  tema es un cuadrado `34×34px` con ícono Lucide (`Sun`/`Moon`), `aria-label="Cambiar tema"`.
  Responsivo por `flex-wrap`, sin menú hamburguesa en el prototipo — validar si se necesita uno
  en mobile real (ver roadmap).

### `Hero`

- **Responsabilidad:** presentación principal (ubicación, titular, resumen), dos CTAs
  (descargar CV / contacto), y una tabla de datos clave a la derecha (rol actual, experiencia,
  núcleo técnico, integración, formación, enlaces).
- **Props:** `stats: { label: string; value: ReactNode }[]` para la columna derecha, o
  hardcodeado si no se reutiliza en ningún otro lado.
- **Notas:** grid `7fr / 4fr`. El botón "Descargar CV" apunta a
  `assets/CV-Juan-Pablo-Murcia-Cortes.pdf` con `download` — **el PDF real aún no existe en el
  repo**, hay que conseguirlo (ver roadmap).

### `About`

- **Responsabilidad:** resumen profesional en 3 párrafos + 3 "principios de trabajo" en grid
  de 3 columnas.
- **Props:** `principles: { title: string; body: string }[]`.
- **Notas:** layout `4fr / 8fr` (eyebrow + H2 a la izquierda, texto a la derecha).

### `Skills`

- **Responsabilidad:** grid de 4 categorías (`Lenguajes`, `Datos y BI`, `Frameworks y
  herramientas`, `Integración y método`) con chips de tecnología. Al pasar el cursor sobre un
  chip, atenúa los casos de estudio (`Projects`) que no usan esa tecnología.
- **Props:** `categories: { title: string; skills: { id: string; label: string }[] }[]`.
- **Estado compartido:** consume `SkillsHighlightProvider` (`hoveredSkill`,
  `setHoveredSkill`) — el mismo contexto lo lee `CaseStudyCard` para decidir su `opacity`.
- **Nota de fidelidad:** el usuario pidió las categorías "Lenguajes, BD, Oracle, Protocolos,
  Herramientas" (5); el HTML real agrupa en **4** categorías distintas (ver arriba). Se
  documenta la agrupación real; si se prefiere la de 5 categorías, es un cambio de contenido a
  decidir antes de construir `data/skills.ts`.

### `Projects` ("Casos de estudio")

Sección contenedora de los 3 casos + la lista "Otros proyectos y publicaciones". Cada caso es
una instancia de un mismo componente genérico `CaseStudyCard`, alimentado por un objeto de
datos — **no** se debe hardcodear 3 componentes distintos.

#### `CaseStudyCard`

- **Props (boceto TS):**
  ```ts
  interface CaseStudy {
    id: string;                       // "jp-caso-1"
    number: string;                   // "Caso 01"
    tags: string[];                   // ["Integración ERP", "Industria · Báscula", ...]
    title: string;
    summary: string;
    skills: string[];                 // data-skills, para el cross-highlight
    metaStats: { label: string; value: string }[];   // Rol / Periodo / Stack / Protocolos
    problem: string;
    constraints?: string[];
    useCaseDiagram: UseCaseDiagramSpec;      // ver más abajo
    architecture: ArchitectureStepSpec[];    // ver más abajo
    decisions: { decision: string; discarded: string; why: string }[];
    implementation: { title: string; code: string; note?: string }[];
    outcome: string[];
    learnings: string[];
  }
  ```
- **Subcomponentes internos:** `CaseStudyHeader`, `CaseStudyMetaStats`,
  `ProblemConstraints`, `UseCaseDiagram`, `ArchitectureDiagram`, `DecisionsTable`,
  `ImplementationAccordion` (→ `CodeBlock`), `OutcomeAndLearnings`.
- **Nota sobre los diagramas:** son SVG dibujados a mano por caso (actores, elipses de caso de
  uso, cajas de sistema externo, flechas de flujo con protocolo anotado). No son datos
  tabulares triviales de tipar 1:1; hay dos caminos razonables:
  1. Modelarlos como datos estructurados (`actors`, `useCases`, `externalSystems`,
     `relations`) y generar el SVG con un componente `UseCaseDiagram`/`ArchitectureDiagram`
     genérico — más trabajo inicial, pero reutilizable y fácil de mantener por contenido.
  2. Incrustar el SVG ya armado por caso como un componente estático
     (`CaseStudy1Diagram.tsx`, etc.) — más rápido, menos reutilizable.
  Se recomienda la opción 1 solo si se prevén más casos de estudio a futuro; si son 3 fijos,
  la opción 2 es más pragmática. Decisión a tomar en la fase de planeación de `04`.
- **Accesibilidad:** los SVG deben llevar `role="img"` + `<title>` descriptivo (el prototipo no
  lo tiene — es una mejora a introducir).

#### `OtherProjectsList`

- Lista de 3 filas (`Cacao Adventure`, `Reporteador de InfoMetal`, `Congresos TIC`) en grid de
  3 columnas (título+subtítulo / descripción / enlace o estado). `Props: items: {
  title, subtitle, description, link?: { href, label } | status: string }[]`.

### `Experience` ("Trayectoria") **[adicional]**

- **Responsabilidad:** timeline de 5 posiciones laborales (grid `2fr` fecha / `10fr`
  contenido), con badge "Actual" en la posición vigente, bullets de logros y tags de
  tecnología por entrada.
- **Props:** `entries: { period: string; current?: boolean; role: string; company: string;
  bullets: string[]; tags: string[] }[]`.
- No estaba en la lista de componentes pedida explícitamente por el usuario, pero es una
  sección propia con `id="trayectoria"` en el HTML — se incluye para que la migración sea
  completa.

### `Education` ("Formación")

- **Responsabilidad:** contenedor de `DegreeCards` (2 tarjetas: Ingeniería de Sistemas +
  técnico SENA) + `CertificationsGrid` + `MoreCoursesToggle`.

#### `CertificationsGrid` / `CertificationCard`

- **Props:** `certifications: { issuerInitials: string; title: string; issuer: string; date:
  string; credentialUrl: string; featured?: boolean }[]`.
- **Punto crítico del objetivo del usuario:** en el prototipo, **todos** los enlaces "Ver
  credencial →" son `href="#"` (placeholders). El objetivo 3 del usuario pide "hipervínculos
  externos **activos**" hacia LinkedIn/Platzi/Udemy — hay que recolectar las URLs reales de
  cada credencial antes de dar esta sección por terminada (tarea explícita en
  `04-task-roadmap.md`).
- Grid usa la técnica "hairline" (ver `02-design-system.md` §4).

#### `MoreCoursesToggle`

- Botón "Ver más cursos" que revela una lista de 8 cursos adicionales (chips). En el
  prototipo era un booleano de Claude Design (`showAllCourses`, default `true`); en producción
  es un `useState` local simple.

### `GithubRepos` **[adicional, opcional]**

- Grid "hairline" de repositorios (`finance-backend`, `Jp_asig_2018-S2`,
  `proyecto_web_2018`) con lenguaje y descripción.
- **Oculta por defecto** en el prototipo (`showGithub: false`). Decidir en el roadmap si se
  publica, se quita, o se deja como flag de contenido.

### `TechNotes` **[adicional, opcional]**

- Lista de 3 "notas técnicas" con estado "Borrador" — es contenido placeholder
  (`"Estructura lista. Los tres títulos son los temas que propongo; el contenido lo escribes
  tú."`, según el propio prototipo). **Visible por defecto** (`showNotes: true`).
- Decidir si se construye ahora vacía (solo estructura) o se pospone hasta tener contenido real.

### `Footer` / `Contact`

- **Responsabilidad:** bloque de cierre en `--jp-poster` sólido: titular CTA, subcopy, grid de
  6 celdas (Correo, Teléfono, LinkedIn, GitHub, Ubicación, botón Descargar CV invertido), y
  barra final con dos líneas de crédito/disclaimer.
- **Props:** `contact: { email, phone, linkedin, github, location }`.
- **Nota:** el correo (`juanpablomurciacortes@gmail.com`) y teléfono ya están en el prototipo
  como enlaces `mailto:`/`tel:` — mantener tal cual, son datos públicos de contacto que el
  propio usuario decidió exponer.

## 3. Componentes de infraestructura (no visuales)

### `ThemeProvider` / `useTheme()`

- Contexto que expone `theme: "light" | "dark"` y `toggleTheme()`.
- Persistencia recomendada en `localStorage`, con **`dark` como valor por defecto** (igual que
  el prototipo). Aplicar el tema seteando `document.documentElement.dataset.theme` o
  `document.body.dataset.theme` para reusar las variables CSS existentes tal cual, en vez de
  reescribir toda la paleta como clases de Tailwind.

### `SkillsHighlightProvider` / `useSkillsHighlight()`

- Contexto mínimo: `hoveredSkill: string | null`, `setHoveredSkill(id)`.
- Envuelve `Skills` + `Projects` (o vive en `App` si es más simple). Reemplaza la manipulación
  directa del DOM (`classList.toggle("jp-dim")`) del prototipo original por estado de React;
  cada `CaseStudyCard` calcula su propio `opacity` a partir de si `hoveredSkill` está en su
  `skills[]`.

### `ScrollProgressBar`

- Barra fija de `3px` en `top: 0`, ancho = `scrollY / (scrollHeight - innerHeight) * 100%`.
  Usa un `useEffect` con listener de `scroll` (`passive: true`), igual que el prototipo.

## 4. Modelo de datos propuesto

Separar contenido de presentación en `src/data/*.ts`, tipado desde `src/types.ts`:

```
src/
├─ types.ts              (interfaces: Skill, SkillCategory, CaseStudy, TimelineEntry,
│                          Certification, Repo, TechNote, ContactInfo)
├─ data/
│  ├─ skills.ts
│  ├─ caseStudies.ts
│  ├─ experience.ts
│  ├─ certifications.ts
│  ├─ otherProjects.ts
│  ├─ githubRepos.ts      (si se decide publicar la sección)
│  ├─ techNotes.ts
│  └─ contact.ts
```

Esto permite editar el contenido del portafolio (agregar un caso de estudio, una
certificación, un curso) sin tocar JSX/componentes.

## 5. Accesibilidad — notas transversales

- Landmarks: `<nav>`, `<header>` (hero), `<main>` envolviendo las secciones, `<footer>`.
- `<details>/<summary>` nativos para el acordeón de implementación (foco y semántica
  gratis).
- Enlaces externos: mantener `target="_blank" rel="noopener"` + indicador visual de salida
  (`"→"`), como en el prototipo.
- Botón de tema: `aria-label` + `aria-pressed` (ausente en el prototipo, se agrega en la
  migración).
- SVG de diagramas: agregar `role="img"` + `<title>` (ausente en el prototipo).
- Contraste en tema claro: revisar una vez confirmada la paleta clara real (ver
  `02-design-system.md` §1.4) — no se puede validar contraste sobre valores todavía
  provisionales.
