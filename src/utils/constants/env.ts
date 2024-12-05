/**
 * Environment variables usage across the application
 */
export const ENV = {
  TOKEN_CYBERSOFT: process.env.NEXT_PUBLIC_TOKEN_CYBERSOFT,
  BASE_URL_API: process.env.NEXT_PUBLIC_BASE_URL_API,
} as const;

/**
 * Keys for consistent usage across the application
 */
export const KEYS = {
  TOKEN_CYBERSOFT: 'tokenCybersoft',
  TOKEN: 'token',
} as const;

// // NOTE: Validation env variable
// import { z } from 'zod';
// const envSchema = z.object({
//   NEXT_PUBLIC_TOKEN_CYBERSOFT: z.string().min(1, 'Cybersoft token is required'),
//   NEXT_PUBLIC_BASE_URL_API: z.string().url('Invalid API base URL'),
// });

// export type Env = z.infer<typeof envSchema>;

// const parseEnv = () => {
//   const result = envSchema.safeParse(process.env);

//   if (!result.success) {
//     console.error('Invalid environment configuration:', result.error.errors);
//     throw new Error('Invalid environment configuration');
//   }

//   return result.data;
// };
// export const ENV = (() => {
//   const env = parseEnv();

//   return {
//     TOKEN_CYBERSOFT: env.NEXT_PUBLIC_TOKEN_CYBERSOFT,
//     BASE_URL_API: env.NEXT_PUBLIC_BASE_URL_API,
//   } as const;
// })();
