import React from 'react';
import styles from './footer.module.scss';

export default React.memo(function Footer() {
  return (
    <footer className={styles.footer}>
      <p>DDLAND &copy; 2021</p>
      <p>Diseña tus landings de manera sencilla y rápida</p>
    </footer>
  );
});
