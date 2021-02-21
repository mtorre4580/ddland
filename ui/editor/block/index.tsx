import React from 'react';
import Card from 'react-bootstrap/Card';

export default function Block({ name, id, description }: any) {
  return (
    <Card bg="success" className="mb-2" text="light">
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
