# CLAUDE.md

Portafolio de Juan Pablo Murcia: React 19 + TypeScript + Vite + Tailwind CSS 4, bilingüe (ES/EN),
tema claro/oscuro, desplegado en GitHub Pages. Contenido sin backend.

## Comandos

```bash
npm install
npm run dev      # http://localhost:6300
npm run build    # tsc -b && vite build  → dist/
npm run lint     # oxlint (ignora las advertencias de "Portafolio profesional Juan Pablo Murcia/", es el prototipo viejo)
npm run preview
```

Antes de dar algo por terminado: `npx tsc -b`, `npm run lint` y `npm run build` limpios.
Para probar el despliegue real: `GITHUB_ACTIONS=true npm run build` y servir con
`GITHUB_ACTIONS=true npx vite preview` (el sitio vive bajo `/portafolio-Jp/`).

## Estructura

- `src/components/` — una sección por componente; `ui/SectionHeader.tsx` es el encabezado compartido.
- `src/data/{es,en}/` — **todo el texto**. Los componentes no llevan copy: lo leen con `useContent()`.
- `src/index.css` — tokens del design system y utilidades (`card`, `tile`, `chip`, `eyebrow`).
- `public/diagrams/` — diagramas archify (HTML independiente) embebidos por `iframe`. `sytix-*.html` (casos de uso, arquitectura, proceso del ticket, SLA) se generaron con la skill archify 3.1 y se muestran como pestañas en la tarjeta de SyTix (un solo `iframe` montado a la vez).
- `specs/` — especificaciones; `specs/02-design-system.md` describe el diseño vigente.

## Reglas que no se rompen

1. **i18n:** todo string nuevo se añade en `data/es/` **y** `data/en/` con la misma forma
   (`typeof es` tipa a `en`). Nunca texto fijo en un componente.
2. **Diagramas:** no editar `public/diagrams/*`, ni la sincronización de tema de
   `ThemeContext` + `DiagramEmbed`. Un cambio de diseño solo toca el contenedor del `iframe`.
   Tras cualquier cambio de tema, comprobar que los 8 `iframe` de casos de estudio y el diagrama de SyTix activo (9 en total) siguen el tema del sitio en vivo.
3. **Rutas:** usar `import.meta.env.BASE_URL` para assets de `public/` (diagramas, CV).
4. **Diseño:** usar los tokens y utilidades de `index.css`; no hex sueltos en componentes.
   Toda grilla multi-columna lleva versión de una columna. Verificar sin scroll horizontal a 320 px.
5. **Confidencialidad:** el sitio no publica información operativa de clientes. Diagramas
   conceptuales y código con datos ficticios.
6. **Evidencia, no marketing:** la sección "Trabajo con IA" solo afirma lo que el repo respalda
   (`specs/`, `docs/…/plans/`, historial de commits).

## SyTix (producto de Synergy Work)

La tarjeta vive en `data/{es,en}/featuredProduct.ts` y renderiza solo los campos con contenido
(rol, flujos, stack, highlights, enlace). Es una descripción de **alto nivel**: procesos generales
y cómo funciona el sistema (proceso del ticket y SLA). Juan Pablo confirmó que no hay problema en
que la app y la empresa sean conocidas.

Reglas para tocar esa tarjeta:

- **Nunca** incluir seguridad (autenticación, permisos, claves, infraestructura), datos de
  clientes, nombres de personas, códigos de ticket, URLs internas ni detalles operativos.
- No inventar funcionalidades: todo lo que se afirme debe salir de `jmurcia-syw/TICKET_SYW` o de
  lo que Juan Pablo aporte. Del repo se lee solo documentación funcional (README y manual de
  usuario); no se abren `.env*`, `docker-compose*`, guías de despliegue ni archivos de credenciales.
- Pendiente (`TODO(SyTix)`): `link`, si algún día existe una versión pública.

## Git

Desarrollo en la rama asignada a la sesión; el despliegue ocurre al hacer push a `master`
(`.github/workflows/deploy.yml`). No crear PR salvo que se pida.
