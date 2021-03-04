import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './color-picker.module.scss';

interface ColorPickerProps {
  value: string;
  onChangeColor: Function;
}

export default React.memo(function ColorPicker({ value, onChangeColor }: ColorPickerProps) {
  const [color, setColor] = useState(value);

  /**
   * Handler on change to replace the current color selected by the user
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const colorSelected = event.target.value;
    setColor(event.target.value);
    onChangeColor(colorSelected);
  };

  return (
    <div className={styles.colorPicker}>
      <Form.Label className={styles.label}>Color</Form.Label>
      <Form.Control
        className={styles.inputColor}
        id="color-picker"
        type="color"
        name="color"
        value={color}
        onChange={handleOnChange}
      />
    </div>
  );
});
