/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/users",
        destination: "/",
      },
    ];
  },
};

module.exports = nextConfig;
