/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Opções para otimizar o build no Netlify
  output: 'export',
  poweredByHeader: false,
  images: {
    unoptimized: true,
    domains: [],
  },
  // Desativar ESLint durante o build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Garantir que as páginas estáticas sejam geradas corretamente
  trailingSlash: true,
  distDir: 'out'
};

module.exports = nextConfig;
