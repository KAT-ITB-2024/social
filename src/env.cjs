/* eslint-disable @typescript-eslint/no-var-requires */

const { createEnv } = require('@t3-oss/env-nextjs');
const { z } = require('zod');

exports.env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .default('postgresql://postgres:posgtres@localhost:5432/coba'),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === 'production'
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z
      .preprocess(
        // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
        // Since NextAuth.js automatically uses the VERCEL_URL if present.
        (str) => process.env.VERCEL_URL ?? str,
        // VERCEL_URL doesn't include `https` so it cant be validated as a URL
        process.env.VERCEL ? z.string() : z.string().url(),
      )
      .default('http://localhost:3009'),
    REDIS_URL: z.string().url(),
    SMTP_HOST: z.string().min(1),
    SMTP_PORT: z.preprocess(
      // If SMTP_PORTL is not set, set it to 587
      (str) => (str ? +str : 587),
      // SMTP_PORTL must be a positive integer
      z.number().int().positive(),
    ),
    SMTP_USER: z.string().min(1),
    SMTP_PASS: z.string().min(1),
    WS_PORT: z.preprocess(
      (str) => (str ? +str : 8080),
      z.number().int().positive(),
    ),
    DO_ACCESS_KEY: z.string(),
    DO_SECRET_KEY: z.string(),
    DO_BUCKET_NAME: z.string(),
    DO_REGION: z.string(),
    DO_ORIGIN_ENDPOINT: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_API_URL: z.string(),
    NEXT_PUBLIC_WS_URL: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    REDIS_URL: process.env.REDIS_URL,
    WS_PORT: process.env.WS_PORT,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    DO_ACCESS_KEY: process.env.DO_ACCESS_KEY,
    DO_SECRET_KEY: process.env.DO_SECRET_KEY,
    DO_REGION: process.env.DO_REGION,
    DO_ORIGIN_ENDPOINT: process.env.DO_ORIGIN_ENDPOINT,
    DO_BUCKET_NAME: process.env.DO_BUCKET_NAME,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
});
