import { useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import withSession from '../middlewares/session';
import Footer from '../ui/shared/footer';
import Navigation from '../ui/shared/navigation';
import BackgroundAnimated from '../ui/shared/background-animated';
import { I18nContext, Translations } from '../ui/shared/i18n-provider';
import styles from '../styles/Home.module.scss';

interface HomePageProps {
  fullNav: boolean;
  locale: string;
}

const i18n: Translations = {
  es: {
    title: 'Inicio',
    subtitle: 'Crea landings pages de manera rápida y sencilla',
    step1: 'Crea tus landings arrastrando bloques',
    step2: 'Visualiza en tiempo real tus cambios',
    step3: 'Aumenta tus ventas generando landings periódicamente',
    step4: 'Comparte tus creaciones',
    dashboardHint: 'En esta sección podrás crear tus landings pages',
  },
  en: {
    title: 'Home',
    subtitle: 'Create landings pages quickly and easily',
    step1: 'Create your landings by dragging blocks',
    step2: 'See your changes in real time',
    step3: 'Increase your sales by generating landings periodically',
    step4: 'Share your creations',
    dashboardHint: 'In this section you can create your landings pages',
  },
};

export const getServerSideProps = withSession(({ req }) => {
  const user = req.session.get('user') || null;

  return {
    props: {
      fullNav: user != null,
    },
  };
});

export default function Home({ fullNav }: HomePageProps) {
  const locale = useContext(I18nContext);
  const texts = i18n[locale];

  return (
    <>
      <Head>
        <title>{texts.title}</title>
      </Head>
      <Navigation fullNav={fullNav} active="/" />
      <BackgroundAnimated />
      <main className={styles.home}>
        <div className={styles.welcome}>
          <h1>DDLand</h1>
          <h2 className={styles.subtitle}>{texts.subtitle}</h2>
        </div>
        <div className={styles.benefits}>
          <Image
            src="/thanks.jpg"
            width={600}
            height={320}
            title="DDLand, drag & drop"
            className={styles.image}
            alt="DDLand, drag & drop"
          />
          <ol className={styles.list}>
            <li className={styles.item}>{texts.step1}</li>
            <li className={styles.item}>{texts.step2}</li>
            <li className={styles.item}>{texts.step3}</li>
            <li className={styles.item}>{texts.step4}</li>
          </ol>
        </div>
      </main>
      <Footer />
    </>
  );
}
