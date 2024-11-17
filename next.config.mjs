/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/assets/**',
        search: ''
      }
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'airbnbnew.cybersoft.edu.vn',
        pathname: '*'
      },
    ]
  }
};

export default nextConfig;
