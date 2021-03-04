import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FormEditionProps } from '../form-edit';
import ColorPicker from '../color-picker';
import Button from 'react-bootstrap/Button';
import styles from './form-single.module.scss';

export default React.memo(function FormSingle({ block, onEditApply, texts }: FormEditionProps) {
  const { id, values } = block;
  const [formProperties, setFormProperties] = useState(values);

  /**
   * Handler to change the current state of the inputs when user change...
   * @param event React.ChangeEvent<HTMLInputElement>
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormProperties({
      ...formProperties,
      [name]: value,
    });
  };

  /**
   * Handler onSubmit event to notify the edition of the current block
   * @param event React.SyntheticEvent
   */
  const handleOnSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onEditApply({ id, values: formProperties });
  };

  /**
   * Handler the selection of the current color for texts
   * @param color string
   */
  const handleOnChangeColor = (color: string) => {
    setFormProperties({
      ...formProperties,
      color,
    });
  };

  return (
    <Form className={styles.formSingle} onSubmit={handleOnSubmit}>
      {id !== 'Image' && <ColorPicker value={values.color} onChangeColor={handleOnChangeColor} />}
      {Object.keys(values)
        .filter((key) => key !== 'color')
        .map((key: string, index: number) => {
          return (
            <Form.Group className={styles.formGroup} key={index} controlId={key}>
              <Form.Label className={styles.label}>{key}</Form.Label>
              <Form.Control type="text" name={key} value={formProperties[key]} onChange={handleOnChange} />
            </Form.Group>
          );
        })}
      <Button variant="outline-light" type="submit">
        {texts.accept}
      </Button>
    </Form>
  );
});
