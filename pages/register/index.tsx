import { useContext } from 'react';
import Head from 'next/head';
import BackgroundAnimated from '../../ui/shared/background-animated';
import { I18nContext, Translations } from '../../ui/shared/i18n-provider';
import Form from '../../ui/register/components/form';
import styles from '../../styles/Register.module.scss';

const i18n: Translations = {
  es: {
    title: 'Registrarse',
  },
  en: {
    title: 'Sign In',
  },
};

export default function Register() {
  const locale = useContext(I18nContext);
  const texts = i18n[locale];

  return (
    <>
      <Head>
        <title>{texts.title}</title>
      </Head>
      <main className={styles.register}>
        <BackgroundAnimated />
        <Form />
      </main>
    </>
  );
}
