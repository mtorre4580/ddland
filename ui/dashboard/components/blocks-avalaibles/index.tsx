import React from 'react';
import Block from '../block';
import { getBlocks } from '../../services';
import styles from './blocks-avalaibles.module.scss';

const blocks = getBlocks();

export default React.memo(function BlocksAvalaibles() {
  return (
    <aside className={styles.aside}>
      <h2 className={styles.title}> Bloques</h2>
      <p className={styles.subtitle}>Crea tu web arrastrando bloques</p>
      {blocks.map((block, index) => (
        <Block key={index} {...block} />
      ))}
    </aside>
  );
});
