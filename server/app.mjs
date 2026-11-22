import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { fileURLToPath } from 'node:url';

const EMAIL_PATTERN = /^[^\s@<>,;:()\[\]"\\]+@[^\s@<>,;:()\[\]"\\]+\.[^\s@<>,;:()\[\]"\\]+$/;
const sitePath = fileURLToPath(new URL('../dist/marotto/browser/', import.meta.url));

export function createApp({ sendMail, sender, trustProxy }) {
  const app = express();
  app.disable('x-powered-by');
  if (trustProxy) app.set('trust proxy', trustProxy);

  app.post(
    '/api/contact',
    rateLimit({ windowMs: 10 * 60 * 1000, limit: 5, standardHeaders: 'draft-8', legacyHeaders: false }),
    express.json({ limit: '32kb' }),
    async (req, res) => {
      const nombre = typeof req.body?.nombre === 'string' ? req.body.nombre.trim() : '';
      const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';
      const telefono = typeof req.body?.telefono === 'string' ? req.body.telefono.trim() : '';
      const mensaje = typeof req.body?.mensaje === 'string' ? req.body.mensaje.trim() : '';

      if (
        nombre.length < 2 || nombre.length > 100 ||
        email.length > 254 || !EMAIL_PATTERN.test(email) ||
        telefono.length > 40 || /[\r\n\u2028\u2029]/.test(telefono) ||
        mensaje.length < 10 || mensaje.length > 5000
      ) {
        return res.sendStatus(400);
      }
      if (!sendMail) return res.sendStatus(503);

      const phoneLine = telefono ? `\nTeléfono: ${telefono}` : '';
      try {
        await sendMail({
          from: { name: 'Formulario de Marotto', address: sender },
          to: 'marotto.software@gmail.com',
          replyTo: { address: email },
          subject: 'Nuevo mensaje desde el sitio de Marotto',
          text: `Nombre: ${nombre}\nCorreo: ${email}${phoneLine}\n\nMensaje:\n${mensaje}`,
        });
        return res.sendStatus(204);
      } catch (error) {
        console.error('Error al enviar el formulario:', error.code ?? error.name);
        return res.sendStatus(502);
      }
    },
    (error, _req, res, _next) => {
      if (error.status >= 400 && error.status < 500) return res.sendStatus(error.status);
      console.error('Error al procesar el formulario:', error.code ?? error.name);
      return res.sendStatus(500);
    },
  );

  app.use(express.static(sitePath));
  return app;
}
