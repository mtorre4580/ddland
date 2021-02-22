import React from 'react';
import Reader from '../reader';
import styles from './preview.module.scss';

interface PreviewProps {
  blocks: object[];
}

export default React.memo(function Preview({ blocks }: PreviewProps) {
  return (
    <section className={styles.preview}>
      <h2 className={styles.title}>Visualiza tu web</h2>
      <div>
        <Reader blocks={blocks} />
      </div>
    </section>
  );
});
