# Portafolio multi-idioma (ES/EN) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a client-side ES/EN language toggle to the portfolio so every visible string (long-form content + UI chrome) renders in the visitor's chosen language, detected from the browser on first visit and remembered afterward.

**Architecture:** Content is split into parallel `src/data/es/*.ts` and `src/data/en/*.ts` modules with identical exported shapes (enforced by TypeScript). A `LanguageContext` (mirrors the existing `ThemeContext`) tracks the active language and exposes it via `useLanguage()`; a `useContent()` hook resolves the right language's data bundle. Components stop importing data files directly and call `useContent()` instead.

**Tech Stack:** React 19 + TypeScript + Vite, no new dependencies (no i18n library, no router — plain Context + typed data modules, matching the existing `ThemeContext` pattern).

**Spec:** [specs/05-multi-idioma.md](../../../specs/05-multi-idioma.md)

## Global Constraints

These rules apply to every task below — do not repeat them per task, just follow them:

- **Language detection & persistence:** on first visit, read `localStorage['jpmc-portfolio-lang']`; if absent, use `es` when `navigator.language` starts with `es`, otherwise `en`. Any manual toggle overwrites `localStorage`. (Spec §3.3.)
- **Anchors never translate.** Every `id` attribute on a `<section>`/`<header>`/`<footer>` (`top`, `sobre`, `skills`, `casos`, `trayectoria`, `formacion`, `notas`, `contacto`) and every `href="#..."` pointing at one of them stays exactly as it is today, in both languages. Only the visible link *label* translates.
- **Technology/skill `id` values never translate.** `src/data/*/skills.ts` skill `id`s (`'react'`, `'apex'`, `'plsql'`, …) and `src/data/*/caseStudies.ts` `skills: string[]` arrays that reference them, plus each case study's own `id` (`'jp-caso-1'`, `'jp-caso-2'`, `'jp-caso-3'`), must be byte-identical between `es/` and `en/`. They're used as matching keys (cross-highlight, React keys, DOM anchors, `diagramTitles` lookup), never displayed as prose.
- **Proper/official names never translate:** company and institution names (`Synergy Work`, `Universidad de la Amazonia`, `SENA`, `Compuelectrónica`), certification/course titles and issuers (`certifications.ts` `title`/`issuer`/`issuerInitials`, and every string in `moreCourses`), place names (`Florencia, Caquetá`), contact data (`email`, `phone`, `phoneDisplay`, URLs, `linkedinLabel`, `githubLabel`), and project/app proper names (`Cacao Adventure`, `InfoMetal`, `Chaira`) stay identical in both languages. Everything else (prose, descriptions, headings, category/status labels, dates, degree titles) translates to professional English in `en/`.
- **Code snippets stay code.** In `caseStudies.ts` `implementation[].code`, translate only the Spanish prose inside `//` and `--` comments; never rename identifiers, JSON keys, SQL keywords, or change values.
- **One CV PDF for both languages.** `assets/CV-Juan-Pablo-Murcia-Cortes.pdf` has no English version; the "Download CV" button points at the same file in both languages. Out of scope to produce an English CV.
- **Commit message trailer:** every commit created while executing this plan ends with:
  ```
  Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
  ```
- **Verify every task** with, from the repo root:
  ```bash
  npx tsc -b
  npm run lint
  ```
  Both must exit 0 before moving on. Tasks that change rendered output also get a manual browser check (dev server via `npm run dev`): toggle the language button and confirm the affected section updates in both `es` and `en`.

---

### Task 1: Language context + provider

**Files:**
- Create: `src/context/language-context.ts`
- Create: `src/context/LanguageContext.tsx`
- Create: `src/context/useLanguage.ts`
- Modify: `src/App.tsx:1-46`

**Interfaces:**
- Produces: `useLanguage(): { language: 'es' | 'en'; toggleLanguage: () => void }`, importable from `../context/useLanguage`. `Language = 'es' | 'en'` type, importable from `../context/language-context`.

- [ ] **Step 1: Create the context object**

`src/context/language-context.ts`:
```ts
import { createContext } from 'react'

export type Language = 'es' | 'en'

export interface LanguageContextValue {
  language: Language
  toggleLanguage: () => void
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)
```

- [ ] **Step 2: Create the provider**

`src/context/LanguageContext.tsx`:
```tsx
import { useEffect, useState, type ReactNode } from 'react'
import { LanguageContext, type Language } from './language-context'

const STORAGE_KEY = 'jpmc-portfolio-lang'

function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') return 'es'
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'es'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'es' || stored === 'en' ? stored : detectBrowserLanguage()
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  function toggleLanguage() {
    setLanguage((current) => (current === 'es' ? 'en' : 'es'))
  }

  return <LanguageContext.Provider value={{ language, toggleLanguage }}>{children}</LanguageContext.Provider>
}
```

- [ ] **Step 3: Create the hook**

`src/context/useLanguage.ts`:
```ts
import { useContext } from 'react'
import { LanguageContext, type LanguageContextValue } from './language-context'

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage debe usarse dentro de <LanguageProvider>')
  return ctx
}
```

- [ ] **Step 4: Wire the provider into `App.tsx`**

In `src/App.tsx`, add the import and wrap the existing tree (outermost provider):

```tsx
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
```

```tsx
function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SkillsHighlightProvider>
          <ScrollProgressBar />
          <Navbar />

          <Hero />

          <main>
            <About />
            <SectionDivider />
            <Skills />
            <Projects />
            <SectionDivider />
            <Experience />
            <SectionDivider />
            <Education />
            <SectionDivider />
            <TechNotes />
          </main>

          <Footer />
        </SkillsHighlightProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}
```

- [ ] **Step 5: Verify**

Run:
```bash
npx tsc -b
npm run lint
```
Expected: both exit 0.

Start the dev server (`npm run dev`), open the site, and inspect `document.documentElement.getAttribute('lang')` (e.g. via the browser devtools or `javascript_tool`). Expected: `"es"` or `"en"` matching the browser's language (or `localStorage['jpmc-portfolio-lang']` if already set from a previous run).

- [ ] **Step 6: Commit**

```bash
git add src/context/language-context.ts src/context/LanguageContext.tsx src/context/useLanguage.ts src/App.tsx
git commit -m "$(cat <<'EOF'
Agrega LanguageContext para el toggle de idioma ES/EN

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Content aggregator + Navbar (ES/EN) + language toggle button

**Files:**
- Create: `src/data/es/uiNav.ts`
- Create: `src/data/en/uiNav.ts`
- Create: `src/data/es/index.ts`
- Create: `src/data/en/index.ts`
- Create: `src/data/content.ts`
- Create: `src/context/useContent.ts`
- Modify: `src/components/Navbar.tsx` (full rewrite — see Step 6)

**Interfaces:**
- Consumes: `useLanguage()` from `../context/useLanguage` (Task 1).
- Produces: `useContent()` from `../context/useContent`, returning (after this task) `{ uiNav }`. Every later task adds more properties to this same returned object — see each task's own `uiX`/`data-export` addition.

- [ ] **Step 1: Spanish nav UI strings**

`src/data/es/uiNav.ts`:
```ts
export const uiNav = {
  links: [
    { href: '#sobre', label: 'Perfil' },
    { href: '#skills', label: 'Stack' },
    { href: '#casos', label: 'Casos' },
    { href: '#trayectoria', label: 'Trayectoria' },
    { href: '#formacion', label: 'Formación' },
    { href: '#contacto', label: 'Contacto' },
  ],
  themeToggleLabel: 'Cambiar tema',
  languageToggleLabel: 'Cambiar idioma',
}
```

- [ ] **Step 2: English nav UI strings**

`src/data/en/uiNav.ts` — same shape, `href` values identical (anchors don't translate, see Global Constraints), labels translated:
```ts
export const uiNav = {
  links: [
    { href: '#sobre', label: 'Profile' },
    { href: '#skills', label: 'Stack' },
    { href: '#casos', label: 'Case studies' },
    { href: '#trayectoria', label: 'Experience' },
    { href: '#formacion', label: 'Education' },
    { href: '#contacto', label: 'Contact' },
  ],
  themeToggleLabel: 'Toggle theme',
  languageToggleLabel: 'Switch language',
}
```

- [ ] **Step 3: Barrels**

`src/data/es/index.ts`:
```ts
export * from './uiNav'
```

`src/data/en/index.ts`:
```ts
export * from './uiNav'
```

- [ ] **Step 4: Content aggregator**

`src/data/content.ts`:
```ts
import type { Language } from '../context/language-context'
import * as es from './es'
import * as en from './en'

