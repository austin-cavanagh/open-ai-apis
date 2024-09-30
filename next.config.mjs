/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/chat-completions',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
