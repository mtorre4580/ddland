import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './form-edit.module.scss';

export default React.memo(function FormEdit({ block, onEditApply }: any) {
  const { id, values } = block;
  const [formProperties, setFormProperties] = useState(values);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormProperties({
      ...formProperties,
      [name]: value,
    });
  };

  const handleOnSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onEditApply({ id, values: formProperties });
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      {Object.keys(values).map((key, index) => {
        return (
          <Form.Group key={index} controlId={key}>
            <Form.Label className={styles.label}>{key}</Form.Label>
            <Form.Control type="text" name={key} value={formProperties[key]} onChange={handleOnChange} />
          </Form.Group>
        );
      })}
      <Button variant="danger" type="submit">
        Actualizar
      </Button>
    </Form>
  );
});
