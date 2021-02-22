import React from 'react';
import Card from 'react-bootstrap/Card';
import { useDrag } from 'react-dnd';
import styles from './block.module.scss';

interface BlockProps {
  name: string;
  id: string;
  description: string;
}

export default React.memo(function Block({ name, id, description }: BlockProps) {
  const [, drag] = useDrag({ item: { type: 'block', id, name } });

  return (
    <Card bg="success" className={styles.block} text="light" ref={drag}>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
});
