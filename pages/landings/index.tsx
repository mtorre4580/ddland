import withSession from '../../middlewares/session';
import styles from '../../styles/Landings.module.scss';
import landingRepository from '../../repository/landing';
import Navigation from '../../ui/shared/navigation';
import Footer from '../../ui/shared/footer';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get('user');

  if (user === undefined) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
  }

  try {
    const landings = await landingRepository.getAll(user.email);
    return {
      props: {},
    };
  } catch (err) {
    return {
      props: {},
    };
  }
});

export default function Landings() {
  return (
    <section className={styles.landings}>
      <Navigation />
      <div style={{ minHeight: '100vh', paddingTop: '56px' }}>
        <p>landings</p>
      </div>
      <Footer />
    </section>
  );
}