export const content: Record<Language, typeof es> = { es, en }
```

- [ ] **Step 5: `useContent` hook**

`src/context/useContent.ts`:
```ts
import { content } from '../data/content'
import { useLanguage } from './useLanguage'

export function useContent() {
  const { language } = useLanguage()
  return content[language]
}
```

- [ ] **Step 6: Rewrite `Navbar.tsx`**

Replace `src/components/Navbar.tsx` entirely with:
```tsx
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/useTheme'
import { useLanguage } from '../context/useLanguage'
import { useContent } from '../context/useContent'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const { uiNav } = useContent()

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-divider bg-bg">
      <div className="mx-auto flex min-h-16 max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-10 py-[11px]">
        <a
          href="#top"
          className="flex-none border-0 font-heading text-sm leading-none font-extrabold tracking-[-0.01em] text-text"
        >
          JUAN PABLO MURCIA<span className="text-accent">.</span>
        </a>

        <div className="flex min-w-0 flex-wrap items-center justify-end gap-[22px]">
          {uiNav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-0 font-heading text-[11px] leading-none font-extrabold tracking-[.08em] text-mute-700 uppercase"
            >
              {link.label}
            </a>
          ))}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={uiNav.themeToggleLabel}
            title={uiNav.themeToggleLabel}
            className="flex h-[34px] w-[34px] flex-none items-center justify-center border border-divider bg-transparent text-text transition-colors hover:bg-text/8"
          >
            {theme === 'dark' ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={uiNav.languageToggleLabel}
            title={uiNav.languageToggleLabel}
            className="flex h-[34px] w-auto min-w-[34px] flex-none items-center justify-center border border-divider bg-transparent px-2 font-heading text-[11px] font-extrabold text-text transition-colors hover:bg-text/8"
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
      </div>
    </nav>
  )
}
```

The button shows the language it will switch *to* (so it reads "EN" while the site is in Spanish, and "ES" while it's in English).

- [ ] **Step 7: Verify**

```bash
npx tsc -b
npm run lint
```

Browser check: load the site, confirm nav labels render in the detected language, click the new "ES/EN" button next to the theme toggle — nav labels and the button's own text must flip immediately; reload the page and confirm the choice persisted (no flash back to the detected language).

- [ ] **Step 8: Commit**

```bash
git add src/data/es/uiNav.ts src/data/en/uiNav.ts src/data/es/index.ts src/data/en/index.ts src/data/content.ts src/context/useContent.ts src/components/Navbar.tsx
git commit -m "$(cat <<'EOF'
Agrega bundle de contenido por idioma y toggle ES/EN en el Navbar

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Hero + Contact

**Files:**
- Create: `src/data/es/hero.ts`, `src/data/es/contact.ts`, `src/data/en/hero.ts`, `src/data/en/contact.ts`, `src/data/es/uiHero.ts`, `src/data/en/uiHero.ts`
- Modify: `src/data/es/index.ts`, `src/data/en/index.ts` (append 3 lines each)
- Modify: `src/components/Hero.tsx`
- Delete (via move): `src/data/hero.ts`, `src/data/contact.ts`

**Interfaces:**
- Consumes: `useContent()` (Task 2).
- Produces: `useContent()` gains `hero: HeroContent`, `contact: ContactInfo`, `uiHero: { downloadCv: string; contactMe: string; linksLabel: string }`. `uiHero.downloadCv` is reused by Footer in Task 10.

- [ ] **Step 1: Move the Spanish data**

```bash
git mv src/data/hero.ts src/data/es/hero.ts
git mv src/data/contact.ts src/data/es/contact.ts
```

Fix the relative import inside both moved files (they now live one level deeper):
- `src/data/es/hero.ts` line 1: `import type { HeroContent } from '../types'` → `import type { HeroContent } from '../../types'`
- `src/data/es/contact.ts` line 1: `import type { ContactInfo } from '../types'` → `import type { ContactInfo } from '../../types'`

Content is otherwise unchanged (this is the exact content already in the repo — see [src/data/hero.ts](../../../src/data/hero.ts) and [src/data/contact.ts](../../../src/data/contact.ts) before the move, or `git show HEAD:src/data/hero.ts` / `git show HEAD:src/data/contact.ts`).

- [ ] **Step 2: English translation**

`src/data/en/hero.ts` — read `src/data/es/hero.ts` (just created) and translate every field to professional English following the Global Constraints (place names like `'Florencia, Caquetá · Colombia'` stay as-is; `'Universidad de la Amazonia'` stays as-is; everything else — `headline`, `lead`, `subcopy`, `stats[].label/value/detail` — translates), same `HeroContent` shape, importing the type from `'../../types'`.

`src/data/en/contact.ts` — read `src/data/es/contact.ts` and translate only `locationNote` (`'Colombia · abierto a remoto'` → `'Colombia · open to remote'`); every other field (`email`, `phone`, `phoneDisplay`, URLs, `linkedinLabel`, `githubLabel`, `location`) stays byte-identical per Global Constraints.

- [ ] **Step 3: UI strings**

`src/data/es/uiHero.ts`:
```ts
export const uiHero = {
  downloadCv: 'Descargar CV',
  contactMe: 'Contáctame',
  linksLabel: 'Enlaces',
}
```

`src/data/en/uiHero.ts`:
```ts
export const uiHero = {
  downloadCv: 'Download CV',
  contactMe: 'Contact me',
  linksLabel: 'Links',
}
```

- [ ] **Step 4: Register in the barrels**

