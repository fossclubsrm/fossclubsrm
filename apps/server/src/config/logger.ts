import pino from 'pino';
import { type Environment } from './env.ts';

export function createLogger(env: Environment) {
  const isDevelopment = env.NODE_ENV === 'development';

  return pino({
    level: env.LOG_LEVEL,
    transport: isDevelopment
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
  });
}
