import { useContext } from 'react';
import Head from 'next/head';
import withSession from '../middlewares/session';
import Navigation from '../ui/shared/navigation';
import Image from 'react-bootstrap/Image';
import Footer from '../ui/shared/footer';
import BackgroundAnimated from '../ui/shared/background-animated';
import { I18nContext } from '../ui/shared/i18n-provider';
import styles from '../styles/Home.module.scss';

interface HomePageProps {
  fullNav: boolean;
  locale: string;
}

const i18n = {
  es: {
    title: 'Inicio',
    subtitle: 'Crea landings pages de manera rápida y sencilla',
    bullets: {
      step1: 'Crea tus landings arrastrando bloques',
      step2: 'Visualiza en tiempo real tus cambios',
      step3: 'Aumenta tus ventas generando landings periódicamente',
      step4: 'Comparte tus creaciones',
    },
    dashboardHint: 'En esta sección podrás crear tus landings pages',
  },
  en: {
    title: 'Home',
    subtitle: 'Create landings pages quickly and easily',
    bullets: {
      step1: 'Create your landings by dragging blocks',
      step2: 'See your changes in real time',
      step3: 'Increase your sales by generating landings periodically',
      step4: 'Share your creations',
    },
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
  // @ts-ignore
  const texts = i18n[locale];

  return (
    <div className={styles.container}>
      <Head>
        <title>{texts.title}</title>
      </Head>
      <Navigation fullNav={fullNav} active="/" />
      <BackgroundAnimated />
      <main className={styles.home}>
        <section className={styles.welcome}>
          <h1>DDLand</h1>
          <h2 className={styles.subtitle}>{texts.subtitle}</h2>
        </section>
        <section className={styles.benefits}>
          <Image rounded src="/thanks.jpg" className={styles.image} alt="DDLand, drag and drop" />
          <ol className={styles.list}>
            <li className={styles.item}>{texts.bullets.step1}</li>
            <li className={styles.item}>{texts.bullets.step2}</li>
            <li className={styles.item}>{texts.bullets.step3}</li>
            <li className={styles.item}>{texts.bullets.step4}</li>
          </ol>
        </section>
        <section className={styles.presentation}>
          <div>
            <h2>Dashboard</h2>
            <p>{texts.dashboardHint}</p>
          </div>
          <Image className={styles.imageDashboard} src="/dashboard.png" alt="DDLand, dashboard" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
