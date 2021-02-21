import React from 'react';
import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>DDLAND &copy; 2021</p>
      <p className="text-muted">Diseña tus landings de manera sencilla y rápida</p>
    </footer>
  );
}
