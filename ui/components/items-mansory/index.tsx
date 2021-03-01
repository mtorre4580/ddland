import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import { Item } from '../items';
import styles from './items-mansory.module.scss';

interface ItemsMansoryProps {
  items: Item[];
}

export default React.memo(function ItemsMansoryWrapper({ items }: ItemsMansoryProps) {
  return (
    <CardColumns className={styles.cardColumn}>
      {items.map((item: Item, index: number) => (
        <Card key={index}>
          {item.image && <Card.Img variant="top" src={item.image} />}
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            {item.subtitle && <Card.Text>{item.subtitle}</Card.Text>}
          </Card.Body>
        </Card>
      ))}
    </CardColumns>
  );
});
