import React, { useEffect, useState, useContext } from 'react';
import { useDrop } from 'react-dnd';
import Image from 'next/image';
import { getDefaultValues } from '../../services';
import EditBlock from '../edit-block';
import Modal from '../../../shared/modal';
import { I18nContext } from '../../../shared/i18n-provider';
import i18n from './i18n';
import FormEdit from '../form-edit';
import styles from './canva.module.scss';
import { TYPE_DRAG_BLOCK } from '../block';

type onAddCallback = (block: any) => void;
type onEditCallback = (index: number, block: any) => void;
type onRemoveCallback = (index: number) => void;
type onSortCallback = (dragIndex: number, hoverIndex: number) => void;

interface CanvaProps {
  onAdd: onAddCallback;
  onRemove: onRemoveCallback;
  onEdit: onEditCallback;
  onSort: onSortCallback;
  blocks: any[];
}

export default React.memo(function Canva({ onAdd, blocks = [], onRemove, onEdit, onSort }: CanvaProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [currentEdition, setCurrentEdition] = useState({ component: null, index: 0 });
  const locale = useContext(I18nContext);
  const texts = i18n[locale];

  // Hook to handle the drop event for the blocks
  const [, dropRef] = useDrop({
    accept: TYPE_DRAG_BLOCK,
    drop: (item: any) => {
      onAdd(getDefaultValues(item.id, locale));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  /**
   * Handler the action to edit the current block
   * @param {number} index
   * @param {object} block
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
   * @param {object} block
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
      <h2 className={styles.title}>{texts.title}</h2>
      <p className={styles.subtitle}>{texts.subtitle}</p>
      <section ref={dropRef} className={styles.canva}>
        {blocks.length === 0 && (
          <div className={styles.letStart}>
            <Image height={120} width={120} className={styles.image} src="/drag.svg" alt="Let start to edit" />
            <p className={styles.hint}>{texts.hint}</p>
          </div>
        )}
        {blocks.length > 0 && (
          <>
            {blocks.map((block: any, index: number) => (
              <EditBlock
                key={index}
                index={index}
                block={block}
                onRemove={onRemove}
                onEdit={handleOnEdit}
                onSort={onSort}
              />
            ))}
          </>
        )}
      </section>
      <Modal title={texts.edit} open={isEdit} onClose={handleOnCloseModal}>
        <>
          {currentEdition.component && (
            <FormEdit texts={texts} block={currentEdition.component} onEditApply={handleOnEditApply} />
          )}
        </>
      </Modal>
    </>
  );
});
