import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import styles from './items.module.scss';

export interface Item {
  title: string;
  subtitle: string;
  image: string;
}

interface ItemsProps {
  items: Item[];
}

export default React.memo(function ItemsWrapper({ items }: ItemsProps) {
  return (
    <CardGroup className={styles.cardGroup}>
      {items.map((item: Item, index: number) => (
        <Card key={index}>
          <Card.Img variant="top" src={item.image} />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.subtitle}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </CardGroup>
  );
});
