import Head from 'next/head';
import withSession from '../../middlewares/session';
import Form from '../../ui/login/components/form';
import BackgroundAnimated from '../../ui/shared/background-animated';
import styles from '../../styles/Login.module.scss';

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
  return (
    <>
      <Head>
        <title>Acceder</title>
      </Head>
      <main className={styles.login}>
        <BackgroundAnimated />
        <Form />
      </main>
    </>
  );
}
