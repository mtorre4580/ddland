import Head from 'next/head';
import withSession from '../../middlewares/session';
import Navigation from '../../ui/shared/navigation';
import Footer from '../../ui/shared/footer';
import Editor from '../../ui/dashboard/components/editor';
import styles from '../../styles/Dashboard.module.scss';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get('user');

  if (user === undefined) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
  }
  return { props: {} };
});

export default function Dashboard() {
  return (
    <section className={styles.dashboard}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navigation active="/dashboard" />
      <div style={{ paddingTop: '56px' }}>
        <Editor />
      </div>
      <Footer />
    </section>
  );
}
