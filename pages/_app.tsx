import Head from 'next/head';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { I18nProvider, Translations } from '../ui/shared/i18n-provider';
import { StateInspector } from 'reinspect';
import '../styles/globals.scss';

const i18n: Translations = {
  es: {
    description: 'Crea landings pages de manera rápida y sencilla',
  },
  en: {
    description: 'Create landings pages quickly and easily',
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale } = router;
  const texts = i18n[locale || 'es'];

  return (
    <>
      <Head>
        {/* Open Graph */}
        <meta property="og:title" content="DDLand" />
        <meta property="og:description" content={texts.description} />
        <meta property="og:image" content="https://ddland.app/thanks.jpg" />
        <meta property="og:url" content="https://ddland.app" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={locale} />
        <meta property="og:site_name" content="DDLand" />
        {/* Icons and Theme */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#303f9f" />
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=RocknRoll+One&display=swap" rel="stylesheet" />
        {/* Bootstrap v4 CSS */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossOrigin="anonymous"
        />
        {/* Canonical */}
        <link rel="canonical" href="https://ddland.app" />
        {/* Description */}
        <meta
          name="description"
          content="DDLand, create landings pages quickly and easily. Create your website by dragging blocks"
        />
      </Head>
      <I18nProvider locale={locale}>
        <StateInspector name="DDland">
          <Component {...pageProps} />
        </StateInspector>
      </I18nProvider>
    </>
  );
}

export default MyApp;
