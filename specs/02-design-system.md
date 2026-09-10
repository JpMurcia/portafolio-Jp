# 02 — Design System

Todo lo listado aquí se extrajo **literalmente** del CSS inline y las variables `:root` del
prototipo (`Portafolio JPMC.dc.html`). Donde el prototipo depende de una hoja de estilos
externa que no es accesible desde este repo (`_ds/modernist-.../styles.css`, cargada por el
motor de Claude Design), se marca explícitamente como **⚠ pendiente de confirmar**.

## 1. Paleta de colores

### 1.1 Acento de marca (definido en `:root`, válido en ambos temas salvo overrides)

| Token | Hex |
|---|---|
| `--color-accent` | `#2f83cc` |
| `--color-accent-100` | `#eef6fd` |
| `--color-accent-200` | `#d6e9f9` |
| `--color-accent-300` | `#b3d6f3` |
| `--color-accent-400` | `#7ab6e8` |
| `--color-accent-500` | `#4a97d8` |
| `--color-accent-600` | `#256fb0` |
| `--color-accent-700` | `#1a5789` |
| `--color-accent-800` | `#154566` |
| `--color-accent-900` | `#123449` |

### 1.2 Color "poster" (CTA primario / footer — no es parte de la escala accent)

| Token | Light | Dark |
|---|---|---|
| `--jp-poster` | `#2779b4` | `#1b5b8c` |

### 1.3 Tema oscuro (`body[data-theme="dark"]` — es el tema por defecto del prototipo)

| Token | Valor |
|---|---|
| `--color-bg` | `#141312` |
| `--color-surface` | `#242221` |
| `--color-text` | `#f3f2f2` |
| `--color-divider` | `color-mix(in srgb, #f3f2f2 32%, transparent)` ≈ `rgba(243,242,242,.32)` |
| `--color-neutral-500` | `#8a8686` |
| `--color-neutral-600` | `#a5a1a1` |
| `--color-neutral-700` | `#c2bfbf` |
| `--color-neutral-800` | `#e2dfdf` |
| `--color-accent` (override) | `#6cb2ea` |
| `--color-accent-600` (override) | `#4a97d8` |
| `--color-accent-700` (override) | `#a6d2f4` |

### 1.4 Tema claro — ⚠ pendiente de confirmar

El HTML del prototipo **no define** los valores de `--color-bg`, `--color-surface`,
`--color-text`, `--color-divider` ni la escala `--color-neutral-*` para el tema claro; solo
sobrescribe esas variables dentro de `body[data-theme="dark"]`. Los valores base para claro
viven en la hoja de estilos externa del "design system" de Claude Design
(`_ds/modernist-944dcd56.../styles.css`), que no es accesible fuera del canvas.

Propuesta de valores claros (espejo estructural del tema oscuro, a validar visualmente antes
de darlos por definitivos):

| Token | Valor propuesto |
|---|---|
| `--color-bg` | `#faf9f8` |
| `--color-surface` | `#f0eeec` |
| `--color-text` | `#141312` |
| `--color-divider` | `rgba(20,19,18,.14)` |
| `--color-neutral-500` | `#8a8686` |
| `--color-neutral-600` | `#6b6767` |
| `--color-neutral-700` | `#4d4a4a` |
| `--color-neutral-800` | `#2c2a2a` |

**Acción recomendada:** confirmar estos valores contra el mockup real (inspeccionar los
estilos computados en el navegador sobre el canvas de Claude Design, o pedir al diseño que
exporte la paleta) antes de fijarlos en `tailwind.config`.

### 1.5 Opacidades sobre el bloque "poster" (footer/CTA, texto blanco)

| Uso | Valor |
|---|---|
| Texto secundario | `rgba(255,255,255,.92)` |
| Labels de contacto | `rgba(255,255,255,.75)` / `.8` |
| Bordes/divisores sobre poster | `rgba(255,255,255,.3)` / `.45` |

## 2. Tipografía

### 2.1 Familias — ⚠ pendiente de confirmar

`--font-heading` y `--font-body` se referencian en todo el HTML pero **no se declaran** en el
archivo (vienen del design system externo "modernist"). Por el peso tipográfico (800
predominante, tracking negativo en titulares, uppercase con letter-spacing amplio en labels),
el estilo es un grotesco "swiss/editorial" bold. Sustitutos recomendados mientras se confirma
la fuente real:

- `--font-heading`: `"Inter", "Sora", system-ui, sans-serif` (weights 600/800)
- `--font-body`: `"Inter", system-ui, sans-serif` (weights 400/600)
- Monoespaciada (sí está definida explícitamente): `ui-monospace, SFMono-Regular, Menlo, monospace`

