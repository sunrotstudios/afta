import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'lastfm.freetls.fastly.net', 
      'userserve-ak.last.fm', 
      'userserve.last.fm', 
      'ws.audioscrobbler.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**',
        port: '',
        pathname: '/**',
      }
    ],
    unoptimized: true
  },
};

export default nextConfig;
