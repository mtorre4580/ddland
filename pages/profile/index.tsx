import Head from 'next/head';
import withSession from '../../middlewares/session';
import styles from '../../styles/Profile.module.scss';
import Navigation from '../../ui/shared/navigation';
import { I18nContext } from '../../ui/shared/i18n-provider';
import IUser from '../../repository/models/user';
import MyProfile from '../../ui/profile/components/my-profile';
import { useContext } from 'react';

const i18n = {
  es: {
    profile: 'Perfil',
  },
  en: {
    profile: 'Profile',
  },
};

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
  const locale = useContext(I18nContext);
  // @ts-ignore
  const texts = i18n[locale];

  return (
    <>
      <Head>
        <title>{texts.profile}</title>
      </Head>
      <Navigation fullNav active="/profile" />
      <main className={styles.profile}>
        <MyProfile user={user} />
      </main>
    </>
  );
}
