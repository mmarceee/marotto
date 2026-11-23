import { createApp } from './app.mjs';
import { createMailer } from './mailer.mjs';

const app = createApp({
  ...createMailer(process.env),
  trustProxy: process.env.TRUST_PROXY,
});
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 3000);
app.listen(port, host, () => console.log(`Marotto en http://${host}:${port}`));
