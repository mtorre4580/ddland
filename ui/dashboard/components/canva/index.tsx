import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { getDefaultValues } from '../../services';
import EditBlock from '../edit-block';
import Modal from '../../../shared/modal';
import FormEdit from '../form-edit';
import styles from './canva.module.scss';

interface CanvaProps {
  onAdd: Function;
  onRemove: Function;
  onEdit: Function;
  onSort: Function;
  blocks: any[];
}

export default React.memo(function Canva({ onAdd, blocks = [], onRemove, onEdit, onSort }: CanvaProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [currentEdition, setCurrentEdition] = useState({ component: null, index: 0 });

  // Hook to handle the drop event for the blocks
  const [, dropRef] = useDrop({
    accept: 'block',
    drop: (item: any) => {
      onAdd(getDefaultValues(item.id));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  /**
   * Handler the action to edit the current block
   * @param index number
   * @param block Block
   */
  const handleOnEdit = (index: number, block: any) => {
    setIsEdit(true);
    setCurrentEdition({ index, component: block });
  };

  /**
   * Handler the event when the modal is close
   */
  const handleOnCloseModal = () => setIsEdit(false);

  /**
   * Handler the event when user edit the block and accept the new changes
   * @param block Block
   */
  const handleOnEditApply = (block: any) => {
    setCurrentEdition({
      ...currentEdition,
      component: block,
    });
    setIsEdit(false);
  };

  // Effect to validate the current state of the block to Edit
  useEffect(() => {
    if (currentEdition.component) {
      onEdit(currentEdition.index, currentEdition.component);
    }
  }, [currentEdition]);

  // Effect to reset the current state of the block to Edit
  useEffect(() => {
    if (!isEdit) {
      setCurrentEdition({ component: null, index: 0 });
    }
  }, [isEdit]);

  return (
    <>
      <section ref={dropRef} className={styles.canva}>
        {blocks.length === 0 && (
          <div className={styles.letStart}>
            <img className={styles.image} src="/start.svg" alt="let start to edit" />
            <p>Arrastra un bloque para empezar</p>
          </div>
        )}
        {blocks.length > 0 && (
          <>
            <h2 className={styles.title}>Mi landing</h2>
            <p className="text-muted text-center">Puedes ordenar los bloques arrastrándolos</p>
            {blocks.map((block, index) => (
              <EditBlock key={index} index={index} block={block} onRemove={onRemove} onEdit={handleOnEdit} onSort={onSort} />
            ))}
          </>
        )}
      </section>
      <Modal title="Editar" active={isEdit} onClose={handleOnCloseModal}>
        <>
          <p>En esta sección puedes modificar los datos de los bloques</p>
          {currentEdition.component && <FormEdit block={currentEdition.component} onEditApply={handleOnEditApply} />}
        </>
      </Modal>
    </>
  );
});
