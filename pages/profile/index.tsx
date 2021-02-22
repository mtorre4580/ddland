import withSession from '../../middlewares/session';
import styles from '../../styles/Landings.module.scss';
import Navigation from '../../ui/shared/navigation';
import Footer from '../../ui/shared/footer';

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

export default function Profile({ user }: any) {
  return (
    <section className={styles.profile}>
      <Navigation />
      <div style={{ minHeight: '100vh', paddingTop: '56px' }}>
        <p>{JSON.stringify(user)}</p>
      </div>
      <Footer />
    </section>
  );
}
