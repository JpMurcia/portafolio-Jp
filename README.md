# Portafolio — Juan Pablo Murcia

Portafolio profesional de Juan Pablo Murcia, Ingeniero de Sistemas especializado en integraciones ERP, Oracle APEX, React y NestJS.

🔗 **Sitio en vivo:** https://jpmurcia.github.io/portafolio-Jp/

## Contenido

- **Perfil, stack y trayectoria** — resumen de experiencia y habilidades técnicas.
- **Tres casos de estudio detallados** — arquitectura, protocolos, decisiones de diseño y qué falló (y cómo se resolvió) en proyectos reales de industria, sector público e investigación. Los diagramas son reconstrucciones conceptuales y el código usa datos ficticios: no hay información operativa de ningún cliente.
- **Formación, certificaciones y notas técnicas.**
- **Selector de idioma ES/EN** y **tema claro/oscuro**, ambos persistidos en `localStorage`.

## Stack técnico

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) como build tool
- [Tailwind CSS 4](https://tailwindcss.com/)
- [oxlint](https://oxc.rs/) para linting

## Desarrollo local

```bash
npm install
npm run dev
```

El servidor de desarrollo queda disponible en `http://localhost:6300`.

Otros scripts disponibles:

```bash
npm run build    # tsc -b && vite build — genera dist/
npm run lint     # oxlint
npm run preview  # sirve dist/ localmente
```

## Despliegue

El sitio se publica automáticamente en GitHub Pages mediante [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) en cada push a `master`. Requiere que en **Settings → Pages** del repositorio la fuente esté configurada como "GitHub Actions".
