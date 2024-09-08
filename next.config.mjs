/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.cjs');

/** @type {import("next").NextConfig} */
const config = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oskm-itb-staging.nyc3.digitaloceanspaces.com',
        port: '',
        pathname: '/**/*',
      },
      {
        protocol: 'https',
        hostname: 'oskm-production-bucket.sgp1.digitaloceanspaces.com',
        port: '',
        pathname: '/**/*',
      },
    ],
  },
};

export default config;