### 2.2 Escala tipográfica (tal como aparece en el HTML)

| Uso | font-size | line-height | letter-spacing | weight |
|---|---|---|---|---|
| H1 Hero | `clamp(44px,6.2vw,82px)` | 1 | `-.035em` | 800 |
| H2 CTA footer | `clamp(36px,5.4vw,68px)` | 1.02 | `-.035em` | 800 |
| H2 sección | `34px` | 1.06 | `-.025em` | 800 (por defecto del heading) |
| H3 título de caso | `clamp(26px,3.4vw,40px)` | 1.04 | `-.025em` | 800 |
| H3 timeline / rol | `23px` | normal | `-.015em` | 800 |
| H3 educación | `22px` | normal | `-.015em` | 800 |
| Subcopy hero | `20px` | 1.45 | — | 400 |
| Body destacado | `16–17px` | 1.55–1.6 | — | 400 |
| Body pequeño | `14–15px` | 1.55–1.7 | — | 400 |
| Eyebrow / label sección (`"01 — Perfil"`) | `11px` | 1 | `.1em` | 800, uppercase |
| Nav links | `11px` | 1 | `.08em` | 800, uppercase |
| Meta / stat label | `9–10px` | 1.4 | `.07–.09em` | 800, uppercase |
| Código (`<pre>`) | `12px` | 1.7 | — | monospace |

## 3. Espaciado y layout

### 3.1 Contenedor

- `max-width: 1200px`, `margin: 0 auto`, `padding: 0 40px` (horizontal constante en todas las
  secciones).
- Padding vertical de sección: `64px` (estándar), `72px` para el hero (arriba), `76px/44px`
  para el footer (arriba/abajo).

### 3.2 Sin breakpoints fijos

El prototipo **no usa `@media queries`**. La responsividad se logra con:

- `clamp()` para tamaños de titulares.
- `grid-template-columns: repeat(auto-fit, minmax(Npx, 1fr))` para todas las grillas
  (skills, stats de caso, certificaciones, repos, footer).
- `flex-wrap: wrap` en filas de badges/botones.

**Implicación para React/Tailwind:** replicar este patrón con utilidades arbitrarias
(`grid-cols-[repeat(auto-fit,minmax(220px,1fr))]`) o un helper de Tailwind, en vez de definir
breakpoints `sm/md/lg` tradicionales. Esto debe probarse en viewport real (ver `04-task-roadmap.md`).

### 3.3 Escala de espaciado observada

Valores de `padding`/`gap`/`margin` recurrentes en el HTML (no es una escala estricta de 4/8pt,
es una escala ajustada a mano, mayormente par):

```
6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 40, 44, 48, 64, 72, 76 (px)
```

Recomendación: mapear los valores más frecuentes (8, 12, 16, 20, 24, 32, 40, 48, 64) a la
escala default de Tailwind y usar valores arbitrarios (`p-[34px]`, `gap-[22px]`) para el resto
en vez de forzar una escala nueva.

## 4. Bordes, radios y elevación

- **`border-radius: 0` en absolutamente todo el prototipo.** Estética tipo "poster
  editorial/swiss", esquinas rectas sin excepción.
- **Sin `box-shadow` en ningún elemento.** La separación visual es 100% por bordes sólidos y
  bloques de color plano.
- Grosores de borde: `1px` (divisores internos, celdas de tabla) y `2px` (contenedores
  principales: nav, `<article>` de caso, separadores `<hr>` entre secciones, cajas de
  diagrama de arquitectura — estas últimas usan `var(--color-text)` en vez de
  `var(--color-divider)` para más contraste).
- **Técnica "hairline grid"**: en certificaciones y repos de GitHub, el grid tiene
  `gap: 2px` y `background: var(--color-divider)`, mientras cada celda tiene
  `background: var(--color-bg)` — el fondo del gap simula líneas finas de tabla sin usar
  `border` en cada celda.

## 5. Estilos de componentes comunes

### 5.1 Botones

| Variante | Estilo |
|---|---|
| **Primario** (`jp-poster`) | `background: var(--jp-poster)`, `color: #fff`, `padding: 14px 20px`, `font: 800 13px heading`, sin borde, hover → `background: var(--color-accent-600)`. Icono opcional a la izquierda, `gap: 9px`. |
| **Secundario** (outline) | `border: 1px solid var(--color-divider)`, `color: var(--color-text)`, mismo padding, hover → tinte de fondo al 7% sobre el color de texto (`color-mix`). |
| **Invertido** (sobre footer) | `background: #fff`, `color: var(--jp-poster)` — mismo botón primario con colores intercambiados. |

### 5.2 Badges / etiquetas

