# 05 — Portafolio multi-idioma (ES/EN)

Diseño aprobado para agregar soporte de español e inglés al portafolio. Documento de referencia
antes de escribir el plan de implementación (`writing-plans`).

## 1. Objetivo

El visitante puede alternar el portafolio completo entre español e inglés con un toggle en el
navbar, sin recargar la página. El idioma se detecta automáticamente en la primera visita según
el navegador, y se recuerda en `localStorage` una vez el usuario lo cambia manualmente.

## 2. Alcance

Cubre **todo el texto visible del sitio**:

- Contenido largo en `src/data/*.ts` (perfil, principios, experiencia, educación, casos de
  estudio, notas técnicas, certificaciones, contacto, repos de Github, etc.) — 11 archivos,
  ~1300 líneas.
- Strings de interfaz hoy hardcodeados dentro de los ~9 componentes (`src/components/*.tsx`):
  eyebrows de sección ("01 — Perfil"), headings, labels del `Navbar`, aria-labels, textos de
  botones.

**Fuera de alcance** (explícitamente excluido de esta tarea):

- Los diagramas archify embebidos vía `<iframe>` en `public/diagrams/*.html` (ver
  `DiagramEmbed.tsx`). Son HTML pre-generado en español; traducirlos requiere regenerarlos con
  la skill `archify` por separado, no es un cambio de código de este refactor.
- Rutas por idioma (`/en`, `/es`). No se agrega `react-router`; el cambio de idioma es
  client-side, sin tocar la URL.

## 3. Arquitectura

### 3.1 Contenido: carpetas paralelas por idioma

Cada `src/data/X.ts` actual se separa en `src/data/es/X.ts` (contenido español existente,
movido tal cual) y `src/data/en/X.ts` (traducción nueva). Ambos exportan el mismo tipo definido
en `src/types.ts` — los tipos no cambian, lo que obliga a TypeScript a exigir que ninguna
traducción deje un campo sin completar.

`src/data/es/index.ts` y `src/data/en/index.ts` reexportan todos los módulos del idioma
correspondiente.

### 3.2 Strings de interfaz

Los textos hoy hardcodeados en JSX (headings de sección, labels del nav, aria-labels, textos de
botones) se extraen a un archivo por sección — `src/data/es/uiNav.ts`, `uiHero.ts`, `uiAbout.ts`,
etc. (uno por componente/sección, mismo patrón que el contenido) — en vez de un único `ui.ts`.
No se introduce un sistema de claves tipo i18next; todo sigue siendo dato tipado.

### 3.3 `LanguageContext`

Calcado de `ThemeContext` (`src/context/ThemeContext.tsx`):

- `src/context/LanguageContext.tsx`, `language-context.ts`, `useLanguage.ts`.
- `Language = 'es' | 'en'`.
- Inicialización: lee `localStorage` (`jpmc-portfolio-lang`); si no existe, detecta
  `navigator.language` (inglés si no empieza en `es`, español en cualquier otro caso).
- `toggleLanguage()` cambia el idioma y persiste en `localStorage`.
- Efecto: `document.documentElement.lang = language` (mismo patrón que
  `document.documentElement.dataset.theme`).
- Expone `useContent()`: retorna el bundle completo (`content.es` o `content.en`, definidos en
  un agregador `src/data/content.ts`) según el idioma activo.

Los componentes pasan de `import { about } from '../data/about'` a
`const { about, ui } = useContent()`.

### 3.4 Toggle en el Navbar

Botón "ES / EN" junto al toggle de tema existente en `Navbar.tsx`, mismo estilo visual (caja de
34px, borde, mismas clases Tailwind), mismo patrón de interacción que `toggleTheme`.

## 4. Traducción

El contenido en inglés no existe todavía — lo traduce Claude (inglés profesional, preservando
tono y estructura) como parte de la implementación. El usuario revisa después de implementado y
se ajusta lo que no suene natural.

## 5. Verificación

- `tsc -b`: valida que cada `en/*.ts` tenga la misma forma que su `es/*.ts` para los campos
  **requeridos** del tipo (TypeScript no puede detectar si un campo **opcional** — `problem?`,
  `constraints?`, `failureModes?`, etc. — se omitió solo en una de las dos versiones; eso hay
  que verlo en la revisión manual).
- `npm run lint` (oxlint).
- Prueba visual manual: toggle ES↔EN y reload en el navegador, confirmando que cada sección
  renderiza el idioma correcto y que no queda ningún texto hardcodeado en el idioma equivocado.

## 6. Archivos afectados (resumen)

- Nuevos: `src/context/LanguageContext.tsx`, `language-context.ts`, `useLanguage.ts`,
  `src/data/content.ts`, `src/data/es/*.ts` (11 archivos + los `ui*.ts` por sección +
  `index.ts`), `src/data/en/*.ts` (mismo set).
- Movidos: los 11 archivos actuales de `src/data/*.ts` pasan a `src/data/es/*.ts`.
- Modificados: los ~9 componentes de `src/components/` (cambian el import de datos a
  `useContent()` y mueven sus strings hardcodeados a `ui.ts`), `App.tsx` (envuelve en
  `LanguageProvider`), `Navbar.tsx` (botón de idioma nuevo).
- Sin cambios: `public/diagrams/*.html`, `src/types.ts`.

**Estado:** Implementado — 2026-09-11.
