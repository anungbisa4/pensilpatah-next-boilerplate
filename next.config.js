const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const withOptimizeImage = require("next-optimized-images");
const runtimeCaching = require("next-pwa/cache");
const path = require("path");
// const withOffline = require("next-offline");

const nextConfig = {
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "-dlingo-secret-1234";
  },
  // You can use cdn in assetPrefix
  // assetPrefix: "http://1147483289.rsc.cdn77.org",
  images: {
    domains: [],
  },
  env: {
    baseUrl: process.env.NODE_BASE_URL,
    baseUrlGraphql: "",
  },
  trailingSlash: false,
  exportPathMap: function () {
    return {
      "/": { page: "/" },
    };
  },
  webpack(config, option) {
    config.experiments = {};
    config.resolve.alias["@"] = path.join(__dirname, ".");
    return config;
  },
  devIndicators: {
    autoPrerender: false,
  },
  async headers() {
    return [
      {
        source: "/(.*)?",

        headers: [
          {
            key: "X-Frame-Options",

            value: "SAMEORIGIN",
          },

          {
            key: "Content-Security-Policy",

            value: "frame-ancestors 'self'",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'",
          },
          {
            key: "Referrer-Policy",
            value: "same-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

module.exports = withPlugins(
  [
    withOptimizeImage,
    [
      withPWA,
      {
        pwa: {
          disable: process.env.NODE_ENV === "development",
          dest: "public",
          register: process.env.NODE_ENV !== "development",
          swSrc: "service-worker.js",
        },
      },
    ],
  ],
  nextConfig
);
