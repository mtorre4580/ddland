import React from 'react';
import { useDrop } from 'react-dnd';
import styles from './canva.module.scss';
import { getDefaultValues } from '../services';
import EditBlock from '../edit-block';

interface CanvaProps {
  onAdd: Function;
  onRemove: Function;
  blocks: any[];
}

export default React.memo(function Canva({ onAdd, blocks = [], onRemove }: CanvaProps) {
  const [, dropRef] = useDrop({
    accept: 'block',
    drop: (item: any) => {
      onAdd(getDefaultValues(item.id));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleOnEdit = (index: number, block: any) => {
    console.log('voy a editar', index, block);
  };

  return (
    <section ref={dropRef} className={styles.canva}>
      {blocks.length === 0 && (
        <div className={styles.description}>
          <img className={styles.image} src="/start.svg" alt="start-canva" />
          <p>Arrastra un bloque para empezar</p>
        </div>
      )}
      <h2 className={styles.title}>Mi landing</h2>
      {blocks.length > 0 &&
        blocks.map((block, index) => (
          <EditBlock key={index} index={index} block={block} onRemove={onRemove} onEdit={handleOnEdit} />
        ))}
    </section>
  );
});
