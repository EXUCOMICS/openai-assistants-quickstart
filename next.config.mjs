// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*", // all routes
        headers: [
          // Only these sites can frame/iframe your app
          {
            key: "Content-Security-Policy",
            // Add ONLY the hosts that should be allowed to embed your chat:
            value:
              "frame-ancestors 'self' https://exucomics.com https://www.exucomics.com https://openai-assistants-quickstart-bf8w-fi70c3v4n.vercel.app https://sandbox.weebly.com https://weebly.com;",
          },
          // Optional: tell proxies/browsers this varies by Origin
          { key: "X-Frame-Options", value: "" },
        ],
      },
    ];
  },
};

export default nextConfig;
