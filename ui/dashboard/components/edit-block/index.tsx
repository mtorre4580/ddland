import React, { useRef, useContext } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import i18n from './i18n';
import { I18nContext, LOCALS } from '../../../shared/i18n-provider';
import styles from './edit-block.module.scss';

type onEditCallback = (index: number, block: any) => void;
type onRemoveCallback = (index: number) => void;
type onSortCallback = (dragIndex: number, hoverIndex: number) => void;

interface EditBlockProps {
  block: {
    id: string;
    values: any;
  };
  index: number;
  onRemove: onRemoveCallback;
  onEdit: onEditCallback;
  onSort: onSortCallback;
}

const Labels : { [key:string]: string } = {
  Footer: 'Pie de página',
  Header: 'Encabezado',
  Image: 'Imagen',
  Paragraph: 'Parráfo',
  Title: 'Título',
  Whatsapp: 'Contacto',
  List: 'Lista',
};

// The type to support dragging
export const TYPE_DRAG_EDIT_BLOCK = 'block-edit';

export default React.memo(function EditBlock({ block, index, onRemove, onEdit, onSort }: EditBlockProps) {
  const ref: any = useRef(null);
  const locale = useContext(I18nContext);
  const texts = i18n[locale];
  const label = locale === LOCALS.EN ? block.id : Labels[block.id];
  
  // Hook to drop and retrieve the current block
  const [, drop] = useDrop({
    accept: TYPE_DRAG_EDIT_BLOCK,
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
    type: TYPE_DRAG_EDIT_BLOCK,
    item: () => ({ id: block.id, index }),
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
        <Card.Title className={styles.titleBlock} as="h2">
          {label}
        </Card.Title>
        <div className={styles.actions}>
          <Button variant="outline-light" onClick={handleRemove}>
            {texts.remove}
          </Button>
          <Button variant="outline-light" onClick={handleEdit}>
            {texts.edit}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
});
