import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Input from '../input';
import { FormEditionProps } from '../form-edit';
import ColorPicker from '../color-picker';
import styles from './form-single.module.scss';

export default React.memo(function FormSingle({ block, onEditApply, texts }: FormEditionProps) {
  const { id, values } = block;
  const [formProperties, setFormProperties] = useState(values);

  /**
   * Handler to change the current state of the inputs when user change...
   * @param {React.ChangeEvent<HTMLInputElement>} event
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
   * @param {React.SyntheticEvent} event
   */
  const handleOnSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onEditApply({ id, values: formProperties });
  };

  /**
   * Handler the selection of the current color for texts
   * @param {string} color
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
        .filter((key: string) => key !== 'color')
        .map((key: string, index: number) => (
          <Input key={index} name={key} label={texts[key] ? texts[key] : key} texts={texts} value={formProperties[key]} onChange={handleOnChange} />
        ))}
      <Button variant="outline-light" type="submit">
        {texts.accept}
      </Button>
    </Form>
  );
});
