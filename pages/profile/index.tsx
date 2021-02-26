import Head from 'next/head';
import withSession from '../../middlewares/session';
import styles from '../../styles/Profile.module.scss';
import Navigation from '../../ui/shared/navigation';
import Footer from '../../ui/shared/footer';
import IUser from '../../repository/models/user';
import MyProfile from '../../ui/profile/components/my-profile';

interface ProfilePageProps {
  user: IUser;
}

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

export default function Profile({ user }: ProfilePageProps) {
  return (
    <>
      <Head>
        <title>Perfil</title>
      </Head>
      <Navigation fullNav active="/profile" />
      <main className={styles.profile}>
        <MyProfile user={user} />
      </main>
      <Footer />
    </>
  );
}
