import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import styles from './canva.module.scss';
import { getDefaultValues } from '../services';
import EditBlock from '../edit-block';
import Modal from '../../shared/modal';
import FormEdit from '../form-edit';

interface CanvaProps {
  onAdd: Function;
  onRemove: Function;
  onEdit: Function;
  blocks: any[];
}

export default React.memo(function Canva({ onAdd, blocks = [], onRemove, onEdit }: CanvaProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [currentEdition, setCurrentEdition] = useState({ component: null, index: 0 });

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
    setIsEdit(true);
    setCurrentEdition({ index, component: block });
  };

  const handleOnCloseModal = () => {
    setIsEdit(false);
  };

  const handleOnEditApply = (block: any) => {
    setCurrentEdition({
      ...currentEdition,
      component: block,
    });
    setIsEdit(false);
  };

  useEffect(() => {
    if (currentEdition.component) {
      onEdit(currentEdition.index, currentEdition.component);
    }
  }, [currentEdition]);

  useEffect(() => {
    if (!isEdit) {
      setCurrentEdition({ component: null, index: 0 });
    }
  }, [isEdit]);

  return (
    <>
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
      <Modal title="Editar" active={isEdit} onClose={handleOnCloseModal}>
        <p className="text-muted">En esta sección puedes modificar los datos de los bloques</p>
        {currentEdition.component && <FormEdit block={currentEdition.component} onEditApply={handleOnEditApply} />}
      </Modal>
    </>
  );
});
