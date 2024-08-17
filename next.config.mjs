/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },

  // async redirects() {
  //   return [
  //     {
  //       source: '/admin',
  //       destination: '/middleware',
  //       permanent: false,
  //     },
  //     {
  //       source: '/instructor',
  //       destination: '/middleware',
  //       permanent: false,
  //     },
  //     {
  //       source: '/student',
  //       destination: '/middleware',
  //       permanent: false,
  //     },
  //   ];
  // },
};

export default nextConfig;

