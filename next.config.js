// Config to check bundle size
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Config to i18n
const config = {
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'es',
  },
};

module.exports = withBundleAnalyzer(config);
