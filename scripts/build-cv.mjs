// Genera los CV en PDF (formatos Harvard y ATS, en ES y EN) a partir de los
// mismos datos que usa el sitio (src/data/{es,en}/). Salida: public/assets/cv/.
//
//   npm run cv
//
// Requiere un Chromium: usa CHROME_PATH si existe, si no el que Playwright
// tenga instalado (PLAYWRIGHT_BROWSERS_PATH) o /opt/pw-browsers/chromium.
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'
import { createServer } from 'vite'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'assets', 'cv')
mkdirSync(outDir, { recursive: true })

const SITE = 'https://jpmurcia.github.io/portafolio-Jp/'
const NAME = 'Juan Pablo Murcia Cortés'
const MONTHS = {
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}

const esc = (text) =>
  String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** '2021-07 — Actualidad' → 'jul 2021 – Actualidad'. */
function formatPeriod(period, lang, present) {
  const part = (raw) => {
    const m = /^(\d{4})-(\d{2})$/.exec(raw.trim())
    return m ? `${MONTHS[lang][Number(m[2]) - 1]} ${m[1]}` : present
  }
  const [from, to] = period.split('—')
  return `${part(from)} – ${part(to)}`
}

/** Datos del CV ya resueltos para un idioma: lo que ambas plantillas necesitan. */
function buildModel(content, lang) {
  const { contact, hero, experience, degrees, certifications, skillCategories, cv } = content
  const flat = (text) => text.replace(/ · /g, ', ')
  return {
    lang,
    name: NAME,
    headline: cv.headline,
    summary: cv.summary,
    labels: cv.labels,
    contact: {
      location: contact.location + ', Colombia',
      phone: contact.phoneDisplay,
      phoneHref: contact.phone,
      email: contact.email,
      linkedin: contact.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
      linkedinHref: contact.linkedinUrl,
      github: contact.githubUrl.replace(/^https?:\/\//, ''),
      githubHref: contact.githubUrl,
      portfolio: SITE.replace(/^https?:\/\//, '').replace(/\/$/, ''),
      portfolioHref: SITE,
    },
    experience: experience.map((job) => ({
      role: job.role,
      company: job.company,
      period: formatPeriod(job.period, lang, cv.labels.present),
      bullets: job.current ? [...job.bullets, ...cv.currentRoleExtra] : job.bullets,
    })),
    education: degrees.map((degree) => ({
      title: degree.title,
      institution: degree.institution,
      location: degree.location,
      dates: degree.dateRange.replace(' — ', ' – '),
    })),
    skills: [
      ...skillCategories.map((group) => ({
        title: group.title,
        items: group.skills.map((skill) => flat(skill.label)),
      })),
      ...cv.extraSkillGroups,
    ],
    aiTitle: cv.aiTitle,
    aiBullets: cv.aiBullets,
    projects: cv.projects,
    certifications: certifications.map((c) => ({ title: c.title, issuer: c.issuer, date: c.date })),
    heroSubtitle: hero.location,
  }
}

const list = (items) => `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`

/* ---------------------------------------------------------------- Harvard */

const harvardCss = `
  @page { size: Letter; margin: 0.6in 0.7in; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 10.4pt/1.28 "Times New Roman", "Liberation Serif", Georgia, serif; color: #000; }
  a { color: inherit; text-decoration: none; }
  header { text-align: center; margin-bottom: 4pt; }
  h1 { margin: 0; font-size: 20pt; letter-spacing: .06em; text-transform: uppercase; font-weight: 700; }
  .headline { margin: 1pt 0 3pt; font-style: italic; font-size: 11pt; }
  .contact { font-size: 9.6pt; }
  .contact span + span::before { content: " | "; }
  h2 { margin: 9pt 0 4pt; padding-bottom: 1.5pt; border-bottom: .8pt solid #000; font-size: 10.8pt; letter-spacing: .08em; text-transform: uppercase; font-weight: 700; }
  p { margin: 0; text-align: justify; }
  .entry { margin-bottom: 5pt; break-inside: avoid; }
  .row { display: flex; justify-content: space-between; gap: 12pt; }
  .row b { font-weight: 700; }
  .row .right { white-space: nowrap; }
  .sub { font-style: italic; }
  ul { margin: 2pt 0 0; padding-left: 15pt; }
  li { margin: 0 0 1.2pt; text-align: justify; }
  .skills p { text-align: left; margin-bottom: 1.5pt; }
  .skills b { font-weight: 700; }
`

function harvardHtml(m) {
  const c = m.contact
  const l = m.labels
  return `<!doctype html><html lang="${m.lang}"><head><meta charset="utf-8"><title>${esc(m.name)} — CV</title><style>${harvardCss}</style></head><body>
<header>
  <h1>${esc(m.name)}</h1>
  <div class="headline">${esc(m.headline)}</div>
  <div class="contact">
    <span>${esc(c.location)}</span><span>${esc(c.phone)}</span><span>${esc(c.email)}</span><span>${esc(c.linkedin)}</span><span>${esc(c.github)}</span><span>${esc(c.portfolio)}</span>
  </div>
</header>

<h2>${esc(l.summary)}</h2>
<p>${esc(m.summary)}</p>

<h2>${esc(l.education)}</h2>
${m.education
  .map(
    (e) => `<div class="entry">
  <div class="row"><b>${esc(e.institution)}</b><span class="right">${esc(e.location)}</span></div>
  <div class="row"><span class="sub">${esc(e.title)}</span><span class="right">${esc(e.dates)}</span></div>
</div>`,
  )
  .join('')}

<h2>${esc(l.experience)}</h2>
${m.experience
  .map(
    (j) => `<div class="entry">
  <div class="row"><b>${esc(j.company)}</b><span class="right">${esc(j.period)}</span></div>
  <div class="sub">${esc(j.role)}</div>
  ${list(j.bullets)}
</div>`,
  )
  .join('')}

<h2>${esc(m.aiTitle)}</h2>
${list(m.aiBullets)}

<h2>${esc(l.projects)}</h2>
${m.projects
  .map(
    (p) => `<div class="entry"><div class="row"><b>${esc(p.name)}</b>${p.url ? `<span class="right">${esc(p.url)}</span>` : ''}</div><p>${esc(p.detail)}</p></div>`,
  )
  .join('')}

<h2>${esc(l.skills)}</h2>
<div class="skills">${m.skills.map((g) => `<p><b>${esc(g.title)}:</b> ${esc(g.items.join(', '))}</p>`).join('')}</div>

<h2>${esc(l.certifications)}</h2>
${list(m.certifications.map((x) => `${x.title} — ${x.issuer}, ${x.date}`))}
</body></html>`
}

/* -------------------------------------------------------------------- ATS */

const atsCss = `
  @page { size: Letter; margin: 0.55in 0.7in; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 9.9pt/1.28 Arial, "Liberation Sans", Helvetica, sans-serif; color: #000; }
  a { color: inherit; text-decoration: none; }
  h1 { margin: 0; font-size: 18pt; font-weight: 700; }
  .headline { margin: 1pt 0 4pt; font-size: 11pt; font-weight: 700; }
  .contact { margin: 0; }
  h2 { margin: 9pt 0 2.5pt; font-size: 11pt; font-weight: 700; text-transform: uppercase; }
  p { margin: 0 0 2pt; }
  .entry { margin-bottom: 6pt; break-inside: avoid; }
  .entry .title { font-weight: 700; }
  ul { margin: 2pt 0 0; padding-left: 14pt; }
  li { margin: 0 0 1.5pt; }
`

function atsHtml(m) {
  const c = m.contact
  const l = m.labels
  return `<!doctype html><html lang="${m.lang}"><head><meta charset="utf-8"><title>${esc(m.name)} — CV</title><style>${atsCss}</style></head><body>
<h1>${esc(m.name)}</h1>
<div class="headline">${esc(m.headline)}</div>
<p class="contact">${esc(c.location)} | ${esc(c.phone)} | ${esc(c.email)}</p>
<p class="contact">LinkedIn: ${esc(c.linkedin)} | GitHub: ${esc(c.github)} | ${esc(l.portfolio)}: ${esc(c.portfolio)}</p>

<h2>${esc(l.summary)}</h2>
<p>${esc(m.summary)}</p>

<h2>${esc(l.skills)}</h2>
${m.skills.map((g) => `<p><b>${esc(g.title)}:</b> ${esc(g.items.join(', '))}</p>`).join('')}

<h2>${esc(l.experience)}</h2>
${m.experience
  .map(
    (j) => `<div class="entry">
  <p class="title">${esc(j.role)}</p>
  <p>${esc(j.company)} | ${esc(j.period)}</p>
  ${list(j.bullets)}
</div>`,
  )
  .join('')}

<h2>${esc(m.aiTitle)}</h2>
${list(m.aiBullets)}

<h2>${esc(l.projects)}</h2>
${m.projects
  .map((p) => `<div class="entry"><p class="title">${esc(p.name)}${p.url ? ` | ${esc(p.url)}` : ''}</p><p>${esc(p.detail)}</p></div>`)
  .join('')}

<h2>${esc(l.education)}</h2>
${m.education
  .map(
    (e) => `<div class="entry"><p class="title">${esc(e.title)}</p><p>${esc(e.institution)}, ${esc(e.location)} | ${esc(e.dates)}</p></div>`,
  )
  .join('')}

<h2>${esc(l.certifications)}</h2>
${list(m.certifications.map((x) => `${x.title} - ${x.issuer}, ${x.date}`))}
</body></html>`
}


/* ----------------------------------------------------------------- Visual */
// Diseño del CV original (foto, columna azul, nombre grande), con contenido
// actualizado. Sin estrellas de nivel (no hay dato que las respalde) ni datos
// personales sensibles (dirección, nacimiento, estado civil).

const dataUri = (path, mime) => `data:${mime};base64,${readFileSync(join(root, path)).toString('base64')}`
const photoUri = () => dataUri('scripts/assets/photo.png', 'image/png')
const fontUri = () => dataUri('node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2', 'font/woff2')

const visualCss = () => `
  @font-face { font-family: "GeistCV"; src: url(${fontUri()}) format("woff2"); font-weight: 100 900; }
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; }
  body { font: 8.9pt/1.38 "GeistCV", "Liberation Sans", Arial, sans-serif; color: #2b2b2b; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  a { color: inherit; text-decoration: none; }
  .bg { position: fixed; top: 0; left: 0; bottom: 0; width: 36%; background: #a7c9ee; z-index: 0; }
  .side { position: absolute; top: 0; left: 0; width: 36%; z-index: 1; }
  .photo-block { height: 262pt; background: #2f2f2f; clip-path: polygon(0 0, 100% 0, 100% 86%, 50% 100%, 0 86%); display: flex; justify-content: center; padding-top: 36pt; }
  .photo-block img { width: 150pt; height: 150pt; }
  .side-body { padding: 14pt 20pt 24pt 22pt; color: #1d2a3a; }
  .side h3 { margin: 12pt 0 5pt; font-size: 9.6pt; letter-spacing: .12em; text-transform: uppercase; font-weight: 800; }
  .side h3:first-child { margin-top: 0; }
  .side .item { margin-bottom: 4.5pt; overflow-wrap: anywhere; }
  .side .item b { display: block; font-size: 7.4pt; letter-spacing: .08em; text-transform: uppercase; font-weight: 700; opacity: .75; }
  .side .grp { margin-bottom: 5pt; }
  .side .grp b { display: block; font-weight: 800; font-size: 8.6pt; }
  .main-table { position: relative; z-index: 1; margin-left: 36%; width: 64%; border-collapse: collapse; }
  .main-table td { padding: 0 34pt 0 28pt; }
  .spacer { height: 30pt; }
  h1 { margin: 0 0 14pt; font-size: 31pt; line-height: 1.12; letter-spacing: .1em; text-transform: uppercase; font-weight: 800; color: #8db7e6; }
  h2 { margin: 15pt 0 5pt; padding-bottom: 3pt; border-bottom: 1.4pt solid #2b2b2b; font-size: 11pt; letter-spacing: .1em; text-transform: uppercase; font-weight: 800; color: #1c1c1c; }
  h1 + h2 { margin-top: 0; }
  .entry { margin-bottom: 8pt; break-inside: avoid; }
  .role { font-weight: 800; font-size: 10pt; color: #1c1c1c; }
  .meta { color: #4a5a6e; font-weight: 500; margin-bottom: 2pt; }
  ul { margin: 2pt 0 0; padding-left: 12pt; }
  li { margin-bottom: 1.4pt; }
  p { margin: 0 0 3pt; }
`

function visualHtml(m) {
  const c = m.contact
  const l = m.labels
  const item = (label, value) => `<div class="item"><b>${esc(label)}</b>${esc(value)}</div>`
  return `<!doctype html><html lang="${m.lang}"><head><meta charset="utf-8"><title>${esc(m.name)} — CV</title><style>${visualCss()}</style></head><body>
<div class="bg"></div>
<aside class="side">
  <div class="photo-block"><img src="${photoUri()}" alt=""></div>
  <div class="side-body">
    <h3>${esc(l.contact)}</h3>
    ${item('Email', c.email)}
    ${item(m.lang === 'es' ? 'Teléfono' : 'Phone', c.phone)}
    ${item(m.lang === 'es' ? 'Ubicación' : 'Location', c.location)}
    ${item('LinkedIn', c.linkedin)}
    ${item('GitHub', c.github)}
    ${item(l.portfolio, c.portfolio)}
    <h3>${esc(l.skills)}</h3>
    ${m.skills.map((g) => `<div class="grp"><b>${esc(g.title)}</b>${esc(g.items.join(', '))}</div>`).join('')}
  </div>
</aside>
<table class="main-table">
  <thead><tr><td><div class="spacer"></div></td></tr></thead>
  <tfoot><tr><td><div class="spacer"></div></td></tr></tfoot>
  <tbody><tr><td>
    <h1>${esc(m.name)}</h1>
    <h2>${esc(l.summary)}</h2>
    <p>${esc(m.summary)}</p>

    <h2>${esc(l.experience)}</h2>
    ${m.experience
      .map(
        (j) => `<div class="entry"><div class="role">${esc(j.role)}</div><div class="meta">${esc(j.company)} | ${esc(j.period)}</div>${list(j.bullets)}</div>`,
      )
      .join('')}

    <h2>${esc(m.aiTitle)}</h2>
    ${list(m.aiBullets)}

    <h2>${esc(l.projects)}</h2>
    ${m.projects
      .map((p) => `<div class="entry"><div class="role">${esc(p.name)}</div>${p.url ? `<div class="meta">${esc(p.url)}</div>` : ''}<p>${esc(p.detail)}</p></div>`)
      .join('')}

    <h2>${esc(l.education)}</h2>
    ${m.education
      .map(
        (e) => `<div class="entry"><div class="role">${esc(e.title)}</div><div class="meta">${esc(e.institution)}, ${esc(e.location)} | ${esc(e.dates)}</div></div>`,
      )
      .join('')}

    <h2>${esc(l.certifications)}</h2>
    ${list(m.certifications.map((x) => `${x.title} — ${x.issuer}, ${x.date}`))}
  </td></tr></tbody>
</table>
</body></html>`
}

/* -------------------------------------------------------------------- run */

function findChrome() {
  const candidates = [process.env.CHROME_PATH, '/opt/pw-browsers/chromium'].filter(Boolean)
  return candidates.find((path) => existsSync(path))
}

const server = await createServer({ root, logLevel: 'error', appType: 'custom', server: { middlewareMode: true } })
let browser
try {
  const { content } = await server.ssrLoadModule('/src/data/content.ts')
  browser = await chromium.launch({ executablePath: findChrome() })
  const formats = { harvard: harvardHtml, ats: atsHtml, visual: visualHtml }
  for (const lang of ['es', 'en']) {
    const model = buildModel(content[lang], lang)
    for (const [format, render] of Object.entries(formats)) {
      const page = await browser.newPage()
      await page.setContent(render(model), { waitUntil: 'load' })
      const file = join(outDir, `CV-Juan-Pablo-Murcia-${format}-${lang}.pdf`)
      await page.pdf({ path: file, printBackground: true, preferCSSPageSize: true })
      await page.close()
      console.log(`✔ ${file.replace(root + '/', '')}`)
    }
  }
} finally {
  await browser?.close()
  await server.close()
}
