import React from 'react';
import Card from 'react-bootstrap/Card';
import { useDrag } from 'react-dnd';
import styles from './block.module.scss';

interface BlockProps {
  id: string;
  description: string;
}

export default React.memo(function Block({ id, description }: BlockProps) {
  const [, drag] = useDrag({ item: { type: 'block', id } });

  return (
    <Card bg="success" className={styles.block} text="light" ref={drag}>
      <Card.Header className={styles.title} as="h2">
        {id}
      </Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
});
