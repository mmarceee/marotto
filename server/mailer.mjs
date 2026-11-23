import nodemailer from 'nodemailer';

/**
 * Arma el envío de correo a partir de las variables de entorno.
 * Lo usan el servidor local (server/index.mjs) y la función de Vercel (api/contact.mjs).
 * Sin credenciales válidas devuelve sendMail: null y el formulario responde 503.
 */
export function createMailer(env) {
  const { SMTP_USER, SMTP_PASSWORD } = env;
  const smtpHost = env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(env.SMTP_PORT || 465);
  const usesGmail = smtpHost.toLowerCase() === 'smtp.gmail.com';
  const smtpPassword = usesGmail ? SMTP_PASSWORD?.replace(/\s/g, '') : SMTP_PASSWORD;
  const hasInvalidGmailPassword = usesGmail && Boolean(smtpPassword) && smtpPassword.length !== 16;
  const transport = SMTP_USER && smtpPassword && !hasInvalidGmailPassword ? nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    requireTLS: smtpPort !== 465,
    auth: { user: SMTP_USER, pass: smtpPassword },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 15000,
  }) : null;

  if (hasInvalidGmailPassword) {
    console.warn('SMTP_PASSWORD debe ser una contraseña de aplicación de Gmail de 16 caracteres.');
  } else if (!transport) {
    console.warn('Configurá SMTP_USER y SMTP_PASSWORD para habilitar el formulario de contacto.');
  }

  return {
    sender: SMTP_USER,
    sendMail: transport ? (message) => transport.sendMail(message) : null,
  };
}
