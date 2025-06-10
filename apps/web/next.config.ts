import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 型チェックや静的解析は ci で行うので、ビルド時には無視する
  // デバッグ用にとりあえずデプロイしたいなどのケースも有るため
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
