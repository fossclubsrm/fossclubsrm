import z from 'zod';
import { config } from 'dotenv';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(8000),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export const env = envSchema.parse(process.env);

export type Environment = z.infer<typeof envSchema>;

export function validateEnv(env?: unknown): Environment {
  const envToValidate = env || process.env;
  return envSchema.parse(envToValidate);
}
