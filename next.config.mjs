// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:(.*", // all routes
        headers: [
          // Only these sites can frame/iframe your app
          {
            key: "Content-Security-Policy",
            // Add ONLY the hosts that should be allowed to embed your chat:
            value:
              "frame-ancestors 'self' https://exucomics.com https://www.exucomics.com https://openai-assistants-quickstart-59h8-hjwj2h9be.vercel.app https://sandbox.weebly.com https://www.weebly.com;",
          },
          // Optional: tell proxies/browsers this varies by Origin
          { key: "X-Frame-Options", value: "" },
        ],
      },
    ];
  },
};

export default nextConfig;
