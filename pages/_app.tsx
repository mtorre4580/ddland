import Head from 'next/head';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { I18nProvider } from '../ui/shared/i18n-provider';
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
      </Head>
      <I18nProvider locale={currentLocal}>
        <Component {...pageProps} />
      </I18nProvider>
    </>
  );
}

export default MyApp;