| Tipo | Estilo |
|---|---|
| Badge sólido (número de caso, "Certificación", "Actual") | `background: var(--jp-poster)`, `color: #fff`, `padding: 4–7px 6–9px`, `font: 800 9–10px heading`, `uppercase`, `letter-spacing: .08em` |
| Badge outline (categoría de caso) | `border: 1px solid var(--color-divider)`, mismo tipo tipográfico |
| Chip de skill (interactivo, `data-skill`) | `border: 1px solid var(--color-divider)`, `padding: 7px 9px`, `font: 600 12px body`, `cursor: default` |
| Tag de tecnología (timeline) | `border: 1px solid var(--color-divider)`, `padding: 6px 8px`, `font: 600 11px body`, `color: var(--color-neutral-800)` |

### 5.3 Tarjetas

- **Tarjeta de caso de estudio** (`<article>`): `border: 2px solid var(--color-divider)`,
  sin padding propio — cada bloque interno (header, stats, problema, diagramas, decisiones,
  implementación, resultado) tiene su propio padding y un `border-bottom: 2px solid
  var(--color-divider)` que lo separa del siguiente.
- **Tarjeta de certificación**: dentro del grid "hairline", `padding: 20px 22px`, logo/mono
  box de `34×34px` con borde, badge opcional "Certificación", título `800 15px`, meta
  `12px` en `neutral-700`, enlace `"Ver credencial →"`.
- **Caja de diagrama de arquitectura**: `border: 2px solid var(--color-text)` (no divider),
  `padding: 16–18px`, fondo alterna entre transparente y `var(--color-surface)` para
  diferenciar capas del flujo.

### 5.4 Enlaces

- Subrayado vía `border-bottom: 1px solid color-mix(accent 40%, transparent)`, color
  `var(--color-accent)`; hover → `color-accent-700` + borde `accent-700`.
- Enlaces de navegación: `border: 0` (sin subrayado), uppercase `11px 800`.

### 5.5 Tabla comparativa de decisiones

Grid de 3 columnas (`auto-fit, minmax(200px,1fr)`): encabezado `800 10px uppercase
neutral-700`, celdas separadas por `border: 1px solid var(--color-divider)` en ambos ejes.

### 5.6 Acordeón de implementación

`<details>`/`<summary>` nativo. El ícono `+` (`.jp-plus`) rota 45° (→ forma de "×") cuando
`details[open]` vía CSS puro, sin JS. En React puede mantenerse como `<details>` semántico
(accesible por defecto, sin necesidad de gestionar estado) o reimplementarse con
`useState` + ícono Lucide `Plus`/`X` si se necesita animación adicional.

### 5.7 Bloques de código

`<pre>`: `font: 12px/1.7 monospace`, `background: var(--color-surface)`,
`border-left: 2px solid var(--color-accent)`, `padding: 16px 18px`, `overflow-x: auto`. Texto
plano, sin syntax highlighting en el prototipo — candidato a componente `<CodeBlock>`
reutilizable.

### 5.8 Iconografía

- Iconos de **interfaz** (descarga, toggle de tema): SVG inline `stroke="currentColor"`,
  `stroke-width="2"`, sin relleno → mapean 1:1 a **Lucide React** (`Download`,
  `Sun`/`Moon`, etc.) manteniendo `strokeWidth={2}`.
- Los **diagramas de arquitectura y de casos de uso** (SVG grandes, dibujados a mano por cada
  caso de estudio) **no son iconos** — son ilustraciones a medida por caso. Se documentan como
  parte de la arquitectura de `Projects` en `03-component-architecture.md`, no como parte del
  sistema de iconos.

## 6. Interacciones / estado visual global

| Interacción | Descripción |
|---|---|
| Barra de progreso de scroll | Fija arriba, `3px` alto, `background: var(--color-accent)`, ancho = `% scroll` de la página. |
| Cross-highlight skills ↔ casos | Al pasar el cursor sobre un chip `data-skill`, los `<article data-skills="...">` que **no** incluyen esa skill bajan a `opacity: .22` (clase `.jp-dim`, transición `.18s`). |
| Toggle de tema | `body[data-theme]` alterna `"dark"`/`"light"`; **oscuro es el valor por defecto**. |
| Sección "Otros cursos" | Colapsable — en el prototipo es un booleano de Claude Design (`showAllCourses`); en producción será un botón "Ver más". |
| Secciones opcionales | `showGithub` (repos de GitHub) — **oculta por defecto**. `showNotes` (notas técnicas) — **visible por defecto**. Ambas eran flags de contenido del canvas de diseño; hay que decidir si se vuelven fijas o configurables en `04-task-roadmap.md`. |
