import React from 'react';
import Card from 'react-bootstrap/Card';
import { useDrag } from 'react-dnd';
import styles from './block.module.scss';

interface BlockProps {
  id: string;
  description: string;
  label: string;
}

// The type to support dragging
export const TYPE_DRAG_BLOCK = 'block';

export default React.memo(function Block({ id, description, label }: BlockProps) {
  const [, drag] = useDrag({ type: TYPE_DRAG_BLOCK, item: () => ({ id }) });
  return (
    <Card className={styles.block} text="light" ref={drag}>
      <Card.Header className={styles.title} as="h2">
        {label || id}
      </Card.Header>
      <Card.Body className={styles.description}>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
});
