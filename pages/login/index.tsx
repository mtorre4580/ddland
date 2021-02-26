import Head from 'next/head';
import Form from '../../ui/login/components/form';
import BackgroundAnimated from '../../ui/shared/background-animated';
import styles from '../../styles/Login.module.scss';

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
