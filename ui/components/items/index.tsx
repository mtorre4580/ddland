import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import styles from './items.module.scss';

export interface Item {
  title: string;
  subtitle: string;
  src: string;
}

interface ItemsProps {
  items: Item[];
}

export default React.memo(function ItemsWrapper({ items }: ItemsProps) {
  return (
    <CardColumns className={styles.cardColumn}>
      {items.map((item: Item, index: number) => (
        <Card key={index}>
          {item.src && <Card.Img variant="top" src={item.src} />}
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            {item.subtitle && <Card.Text>{item.subtitle}</Card.Text>}
          </Card.Body>
        </Card>
      ))}
    </CardColumns>
  );
});
