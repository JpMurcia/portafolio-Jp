# 02 — Design System

> **Revisado en el rediseño "dev-modern".** La versión anterior documentaba el estilo
> "poster/swiss" del prototipo (esquinas rectas, bordes de 2 px, sin sombras, Inter 800).
> Está en el historial de git. Esta versión describe lo que hay hoy en `src/index.css`, que es
> la **fuente de verdad**: si un valor de este documento y el CSS difieren, manda el CSS.

## 1. Principios

- **Oscuro por defecto, claro de primera clase.** Ambos temas se diseñan a la vez; ninguno es
  una inversión automática del otro.
- **Paleta fría "slate"** en los dos temas. Coincide con la de los diagramas archify embebidos
  (`public/diagrams/`, `#020617` oscuro / `#f8fafc` claro), que son HTML independientes dentro
  de un `<iframe>` y **no heredan el CSS del sitio**. Por eso el sitio oscuro (`#090c14`) es un
  poco más claro que el diagrama: el diagrama se lee como un panel inset.
- **Profundidad por superficie, no por color plano:** tarjetas con borde fino, radio y una sombra
  suave; un fondo ambiental discreto (brillo de acento + rejilla que se desvanece).
- **Mono para metadatos.** Etiquetas, chips, periodos y rótulos en Geist Mono; contenido en Geist.
- **Movimiento mínimo y respetuoso:** solo la entrada del hero y transiciones de color/elevación,
  siempre bajo `prefers-reduced-motion`.

## 2. Tokens (en `@theme` y `[data-theme='dark']`)

Tailwind v4 emite estos custom properties en `:root`; redefinirlos bajo `[data-theme='dark']`
cambia las utilidades en runtime. `--color-neutral-*` del prototipo se llama `--color-mute-*`
para no chocar con la escala `neutral` de Tailwind.

| Token | Claro | Oscuro |
|---|---|---|
| `--color-bg` | `#f5f7fb` | `#090c14` |
| `--color-surface` (tarjetas) | `#ffffff` | `#0e1320` |
| `--color-surface-2` (paneles internos, código) | `#eef2f8` | `#141b2b` |
| `--color-text` | `#0b1220` | `#e7ebf3` |
| `--color-divider` | `rgb(15 23 42 / 11%)` | `rgb(148 163 184 / 17%)` |
| `--color-mute-500…800` | `#94a3b8 · #64748b · #475569 · #334155` | `#64748b · #8794a8 · #a3afc2 · #c3ccda` |
| `--color-accent` | `#1f6db3` | `#62b0ff` |
| `--color-accent-600` | `#256fb0` | `#4a97d8` |
| `--color-accent-700` (hover de enlace, empresa) | `#1a5789` | `#a6d2f4` |
| `--color-poster` (CTA, bloque de contacto) | `#1f6db3` | `#1f6aa5` |
| `--color-glow` (segundo tono, cian) | `#22b8cf` | igual |

La escala `accent-100…900` (azul de marca) es idéntica en ambos temas salvo los overrides de la
tabla. Contraste: el acento claro `#1f6db3` sobre `#ffffff` ≈ 5.4:1 y `mute-700` sobre el fondo
oscuro supera 7:1, así que las etiquetas de 11 px cumplen AA.

Variables propias (no generan utilidades): `--shadow-card`, `--shadow-pop`, `--color-grid`,
`--glow-strength`, además de `--radius-card: 1rem` y `--radius-tile: .75rem`.

## 3. Tipografía

Fuentes **autoalojadas** con `@fontsource-variable` (sin petición a Google Fonts); solo el
subconjunto `latin`, que cubre ES/EN. Las flechas `→` y `⌘` caen a la fuente del sistema.

- `--font-heading` / `--font-body`: **Geist Variable**. Titulares con peso 600 y tracking negativo.
- `--font-mono`: **Geist Mono Variable**.

| Uso | Estilo |
|---|---|
| H1 hero | `clamp(44px, 7.2vw, 88px)`, 600, `-0.045em`, última línea con degradado acento→cian |
| H2 de sección | `clamp(28px, 4vw, 38px)`, 600, `-0.03em` |
| H3 de caso | `clamp(26px, 3.6vw, 40px)` |
| Cuerpo | 15–17 px, `line-height` 1.6–1.7 |
| Eyebrow / metadato | mono 11 px, 500, mayúsculas, `0.08em` (utilidad `eyebrow`) |

## 4. Superficies y piezas reutilizables

Definidas con `@utility` en `index.css`:

| Utilidad | Qué es |
|---|---|
| `card` | Superficie principal: `surface`, borde `divider`, `radius-card`, `shadow-card`. |
| `tile` | Panel interior dentro de una card: `surface-2`, borde, `radius-tile`, sin sombra. |
| `chip` | Etiqueta de tecnología: mono 12 px, borde, radio 8 px. |
| `eyebrow` | Rótulo de sección en acento (ver §3). |

Componentes compartidos: `SectionHeader` y `Eyebrow` en `src/components/ui/SectionHeader.tsx`.
No vuelvas a copiar el bloque "eyebrow + h2" en cada sección.

