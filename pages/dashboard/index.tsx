import withSession from '../../middlewares/session';
import styles from '../../styles/Dashboard.module.scss';
import Navigation from '../../ui/shared/navigation';
import Footer from '../../ui/shared/footer';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get('user');

  if (user === undefined) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: { user: req.session.get('user') },
  };
});

export default function Dashboard({ user }: any) {
  return (
    <section className={styles.dashboard}>
      <Navigation />
      <div style={{height: '100vh'}}>

      </div>
      <Footer />
    </section>
  );
}
