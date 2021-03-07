import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from './input-image.module.scss';

interface InputImageProps {
  texts: { [key: string]: string };
}

export default React.memo(function InputImage({}: InputImageProps) {
  return (
    <Form.Group controlId="image">
      <Form.Label className={styles.label}>URL</Form.Label>
      <Form.Control type="text" name="image" value="algo" onChange={() => {}} />
      <Form.File id="custom-file-translate-scss" label="Subir imagen" lang="en" custom />
    </Form.Group>
  );
});