### Fondo ambiental

`body::before` (dos brillos radiales, acento y cian) y `body::after` (rejilla de 56 px con
máscara radial) van fijos detrás del contenido (`z-index: -1`, `pointer-events: none`). La
intensidad se controla con `--glow-strength` (9 % claro, 17 % oscuro).

## 5. Layout y responsive

- Contenedor: `max-width: 1200px`, padding horizontal `px-5` en móvil y `sm:px-10` desde 640 px.
- Padding vertical de sección: `py-12 sm:py-16` (el perfil y los casos usan `sm:py-20`).
- Las grillas multi-columna **siempre** tienen versión de una columna:
  `grid-cols-1 lg:grid-cols-[…]`, o `repeat(auto-fit, minmax(N, 1fr))` donde el contenido lo permite.
  (El diseño anterior no tenía fallback y "Perfil" quedaba apretado en móvil.)
- Verificado sin desborde horizontal en 320, 390 y 768 px, ES y EN, ambos temas.
- La navbar es sticky con `backdrop-blur`; por debajo de 360 px se oculta el nombre y queda el logo.

## 6. Componentes

- **Navbar:** logo "JP" + nombre, enlaces con sección activa (`useActiveSection`, IntersectionObserver),
  botón de búsqueda (abre la paleta), tema, idioma y menú móvil (< `lg`).
- **Hero:** pill de ubicación, H1 con degradado, CTA primario (`poster`) y secundario, y una
  tarjeta tipo ventana de editor (`perfil.ts`) con las stats del perfil.
- **Paleta de comandos (⌘K / Ctrl+K):** secciones, tema, idioma, descarga de CV y enlaces. El
  diálogo se monta solo al abrir (`CommandPalette` → `PaletteDialog`), así su estado nace limpio.
  Teclado: ↑↓ navegan, Enter ejecuta, Esc cierra. ARIA: `dialog`, `combobox`, `listbox`/`option`.
- **Casos de estudio:** `card` con cabecera en degradado, stats como `tile`, decisiones como
  tarjetas de tres campos (decisión / alternativa descartada / por qué) en lugar de una tabla,
  acordeón `<details>` para la implementación. El resaltado cruzado skills ↔ casos se mantiene.
- **Producto destacado (SyTix):** `FeaturedProduct`. Rol, flujos, stack, highlights y enlace son
  opcionales y solo se renderizan si tienen contenido (`data/{es,en}/featuredProduct.ts`). Los
  flujos (`ProductFlow`) son cadenas de pasos con chips y chevrons: hoy "Proceso del ticket" y
  "Cómo funciona el SLA", en dos tiles lado a lado desde `lg`. Solo descripción de alto nivel,
  sin seguridad ni datos operativos. Debajo, un bloque "Diagramas" con pestañas (`role="tablist"`)
  sobre cuatro diagramas archify 3.1 (`public/diagrams/sytix-*.html`: casos de uso, arquitectura,
  proceso del ticket, SLA), definidos en `uiFeaturedProduct`. Solo se monta un `DiagramEmbed` a la
  vez (cada HTML pesa ~800 KB) y recibe `heightClass` para ajustar su alto sin tocar la
  sincronización de tema. Son reconstrucciones conceptuales, generadas con el CLI de archify
  (`finalize --quality showcase`) y no deben editarse a mano.
- **Trabajo con IA:** `AiWorkflow`, cuatro pasos (especificar → planificar → implementar →
  verificar). Cada paso cita evidencia real del repo; no describir nada que el repo no respalde.
- **Experiencia:** línea de tiempo vertical con un punto por entrada (relleno si es la actual).
- **Footer / contacto:** tarjeta grande con degradado `poster → accent-800` y celdas translúcidas.

## 7. Diagramas embebidos (regla de oro)

Los diagramas de `public/diagrams/*.html` **no se tocan** al cambiar el diseño del sitio:

1. Son documentos independientes con su propio CSS y su propio tema.
2. `ThemeContext` escribe `archify-theme` en `localStorage` (lo lee el diagrama al cargar) y
   `DiagramEmbed` llama a `Archify.theme.toggle()` para seguir el cambio en vivo. No modificar
   esa sincronización sin volver a probarla.
3. En `DiagramEmbed` solo el contenedor (`rounded-xl`, borde) pertenece al diseño del sitio.
4. Las rutas usan `import.meta.env.BASE_URL`: bajo GitHub Pages el sitio vive en `/portafolio-Jp/`.

## 8. Accesibilidad

- `:focus-visible` global con anillo de acento.
- `<pre>` con scroll horizontal tiene `tabIndex={0}` para recorrerlo con teclado.
- Botones solo-icono con `aria-label`; el menú móvil con `aria-expanded`.
- Animaciones de entrada solo bajo `prefers-reduced-motion: no-preference`.

## 9. Pendiente

- Agregar `link` en la tarjeta de SyTix si algún día existe una versión pública.
- Valorar syntax highlighting en `CodeBlock` (hoy es texto plano en mono).
