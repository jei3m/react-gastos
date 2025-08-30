import type { NextConfig } from 'next';
import withPWA from '@ducanh2912/next-pwa';

const nextConfig: NextConfig = {
  /* your regular Next.js options */
};

const isDev = process.env.NODE_ENV === 'development';

export default withPWA({
  dest: 'public',
  disable: isDev,
  workboxOptions: {
    mode: 'production',   // disables workbox logging
  },
})(nextConfig);
