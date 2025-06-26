import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { validateEnv, type Environment } from './config/env.ts';
import { createLogger } from './config/logger.ts';

type Bindings = Environment;

type Variables = {
  logger: ReturnType<typeof createLogger>;
};

const app = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>().basePath('/api');

let globalLogger: ReturnType<typeof createLogger> | null = null;
let globalEnv: Environment | null = null;

if (typeof process !== 'undefined' && process.env.NODE_ENV) {
  globalEnv = validateEnv(process.env);
  globalLogger = createLogger(globalEnv);
}

app.use('*', async (c, next) => {
  const env = c.env || globalEnv!;
  const logger = globalLogger || createLogger(env);

  c.set('logger', logger);

  logger.info({ method: c.req.method, url: c.req.url }, 'Request received');

  await next();
});

app.get('/health', (c) => {
  const logger = c.get('logger');
  logger.info('Health check endpoint hit');

  return c.json({
    status: 200,
    message: 'Server is running!',
  });
});

app.notFound((c) => {
  const logger = c.get('logger') || globalLogger;
  logger?.warn({ method: c.req.method, url: c.req.url }, 'Route not found');
  return c.json({ status: 404, message: 'Not Found' }, 404);
});

export default app;

if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
  serve(
    {
      fetch: app.fetch,
      port: 8000,
    },
    (info) => {
      console.log(`🚀 Server is running on http://localhost:${info.port}`);
    }
  );
}
