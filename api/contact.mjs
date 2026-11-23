import { createApp } from '../server/app.mjs';
import { createMailer } from '../server/mailer.mjs';

// Vercel publica este archivo como función en /api/contact, con la misma app de Express que el servidor local.
// Vercel reemplaza X-Forwarded-For por la IP del visitante, así que confiar en un salto alcanza para que
// el límite de envíos se aplique por persona. Ese límite vive en memoria de cada instancia de la función.
export default createApp({
  ...createMailer(process.env),
  trustProxy: 1,
});
