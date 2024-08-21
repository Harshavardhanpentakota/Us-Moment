import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { mainRouter } from './Routes/index';
import { serve } from '@hono/node-server'

const app = new Hono();
const port = Number(process.env.PORT) || 4000;

// Middleware
app.use('*', cors());
app.use('*', async (c, next) => {
  c.req.json = async () => {
    return await c.req.json();
  };
  await next();
});
app.route('/api/v1', mainRouter);

serve({
  fetch: app.fetch,
  port: port,
})
