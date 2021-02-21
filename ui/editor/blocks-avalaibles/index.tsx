import React from 'react';
import Block from '../block';
import { getBlocks } from '../services';
import styles from './blocks-avalaibles.module.scss';

const blocks = getBlocks();

export default function BlocksAvalaibles() {
  return (
    <aside className={styles.aside}>
      <h2 className={styles.title}> Bloques</h2>
      <p className="text-muted text-center">Crea tu web haciendo drag and drop!</p>
      <div className={styles.blocks}>
        {blocks.map((block, index) => (
          <Block key={index} {...block} />
        ))}
      </div>
    </aside>
  );
}
