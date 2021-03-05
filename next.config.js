// Config to check bundle size
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Config
const config = {
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'es',
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

module.exports = withBundleAnalyzer(config);