Append to `src/data/es/index.ts` and `src/data/en/index.ts` (same 3 lines in both, order doesn't matter):
```ts
export * from './hero'
export * from './contact'
export * from './uiHero'
```

- [ ] **Step 5: Wire `Hero.tsx`**

In `src/components/Hero.tsx`:

Replace:
```tsx
import { contact } from '../data/contact'
import { hero } from '../data/hero'
```
with:
```tsx
import { useContent } from '../context/useContent'
```

Inside `export function Hero()`, as the first line of the function body, add:
```tsx
const { hero, contact, uiHero } = useContent()
```

Replace the two hardcoded CTA labels:
```tsx
<Download size={15} strokeWidth={2} />
Descargar CV
```
→
```tsx
<Download size={15} strokeWidth={2} />
{uiHero.downloadCv}
```

```tsx
Contáctame
```
→
```tsx
{uiHero.contactMe}
```

And the "Enlaces" row label:
```tsx
<HeroStatRow
  label="Enlaces"
```
→
```tsx
<HeroStatRow
  label={uiHero.linksLabel}
```

Everything else in the file (the `hero.*`/`contact.*` references already inside the JSX) is unchanged — they now read from the destructured `hero`/`contact` variables instead of the module-level imports.

- [ ] **Step 6: Verify**

```bash
npx tsc -b
npm run lint
```

Browser check: toggle language, confirm the Hero headline, lead, subcopy, stats table, "Download CV"/"Contact me" buttons, and the "Links"/"Enlaces" row label all switch correctly; the CV download link and LinkedIn/GitHub links still work.

- [ ] **Step 7: Commit**

```bash
git add src/data/es/hero.ts src/data/es/contact.ts src/data/en/hero.ts src/data/en/contact.ts src/data/es/uiHero.ts src/data/en/uiHero.ts src/data/es/index.ts src/data/en/index.ts src/components/Hero.tsx
git commit -m "$(cat <<'EOF'
Traduce Hero y Contact, consume useContent() en Hero.tsx

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: About

**Files:**
- Create: `src/data/es/about.ts` (moved), `src/data/en/about.ts`, `src/data/es/uiAbout.ts`, `src/data/en/uiAbout.ts`
- Modify: `src/data/es/index.ts`, `src/data/en/index.ts`
- Modify: `src/components/About.tsx`

**Interfaces:**
- Consumes: `useContent()`.
- Produces: `useContent()` gains `about: AboutContent`, `uiAbout: { eyebrow: string; heading: string }`.

- [ ] **Step 1: Move and fix the import path**

```bash
git mv src/data/about.ts src/data/es/about.ts
```
Fix line 1: `import type { AboutContent } from '../types'` → `import type { AboutContent } from '../../types'`.

- [ ] **Step 2: Translate**

`src/data/en/about.ts` — translate `paragraphs` and `principles[].title/body` to professional English, same `AboutContent` shape.

- [ ] **Step 3: UI strings**

`src/data/es/uiAbout.ts`:
```ts
export const uiAbout = {
  eyebrow: '01 — Perfil',
  heading: 'Qué hago y cómo trabajo',
}
```
`src/data/en/uiAbout.ts`:
```ts
export const uiAbout = {
  eyebrow: '01 — Profile',
  heading: 'What I do and how I work',
}
```

- [ ] **Step 4: Register in barrels**

Append `export * from './about'` and `export * from './uiAbout'` to both `src/data/es/index.ts` and `src/data/en/index.ts`.

- [ ] **Step 5: Wire `About.tsx`**

Replace:
```tsx
import { about } from '../data/about'

export function About() {
```
with:
```tsx
import { useContent } from '../context/useContent'

export function About() {
  const { about, uiAbout } = useContent()
```

Replace the hardcoded eyebrow and heading:
```tsx
<div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-accent uppercase">
  01 — Perfil
</div>
<h2 className="text-[34px] leading-[1.06] tracking-[-0.025em]">Qué hago y cómo trabajo</h2>
```
→
```tsx
<div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-accent uppercase">
  {uiAbout.eyebrow}
</div>
<h2 className="text-[34px] leading-[1.06] tracking-[-0.025em]">{uiAbout.heading}</h2>
```

The rest of the file (`about.paragraphs.map`, `about.principles.map`) is unchanged.

- [ ] **Step 6: Verify**

```bash
npx tsc -b
npm run lint
```
Browser check: toggle language, confirm the About section's eyebrow, heading, paragraphs, and the 3 principle cards switch correctly.

- [ ] **Step 7: Commit**

```bash
git add src/data/es/about.ts src/data/en/about.ts src/data/es/uiAbout.ts src/data/en/uiAbout.ts src/data/es/index.ts src/data/en/index.ts src/components/About.tsx
git commit -m "$(cat <<'EOF'
Traduce About, consume useContent() en About.tsx

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Skills

**Files:**
- Create: `src/data/es/skills.ts` (moved), `src/data/en/skills.ts`, `src/data/es/uiSkills.ts`, `src/data/en/uiSkills.ts`
- Modify: `src/data/es/index.ts`, `src/data/en/index.ts`
- Modify: `src/components/Skills.tsx`

**Interfaces:**
- Consumes: `useContent()`.
- Produces: `useContent()` gains `skillCategories: SkillCategory[]`, `uiSkills: { eyebrow: string; heading: string; hint: string }`.

- [ ] **Step 1: Move and fix the import path**

```bash
git mv src/data/skills.ts src/data/es/skills.ts
```
Fix line 1: `import type { SkillCategory } from '../types'` → `import type { SkillCategory } from '../../types'`.

- [ ] **Step 2: Translate**

`src/data/en/skills.ts` — translate the 4 category `title`s (`'Lenguajes'` → `'Languages'`, `'Datos y BI'` → `'Data & BI'`, `'Frameworks y herramientas'` → `'Frameworks & tools'`, `'Integración y método'` → `'Integration & method'`). Keep every `id` byte-identical to `es/skills.ts` (Global Constraints — these are cross-highlight matching keys). `label` values are technology/product names (`'PL/SQL'`, `'React'`, `'Oracle APEX'`, …) — leave them as-is unless a label is genuinely descriptive Spanish text rather than a proper product name (none currently are).

- [ ] **Step 3: UI strings**

`src/data/es/uiSkills.ts`:
```ts
export const uiSkills = {
  eyebrow: '02 — Stack',
  heading: 'Habilidades técnicas',
  hint: 'Pasa el cursor sobre una tecnología y se atenúan los casos donde no la usé.',
}
```
`src/data/en/uiSkills.ts`:
```ts
export const uiSkills = {
  eyebrow: '02 — Stack',
  heading: 'Technical skills',
  hint: "Hover over a technology to dim the case studies that didn't use it.",
}
```

- [ ] **Step 4: Register in barrels**

Append `export * from './skills'` and `export * from './uiSkills'` to both index files.

- [ ] **Step 5: Wire `Skills.tsx`**

Replace:
```tsx
import { skillCategories } from '../data/skills'
import { useSkillsHighlight } from '../context/useSkillsHighlight'

export function Skills() {
  const { setHoveredSkill } = useSkillsHighlight()
```
with:
```tsx
import { useSkillsHighlight } from '../context/useSkillsHighlight'
import { useContent } from '../context/useContent'

export function Skills() {
  const { setHoveredSkill } = useSkillsHighlight()
  const { skillCategories, uiSkills } = useContent()
```

Replace the hardcoded eyebrow/heading/hint:
```tsx
<div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-accent uppercase">
  02 — Stack
</div>
<h2 className="text-[34px] leading-[1.06] tracking-[-0.025em]">Habilidades técnicas</h2>
```
→
```tsx
<div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-accent uppercase">
  {uiSkills.eyebrow}
</div>
<h2 className="text-[34px] leading-[1.06] tracking-[-0.025em]">{uiSkills.heading}</h2>
```
```tsx
<div className="max-w-[38ch] text-[13px] text-mute-700">
  Pasa el cursor sobre una tecnología y se atenúan los casos donde no la usé.
</div>
```
→
```tsx
<div className="max-w-[38ch] text-[13px] text-mute-700">{uiSkills.hint}</div>
```

The `skillCategories.map(...)` rendering below is unchanged.

- [ ] **Step 6: Verify**

```bash
npx tsc -b
npm run lint
```
Browser check: toggle language — category titles and hint text switch; hover a skill chip and confirm the cross-highlight dimming in the Projects section still works (it must, since `id`s didn't change).

- [ ] **Step 7: Commit**

```bash
git add src/data/es/skills.ts src/data/en/skills.ts src/data/es/uiSkills.ts src/data/en/uiSkills.ts src/data/es/index.ts src/data/en/index.ts src/components/Skills.tsx
git commit -m "$(cat <<'EOF'
Traduce Skills, consume useContent() en Skills.tsx

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Case studies (Projects + CaseStudyCard)

**Files:**
- Create: `src/data/es/caseStudies.ts` (moved), `src/data/en/caseStudies.ts`, `src/data/es/uiProjects.ts`, `src/data/en/uiProjects.ts`, `src/data/es/uiCaseStudyCard.ts`, `src/data/en/uiCaseStudyCard.ts`
- Modify: `src/data/es/index.ts`, `src/data/en/index.ts`
- Modify: `src/components/Projects.tsx`, `src/components/projects/CaseStudyCard.tsx`

**Interfaces:**
- Consumes: `useContent()`.
- Produces: `useContent()` gains `caseStudies: CaseStudy[]`, `uiProjects: { eyebrow, heading, intro, dataFlowLabel, diagramTitles: Record<string, { useCase: string; architecture: string; dataFlow?: string }> }`, `uiCaseStudyCard: { decisionsTable: { decision, discarded, why }, problemLabel, constraintsLabel, useCasesLabel, implementationLabel, implementationNote, resultLabel, learningsLabel }`.

- [ ] **Step 1: Move and fix the import path**

```bash
git mv src/data/caseStudies.ts src/data/es/caseStudies.ts
```
Fix line 1: `import type { CaseStudy } from '../types'` → `import type { CaseStudy } from '../../types'`.

- [ ] **Step 2: Translate**

`src/data/en/caseStudies.ts` — read `src/data/es/caseStudies.ts` and translate to professional English, same `CaseStudy[]` shape, following Global Constraints strictly:
- Keep `id` (`'jp-caso-1'`, `'jp-caso-2'`, `'jp-caso-3'`) and every `skills` array entry byte-identical to the Spanish file.
- Translate `number` (`'Caso 01'` → `'Case 01'`), `tags`, `title`, `summary`, `problem`, `constraints`, `useCaseNote`, `architectureHeading`, `architectureNote`, `failureModes[].title/body`, `decisionsHeading`, `decisionsTable[].decision/discarded/why`, `criteria[].title/body`, `implementation[].title/note`, `outcome`, `outcomeNote`, `learnings`, `metaStats[].label/value` (except proper nouns inside values, e.g. keep `'APEX · React · Express'` as-is since those are product names).
- In `implementation[].code`, translate only the Spanish text inside `//` and `--` comments; leave every identifier, JSON key, SQL keyword, HTTP verb, and literal value untouched.
- Case 3 has no short proper product name (unlike "InfoMetal" and "Chaira") — pick one consistent English rendering of "Gestor comunitario de selva" (e.g. "Rainforest Community Manager") and use it consistently across `title`/`summary` here; Step 4 reuses the same name in the diagram titles.

- [ ] **Step 3: `uiProjects` (Spanish)**

`src/data/es/uiProjects.ts`:
```ts
export const uiProjects = {
  eyebrow: '03 — Casos de estudio',
  heading: 'Tres sistemas, contados por dentro',
  intro:
    'Arquitectura, protocolos y decisiones de diseño. Los diagramas son reconstrucciones conceptuales y los fragmentos de código usan datos ficticios: no hay información operativa de ningún cliente en esta página.',
  dataFlowLabel: 'Flujo de datos',
  diagramTitles: {
    'jp-caso-1': {
      useCase: 'InfoMetal — Casos de uso',
      architecture: 'InfoMetal — Arquitectura',
      dataFlow: 'InfoMetal — Flujo de datos',
    },
    'jp-caso-2': {
      useCase: 'Chaira — Casos de uso de contratación',
      architecture: 'Chaira — Flujo de trabajo del cambio',
    },
    'jp-caso-3': {
      useCase: 'Gestor comunitario de selva — Casos de uso',
      architecture: 'Gestor comunitario de selva — Arquitectura',
      dataFlow: 'Gestor comunitario de selva — Flujo de datos',
    },
  },
}
```

- [ ] **Step 4: `uiProjects` (English)**

`src/data/en/uiProjects.ts` — same shape and same 3 `diagramTitles` keys (`'jp-caso-1'`, `'jp-caso-2'`, `'jp-caso-3'` — keys never translate), values translated. Use the same English name for case 3 that you chose in Step 2 (e.g. if you used "Rainforest Community Manager" there, use it here too):
```ts
export const uiProjects = {
  eyebrow: '03 — Case studies',
  heading: 'Three systems, from the inside',
  intro:
    "Architecture, protocols, and design decisions. Diagrams are conceptual reconstructions and the code snippets use fictional data: no client's operational information appears on this page.",
  dataFlowLabel: 'Data flow',
  diagramTitles: {
    'jp-caso-1': {
      useCase: 'InfoMetal — Use cases',
      architecture: 'InfoMetal — Architecture',
      dataFlow: 'InfoMetal — Data flow',
    },
    'jp-caso-2': {
      useCase: 'Chaira — Procurement use cases',
      architecture: 'Chaira — Change workflow',
    },
    'jp-caso-3': {
      useCase: 'Rainforest Community Manager — Use cases',
      architecture: 'Rainforest Community Manager — Architecture',
      dataFlow: 'Rainforest Community Manager — Data flow',
    },
  },
}
```

- [ ] **Step 5: `uiCaseStudyCard`**

`src/data/es/uiCaseStudyCard.ts`:
```ts
export const uiCaseStudyCard = {
  decisionsTable: { decision: 'Decisión', discarded: 'Alternativa descartada', why: 'Por qué' },
  problemLabel: 'El problema',
  constraintsLabel: 'Restricciones',
  useCasesLabel: 'Casos de uso',
  implementationLabel: 'Detalle de implementación',
  implementationNote: 'Fragmentos ilustrativos con nombres y datos ficticios.',
  resultLabel: 'Resultado',
  learningsLabel: 'Qué aprendí',
}
```
`src/data/en/uiCaseStudyCard.ts`:
```ts
export const uiCaseStudyCard = {
  decisionsTable: { decision: 'Decision', discarded: 'Discarded alternative', why: 'Why' },
  problemLabel: 'The problem',
  constraintsLabel: 'Constraints',
  useCasesLabel: 'Use cases',
  implementationLabel: 'Implementation detail',
  implementationNote: 'Illustrative snippets with fictional names and data.',
  resultLabel: 'Outcome',
  learningsLabel: 'What I learned',
}
```

- [ ] **Step 6: Register in barrels**

Append to both `src/data/es/index.ts` and `src/data/en/index.ts`:
```ts
export * from './caseStudies'
export * from './uiProjects'
export * from './uiCaseStudyCard'
```

- [ ] **Step 7: Wire `Projects.tsx`**

Replace the whole file with:
```tsx
import type { ReactNode } from 'react'
import { useContent } from '../context/useContent'
import { OtherProjectsList } from './OtherProjectsList'
import { DiagramEmbed } from './projects/DiagramEmbed'
import { CaseStudyCard } from './projects/CaseStudyCard'

function StackedDiagrams({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>
}

function DiagramLabel({ children }: { children: ReactNode }) {
  return (
    <div className="font-heading text-[10px] font-extrabold tracking-[.08em] text-mute-700 uppercase">
      {children}
    </div>
  )
}

export function Projects() {
  const { caseStudies, uiProjects } = useContent()

  const diagramsById: Record<string, { useCase: ReactNode; architecture: ReactNode }> = {
    'jp-caso-1': {
      useCase: (
        <DiagramEmbed src="/diagrams/caso1-casos-de-uso.html" title={uiProjects.diagramTitles['jp-caso-1'].useCase} />
      ),
      architecture: (
        <StackedDiagrams>
          <DiagramEmbed
            src="/diagrams/caso1-arquitectura.html"
            title={uiProjects.diagramTitles['jp-caso-1'].architecture}
          />
          <DiagramLabel>{uiProjects.dataFlowLabel}</DiagramLabel>
          <DiagramEmbed
            src="/diagrams/caso1-flujo-datos.html"
            title={uiProjects.diagramTitles['jp-caso-1'].dataFlow}
          />
        </StackedDiagrams>
      ),
    },
    'jp-caso-2': {
      useCase: (
        <DiagramEmbed src="/diagrams/caso2-casos-de-uso.html" title={uiProjects.diagramTitles['jp-caso-2'].useCase} />
      ),
      architecture: (
        <DiagramEmbed
          src="/diagrams/caso2-flujo-trabajo.html"
          title={uiProjects.diagramTitles['jp-caso-2'].architecture}
        />
      ),
    },
    'jp-caso-3': {
      useCase: (
        <DiagramEmbed src="/diagrams/caso3-casos-de-uso.html" title={uiProjects.diagramTitles['jp-caso-3'].useCase} />
      ),
      architecture: (
        <StackedDiagrams>
          <DiagramEmbed
            src="/diagrams/caso3-arquitectura.html"
            title={uiProjects.diagramTitles['jp-caso-3'].architecture}
          />
          <DiagramLabel>{uiProjects.dataFlowLabel}</DiagramLabel>
          <DiagramEmbed
            src="/diagrams/caso3-flujo-datos.html"
            title={uiProjects.diagramTitles['jp-caso-3'].dataFlow}
          />
        </StackedDiagrams>
      ),
    },
  }

  return (
    <section id="casos" className="mx-auto max-w-[1200px] px-10 pt-6 pb-16">
      <div className="mb-9">
        <div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-accent uppercase">
          {uiProjects.eyebrow}
        </div>
        <h2 className="mb-3 text-[34px] leading-[1.06] tracking-[-0.025em]">{uiProjects.heading}</h2>
        <p className="max-w-[70ch] text-[15px] leading-[1.6] text-mute-800">{uiProjects.intro}</p>
      </div>

      <div className="space-y-8">
        {caseStudies.map((study) => (
          <CaseStudyCard
            key={study.id}
            study={study}
            useCaseDiagram={diagramsById[study.id].useCase}
            architectureDiagram={diagramsById[study.id].architecture}
          />
        ))}
      </div>

      <OtherProjectsList />
    </section>
  )
}
```

(`diagramsById` moves inside the component body because it now depends on `uiProjects`, which only exists once `useContent()` runs.)

- [ ] **Step 8: Wire `CaseStudyCard.tsx`**

Add the import:
```tsx
import { useContent } from '../../context/useContent'
```

Change `DecisionsTable` to take labels as a prop instead of hardcoding them:
```tsx
function DecisionsTable({
  rows,
  labels,
}: {
  rows: CaseStudyDecision[]
  labels: { decision: string; discarded: string; why: string }
}) {
  return (
    <div className="border border-divider">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-b border-divider font-heading text-[10px] font-extrabold tracking-[.08em] text-mute-700 uppercase">
        <div className="border-r border-divider px-4 py-[11px]">{labels.decision}</div>
        <div className="border-r border-divider px-4 py-[11px]">{labels.discarded}</div>
        <div className="px-4 py-[11px]">{labels.why}</div>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.decision}
          className={`grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] ${i < rows.length - 1 ? 'border-b border-divider' : ''}`}
        >
          <div className="border-r border-divider px-4 py-[15px] text-[13px] leading-[1.55]">
            <strong>{row.decision}</strong>
          </div>
          <div className="border-r border-divider px-4 py-[15px] text-[13px] leading-[1.55] text-mute-700">
            {row.discarded}
          </div>
          <div className="px-4 py-[15px] text-[13px] leading-[1.55] text-mute-800">{row.why}</div>
        </div>
      ))}
    </div>
  )
}
```

In `CaseStudyCard`, add right after `const { hoveredSkill } = useSkillsHighlight()`:
```tsx
const { uiCaseStudyCard } = useContent()
```

Then apply these replacements (all still inside `CaseStudyCard`):
- `<Eyebrow>El problema</Eyebrow>` → `<Eyebrow>{uiCaseStudyCard.problemLabel}</Eyebrow>`
- `<Eyebrow>Restricciones</Eyebrow>` → `<Eyebrow>{uiCaseStudyCard.constraintsLabel}</Eyebrow>`
- `<Eyebrow>Casos de uso</Eyebrow>` → `<Eyebrow>{uiCaseStudyCard.useCasesLabel}</Eyebrow>`
- `{study.decisionsTable && <DecisionsTable rows={study.decisionsTable} />}` → `{study.decisionsTable && <DecisionsTable rows={study.decisionsTable} labels={uiCaseStudyCard.decisionsTable} />}`
- `<Eyebrow>Detalle de implementación</Eyebrow>` → `<Eyebrow>{uiCaseStudyCard.implementationLabel}</Eyebrow>`
- `<div className="mb-4 text-xs text-mute-700">Fragmentos ilustrativos con nombres y datos ficticios.</div>` → `<div className="mb-4 text-xs text-mute-700">{uiCaseStudyCard.implementationNote}</div>`
- the "Resultado" block:
  ```tsx
  <div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.09em] text-accent uppercase">
    Resultado
  </div>
  ```
  → same with `{uiCaseStudyCard.resultLabel}` in place of `Resultado`
- the "Qué aprendí" block:
  ```tsx
  <div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.09em] text-accent uppercase">
    Qué aprendí
  </div>
  ```
  → same with `{uiCaseStudyCard.learningsLabel}` in place of `Qué aprendí`

Everything reading `study.*` (the `CaseStudy` data itself: `title`, `summary`, `tags`, `metaStats`, `criteria`, etc.) is unchanged — that content already comes from the `study` prop, which `Projects.tsx` now sources from `useContent()`.

- [ ] **Step 9: Verify**

```bash
npx tsc -b
npm run lint
```
Browser check: toggle language, scroll through all 3 case studies — eyebrow/heading/intro, every case's tags/title/summary/meta-stats/problem/constraints/decisions-or-criteria/implementation accordion (including code comments)/outcome-or-decisions/learnings must render in the selected language; the embedded diagrams' iframe titles (inspect via `read_page`, they're not visibly rendered but must be present for accessibility) must also match; confirm the skills cross-highlight (hover a chip in Skills) still dims/undims the right cards (unaffected by translation since it uses `id`s).

- [ ] **Step 10: Commit**

```bash
git add src/data/es/caseStudies.ts src/data/en/caseStudies.ts src/data/es/uiProjects.ts src/data/en/uiProjects.ts src/data/es/uiCaseStudyCard.ts src/data/en/uiCaseStudyCard.ts src/data/es/index.ts src/data/en/index.ts src/components/Projects.tsx src/components/projects/CaseStudyCard.tsx
git commit -m "$(cat <<'EOF'
Traduce los 3 casos de estudio, consume useContent() en Projects y CaseStudyCard

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Other projects + GitHub repos

**Files:**
- Create: `src/data/es/otherProjects.ts` (moved), `src/data/en/otherProjects.ts`, `src/data/es/githubRepos.ts` (moved), `src/data/en/githubRepos.ts`, `src/data/es/uiOtherProjects.ts`, `src/data/en/uiOtherProjects.ts`
- Modify: `src/data/es/index.ts`, `src/data/en/index.ts`
- Modify: `src/components/OtherProjectsList.tsx`

**Interfaces:**
- Consumes: `useContent()`.
- Produces: `useContent()` gains `otherProjects: OtherProject[]`, `githubRepos: Repo[]` (unused by any component today — kept translated for when the dormant GitHub section is turned on, per the comment in `githubRepos.ts`), `uiOtherProjects: { heading: string }`.

- [ ] **Step 1: Move and fix import paths**

```bash
git mv src/data/otherProjects.ts src/data/es/otherProjects.ts
git mv src/data/githubRepos.ts src/data/es/githubRepos.ts
```
Fix line 1 of each: `'../types'` → `'../../types'`.

- [ ] **Step 2: Translate `otherProjects.ts`**

`src/data/en/otherProjects.ts` — `title` values are app/system proper names (`'Cacao Adventure'`, `'Reporteador de InfoMetal'`, `'Congresos TIC para la Amazonia'`) and stay as-is; translate `subtitle`, `description`, `status` (`'Acceso privado'` → `'Private access'`, `'Certificado'` → `'Certified'`); `link.href` stays identical, `link.label` (`'Google Play →'`) stays identical (it's a platform name, not prose).

- [ ] **Step 3: Translate `githubRepos.ts`**

`src/data/en/githubRepos.ts` — `name`, `href`, `language` stay identical; translate `description`.

- [ ] **Step 4: UI strings**

`src/data/es/uiOtherProjects.ts`:
```ts
export const uiOtherProjects = {
  heading: 'Otros proyectos y publicaciones',
}
```
`src/data/en/uiOtherProjects.ts`:
```ts
export const uiOtherProjects = {
  heading: 'Other projects and publications',
}
```

- [ ] **Step 5: Register in barrels**

Append to both index files:
```ts
export * from './otherProjects'
export * from './githubRepos'
export * from './uiOtherProjects'
```

- [ ] **Step 6: Wire `OtherProjectsList.tsx`**

Replace:
```tsx
import { otherProjects } from '../data/otherProjects'

export function OtherProjectsList() {
```
with:
```tsx
import { useContent } from '../context/useContent'

export function OtherProjectsList() {
  const { otherProjects, uiOtherProjects } = useContent()
```

Replace the hardcoded heading:
```tsx
<div className="mb-[18px] font-heading text-[11px] font-extrabold tracking-[.09em] uppercase">
  Otros proyectos y publicaciones
</div>
```
→
```tsx
<div className="mb-[18px] font-heading text-[11px] font-extrabold tracking-[.09em] uppercase">
  {uiOtherProjects.heading}
</div>
```

The `otherProjects.map(...)` block is unchanged.

- [ ] **Step 7: Verify**

```bash
npx tsc -b
npm run lint
```
Browser check: toggle language, confirm the "Other projects and publications" list (below the case studies) switches heading/subtitle/description/status correctly; links still work. `githubRepos` has no visible check (unused); the `tsc -b` pass is its only verification.

- [ ] **Step 8: Commit**

```bash
git add src/data/es/otherProjects.ts src/data/en/otherProjects.ts src/data/es/githubRepos.ts src/data/en/githubRepos.ts src/data/es/uiOtherProjects.ts src/data/en/uiOtherProjects.ts src/data/es/index.ts src/data/en/index.ts src/components/OtherProjectsList.tsx
git commit -m "$(cat <<'EOF'
Traduce Other projects y Github repos, consume useContent() en OtherProjectsList.tsx

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: Experience

**Files:**
- Create: `src/data/es/experience.ts` (moved), `src/data/en/experience.ts`, `src/data/es/uiExperience.ts`, `src/data/en/uiExperience.ts`
- Modify: `src/data/es/index.ts`, `src/data/en/index.ts`
- Modify: `src/components/Experience.tsx`

**Interfaces:**
- Consumes: `useContent()`.
- Produces: `useContent()` gains `experience: TimelineEntry[]`, `uiExperience: { eyebrow: string; heading: string; currentBadge: string }`.

- [ ] **Step 1: Move and fix the import path**

```bash
git mv src/data/experience.ts src/data/es/experience.ts
```
Fix line 1: `'../types'` → `'../../types'`.

- [ ] **Step 2: Translate**

`src/data/en/experience.ts` — read `src/data/es/experience.ts` and translate `role` and every `bullets[]` entry to professional English. Keep `company` (`'Synergy Work'`, `'Universidad de la Amazonia'`, `'Compuelectrónica'`) identical. In `period`, keep the exact `' — '` separator (the component splits on it) and translate only `'Actualidad'` → `'Present'`, e.g. `'2021-07 — Actualidad'` → `'2021-07 — Present'`; the other 4 entries' `period` values (already just date ranges, e.g. `'2021-06 — 2022-06'`) stay identical since they contain no words. `tags` are mostly product/protocol names and can stay as-is; translate only ones that are Spanish descriptions if any (currently none are).

- [ ] **Step 3: UI strings**

`src/data/es/uiExperience.ts`:
```ts
export const uiExperience = {
  eyebrow: '04 — Trayectoria',
  heading: 'Experiencia laboral',
  currentBadge: 'Actual',
}
```
`src/data/en/uiExperience.ts`:
```ts
export const uiExperience = {
  eyebrow: '04 — Experience',
  heading: 'Work experience',
  currentBadge: 'Current',
}
```

- [ ] **Step 4: Register in barrels**

Append `export * from './experience'` and `export * from './uiExperience'` to both index files.

- [ ] **Step 5: Wire `Experience.tsx`**

Replace:
```tsx
import { Fragment } from 'react'
import { experience } from '../data/experience'

export function Experience() {
```
with:
```tsx
import { Fragment } from 'react'
import { useContent } from '../context/useContent'

export function Experience() {
  const { experience, uiExperience } = useContent()
```

Replace the hardcoded eyebrow/heading:
```tsx
<div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-accent uppercase">
  04 — Trayectoria
</div>
<h2 className="text-[34px] leading-[1.06] tracking-[-0.025em]">Experiencia laboral</h2>
```
→
```tsx
<div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-accent uppercase">
  {uiExperience.eyebrow}
</div>
<h2 className="text-[34px] leading-[1.06] tracking-[-0.025em]">{uiExperience.heading}</h2>
```

Replace the hardcoded "Actual" badge:
```tsx
{entry.current && (
  <div className="mt-2 inline-block bg-poster px-[6px] py-1 font-heading text-[9px] leading-none font-extrabold tracking-[.08em] text-white uppercase">
    Actual
  </div>
)}
```
→
```tsx
{entry.current && (
  <div className="mt-2 inline-block bg-poster px-[6px] py-1 font-heading text-[9px] leading-none font-extrabold tracking-[.08em] text-white uppercase">
    {uiExperience.currentBadge}
  </div>
)}
```

The `entry.period.split(' — ')` line and the rest of the `.map()` body are unchanged.

- [ ] **Step 6: Verify**

```bash
npx tsc -b
npm run lint
```
Browser check: toggle language, confirm all 5 timeline entries' role/bullets/current badge switch, and the period date ranges still render as two stacked lines (the split-on-`' — '` rendering must not break).

- [ ] **Step 7: Commit**

```bash
git add src/data/es/experience.ts src/data/en/experience.ts src/data/es/uiExperience.ts src/data/en/uiExperience.ts src/data/es/index.ts src/data/en/index.ts src/components/Experience.tsx
git commit -m "$(cat <<'EOF'
Traduce Experience, consume useContent() en Experience.tsx

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 9: Education + Certifications

**Files:**
- Create: `src/data/es/education.ts` (moved), `src/data/en/education.ts`, `src/data/es/certifications.ts` (moved), `src/data/en/certifications.ts`, `src/data/es/uiEducation.ts`, `src/data/en/uiEducation.ts`
- Modify: `src/data/es/index.ts`, `src/data/en/index.ts`
- Modify: `src/components/Education.tsx`

**Interfaces:**
- Consumes: `useContent()`.
- Produces: `useContent()` gains `degrees: Degree[]`, `certifications: Certification[]`, `moreCourses: string[]`, `uiEducation: { eyebrow, heading, coursesHeading, showMoreCourses, hideMoreCourses, certificationBadge, viewCredential, otherCoursesHeading }`.

- [ ] **Step 1: Move and fix import paths**

```bash
git mv src/data/education.ts src/data/es/education.ts
git mv src/data/certifications.ts src/data/es/certifications.ts
```
Fix line 1 of each (`education.ts`: `Degree`; `certifications.ts`: `Certification`): `'../types'` → `'../../types'`. Keep the `TODO(specs/04-task-roadmap.md Fase 0)` comment in `certifications.ts` as-is (it's a repo note, not visitor-facing content).

- [ ] **Step 2: Translate `education.ts`**

`src/data/en/education.ts` — translate `category` (`'Educación superior'` → `'Higher education'`, `'Formación técnica'` → `'Technical training'`) and `title` (degree names, e.g. `'Ingeniería de Sistemas'` → `'Systems Engineering'`, `'Contabilización de operaciones comerciales y financieras'` → `'Commercial and Financial Operations Accounting'`). Keep `institution` (`'Universidad de la Amazonia'`, `'SENA'`) and `location` (`'Florencia, Caquetá'`) identical. Translate month names in `dateRange` (e.g. `'Enero 2015 — Febrero 2024'` → `'January 2015 — February 2024'`); this field is only ever displayed as free text (not parsed), so any natural English date-range phrasing is fine as long as it reads clearly.

- [ ] **Step 3: Translate `certifications.ts`**

`src/data/en/certifications.ts` — per Global Constraints, `issuerInitials`, `title`, `issuer`, `credentialUrl`, `featured` stay byte-identical (official certification names/issuers); translate only `date` (month name, e.g. `'Enero 2022'` → `'January 2022'`). `moreCourses` entries stay byte-identical in full (course name + platform + date all live in one free-text string per Global Constraints — don't split it to translate only the date).

- [ ] **Step 4: UI strings**

`src/data/es/uiEducation.ts`:
```ts
export const uiEducation = {
  eyebrow: '05 — Formación',
  heading: 'Educación, cursos y certificaciones',
  coursesHeading: 'Cursos y certificaciones',
  showMoreCourses: 'Ver otros cursos',
  hideMoreCourses: 'Ocultar otros cursos',
  certificationBadge: 'Certificación',
  viewCredential: 'Ver credencial →',
  otherCoursesHeading: 'Otros cursos completados',
}
```
`src/data/en/uiEducation.ts`:
```ts
export const uiEducation = {
  eyebrow: '05 — Education',
  heading: 'Education, courses & certifications',
  coursesHeading: 'Courses & certifications',
  showMoreCourses: 'Show other courses',
  hideMoreCourses: 'Hide other courses',
  certificationBadge: 'Certification',
  viewCredential: 'View credential →',
  otherCoursesHeading: 'Other completed courses',
}
```

- [ ] **Step 5: Register in barrels**

Append to both index files:
```ts
export * from './education'
export * from './certifications'
export * from './uiEducation'
```

- [ ] **Step 6: Wire `Education.tsx`**

Replace:
```tsx
import { useState } from 'react'
import { certifications, moreCourses } from '../data/certifications'
import { degrees } from '../data/education'

export function Education() {
  const [showMoreCourses, setShowMoreCourses] = useState(true)
```
with:
```tsx
import { useState } from 'react'
import { useContent } from '../context/useContent'

export function Education() {
  const [showMoreCourses, setShowMoreCourses] = useState(true)
  const { degrees, certifications, moreCourses, uiEducation } = useContent()
```

Replace the hardcoded eyebrow/heading:
```tsx
<div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-accent uppercase">
  05 — Formación
</div>
<h2 className="text-[34px] leading-[1.06] tracking-[-0.025em]">Educación, cursos y certificaciones</h2>
```
→
```tsx
<div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-accent uppercase">
  {uiEducation.eyebrow}
</div>
<h2 className="text-[34px] leading-[1.06] tracking-[-0.025em]">{uiEducation.heading}</h2>
```

Replace the "Cursos y certificaciones" heading + toggle button:
```tsx
<div className="font-heading text-[11px] font-extrabold tracking-[.09em] uppercase">
  Cursos y certificaciones
</div>
<button
  type="button"
  onClick={() => setShowMoreCourses((v) => !v)}
  className="border-0 font-heading text-xs font-extrabold text-accent"
>
  {showMoreCourses ? 'Ocultar otros cursos' : 'Ver otros cursos'}
</button>
```
→
```tsx
<div className="font-heading text-[11px] font-extrabold tracking-[.09em] uppercase">
  {uiEducation.coursesHeading}
</div>
<button
  type="button"
  onClick={() => setShowMoreCourses((v) => !v)}
  className="border-0 font-heading text-xs font-extrabold text-accent"
>
  {showMoreCourses ? uiEducation.hideMoreCourses : uiEducation.showMoreCourses}
</button>
```

Replace the "Certificación" badge and "Ver credencial →" link:
```tsx
{cert.featured && (
  <span className="bg-poster px-[6px] py-1 font-heading text-[9px] leading-none font-extrabold tracking-[.08em] text-white uppercase">
    Certificación
  </span>
)}
```
→ `Certificación` becomes `{uiEducation.certificationBadge}`, and:
```tsx
{cert.credentialUrl && (
  <a href={cert.credentialUrl} target="_blank" rel="noopener" className="self-start border-0 font-heading text-xs font-extrabold">
    Ver credencial →
  </a>
)}
```
→ `Ver credencial →` becomes `{uiEducation.viewCredential}`.

Replace the "Otros cursos completados" heading:
```tsx
<div className="mb-3 font-heading text-[11px] font-extrabold tracking-[.09em] text-mute-700 uppercase">
  Otros cursos completados
</div>
```
→
```tsx
<div className="mb-3 font-heading text-[11px] font-extrabold tracking-[.09em] text-mute-700 uppercase">
  {uiEducation.otherCoursesHeading}
</div>
```

The `degrees.map(...)`, `certifications.map(...)`, and `moreCourses.map(...)` bodies are otherwise unchanged.

- [ ] **Step 7: Verify**

```bash
npx tsc -b
npm run lint
```
Browser check: toggle language, confirm degree cards, the courses/certifications heading + show/hide toggle (click it both ways), certification cards (including the "Certification" badge and "View credential →" link when present), and the "Other completed courses" chip list all switch correctly.

- [ ] **Step 8: Commit**

```bash
git add src/data/es/education.ts src/data/en/education.ts src/data/es/certifications.ts src/data/en/certifications.ts src/data/es/uiEducation.ts src/data/en/uiEducation.ts src/data/es/index.ts src/data/en/index.ts src/components/Education.tsx
git commit -m "$(cat <<'EOF'
Traduce Education y Certifications, consume useContent() en Education.tsx

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 10: Footer

**Files:**
- Create: `src/data/es/uiFooter.ts`, `src/data/en/uiFooter.ts`
- Modify: `src/data/es/index.ts`, `src/data/en/index.ts`
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `useContent()` — reuses `contact` (Task 3) and `uiHero.downloadCv` (Task 3).
- Produces: `useContent()` gains `uiFooter: { heading, lead, emailLabel, phoneLabel, linkedinLabel, githubLabel, locationLabel, signature, disclaimer }`.

- [ ] **Step 1: UI strings**

`src/data/es/uiFooter.ts`:
```ts
export const uiFooter = {
  heading: '¿Tiene un sistema que no se habla con otro? Hablemos.',
  lead: 'Busco un equipo donde la integración entre sistemas sea parte del producto y no un parche. Respondo por correo o LinkedIn.',
  emailLabel: 'Correo',
  phoneLabel: 'Teléfono',
  linkedinLabel: 'LinkedIn',
  githubLabel: 'GitHub',
  locationLabel: 'Ubicación',
  signature: 'Juan Pablo Murcia Cortés · Desarrollador de Software',
  disclaimer: 'Diagramas y fragmentos de código con datos ficticios',
}
```
`src/data/en/uiFooter.ts`:
```ts
export const uiFooter = {
  heading: "Have a system that doesn't talk to another? Let's talk.",
  lead: "I'm looking for a team where integrating systems is part of the product, not a patch. I answer by email or LinkedIn.",
  emailLabel: 'Email',
  phoneLabel: 'Phone',
  linkedinLabel: 'LinkedIn',
  githubLabel: 'GitHub',
  locationLabel: 'Location',
  signature: 'Juan Pablo Murcia Cortés · Software Developer',
  disclaimer: 'Diagrams and code snippets use fictional data',
}
```

- [ ] **Step 2: Register in barrels**

Append `export * from './uiFooter'` to both `src/data/es/index.ts` and `src/data/en/index.ts`.

- [ ] **Step 3: Wire `Footer.tsx`**

Replace:
```tsx
import { Download } from 'lucide-react'
import type { ReactNode } from 'react'
import { contact } from '../data/contact'

function FooterCell({ label, children }: { label: string; children: ReactNode }) {
```
with:
```tsx
import { Download } from 'lucide-react'
import type { ReactNode } from 'react'
import { useContent } from '../context/useContent'

function FooterCell({ label, children }: { label: string; children: ReactNode }) {
```

In `export function Footer()`, add as the first line of the body:
```tsx
const { contact, uiFooter, uiHero } = useContent()
```

Replace the hardcoded heading/lead:
```tsx
<h2 className="mb-6 max-w-[22ch] text-[clamp(36px,5.4vw,68px)] leading-[1.02] tracking-[-0.035em] text-white">
  ¿Tiene un sistema que no se habla con otro? Hablemos.
</h2>
<p className="mb-11 max-w-[52ch] text-[17px] leading-[1.5] text-white/92">
  Busco un equipo donde la integración entre sistemas sea parte del producto y no un parche. Respondo por
  correo o LinkedIn.
</p>
```
→
```tsx
<h2 className="mb-6 max-w-[22ch] text-[clamp(36px,5.4vw,68px)] leading-[1.02] tracking-[-0.035em] text-white">
  {uiFooter.heading}
</h2>
<p className="mb-11 max-w-[52ch] text-[17px] leading-[1.5] text-white/92">{uiFooter.lead}</p>
```

Replace each `FooterCell label="..."` literal:
- `label="Correo"` → `label={uiFooter.emailLabel}`
- `label="Teléfono"` → `label={uiFooter.phoneLabel}`
- `label="LinkedIn"` → `label={uiFooter.linkedinLabel}`
- `label="GitHub"` → `label={uiFooter.githubLabel}`
- `label="Ubicación"` → `label={uiFooter.locationLabel}`

Replace the CV download button label:
```tsx
<Download size={14} strokeWidth={2} />
Descargar CV
```
→
```tsx
<Download size={14} strokeWidth={2} />
{uiHero.downloadCv}
```

Replace the bottom signature row:
```tsx
<div className="mt-11 flex flex-wrap justify-between gap-5 border-t-2 border-white/30 pt-5 font-heading text-[11px] tracking-[.06em] text-white/75 uppercase">
  <span>Juan Pablo Murcia Cortés · Desarrollador de Software</span>
  <span>Diagramas y fragmentos de código con datos ficticios</span>
</div>
```
→
```tsx
<div className="mt-11 flex flex-wrap justify-between gap-5 border-t-2 border-white/30 pt-5 font-heading text-[11px] tracking-[.06em] text-white/75 uppercase">
  <span>{uiFooter.signature}</span>
  <span>{uiFooter.disclaimer}</span>
</div>
```

Every `contact.*` reference in the JSX (email/phone/linkedin/github/location values and links) is unchanged — it now reads from the destructured `contact` instead of the removed static import.

- [ ] **Step 4: Verify**

```bash
npx tsc -b
npm run lint
```
Browser check: toggle language, confirm the footer heading/lead, all 5 cell labels, "Download CV" button, and the bottom signature/disclaimer line switch correctly; mailto/tel/LinkedIn/GitHub links still work.

- [ ] **Step 5: Commit**

```bash
git add src/data/es/uiFooter.ts src/data/en/uiFooter.ts src/data/es/index.ts src/data/en/index.ts src/components/Footer.tsx
git commit -m "$(cat <<'EOF'
Traduce Footer, consume useContent() en Footer.tsx

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 11: Tech notes

**Files:**
- Create: `src/data/es/techNotes.ts` (moved), `src/data/en/techNotes.ts`, `src/data/es/uiTechNotes.ts`, `src/data/en/uiTechNotes.ts`
- Modify: `src/data/es/index.ts`, `src/data/en/index.ts`
- Modify: `src/components/TechNotes.tsx`

**Interfaces:**
- Consumes: `useContent()`.
- Produces: `useContent()` gains `techNotes: TechNote[]`, `uiTechNotes: { eyebrow: string; heading: string; intro: string }`.

- [ ] **Step 1: Move and fix the import path**

```bash
git mv src/data/techNotes.ts src/data/es/techNotes.ts
```
Fix line 1: `'../types'` → `'../../types'`. Keep the file's leading comment as-is (repo note, not visitor-facing).

- [ ] **Step 2: Translate**

`src/data/en/techNotes.ts` — translate `category`, `title`, `description` for all 3 notes, and `status` (`'Borrador'` → `'Draft'`).

- [ ] **Step 3: UI strings**

`src/data/es/uiTechNotes.ts`:
```ts
export const uiTechNotes = {
  eyebrow: '07 — Notas técnicas',
  heading: 'Lo que estoy escribiendo',
  intro: 'Estructura lista. Los tres títulos son los temas que propongo; el contenido lo escribes tú.',
}
```
`src/data/en/uiTechNotes.ts`:
```ts
export const uiTechNotes = {
  eyebrow: '07 — Technical notes',
  heading: "What I'm writing",
  intro: "Structure is ready. The three titles are the topics I'm proposing; the content is yours to write.",
}
```

- [ ] **Step 4: Register in barrels**

Append `export * from './techNotes'` and `export * from './uiTechNotes'` to both index files.

- [ ] **Step 5: Wire `TechNotes.tsx`**

Replace:
```tsx
import { techNotes } from '../data/techNotes'

export function TechNotes() {
```
with:
```tsx
import { useContent } from '../context/useContent'

export function TechNotes() {
  const { techNotes, uiTechNotes } = useContent()
```

Replace the hardcoded eyebrow/heading/intro:
```tsx
<div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-accent uppercase">
  07 — Notas técnicas
</div>
<h2 className="text-[34px] leading-[1.06] tracking-[-0.025em]">Lo que estoy escribiendo</h2>
```
→
```tsx
<div className="mb-3 font-heading text-[11px] leading-none font-extrabold tracking-[.1em] text-accent uppercase">
  {uiTechNotes.eyebrow}
</div>
<h2 className="text-[34px] leading-[1.06] tracking-[-0.025em]">{uiTechNotes.heading}</h2>
```
```tsx
<div className="max-w-[34ch] text-xs text-mute-700">
  Estructura lista. Los tres títulos son los temas que propongo; el contenido lo escribes tú.
</div>
```
→
```tsx
<div className="max-w-[34ch] text-xs text-mute-700">{uiTechNotes.intro}</div>
```

The `techNotes.map(...)` body is unchanged.

- [ ] **Step 6: Verify**

```bash
npx tsc -b
npm run lint
```
Browser check: toggle language, confirm the Tech Notes section's eyebrow/heading/intro and all 3 note rows (category/title/description/status) switch correctly.

- [ ] **Step 7: Commit**

```bash
git add src/data/es/techNotes.ts src/data/en/techNotes.ts src/data/es/uiTechNotes.ts src/data/en/uiTechNotes.ts src/data/es/index.ts src/data/en/index.ts src/components/TechNotes.tsx
git commit -m "$(cat <<'EOF'
Traduce Tech Notes, consume useContent() en TechNotes.tsx

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 12: Full-site QA sweep

**Files:**
- None created/modified unless the sweep in Step 2 finds a leftover string — if so, fix it in place in whichever file it's in.

**Interfaces:**
- Consumes: everything produced by Tasks 1–11.
- Produces: nothing new — this task only verifies.

- [ ] **Step 1: Full build**

```bash
npx tsc -b
npm run lint
npm run build
```
Expected: all three exit 0 (this also confirms production build succeeds, not just dev mode).

- [ ] **Step 2: Grep sweep for missed hardcoded Spanish text**

```bash
grep -rnP '[áéíóúñÁÉÍÓÚÑ¿¡]' src/components src/App.tsx
```
Every match must be inside a `{...}` JS expression reading from `useContent()`/`uiX`/data (i.e. sourced from `src/data/es|en/*`), never a literal string sitting directly in JSX. If a literal Spanish string turns up outside `src/data/`, add it to the appropriate `uiX` file (in both `es/` and `en/`) and wire it in, following the pattern used in Tasks 2–11.

- [ ] **Step 3: Manual browser walkthrough**

Start the dev server (`npm run dev`) and, for both `es` and `en` (use the Navbar toggle to switch):
- Confirm `document.documentElement.getAttribute('lang')` matches the active language.
- Scroll through every section top to bottom (Hero → About → Skills → Projects incl. all 3 case studies and Other Projects → Experience → Education → Tech Notes → Footer) and confirm no Spanish text remains while in `en`, and vice versa.
- Click every nav link and confirm it still scrolls to the right section (anchors unaffected by language).
- Hover a Skills chip and confirm the cross-highlight dimming in Projects still works.
- Toggle the theme (dark/light) independently of language and confirm both toggles are independent of each other.
- Reload the page and confirm the chosen language persisted (no snap-back to the browser-detected language).

- [ ] **Step 4: Update the spec status (optional but recommended)**

If everything above passes, append a short "Implementado" note at the end of `specs/05-multi-idioma.md` recording that the feature shipped (one line, e.g. `**Estado:** Implementado — YYYY-MM-DD.`).

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
QA final del portafolio multi-idioma (tsc, lint, build, revisión manual ES/EN)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

(If Step 2 or Step 3 required fixes, those are already captured by this commit alongside the QA notes — no separate commit needed unless you prefer to split them.)
