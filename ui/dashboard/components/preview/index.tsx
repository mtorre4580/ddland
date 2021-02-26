import React from 'react';
import Reader from '../reader';
import styles from './preview.module.scss';

interface PreviewProps {
  blocks: object[];
}

export default React.memo(function Preview({ blocks }: PreviewProps) {
  return (
    <>
      <h2 className={styles.title}>Visualiza tu web</h2>
      <p className={styles.subtitle}>Mira en tiempo real tus cambios</p>
      <section className={styles.preview}>
        <div className={styles.myWeb}>
          <Reader blocks={blocks} />
        </div>
      </section>
    </>
  );
});
