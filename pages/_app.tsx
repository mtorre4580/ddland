import Head from 'next/head';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { I18nProvider } from '../ui/shared/i18n-provider';
import { StateInspector } from 'reinspect';

import '../styles/globals.scss';

const i18n = {
  es: {
    description: 'Crea landings pages de manera rápida y sencilla',
  },
  en: {
    description: 'Create landings pages quickly and easily',
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const currentLocal = locale || defaultLocale;
  // @ts-ignore
  const texts = i18n[locale];

  return (
    <>
      <Head>
        <meta property="og:title" content="DDLand" />
        <meta property="og:description" content={texts.description} />
        <meta property="og:image" content="https://ddland.vercel.app/_next/image?url=%2Fthanks.jpg&w=1200&q=75" />
        <meta property="og:url" content="http://ddland.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={locale} />
        <meta property="og:site_name" content="DDLand" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=RocknRoll+One&display=swap" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossOrigin="anonymous"
        />
      </Head>
      <I18nProvider locale={currentLocal}>
        <StateInspector name="DDland">
          <Component {...pageProps} />
        </StateInspector>
      </I18nProvider>
    </>
  );
}

export default MyApp;
