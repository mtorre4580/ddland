import Head from 'next/head';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { I18nProvider } from '../ui/shared/i18n-provider';
import { StateInspector } from 'reinspect';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const currentLocal = locale || defaultLocale;

  return (
    <>
      <Head>
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
