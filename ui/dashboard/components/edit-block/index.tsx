import React, { useRef, useContext } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import i18n from './i18n';
import { I18nContext } from '../../../shared/i18n-provider';
import styles from './edit-block.module.scss';

interface EditBlockProps {
  block: {
    id: string;
    values: any;
  };
  index: number;
  onRemove: Function;
  onEdit: Function;
  onSort: Function;
}

export default React.memo(function EditBlock({ block, index, onRemove, onEdit, onSort }: EditBlockProps) {
  const ref: any = useRef(null);
  const locale = useContext(I18nContext);
  // @ts-ignore
  const texts = i18n[locale];

  // Hook to drop and retrieve the current block
  const [, drop] = useDrop({
    accept: 'block-edit',
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: any = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onSort(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  // Hook to set the component draggeable
  const [, drag] = useDrag({
    item: { type: 'block-edit', id: block.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  /**
   * Handler when the user has intented to remove the block
   */
  const handleRemove = () => onRemove(index);

  /**
   * Handler when the user has intented to edit the current block
   */
  const handleEdit = () => onEdit(index, block);

  return (
    <Card ref={ref} className={styles.editBlock}>
      <Card.Body>
        <Card.Title>{block.id}</Card.Title>
        <div className={styles.actions}>
          <Button variant="link" onClick={handleRemove}>
            {texts.remove}
          </Button>
          <Button variant="link" onClick={handleEdit}>
            {texts.edit}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
});
