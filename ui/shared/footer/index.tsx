import React, { useContext } from 'react';
import Image from 'next/image';
import Nav from 'react-bootstrap/Nav';
import { I18nContext } from '../i18n-provider';
import i18n from './i18n';
import styles from './footer.module.scss';

export default React.memo(function Footer() {
  const locale = useContext(I18nContext);
  const texts = i18n[locale];

  return (
    <footer className={styles.footer}>
      <p>DDLAND &copy; 2021</p>
      <p>{texts.hint}</p>
      <div>
        <Nav.Link href="https://www.instagram.com/ddland_ar" target="_blank" rel="noreferrer" className={styles.instagram}>
          <span>{texts.follow}</span><Image height={24} width={24} className={styles.icons} src="/instagram.svg" alt="instagram follow" />
        </Nav.Link>
      </div>
    </footer>
  );
});
