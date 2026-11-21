import nodemailer from 'nodemailer';
import { createApp } from './app.mjs';

const { SMTP_USER, SMTP_PASSWORD, TRUST_PROXY } = process.env;
const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = Number(process.env.SMTP_PORT || 465);
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

const app = createApp({
  sender: SMTP_USER,
  sendMail: transport ? (message) => transport.sendMail(message) : null,
  trustProxy: TRUST_PROXY,
});
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 3000);
app.listen(port, host, () => console.log(`Marotto en http://${host}:${port}`));
