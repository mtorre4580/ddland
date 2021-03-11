import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './color-picker.module.scss';

type onChangeColor = (color: string) => void;

interface ColorPickerProps {
  value: string;
  onChangeColor: onChangeColor;
}

export default React.memo(function ColorPicker({ value, onChangeColor }: ColorPickerProps) {
  const [color, setColor] = useState(value);

  /**
   * Handler on change to replace the current color selected by the user
   * @param {React.ChangeEvent} event
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const colorSelected = event.target.value;
    setColor(event.target.value);
    onChangeColor(colorSelected);
  };

  return (
    <Form.Group controlId="color-picker" className={styles.colorPicker}>
      <Form.Label className={styles.label}>Color</Form.Label>
      <Form.Control className={styles.inputColor} type="color" name="color" value={color} onChange={handleOnChange} />
    </Form.Group>
  );
});
