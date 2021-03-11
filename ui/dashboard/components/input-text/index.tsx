import React, { ChangeEventHandler } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './input-text.module.scss';

interface InputTextProps {
  name: string;
  value: string;
  onChange: ChangeEventHandler;
}

export default React.memo(function InputText({ name, onChange, value }: InputTextProps) {
  return (
    <Form.Group className={styles.formGroup} controlId={name}>
      <Form.Label className={styles.label}>{name}</Form.Label>
      <Form.Control className={styles.input} type="text" as="textarea" rows={2} name={name} value={value} onChange={onChange} />
    </Form.Group>
  );
});
