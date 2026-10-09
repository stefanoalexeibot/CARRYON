/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.CARRYON_STATIC_EXPORT === '1'
    ? { output: 'export', distDir: '.next-hostgator', trailingSlash: true }
    : {}),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
};

export default nextConfig;
