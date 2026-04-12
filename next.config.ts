import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdf-parse는 Node 전용 라이브러리로, 서버 런타임에서 번들링하지 않고 외부 패키지로 로드해야 함.
  serverExternalPackages: ['pdf-parse'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'techventure-ff194.firebasestorage.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
