# Marotto Software · Landing

Landing page de Marotto Software (San José, Uruguay), hecha con Angular 22: componentes standalone,
signals, control flow nuevo y SCSS propio, sin librerías de UI.

## Comandos

```bash
npm install
npm start          # servidor de desarrollo en http://localhost:4200
npm run build      # build de producción en dist/marotto
npm test           # tests unitarios con Vitest
```

## Dónde se edita cada cosa

| Qué                                              | Dónde                                 |
| ------------------------------------------------ | ------------------------------------- |
| Textos, servicios, tecnologías, equipo, contacto | `src/app/data/content.ts`             |
| Mostrar u ocultar la sección Proyectos           | `SHOW_PROJECTS` en `content.ts`       |
| Colores, tipografía, espaciado                   | `src/styles/_tokens.scss`             |
| Breakpoints (mobile first)                       | `src/styles/_breakpoints.scss`        |
| Botones, tarjetas, chips, animaciones globales   | `src/styles/_base.scss`               |

Los textos entre `[CORCHETES]` son placeholders pendientes de datos reales (fotos, redes, proyectos).

## Estructura

```
src/app/
├─ app.ts / app.html        arma la página y define el degradé de los íconos
├─ data/content.ts          todo el contenido
├─ shared/
│  ├─ header/               fijo, con menú hamburguesa en mobile
│  ├─ footer/
│  ├─ logo/                 logo recreado en CSS, nítido a cualquier tamaño
│  ├─ section-heading/      etiqueta <seccion/> + título
│  └─ reveal.directive.ts   aparición al hacer scroll (IntersectionObserver)
└─ sections/
   ├─ hero/                 incluye terminal/ con efecto de tipeo
   ├─ services/
   ├─ technologies/
   ├─ process/
   ├─ projects/             oculta mientras SHOW_PROJECTS sea false
   ├─ about/
   └─ contact/              Reactive Forms; por ahora el envío solo muestra un mensaje
```

## Accesibilidad

HTML semántico con un `h1` y un `h2` por sección, foco visible, link para saltar al contenido,
`aria-label` en botones de ícono y errores del formulario asociados con `aria-describedby`.
Con `prefers-reduced-motion` se apagan el tipeo, el parpadeo, el scroll suave y las apariciones.
