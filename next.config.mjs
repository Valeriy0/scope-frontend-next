import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.resolve(process.cwd(), 'src/components'),
      pages: path.resolve(process.cwd(), 'pages'),
      lib: path.resolve(process.cwd(), 'src/lib'),
      utils: path.resolve(process.cwd(), 'src/utils'),
      hooks: path.resolve(process.cwd(), 'src/hooks'),
      app: path.resolve(process.cwd(), 'src/app'),
      styles: path.resolve(process.cwd(), 'src/styles'),
      helpers: path.resolve(process.cwd(), 'src/helpers'),
      connectors: path.resolve(process.cwd(), 'src/connectors'),
      config: path.resolve(process.cwd(), 'src/config.js'),
    };
    return config;
  },
};

export default nextConfig;
