import Head from 'next/head';
import withSession from '../middlewares/session';
import Navigation from '../ui/shared/navigation';
import Footer from '../ui/shared/footer';
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
      <main style={{ minHeight: '100vh', paddingTop: '56px' }}>
        <p>home</p>
      </main>
      <Footer />
    </div>
  );
}
