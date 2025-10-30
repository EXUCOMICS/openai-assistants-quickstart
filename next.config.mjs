/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        // apply to every route (pages AND assets)
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self' https://exucomics.com https://www.exucomics.com https://weebly.com https://www.weebly.com https://sandbox.weebly.com",
          },
          // Optional; modern browsers ignore ALLOW-FROM, CSP above is what matters.
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://sandbox.weebly.com', 
          },
        ],
      },
    ];
  },
};

export default nextConfig;

