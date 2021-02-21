import React from 'react';
import styles from './canva.module.scss';

export default function Canva() {
  return (
    <section className={styles.canva}>
      <div className={styles.description}>
        <img className={styles.image} src="/start.svg" alt="start-canva" />
        <p>Arrastra un bloque para empezar</p>
      </div>
    </section>
  );
}
