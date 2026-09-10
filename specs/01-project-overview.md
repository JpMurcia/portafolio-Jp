# 01 — Project Overview

## Resumen del proyecto

Portafolio profesional de **Juan Pablo Murcia Cortés (JPMC)**, Ingeniero de Sistemas y
Desarrollador de Software (Florencia, Caquetá, Colombia). Es un sitio de una sola página
(SPA, navegación por anclas) que traduce a React + TypeScript un prototipo ya diseñado en
Claude Design:

- **Prototipo fuente:** [`Portafolio profesional Juan Pablo Murcia/Portafolio JPMC.dc.html`](../Portafolio%20profesional%20Juan%20Pablo%20Murcia/Portafolio%20JPMC.dc.html)
- **Mockup de referencia:** enlace de Claude Design compartido por el usuario (requiere sesión
  autenticada; no fue accesible desde este entorno, se usó el archivo `.dc.html` como fuente
  de verdad).

El portafolio no es una lista genérica de tecnologías: su eje central son **tres casos de
estudio narrados en profundidad** (integración de báscula industrial con Oracle ERP, soporte
de un sistema académico-administrativo universitario, y una app móvil offline-first de
investigación), cada uno con arquitectura, diagramas de casos de uso, decisiones de diseño
documentadas y fragmentos de código ilustrativos.

## Objetivos clave

1. **Mostrar habilidades técnicas reales** a través de evidencia (casos de estudio, código,
   trayectoria), no solo un listado de tecnologías.
2. **Evidenciar integraciones empresariales** — Oracle APEX, Oracle Applications Cloud (ERP),
   Oracle Analytics/BI, y el sistema académico-administrativo "Chaira" de la Universidad de la
   Amazonia (módulos de contratación).
3. **Exhibir certificaciones y formación** (LinkedIn Learning, Platzi, AWS, SCRUMstudy, UBA
   IALAB) con hipervínculos activos a las credenciales verificables.
4. **No exponer datos confidenciales, financieros u operativos de clientes.** Esta es una
   restricción explícita ya presente en el prototipo (ver más abajo) y debe preservarse en la
   implementación final.
5. Ofrecer una experiencia fluida, responsiva (sin breakpoints fijos, basada en `clamp()` y
   grids `auto-fit`) y con soporte de tema claro/oscuro (oscuro por defecto).

## Restricciones de contenido (extraídas literalmente del prototipo)

El prototipo ya declara explícitamente estos límites de confidencialidad; deben respetarse al
migrar el contenido:

- *"Los diagramas son reconstrucciones conceptuales y los fragmentos de código usan datos
  ficticios: no hay información operativa de ningún cliente en esta página."*
- *"El Reporteador es un sistema interno del cliente; no publico su URL."* (Caso 01 — InfoMetal)
- Los ejemplos de payload/API usan identificadores con sufijo `DEMO` (`OP-DEMO-000148`,
  `SCALE_DEMO_01`, etc.) — patrón a mantener si se agregan más snippets.
- No se publican credenciales, tokens ni datos de clientes reales en ningún bloque de código.

## Audiencia objetivo

Reclutadores técnicos, líderes de ingeniería y empresas que buscan un perfil de
integrador/backend con experiencia en ecosistemas Oracle, ERP corporativos e integración de
hardware — no un portafolio de diseño visual puro.

## Stack tecnológico

| Capa | Tecnología | Estado en el repo |
|---|---|---|
| Framework UI | React 19 | Ya instalado (`^19.2.8`) |
| Build tool | Vite | Ya instalado (`^8.2.2`) |
| Lenguaje | TypeScript | Ya instalado (`~6.0.2`) |
| Estilos | Tailwind CSS | **Pendiente de instalar** |
| Iconografía | Lucide React | **Pendiente de instalar** |
| Lint | oxlint | Ya configurado (`.oxlintrc.json`) |
| Enrutamiento | Ninguno — navegación por anclas (`#sobre`, `#skills`, etc.) con `scroll-behavior: smooth`, igual que el prototipo | N/A |

No se requiere librería de routing: el prototipo es un documento único de scroll continuo con
`<nav>` sticky y enlaces internos (`#top`, `#sobre`, `#skills`, `#casos`, `#trayectoria`,
`#formacion`, `#contacto`).

## Fuera de alcance de este turno

Este documento y sus acompañantes (`02`–`04`) son **solo especificación**. No se instalará
ningún paquete ni se escribirá código de componentes hasta que el usuario apruebe estos
archivos.
