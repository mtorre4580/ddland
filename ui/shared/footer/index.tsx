import React, { useContext } from 'react';
import { I18nContext } from '../i18n-provider';
import i18n from './i18n';
import styles from './footer.module.scss';

export default React.memo(function Footer() {
  const locale = useContext(I18nContext);
  // @ts-ignore
  const texts = i18n[locale];

  return (
    <footer className={styles.footer}>
      <p>DDLAND &copy; 2021</p>
      <p>{texts.hint}</p>
    </footer>
  );
});
