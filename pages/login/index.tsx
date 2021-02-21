import Head from 'next/head';
import styles from '../../styles/Login.module.scss';
import Form from '../../ui/login/form';

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=RocknRoll+One&display=swap" rel="stylesheet" />
      </Head>
      <section className={styles.login}>
        <Form redirect="/dashboard" />
      </section>
    </>
  );
}
