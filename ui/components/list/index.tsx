import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

interface ItemList {
  text: string;
}

interface ListProps {
  items: ItemList[];
}

export default React.memo(function ListWrapper({ items }: ListProps) {
  return (
    <ListGroup variant="flush">
      {items.map((item: ItemList, index: number) => {
        if (item.text) {
          return <ListGroup.Item key={index}>{item.text}</ListGroup.Item>
        }
        return null;
      })}
    </ListGroup>
  );
});
