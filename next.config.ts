import type { NextConfig } from 'next';
import withPWA from '@ducanh2912/next-pwa';

const nextConfig: NextConfig = {
  /* your regular Next.js options */
};

export default withPWA({
  dest: 'public',
  workboxOptions: {
    mode: 'production',   // disables workbox logging
  },
})(nextConfig);
