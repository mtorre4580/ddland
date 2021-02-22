import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './edit-block.module.scss';

interface EditBlockProps {
  block: {
    id: string;
    values: any;
  };
  index: number;
  onRemove: Function;
  onEdit: Function;
}

export default React.memo(function EditBlock({ block, index, onRemove, onEdit }: EditBlockProps) {
  /**
   * Handler when the user has intented to remove the block
   */
  const handleRemove = () => onRemove(index);

  /**
   * Handler when the user has intented to edit the current block
   */
  const handleEdit = () => onEdit(index, block);

  return (
    <Card className={styles.editBlock}>
      <Card.Body>
        <Card.Title>{block.id}</Card.Title>
        <div className={styles.actions}>
          <Button variant="link" onClick={handleRemove}>
            Eliminar
          </Button>
          <Button variant="link" onClick={handleEdit}>
            Editar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
});
