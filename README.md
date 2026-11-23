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

## Envío del formulario

1. Copiá `.env.example` como `.env` y configurá `SMTP_USER` y `SMTP_PASSWORD`. Para usar Gmail, activá la verificación en dos pasos y generá una [contraseña de aplicación de Google](https://support.google.com/accounts/answer/185833).
2. Ejecutá `npm run start:server` en una terminal y `npm start` en otra. Abrí http://localhost:4200.
3. El servidor envía los mensajes a `marotto.software@gmail.com`. Al responder al correo, se usa la dirección que dejó la persona.

En Vercel no hace falta levantar el servidor: `api/contact.mjs` publica la misma app como función en `/api/contact`. Solo cargá `SMTP_USER` y `SMTP_PASSWORD` en Settings › Environment Variables y volvé a desplegar, porque las variables nuevas no se aplican a los deploys anteriores.

Para otro hosting, ejecutá `npm run build` y usá `npm run start:server` como comando de inicio en un hosting con Node.js. Ese proceso sirve el sitio y el formulario. Cargá las credenciales como variables privadas del hosting. Configurá `HOST=0.0.0.0` si el hosting necesita que Node escuche en todas las interfaces. Si hay un proxy inverso, configurá `TRUST_PROXY` con sus IP o rangos CIDR para que el límite de envíos se aplique por visitante. Para otro proveedor SMTP, configurá también `SMTP_HOST` y `SMTP_PORT`.

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
   └─ contact/              Reactive Forms y envío al servidor de correo
```

## Accesibilidad

HTML semántico con un `h1` y un `h2` por sección, foco visible, link para saltar al contenido,
`aria-label` en botones de ícono y errores del formulario asociados con `aria-describedby`.
Con `prefers-reduced-motion` se apagan el tipeo, el parpadeo, el scroll suave y las apariciones.
