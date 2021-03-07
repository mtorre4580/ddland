import { useContext } from 'react';
import Head from 'next/head';
import withSession from '../../middlewares/session';
import Form from '../../ui/login/components/form';
import BackgroundAnimated from '../../ui/shared/background-animated';
import { I18nContext, Translations } from '../../ui/shared/i18n-provider';
import styles from '../../styles/Login.module.scss';

const i18n: Translations = {
  es: {
    title: 'Acceder',
  },
  en: {
    title: 'Sign In',
  },
};

export const getServerSideProps = withSession(({ req, res }) => {
  const user = req.session.get('user');
  if (user) {
    res.setHeader('location', '/dashboard');
    res.statusCode = 302;
    res.end();
  }
  return {
    props: {},
  };
});

export default function Login() {
  const locale = useContext(I18nContext);
  const texts = i18n[locale];

  return (
    <>
      <Head>
        <title>{texts.title}</title>
      </Head>
      <main className={styles.login}>
        <BackgroundAnimated />
        <Form />
      </main>
    </>
  );
}
