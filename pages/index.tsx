import Head from 'next/head';
import withSession from '../middlewares/session';
import Navigation from '../ui/shared/navigation';
import Image from 'react-bootstrap/Image';
import Footer from '../ui/shared/footer';
import BackgroundAnimated from '../ui/shared/background-animated';
import styles from '../styles/Home.module.scss';

export const getServerSideProps = withSession(({ req }) => {
  const user = req.session.get('user') || null;

  return {
    props: {
      fullNav: user != null,
    },
  };
});

interface HomePageProps {
  fullNav: boolean;
}

export default function Home({ fullNav }: HomePageProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio</title>
      </Head>
      <Navigation fullNav={fullNav} active="/" />
      <BackgroundAnimated />
      <main className={styles.home}>
        <section className={styles.welcome}>
          <h1>DDLand</h1>
          <h2 className={styles.subtitle}>Crea landings pages de manera rápida y sencilla</h2>
        </section>
        <section className={styles.benefits}>
          <Image rounded src="/thanks.jpg" className={styles.image} alt="DDLand, drag and drop" />
          <ol className={styles.list}>
            <li className={styles.item}>Crea tus landings arrastrando bloques</li>
            <li className={styles.item}>Visualiza en tiempo real tus cambios</li>
            <li className={styles.item}>Aumenta tus ventas generando landings periódicamente</li>
            <li className={styles.item}>Comparte tus creaciones</li>
          </ol>
        </section>
        <section className={styles.presentation}>
          <div>
            <h2>Dashboard</h2>
            <p>En esta sección podrás crear tus landings pages</p>
          </div>
          <Image className={styles.imageDashboard} src="/dashboard.png" alt="DDLand, dashboard" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
