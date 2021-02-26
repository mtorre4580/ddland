import Head from 'next/head';
import BackgroundAnimated from '../../ui/shared/background-animated';
import Form from '../../ui/register/components/form';
import styles from '../../styles/Register.module.scss';

export default function Register() {
  return (
    <>
      <Head>
        <title>Registrarse</title>
      </Head>
      <main className={styles.register}>
        <BackgroundAnimated />
        <Form />
      </main>
    </>
  );
}
