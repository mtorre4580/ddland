import Head from 'next/head';
import withSession from '../middlewares/session';
import Navigation from '../ui/shared/navigation';
import Footer from '../ui/shared/footer';
import styles from '../styles/Home.module.scss';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get('user');

  if (user === undefined) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
  }
  return {
    props: {
      user,
    },
  };
});

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio</title>
      </Head>
      <Navigation active="/" />
      <main style={{ minHeight: '100vh', paddingTop: '56px' }}>
        <p>home</p>
      </main>
      <Footer />
    </div>
  );
}
