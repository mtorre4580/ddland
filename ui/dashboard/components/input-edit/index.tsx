import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from './input-edit.module.scss';

interface InputEditProps {
  index: number;
  item: any;
  values: any;
  onChange: Function;
  activeIndex: number;
  texts: { [key: string]: string };
}

export default React.memo(function InputEdit({ index, item, values, onChange, activeIndex, texts }: InputEditProps) {
  return (
    <div style={{ display: index === activeIndex ? 'block' : 'none' }}>
      <p className={styles.titleBlock}>
        {texts.block} {index + 1}
      </p>
      <p className={styles.titleBlock}>{texts.hintStepForm}</p>
      {Object.keys(item).map((key: string, position: number) => {
        return (
          <Form.Group key={position} controlId={key}>
            <Form.Label className={styles.label}>{key}</Form.Label>
            <Form.Control
              type="text"
              name={key}
              value={values[index][key]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, index)}
            />
          </Form.Group>
        );
      })}
    </div>
  );
});
